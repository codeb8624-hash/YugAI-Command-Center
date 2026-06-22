import type { Request, Response } from "express";
import { config } from "../config/index.js";
import { buildKnowledgeContext } from "../ai/knowledge.service.js";
import { buildSystemPrompt, getSuggestedFollowUps } from "../ai/promptTemplates.js";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function handleChatStream(req: Request, res: Response): Promise<void> {
  const { message, history } = req.body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    res.status(400).json({
      success: false,
      data: null,
      error: { code: "VALIDATION_ERROR", message: "Message is required." },
    });
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  const knowledgeContext = buildKnowledgeContext(message);
  const systemPrompt = buildSystemPrompt(knowledgeContext);

  const messages: ChatMessage[] = [{ role: "system", content: systemPrompt }];
  const recentHistory = (Array.isArray(history) ? history : []).slice(-6);
  for (const h of recentHistory) {
    messages.push({
      role: h.role === "ai" ? "assistant" : "user",
      content: h.content,
    });
  }
  messages.push({ role: "user", content: message });

  const writeEvent = (data: unknown) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    if (!config.openRouter.apiKey) {
      writeEvent({
        type: "error",
        error: "OPENROUTER_API_KEY is not configured. Please set it in your .env file.",
      });
      res.end();
      return;
    }

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
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenRouter stream error ${response.status}:`, errorText);
      writeEvent({ type: "error", error: `API returned ${response.status}` });
      res.end();
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      writeEvent({ type: "error", error: "No response body" });
      res.end();
      return;
    }

    const decoder = new TextDecoder();
    let fullReply = "";
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const dataStr = line.slice(6).trim();
        if (dataStr === "[DONE]") continue;
        if (!dataStr) continue;

        try {
          const parsed = JSON.parse(dataStr);
          const content = parsed.choices?.[0]?.delta?.content || "";
          if (content) {
            fullReply += content;
            writeEvent({ type: "chunk", content });
          }
        } catch {
          // skip
        }
      }
    }

    const suggestions = getSuggestedFollowUps(fullReply);
    writeEvent({
      type: "done",
      suggestions,
      metadata: {
        model: config.openRouter.defaultModel,
        tokensUsed: 0,
        responseTimeMs: 0,
      },
    });
    res.end();
  } catch (error) {
    console.error("Chat stream error:", error);
    writeEvent({ type: "error", error: "Internal server error" });
    res.end();
  }
}


