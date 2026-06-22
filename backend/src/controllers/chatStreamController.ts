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
      const mock = getMockResponse(message);
      for (const char of mock.reply) {
        writeEvent({ type: "chunk", content: char });
        await sleep(10);
      }
      writeEvent({
        type: "done",
        suggestions: mock.suggestions,
        metadata: { model: "mock", tokensUsed: 0, responseTimeMs: 0 },
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

function getMockResponse(message: string) {
  const q = message.toLowerCase();
  let reply: string;

  if (q.includes("hire") || q.includes("why"))
    reply = `Great question. Here's why I'd be a strong hire:

1. **Full-Stack Versatility** — I've built Android apps (ChitraAI), web ERPs (Hariom Machinery), and PHP platforms (School Management System).

2. **AI-First Mindset** — I integrate AI into production apps via OpenRouter. I don't just consume AI — I build with it.

3. **Real-World Impact** — My ERP system is deployed and used daily by a manufacturing business. Not a demo — production software.

4. **Growth Trajectory** — From HTML to AI integration in 3 years. I learn fast and ship faster.

Would you like me to dive deeper into any of these?`;
  else if (q.includes("skill") || q.includes("technolog") || q.includes("know"))
    reply = `Here's my technology stack:

**Frontend:** React, TypeScript, HTML, CSS, JavaScript, Tailwind CSS
**Backend:** Node.js, Express, PHP
**Database:** MySQL (queries, joins, indexing, normalization)
**Mobile:** Java, Android Studio, XML layouts
**AI:** OpenRouter API, Prompt Engineering, AI Integration
**Tools:** Git, Postman, VS Code

I have 12+ skills across these categories and I'm always adding more.`;
  else if (q.includes("project") || q.includes("strongest"))
    reply = `My strongest project is **ChitraAI** — an Android app that generates images using AI via OpenRouter API. It connects to GPT-4o, Claude, and Stable Diffusion through a single interface.

**Highlights:**
- Native Android with Material Design 3
- Multi-model AI support through one unified API
- Prompt enhancement layer for better outputs
- 100% crash-free in testing`;
  else
    reply = `I'm YugAI, the AI career twin of Yug Sathavara. I can tell you about his skills, projects, education, and experience.

Here's a quick overview:
- **Full-Stack Developer** with 3+ years of building
- **AI Integration** specialist — ChitraAI, prompt engineering
- **Production Experience** — Deployed ERP used daily

What would you like to know more about?`;

  return {
    reply,
    suggestions: getSuggestedFollowUps(reply),
  };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
