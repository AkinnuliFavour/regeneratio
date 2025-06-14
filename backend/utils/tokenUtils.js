import crypto from "crypto";

export const generateToken = () => {
	return crypto.randomBytes(32).toString("hex");
};

export const generateExpiryDate = (hours) => {
	return new Date(Date.now() + hours * 60 * 60 * 1000);
};
