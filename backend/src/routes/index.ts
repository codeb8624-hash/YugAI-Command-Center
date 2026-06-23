import { Router } from "express";
import { chatRateLimiter, generalRateLimiter, contactRateLimiter } from "../middleware/rateLimiter.js";
import {
  handleChat,
  handleResume,
  handleSkills,
  handleProjects,
  handleEducation,
  handleAchievements,
} from "../controllers/chatController.js";
import { handleChatStream } from "../controllers/chatStreamController.js";
import { handleContact } from "../controllers/contactController.js";
import { handleProjectById } from "../controllers/projectController.js";

const router = Router();

router.post("/chat", chatRateLimiter, handleChat);
router.post("/chat/stream", chatRateLimiter, handleChatStream);
router.get("/resume", generalRateLimiter, handleResume);
router.get("/skills", generalRateLimiter, handleSkills);
router.get("/projects", generalRateLimiter, handleProjects);
router.get("/projects/:id", generalRateLimiter, handleProjectById);
router.get("/education", generalRateLimiter, handleEducation);
router.get("/achievements", generalRateLimiter, handleAchievements);
router.post("/contact", contactRateLimiter, handleContact);

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    data: {
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    },
    error: null,
  });
});

export default router;
