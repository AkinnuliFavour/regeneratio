import { body, validationResult } from "express-validator";

// Validation middleware
export const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

// Signup validation rules
export const signupValidation = [
	body("username")
		.trim()
		.isLength({ min: 3 })
		.withMessage("Username must be at least 3 characters long")
		.matches(/^[a-zA-Z0-9_]+$/)
		.withMessage("Username can only contain letters, numbers, and underscores"),

	body("email")
		.trim()
		.isEmail()
		.withMessage("Please provide a valid email")
		.normalizeEmail(),

	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long")
		.matches(/\d/)
		.withMessage("Password must contain at least one number")
		.matches(/[A-Z]/)
		.withMessage("Password must contain at least one uppercase letter")
		.matches(/[a-z]/)
		.withMessage("Password must contain at least one lowercase letter")
		.matches(/[!@#$%^&*]/)
		.withMessage("Password must contain at least one special character"),
];

// Signin validation rules
export const signinValidation = [
	body("email")
		.trim()
		.isEmail()
		.withMessage("Please provide a valid email")
		.normalizeEmail(),

	body("password").notEmpty().withMessage("Password is required"),
];

// Password reset validation rules
export const passwordResetValidation = [
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long")
		.matches(/\d/)
		.withMessage("Password must contain at least one number")
		.matches(/[A-Z]/)
		.withMessage("Password must contain at least one uppercase letter")
		.matches(/[a-z]/)
		.withMessage("Password must contain at least one lowercase letter")
		.matches(/[!@#$%^&*]/)
		.withMessage("Password must contain at least one special character"),
];

// Forgot password validation rules
export const forgotPasswordValidation = [
	body("email")
		.trim()
		.isEmail()
		.withMessage("Please provide a valid email")
		.normalizeEmail(),
];
