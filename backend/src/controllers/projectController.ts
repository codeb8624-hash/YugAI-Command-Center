import type { Request, Response } from "express";
import { getProjectsData } from "../ai/knowledge.service.js";

export function handleProjectById(req: Request, res: Response): void {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        data: null,
        error: { code: "VALIDATION_ERROR", message: "Project ID is required." },
      });
      return;
    }

    const allData = getProjectsData();
    const projectsList = allData.projects as Array<Record<string, unknown>> | undefined;

    if (!projectsList) {
      res.status(500).json({
        success: false,
        data: null,
        error: { code: "INTERNAL_ERROR", message: "Failed to load projects data." },
      });
      return;
    }

    const project = projectsList.find((p) => (p as Record<string, string>).id === id);

    if (!project) {
      res.status(404).json({
        success: false,
        data: null,
        error: { code: "NOT_FOUND", message: `Project "${id}" not found.` },
      });
      return;
    }

    res.json({ success: true, data: project, error: null });
  } catch (error) {
    console.error("Project by ID controller error:", error);
    res.status(500).json({
      success: false,
      data: null,
      error: { code: "INTERNAL_ERROR", message: "Failed to load project." },
    });
  }
}
