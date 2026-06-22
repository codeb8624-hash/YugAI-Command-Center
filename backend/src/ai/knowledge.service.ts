import fs from "fs";
import path from "path";
import { config } from "../config/index.js";

interface KnowledgeBase {
  resume: Record<string, unknown>;
  skills: Record<string, unknown>;
  projects: Record<string, unknown>;
  education: Record<string, unknown>;
  achievements: Record<string, unknown>;
}

let cached: KnowledgeBase | null = null;
let lastRead = 0;
const CACHE_TTL = 60_000;

function readJson(filePath: string): Record<string, unknown> {
  const resolved = path.resolve(filePath);
  const raw = fs.readFileSync(resolved, "utf-8");
  return JSON.parse(raw);
}

export function loadKnowledgeBase(): KnowledgeBase {
  const now = Date.now();
  if (cached && now - lastRead < CACHE_TTL) return cached;

  cached = {
    resume: readJson(config.knowledgeBase.resumePath),
    skills: readJson(config.knowledgeBase.skillsPath),
    projects: readJson(config.knowledgeBase.projectsPath),
    education: readJson(config.knowledgeBase.educationPath),
    achievements: readJson(config.knowledgeBase.achievementsPath),
  };
  lastRead = now;

  return cached;
}

export function getResumeData(): Record<string, unknown> {
  return loadKnowledgeBase().resume;
}

export function getSkillsData(): Record<string, unknown> {
  return loadKnowledgeBase().skills;
}

export function getProjectsData(): Record<string, unknown> {
  return loadKnowledgeBase().projects;
}

export function getEducationData(): Record<string, unknown> {
  return loadKnowledgeBase().education;
}

export function getAchievementsData(): Record<string, unknown> {
  return loadKnowledgeBase().achievements;
}

export function buildKnowledgeContext(_query?: string): string {
  const kb = loadKnowledgeBase();

  const resume = kb.resume;
  const skills = kb.skills;
  const projects = kb.projects;
  const education = kb.education;
  const achievements = kb.achievements;

  let context = "";

  context += `[PERSONAL INFO]\nName: ${(resume.personalInfo as Record<string, string>)?.name || "Yug Sathavara"}\n`;
  context += `Title: ${(resume.personalInfo as Record<string, string>)?.title || ""}\n`;
  context += `Summary: ${(resume.personalInfo as Record<string, string>)?.summary || ""}\n\n`;

  const cats = (skills as Record<string, unknown>)?.categories as Array<Record<string, unknown>>;
  if (cats) {
    context += `[SKILLS]\n`;
    for (const cat of cats) {
      context += `\n${cat.name}:\n`;
      const skillList = cat.skills as Array<Record<string, unknown>>;
      for (const s of skillList) {
        context += `- ${s.name} (Level: ${s.level}/100, Experience: ${s.experience})\n`;
      }
    }
    context += "\n";
  }

  const projList = (projects as Record<string, unknown>)?.projects as Array<Record<string, unknown>>;
  if (projList) {
    context += `[PROJECTS]\n`;
    for (const p of projList) {
      context += `\n${p.name} (${p.status} — ${p.year})\n`;
      context += `Tagline: ${p.tagline}\n`;
      context += `Tech: ${(p.techStack as string[]).join(", ")}\n`;
      context += `Description: ${p.description}\n`;
      context += `Highlights:\n`;
      for (const h of p.highlights as string[]) {
        context += `- ${h}\n`;
      }
    }
    context += "\n";
  }

  const eduList = education.education as Array<Record<string, unknown>> | undefined;
  if (eduList) {
    context += `[EDUCATION]\n`;
    for (const e of eduList) {
      context += `${e.degree} — ${e.institution} (${(e.period as Record<string, string>)?.start}–${(e.period as Record<string, string>)?.end || "Present"})\n`;
    }
    context += "\n";
  }

  const achList = achievements.achievements as Array<Record<string, unknown>> | undefined;
  if (achList) {
    context += `[ACHIEVEMENTS]\n`;
    for (const a of achList) {
      context += `- ${a.title}: ${a.description}\n`;
    }
    context += "\n";
  }

  context += `[HIRING SUMMARY]\n`;
  context += `Total Projects: ${projList?.length || 0}\n`;
  if (cats) {
    let totalSkills = 0;
    for (const cat of cats) {
      totalSkills += (cat.skills as Array<unknown>).length;
    }
    context += `Total Skill Categories: ${cats.length}\n`;
    context += `Total Skills: ${totalSkills}\n`;
  }
  context += `Education: Diploma in Information Technology at GCET\n`;
  context += `Experience Level: 3+ years of learning and building\n\n`;

  return context;
}

export function getStaticContext(): string {
  const kb = loadKnowledgeBase();
  const resume = kb.resume;
  const projects = kb.projects;
  const skills = kb.skills;

  let ctx = `[PERSONAL INFO]\n`;
  ctx += `Name: ${(resume.personalInfo as Record<string, string>)?.name}\n`;
  ctx += `Title: ${(resume.personalInfo as Record<string, string>)?.title}\n`;
  ctx += `Location: ${(resume.personalInfo as Record<string, string>)?.location}\n`;
  ctx += `Summary: ${(resume.personalInfo as Record<string, string>)?.summary}\n\n`;

  const cats = (skills as Record<string, unknown>)?.categories as Array<Record<string, unknown>>;
  if (cats) {
    ctx += `[SKILLS BY CATEGORY]\n`;
    for (const cat of cats) {
      ctx += `${cat.name}: `;
      ctx += (cat.skills as Array<Record<string, unknown>>).map((s) => `${s.name}(${s.level}/100)`).join(", ");
      ctx += "\n";
    }
  }
  ctx += "\n";

  const projList = (projects as Record<string, unknown>)?.projects as Array<Record<string, unknown>>;
  if (projList) {
    ctx += `[PROJECTS]\n`;
    for (const p of projList) {
      ctx += `${p.name} | ${(p as Record<string, unknown>).tagline} | Tech: ${(p.techStack as string[]).join(", ")}\n`;
    }
  }

  return ctx;
}
