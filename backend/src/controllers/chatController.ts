import type { Request, Response } from "express";
import { chatWithAI } from "../ai/openrouter.service.js";
import { getResumeData, getSkillsData, getProjectsData, getEducationData, getAchievementsData } from "../ai/knowledge.service.js";

export async function handleChat(req: Request, res: Response): Promise<void> {
  try {
    const { message, sessionId, history } = req.body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      res.status(400).json({
        success: false,
        data: null,
        error: { code: "VALIDATION_ERROR", message: "Message is required and must be a non-empty string." },
      });
      return;
    }

    if (message.length > 2000) {
      res.status(400).json({
        success: false,
        data: null,
        error: { code: "VALIDATION_ERROR", message: "Message must be under 2000 characters." },
      });
      return;
    }

    const chatHistory = Array.isArray(history) ? history : [];

    const result = await chatWithAI(message.trim(), chatHistory);

    res.json({
      success: true,
      data: {
        sessionId: sessionId || `session_${Date.now()}`,
        reply: result.reply,
        suggestions: result.suggestions,
        metadata: result.metadata,
      },
      error: null,
    });
  } catch (error) {
    console.error("Chat controller error:", error);
    res.status(500).json({
      success: false,
      data: null,
      error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred. Please try again." },
    });
  }
}

export function handleResume(_req: Request, res: Response): void {
  try {
    const resume = getResumeData();
    res.json({ success: true, data: resume, error: null });
  } catch (error) {
    console.error("Resume controller error:", error);
    res.status(500).json({
      success: false,
      data: null,
      error: { code: "INTERNAL_ERROR", message: "Failed to load resume data." },
    });
  }
}

export function handleSkills(_req: Request, res: Response): void {
  try {
    const skills = getSkillsData();
    res.json({ success: true, data: skills, error: null });
  } catch (error) {
    console.error("Skills controller error:", error);
    res.status(500).json({
      success: false,
      data: null,
      error: { code: "INTERNAL_ERROR", message: "Failed to load skills data." },
    });
  }
}

export function handleProjects(_req: Request, res: Response): void {
  try {
    const projects = getProjectsData();
    res.json({ success: true, data: projects, error: null });
  } catch (error) {
    console.error("Projects controller error:", error);
    res.status(500).json({
      success: false,
      data: null,
      error: { code: "INTERNAL_ERROR", message: "Failed to load projects data." },
    });
  }
}

export function handleEducation(_req: Request, res: Response): void {
  try {
    const education = getEducationData();
    res.json({ success: true, data: education, error: null });
  } catch (error) {
    console.error("Education controller error:", error);
    res.status(500).json({
      success: false,
      data: null,
      error: { code: "INTERNAL_ERROR", message: "Failed to load education data." },
    });
  }
}

export function handleAchievements(_req: Request, res: Response): void {
  try {
    const achievements = getAchievementsData();
    res.json({ success: true, data: achievements, error: null });
  } catch (error) {
    console.error("Achievements controller error:", error);
    res.status(500).json({
      success: false,
      data: null,
      error: { code: "INTERNAL_ERROR", message: "Failed to load achievements data." },
    });
  }
}
