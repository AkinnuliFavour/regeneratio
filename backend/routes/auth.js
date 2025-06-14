import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { authLimiter } from "../middleware/security.js";
import {
	signupValidation,
	signinValidation,
	passwordResetValidation,
	forgotPasswordValidation,
	validate,
} from "../middleware/validation.js";
import { protect } from "../middleware/auth.js";
import {
	sendVerificationEmail,
	sendPasswordResetEmail,
} from "../utils/emailService.js";
import { generateToken, generateExpiryDate } from "../utils/tokenUtils.js";

const router = express.Router();

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post(
	"/signup",
	authLimiter,
	signupValidation,
	validate,
	async (req, res) => {
		try {
			const { username, email, password } = req.body;

			// Check if user already exists
			const userExists = await User.findOne({ email });
			if (userExists) {
				return res.status(400).json({ message: "User already exists" });
			}

			// Hash password
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			// Generate verification token
			const verificationToken = generateToken();
			const verificationExpires = generateExpiryDate(24); // 24 hours

			// Create new user
			const user = await User.create({
				username,
				email,
				password: hashedPassword,
				emailVerificationToken: verificationToken,
				emailVerificationExpires: verificationExpires,
			});

			// Send verification email
			await sendVerificationEmail(email, verificationToken);

			// Create tokens
			const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "15m",
			});

			const refreshToken = jwt.sign(
				{ id: user._id },
				process.env.JWT_REFRESH_SECRET,
				{ expiresIn: "7d" }
			);

			// Store refresh token in user document
			user.refreshToken = refreshToken;
			await user.save();

			// Set refresh token in HTTP-only cookie
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			});

			res.status(201).json({
				_id: user._id,
				username: user.username,
				email: user.email,
				accessToken,
				message: "Please check your email to verify your account",
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server error" });
		}
	}
);

// @route   GET /api/auth/verify-email/:token
// @desc    Verify email address
// @access  Public
router.get("/verify-email/:token", async (req, res) => {
	try {
		const user = await User.findOne({
			emailVerificationToken: req.params.token,
			emailVerificationExpires: { $gt: Date.now() },
		});

		if (!user) {
			return res
				.status(400)
				.json({ message: "Invalid or expired verification token" });
		}

		user.isEmailVerified = true;
		user.emailVerificationToken = undefined;
		user.emailVerificationExpires = undefined;
		await user.save();

		res.json({ message: "Email verified successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

// @route   POST /api/auth/forgot-password
// @desc    Request password reset
// @access  Public
router.post(
	"/forgot-password",
	forgotPasswordValidation,
	validate,
	async (req, res) => {
		try {
			const { email } = req.body;
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			// Generate reset token
			const resetToken = generateToken();
			const resetExpires = generateExpiryDate(1); // 1 hour

			// Save reset token to user
			user.passwordResetToken = resetToken;
			user.passwordResetExpires = resetExpires;
			await user.save();

			// Send reset email
			await sendPasswordResetEmail(email, resetToken);

			res.json({ message: "Password reset email sent" });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server error" });
		}
	}
);

// @route   POST /api/auth/reset-password/:token
// @desc    Reset password
// @access  Public
router.post(
	"/reset-password/:token",
	passwordResetValidation,
	validate,
	async (req, res) => {
		try {
			const { password } = req.body;
			const user = await User.findOne({
				passwordResetToken: req.params.token,
				passwordResetExpires: { $gt: Date.now() },
			});

			if (!user) {
				return res
					.status(400)
					.json({ message: "Invalid or expired reset token" });
			}

			// Hash new password
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			// Update user
			user.password = hashedPassword;
			user.passwordResetToken = undefined;
			user.passwordResetExpires = undefined;
			await user.save();

			res.json({ message: "Password reset successful" });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server error" });
		}
	}
);

// @route   POST /api/auth/signin
// @desc    Authenticate user & get token
// @access  Public
router.post(
	"/signin",
	authLimiter,
	signinValidation,
	validate,
	async (req, res) => {
		try {
			const { email, password } = req.body;

			// Check if user exists
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ message: "Invalid credentials" });
			}

			// Check if email is verified
			if (!user.isEmailVerified) {
				return res.status(401).json({
					message: "Please verify your email before signing in",
					isEmailVerified: false,
				});
			}

			// Check password
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ message: "Invalid credentials" });
			}

			// Create tokens
			const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "15m",
			});

			const refreshToken = jwt.sign(
				{ id: user._id },
				process.env.JWT_REFRESH_SECRET,
				{ expiresIn: "7d" }
			);

			// Store refresh token in user document
			user.refreshToken = refreshToken;
			user.lastLogin = new Date();
			await user.save();

			// Set refresh token in HTTP-only cookie
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			});

			res.json({
				_id: user._id,
				username: user.username,
				email: user.email,
				accessToken,
				isEmailVerified: true,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server error" });
		}
	}
);

// @route   POST /api/auth/refresh
// @desc    Refresh access token
// @access  Public
router.post("/refresh", async (req, res) => {
	try {
		const { refreshToken } = req.cookies;

		if (!refreshToken) {
			return res.status(401).json({ message: "Refresh token not found" });
		}

		// Verify refresh token
		const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
		const user = await User.findById(decoded.id);

		if (!user || user.refreshToken !== refreshToken) {
			return res.status(401).json({ message: "Invalid refresh token" });
		}

		// Create new access token
		const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "15m",
		});

		res.json({ accessToken });
	} catch (error) {
		console.error(error);
		res.status(401).json({ message: "Invalid refresh token" });
	}
});

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Public
router.post("/logout", async (req, res) => {
	try {
		const { refreshToken } = req.cookies;

		if (refreshToken) {
			// Clear refresh token from user document
			await User.findOneAndUpdate(
				{ refreshToken },
				{ $unset: { refreshToken: 1 } }
			);
		}

		// Clear refresh token cookie
		res.clearCookie("refreshToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
		});

		res.json({ message: "Logged out successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

// @route   POST /api/auth/resend-verification
// @desc    Resend verification email
// @access  Public
router.post(
	"/resend-verification",
	forgotPasswordValidation,
	validate,
	async (req, res) => {
		try {
			const { email } = req.body;
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			if (user.isEmailVerified) {
				return res.status(400).json({ message: "Email is already verified" });
			}

			// Generate new verification token
			const verificationToken = generateToken();
			const verificationExpires = generateExpiryDate(24); // 24 hours

			// Update user with new verification token
			user.emailVerificationToken = verificationToken;
			user.emailVerificationExpires = verificationExpires;
			await user.save();

			// Send new verification email
			await sendVerificationEmail(email, verificationToken);

			res.json({ message: "Verification email sent" });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server error" });
		}
	}
);

// @route   DELETE /api/auth/account
// @desc    Delete user account
// @access  Private
router.delete("/account", protect, async (req, res) => {
	try {
		// Get user from auth middleware
		const userId = req.user.id;

		// Find user and delete
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Delete user
		await User.findByIdAndDelete(userId);

		// Clear refresh token cookie
		res.clearCookie("refreshToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
		});

		res.json({ message: "Account deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

// @route   POST /api/auth/delete-account-confirm
// @desc    Confirm account deletion with password
// @access  Private
router.post("/delete-account-confirm", protect, async (req, res) => {
	try {
		const { password } = req.body;
		const userId = req.user.id;

		// Find user
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Verify password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid password" });
		}

		// Delete user
		await User.findByIdAndDelete(userId);

		// Clear refresh token cookie
		res.clearCookie("refreshToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
		});

		res.json({ message: "Account deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

export default router;
