# Technical Requirements Document — YugAI Portfolio

---

## Document Control

| Parameter         | Detail                        |
| ----------------- | ----------------------------- |
| **Project Name**  | YugAI — AI Career Twin        |
| **Author**        | Yug Sathavara                 |
| **Version**       | 1.0.0                         |
| **Date**          | 2026-06-19                    |
| **Status**        | Draft (Day 1 Planning)        |

---

## 1. System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        Client Browser                            │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │              React SPA (Vite + TypeScript)                 │  │
│  │  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐ │  │
│  │  │ AI Chat │ │  Project │ │  Skills  │ │  Contact     │ │  │
│  │  │  Twin   │ │ Showcase │ │  Visual  │ │  Form        │ │  │
│  │  └────┬────┘ └────┬─────┘ └────┬─────┘ └──────┬───────┘ │  │
│  │       └───────────┴────────────┴───────────────┘         │  │
│  └─────────────────────────┬──────────────────────────────────┘  │
│                            │ HTTPS / REST + SSE                 │
└────────────────────────────┼─────────────────────────────────────┘
                             │
┌────────────────────────────┼─────────────────────────────────────┐
│                    Express.js + Node.js Backend                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │  Routes  │ │Controller│ │  Middle- │ │  AI Service      │  │
│  │          │ │   s      │ │  ware    │ │  (OpenRouter)    │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────────┬─────────┘  │
│       │            │            │                 │             │
│  ┌────┴────────────┴────────────┴─────────────────┴────────┐   │
│  │                  PostgreSQL Database                     │   │
│  │  ┌──────────┐ ┌──────────┐ ┌────────┐ ┌─────────────┐  │   │
│  │  │ Contacts │ │ChatHistor│ │Project │ │ Analytics   │  │   │
│  │  │          │ │    y     │ │  Views │ │             │  │   │
│  │  └──────────┘ └──────────┘ └────────┘ └─────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                    │
│  ┌────────────────────────────┴───────────────────────────────┐ │
│  │                Knowledge Base (JSON Files)                 │ │
│  │  resume.json │ skills.json │ projects.json │ education.json│ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

| Layer        | Technology                          | Justification                              |
| ------------ | ----------------------------------- | ------------------------------------------ |
| **Frontend** | React 19 + TypeScript               | Industry standard, component reusability   |
| **Build**    | Vite 6                              | Fast HMR, optimized builds                 |
| **Styling**  | Tailwind CSS v4 + Framer Motion     | Utility-first, fluid animations            |
| **Backend**  | Node.js + Express.js                | Lightweight, widely supported              |
| **Database** | PostgreSQL 16 (via Neon / Supabase) | Relational, scalable, serverless option    |
| **AI API**   | OpenRouter (GPT-4o / Claude 3.5)    | Single API for multiple LLMs              |
| **ORM**      | Prisma or Drizzle ORM               | Type-safe database access                  |
| **Hosting**  | Vercel (Frontend) + Render (Backend) | Free tier, easy CI/CD, global CDN          |
| **CI/CD**    | GitHub Actions                      | Native integration, free for public repos  |
| **Analytics**| Custom + Plausible (optional)       | Privacy-focused, simple                   |

---

## 3. Frontend Architecture

### Directory Structure

```
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Chat/
│   │   │   ├── ChatContainer.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   └── TypingIndicator.tsx
│   │   ├── Project/
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectGrid.tsx
│   │   ├── Skills/
│   │   │   ├── SkillRadar.tsx
│   │   │   └── SkillBadge.tsx
│   │   ├── Layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── TerminalPrompt.tsx
│   │   └── UI/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Modal.tsx
│   │       └── AnimatedText.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ProjectsPage.tsx
│   │   └── ContactPage.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   ├── api.ts
│   │   └── constants.ts
│   ├── hooks/
│   │   ├── useChat.ts
│   │   └── useAnalytics.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Styling Philosophy

| Property         | Value                       |
| ---------------- | --------------------------- |
| Base Background  | `#0a0a0f` (Deep Void)      |
| Surface          | `#12121a` (Card surfaces)  |
| Border           | `#1e1e2a` (Subtle borders) |
| Primary Accent   | `#6c5ce7` (Electric purple)|
| Secondary Accent | `#00d4ff` (Cyan glow)      |
| Text Primary     | `#e8e8ed`                  |
| Text Secondary   | `#8888a0`                  |
| Font             | `Inter` (UI) + `JetBrains Mono` (code/terminal) |
| Radius           | `12px` (cards), `8px` (inputs) |
| Shadows          | Soft glow on accent colors  |

---

## 4. Backend Architecture

### Directory Structure

```
backend/
├── src/
│   ├── controllers/
│   │   ├── chatController.ts
│   │   ├── projectController.ts
│   │   ├── skillController.ts
│   │   ├── resumeController.ts
│   │   └── contactController.ts
│   ├── models/
│   │   ├── Contact.ts
│   │   ├── ChatHistory.ts
│   │   ├── ProjectView.ts
│   │   └── Analytics.ts
│   ├── routes/
│   │   ├── chatRoutes.ts
│   │   ├── projectRoutes.ts
│   │   ├── skillRoutes.ts
│   │   ├── resumeRoutes.ts
│   │   └── contactRoutes.ts
│   ├── middleware/
│   │   ├── rateLimiter.ts
│   │   ├── cors.ts
│   │   └── errorHandler.ts
│   ├── services/
│   │   ├── openRouterService.ts
│   │   └── knowledgeService.ts
│   ├── config/
│   │   └── index.ts
│   ├── ai/
│   │   ├── promptTemplates.ts
│   │   └── contextBuilder.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   └── validators.ts
│   └── app.ts
├── tsconfig.json
├── .env.example
└── package.json
```

