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
    return getMockResponse(message);
  }

  const knowledgeContext = buildKnowledgeContext(message);

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

  try {
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
      if (response.status === 429) {
        return fallbackChat(message, history);
      }
      throw new Error(`OpenRouter returned ${response.status}`);
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
  } catch (error) {
    console.error("OpenRouter service error:", error);
    return fallbackChat(message, history);
  }
}

async function fallbackChat(
  message: string,
  history: { role: string; content: string }[]
): Promise<ChatResult> {
  if (!config.openRouter.apiKey || config.openRouter.defaultModel === config.openRouter.fallbackModel) {
    return getMockResponse(message);
  }

  const knowledgeContext = buildKnowledgeContext(message);
  const systemPrompt = buildSystemPrompt(knowledgeContext);

  const messages: ChatMessage[] = [{ role: "system", content: systemPrompt }];
  const recentHistory = history.slice(-4);
  for (const h of recentHistory) {
    messages.push({
      role: h.role === "ai" ? "assistant" : "user",
      content: h.content,
    });
  }
  messages.push({ role: "user", content: message });

  try {
    const response = await fetch(`${config.openRouter.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.openRouter.apiKey}`,
        "HTTP-Referer": config.corsOrigin,
        "X-Title": "YugAI Portfolio",
      },
      body: JSON.stringify({
        model: config.openRouter.fallbackModel,
        messages,
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      return getMockResponse(message);
    }

    const data = (await response.json()) as OpenRouterResponse;
    const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    return {
      reply,
      suggestions: getSuggestedFollowUps(reply),
      metadata: {
        model: config.openRouter.fallbackModel,
        tokensUsed: data.usage?.total_tokens || 0,
        responseTimeMs: 0,
      },
    };
  } catch {
    return getMockResponse(message);
  }
}

function getMockResponse(message: string): ChatResult {
  const q = message.toLowerCase();

  let reply: string;

  if (q.includes("hire") || q.includes("why"))
    reply = `Great question. Here's why I'd be a strong hire:

1. **Full-Stack Versatility** — I've built Android apps (ChitraAI), web ERPs (Hariom Machinery), and PHP platforms (School Management System).

2. **AI-First Mindset** — I integrate AI into production apps via OpenRouter. I don't just consume AI — I build with it.

3. **Real-World Impact** — My ERP system is deployed and used daily by a manufacturing business. Not a demo — production software.

4. **Growth Trajectory** — From HTML to AI integration in 3 years. I learn fast and ship faster.

Would you like me to dive deeper into any of these?`;

  else if (q.includes("chitraai") || q.includes("architecture"))
    reply = `**ChitraAI Architecture:**

\`\`\`
Android UI (XML) → Java Service → OpenRouter API Gateway
                                        ├── GPT-4o (Prompt Optimization)
                                        └── Stable Diffusion (Image Gen)
\`\`\`

**Key Decisions:**
- **Service layer abstraction** — Swap AI models without touching UI
- **Async image loading** — UI never blocks during generation
- **Local caching** — Previously generated images load instantly
- **Unified response parser** — Handles base64, URL, and binary from different models

The biggest challenge was handling Android's threading model for long-running API calls without blocking the UI.`;

  else if (q.includes("hariom") || q.includes("erp"))
    reply = `**Hariom Machinery ERP** — A full-stack inventory and billing system deployed in production.

- **Frontend:** React with real-time dashboard
- **Backend:** Node.js + Express REST API
- **Database:** MySQL with transaction-level locking
- **Impact:** Reduced invoice generation from 15min to 2min

Key challenge was real-time stock synchronization across concurrent sessions — solved with optimistic concurrency control and database-level locking.`;

  else if (q.includes("school"))
    reply = `**School Management System** — A PHP + MySQL multi-role platform supporting 4 user types.

**Roles:** Admin, Teacher, Student, Parent
**Features:** Attendance tracking, grade management, timetable scheduling

The most challenging part was designing the role-based access control (RBAC) system. I implemented a permission matrix in the database where every controller method independently verifies authorization — never trusting the frontend.`;

  else if (q.includes("project") || q.includes("strongest") || q.includes("best"))
    reply = `My strongest project is **ChitraAI** — an Android app that generates images using AI via OpenRouter API. It connects to GPT-4o, Claude, and Stable Diffusion through a single interface.

**Highlights:**
- Native Android with Material Design 3
- Multi-model AI support through one unified API
- Prompt enhancement layer for better outputs
- 100% crash-free in testing

I'm also proud of **Hariom Machinery ERP** — seeing real users rely on my software daily is incredibly rewarding.`;

  else if (q.includes("skill") || q.includes("technolog") || q.includes("know"))
    reply = `Here's my technology stack:

**Frontend:** React, TypeScript, HTML, CSS, JavaScript, Tailwind CSS
**Backend:** Node.js, Express, PHP
**Database:** MySQL (queries, joins, indexing, normalization)
**Mobile:** Java, Android Studio, XML layouts
**AI:** OpenRouter API, Prompt Engineering, AI Integration
**Tools:** Git, Postman, VS Code

I have 12+ skills across these categories and I'm always adding more. Currently exploring WebSockets and cloud deployment.`;

  else if (q.includes("interview") || q.includes("full stack") || q.includes("role"))
    reply = `I'd be happy to walk through my qualifications for a Full Stack role.

**Frontend:** I build component-based architectures with React + TypeScript, manage state with Context API, and create responsive designs with Tailwind CSS.

**Backend:** I design REST APIs with Node.js/Express, implement JWT/session-based auth, and structure business logic in service layers.

**Database:** I work with MySQL — schema design, complex joins, proper indexing, and parameterized queries to prevent injection.

**Mobile:** I've built native Android apps with Java, handling threading, API integration, and Material Design UI.

**AI Integration:** I connect applications to LLMs via OpenRouter, design prompt chains, and build context-aware systems.

**My edge:** I've shipped across the full stack — from Android XML layouts to MySQL queries to AI prompt engineering. I understand how every layer connects.`;

  else if (q.includes("resume"))
    reply = `You can view or download my resume on the Resume page. Here's a quick summary:

- **Education:** Diploma in Information Technology at GCET (2023–2026)
- **Experience:** 3 major projects including a production-deployed ERP
- **Skills:** 12+ technologies across frontend, backend, mobile, and AI
- **Achievements:** First OpenRouter Android integration, production ERP deployment, multi-role system architecture

Want me to elaborate on any section?`;

  else if (q.includes("contact"))
    reply = `You can reach me through:

- **Email:** yug.sathavara@example.com
- **LinkedIn:** linkedin.com/in/yugsathavara
- **GitHub:** github.com/yugsathavara

I typically respond within 24 hours. Feel free to also use the contact form on this portfolio.`;

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
    metadata: {
      model: "mock",
      tokensUsed: 0,
      responseTimeMs: 0,
    },
  };
}
