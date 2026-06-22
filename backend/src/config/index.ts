import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "../../..");

export const config = {
  port: parseInt(process.env.PORT || "4000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  openRouter: {
    apiKey: process.env.OPENROUTER_API_KEY || "",
    baseUrl: "https://openrouter.ai/api/v1",
    defaultModel: "openai/gpt-4o-mini",
    maxTokens: 512,
    temperature: 0.6,
  },
  knowledgeBase: {
    resumePath: path.join(projectRoot, "knowledge-base", "resume.json"),
    skillsPath: path.join(projectRoot, "knowledge-base", "skills.json"),
    projectsPath: path.join(projectRoot, "knowledge-base", "projects.json"),
    educationPath: path.join(projectRoot, "knowledge-base", "education.json"),
    achievementsPath: path.join(projectRoot, "knowledge-base", "achievements.json"),
  },
  rateLimit: {
    chat: { window: 60, max: 10 },
    general: { window: 60, max: 30 },
    contact: { window: 60, max: 5 },
  },
};
