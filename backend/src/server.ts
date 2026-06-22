import app from "./app.js";
import { config } from "./config/index.js";
import { loadKnowledgeBase } from "./ai/knowledge.service.js";
import { connectDatabase } from "./db/index.js";

try {
  loadKnowledgeBase();
  console.log("Knowledge base loaded successfully.");
} catch (error) {
  console.warn("Warning: Could not load knowledge base files. AI will use fallback responses.", error);
}

await connectDatabase();

app.listen(config.port, () => {
  console.log(`YugAI API server running on http://localhost:${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`CORS origin: ${config.corsOrigin}`);

  if (!config.openRouter.apiKey) {
    console.warn("Warning: OPENROUTER_API_KEY not set. AI will use mock responses.");
  }
});
