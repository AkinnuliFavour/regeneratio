import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Please provide a username"],
			unique: true,
			trim: true,
			minlength: [3, "Username must be at least 3 characters long"],
		},
		email: {
			type: String,
			required: [true, "Please provide an email"],
			unique: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Please provide a valid email",
			],
		},
		password: {
			type: String,
			required: [true, "Please provide a password"],
			minlength: [6, "Password must be at least 6 characters long"],
		},
		refreshToken: {
			type: String,
			default: null,
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
		emailVerificationToken: String,
		emailVerificationExpires: Date,
		passwordResetToken: String,
		passwordResetExpires: Date,
		lastLogin: Date,
		loginAttempts: {
			type: Number,
			default: 0,
		},
		lockUntil: Date,
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

export default User;
