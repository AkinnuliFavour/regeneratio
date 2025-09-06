import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
	try {
		let token;

		// Get token from Authorization header
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
		}

		if (!token) {
			return res.status(401).json({ message: "Not authorized, no token" });
		}

		try {
			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Get user from token
			const user = await User.findById(decoded.id).select("-password");
			if (!user) {
				return res
					.status(401)
					.json({ message: "Not authorized, user not found" });
			}

			// Check if email is verified
			if (!user.isEmailVerified) {
				return res.status(401).json({
					message: "Please verify your email before accessing this resource",
					isEmailVerified: false,
				});
			}

			// Add user to request object
			req.user = user;
			next();
		} catch (error) {
			return res.status(401).json({ message: "Not authorized, token failed" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};