---

## 5. AI Architecture

### Prompt Chain Design

```
User Message
    │
    ▼
┌───────────────────────────────┐
│  Context Builder              │
│  - Loads relevant KB entries  │
│  - Injects chat history (last │
│    5 messages)                │
│  - Builds system prompt       │
└───────────┬───────────────────┘
            │
            ▼
┌───────────────────────────────┐
│  System Prompt                │
│  "You are YugAI, the AI twin  │
│   of Yug Sathavara..."        │
│  + Knowledge base context     │
│  + Behavioral instructions    │
└───────────┬───────────────────┘
            │
            ▼
┌───────────────────────────────┐
│  OpenRouter API Call          │
│  Model: gpt-4o / claude-3.5  │
│  Temperature: 0.7             │
│  Max Tokens: 1024             │
└───────────┬───────────────────┘
            │
            ▼
┌───────────────────────────────┐
│  Response Post-Processor      │
│  - Trim irrelevant content    │
│  - Format markdown → plain    │
│  - Log to ChatHistory         │
└───────────┬───────────────────┘
            │
            ▼
        Return to Client (SSE stream)
```

### System Prompt Template

```
You are YugAI — the AI career twin of Yug Sathavara.
You represent Yug in a first-person conversational style.
You have access to the following knowledge base:

[RESUME]
{resume_data}

[SKILLS]
{skills_data}

[PROJECTS]
{projects_data}

[EDUCATION]
{education_data}

[ACHIEVEMENTS]
{achievements_data}

Rules:
1. Always respond as Yug, using "I" and "my".
2. Be concise, professional but friendly.
3. If asked something outside the KB, politely say it's outside your knowledge.
4. For technical questions, demonstrate depth where possible.
5. End every response with an optional follow-up question to keep the conversation flowing.
```

---

## 6. API Design

| Method | Endpoint         | Auth | Rate Limit | Description                  |
| ------ | ---------------- | ---- | ---------- | ---------------------------- |
| POST   | `/api/chat`      | No   | 10/min     | Send message to AI twin      |
| GET    | `/api/projects`  | No   | 30/min     | Retrieve all projects        |
| GET    | `/api/projects/:id` | No | 30/min    | Retrieve single project      |
| GET    | `/api/skills`    | No   | 30/min     | Retrieve skills data         |
| GET    | `/api/resume`    | No   | 20/min     | Retrieve resume (JSON + PDF) |
| POST   | `/api/contact`   | No   | 5/min      | Submit contact form          |
| GET    | `/api/health`    | No   | —          | Health check endpoint        |

*Full details in [API Documentation](./api-docs.md)*

---

## 7. Deployment Strategy

### Environment Breakdown

| Environment | Frontend              | Backend               | Database         |
| ----------- | --------------------- | ----------------------| ---------------- |
| **Dev**     | `localhost:5173`      | `localhost:4000`      | Local PostgreSQL |
| **Staging** | Vercel Preview        | Render Staging        | Neon (staging)   |
| **Prod**    | Vercel Production     | Render Production     | Neon (prod)      |

### CI/CD Pipeline (GitHub Actions)

```
┌────────────┐     ┌──────────────┐     ┌────────────┐
│ Push to    │────▶│ GitHub       │────▶│ Test Suite │
│ main       │     │ Actions      │     │ - Lint    │
└────────────┘     └──────────────┘     │ - Type    │
                                        │ - Unit    │
                                        └─────┬──────┘
                                              │
                                              ▼
                                     ┌────────────────┐
                                     │  Deploy        │
                                     │  Frontend →    │
                                     │  Vercel        │
                                     │  Backend  →    │
                                     │  Render        │
                                     └────────────────┘
```

---

## 8. Security Considerations

| Concern              | Mitigation Strategy                                     |
| -------------------- | ------------------------------------------------------- |
| **API Key Leak**     | Server-side only; never exposed to client               |
| **Rate Limiting**    | express-rate-limit on all endpoints                     |
| **CORS**             | Allow only Vercel frontend origin                       |
| **XSS**              | Input sanitization; React's built-in escaping           |
| **SQL Injection**    | Parameterized queries via Prisma/Drizzle                |
| **DDoS**             | Rate limiting + Vercel/Render edge protection           |
| **Data Privacy**     | No PII stored except contact form (opt-in)              |
| **HTTPS**            | Enforced at Vercel/Render/CDN level                     |
| **Environment**      | `.env` for secrets; `.env.example` for template         |

---

## 9. Performance Targets

| Metric              | Target      |
| ------------------- | ----------- |
| Lighthouse Score    | > 95        |
| First Contentful Paint | < 1.2s  |
| Time to Interactive | < 2.0s      |
| API Response (Chat) | < 3.0s      |
| API Response (Static) | < 200ms  |
| Bundle Size         | < 250 KB (gzip) |

---

## 10. Error Handling Strategy

```
Layer               Strategy
─────────────────────────────────────────────────────
Frontend            ErrorBoundary component;
                    toast notifications on API failure
API Routes          Centralized error handler;
                    consistent error response shape:
                    { success: false, error: string }
Database            Prisma client validation;
                    graceful disconnect on crash
AI Service          Retry logic (3 attempts);
                    fallback message on failure
```

---

*End of TRD*
