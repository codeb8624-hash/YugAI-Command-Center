import { config } from "../config/index.js";
import { buildKnowledgeContext } from "./knowledge.service.js";
import { buildSystemPrompt, getSuggestedFollowUps } from "./promptTemplates.js";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface ChatResult {
  reply: string;
  suggestions: string[];
  metadata: {
    model: string;
    tokensUsed: number;
    responseTimeMs: number;
  };
}

export async function chatWithAI(
  message: string,
  history: { role: string; content: string }[]
): Promise<ChatResult> {
  if (!config.openRouter.apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured. Please set it in your .env file.");
  }

  const knowledgeContext = buildKnowledgeContext();

  const systemPrompt = buildSystemPrompt(knowledgeContext);

  const messages: ChatMessage[] = [{ role: "system", content: systemPrompt }];

  const recentHistory = history.slice(-6);
  for (const h of recentHistory) {
    messages.push({
      role: h.role === "ai" ? "assistant" : "user",
      content: h.content,
    });
  }
  messages.push({ role: "user", content: message });

  const startTime = Date.now();

  const response = await fetch(`${config.openRouter.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.openRouter.apiKey}`,
      "HTTP-Referer": config.corsOrigin,
      "X-Title": "YugAI Portfolio",
    },
    body: JSON.stringify({
      model: config.openRouter.defaultModel,
      messages,
      max_tokens: config.openRouter.maxTokens,
      temperature: config.openRouter.temperature,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`OpenRouter API error ${response.status}:`, errorBody);
    throw new Error(`OpenRouter returned ${response.status}: ${errorBody}`);
  }

  const data = (await response.json()) as OpenRouterResponse;
  const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
  const tokensUsed = data.usage?.total_tokens || 0;
  const responseTimeMs = Date.now() - startTime;
  const suggestions = getSuggestedFollowUps(reply);

  return {
    reply,
    suggestions,
    metadata: {
      model: config.openRouter.defaultModel,
      tokensUsed,
      responseTimeMs,
    },
  };
}
