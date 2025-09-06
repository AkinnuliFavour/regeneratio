import rateLimit from "express-rate-limit";
import helmet from "helmet";

// Rate limiting configuration
export const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // 5 requests per windowMs
	message: "Too many login attempts, please try again after 15 minutes",
	standardHeaders: true,
	legacyHeaders: false,
});

export const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // 100 requests per windowMs
	message: "Too many requests from this IP, please try again after 15 minutes",
	standardHeaders: true,
	legacyHeaders: false,
});

// Helmet configuration
export const helmetConfig = helmet({
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'", "'unsafe-inline'"],
			styleSrc: ["'self'", "'unsafe-inline'"],
			imgSrc: ["'self'", "data:", "https:"],
		},
	},
	crossOriginEmbedderPolicy: true,
	crossOriginOpenerPolicy: true,
	crossOriginResourcePolicy: { policy: "same-site" },
	dnsPrefetchControl: true,
	frameguard: { action: "deny" },
	hidePoweredBy: true,
	hsts: true,
	ieNoOpen: true,
	noSniff: true,
	referrerPolicy: { policy: "strict-origin-when-cross-origin" },
	xssFilter: true,
});
