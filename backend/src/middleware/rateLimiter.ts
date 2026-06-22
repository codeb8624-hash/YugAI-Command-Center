import rateLimit from "express-rate-limit";
import { config } from "../config/index.js";

export const chatRateLimiter = rateLimit({
  windowMs: config.rateLimit.chat.window * 1000,
  max: config.rateLimit.chat.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    error: {
      code: "RATE_LIMITED",
      message: "Too many chat requests. Please wait before sending another message.",
    },
  },
});

export const generalRateLimiter = rateLimit({
  windowMs: config.rateLimit.general.window * 1000,
  max: config.rateLimit.general.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    error: {
      code: "RATE_LIMITED",
      message: "Too many requests. Please slow down.",
    },
  },
});

export const contactRateLimiter = rateLimit({
  windowMs: config.rateLimit.contact.window * 1000,
  max: config.rateLimit.contact.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    error: {
      code: "RATE_LIMITED",
      message: "Too many contact submissions. Please wait before trying again.",
    },
  },
});
