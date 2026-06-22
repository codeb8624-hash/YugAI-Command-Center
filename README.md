# YugAI — AI Career Twin Portfolio

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blueviolet)
![Status](https://img.shields.io/badge/status-planning-yellow)
![AI](https://img.shields.io/badge/powered%20by-OpenRouter-cyan)

**An AI-powered interactive portfolio where visitors can converse with an AI version of Yug Sathavara.**

[Features](#features) •
[Tech Stack](#tech-stack) •
[Installation](#installation) •
[Folder Structure](#folder-structure) •
[Roadmap](#roadmap) •
[API](#api)

</div>

---

## Overview

YugAI transforms the traditional developer portfolio into an immersive, **AI-powered experience**. Instead of static pages, visitors interact with the **YugAI Career Twin** — an AI assistant that responds in first person, drawing from a structured knowledge base of Yug's real projects, skills, education, and achievements.

The interface follows a premium **AI Command Center** aesthetic — dark, minimal, futuristic — inspired by OpenAI, Linear, and Vercel.

---

## Features

| Feature | Description |
|---------|-------------|
| ** AI Chat Twin** | Real-time conversations with an AI representing Yug's knowledge |
| ** Project Showcase** | Dynamic project cards with tech tags, descriptions, and links |
| ** Skills Visualization** | Interactive skill categories with proficiency levels |
| ** Resume Viewer** | Structured resume display with download option |
| ** Contact Form** | Direct messaging with database persistence |
| ** Analytics** | Track page views, chat interactions, and project popularity |
| ** Dark Theme** | Premium dark UI with purple/cyan accent glow |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + TypeScript + Vite 6 |
| **Styling** | Tailwind CSS v4 + Framer Motion |
| **Backend** | Node.js + Express.js |
| **Database** | PostgreSQL 16 (via Neon / Supabase) |
| **AI API** | OpenRouter (GPT-4o / Claude 3.5) |
| **ORM** | Prisma / Drizzle |
| **Deployment** | Vercel (frontend) + Render (backend) |
| **CI/CD** | GitHub Actions |

---

## Installation

### Prerequisites

- Node.js >= 20 LTS
- PostgreSQL >= 16
- OpenRouter API key ([get one free](https://openrouter.ai))

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/yugsathavara/yugai-portfolio.git
cd yugai-portfolio

# 2. Install backend dependencies
cd backend
npm install
cp .env.example .env
# Edit .env with your DATABASE_URL and OPENROUTER_API_KEY

# 3. Run database migrations
npx prisma migrate dev

# 4. Start backend server
npm run dev
# Backend runs on http://localhost:4000

# 5. Install frontend dependencies (new terminal)
cd ../frontend
npm install
cp .env.example .env
# Edit .env with VITE_API_URL=http://localhost:4000/api

# 6. Start frontend dev server
npm run dev
# Frontend runs on http://localhost:5173
```

### Environment Variables

**Backend (.env)**

```env
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/yugai
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxx
CORS_ORIGIN=http://localhost:5173
```

**Frontend (.env)**

```env
VITE_API_URL=http://localhost:4000/api
```

---

## Folder Structure

```
YugAI-Portfolio/
├── frontend/                    # React SPA (Vite + TypeScript)
│   ├── public/                  # Static assets (favicon, etc.)
│   └── src/
│       ├── components/          # Reusable UI components
│       │   ├── Chat/            # AI chat interface
│       │   ├── Project/         # Project cards & grid
│       │   ├── Skills/          # Skills visualization
│       │   ├── Layout/          # Navbar, Footer, Terminal
│       │   └── UI/              # Buttons, Cards, Modals
│       ├── pages/               # Route pages
│       ├── styles/              # Global CSS + theme
│       ├── utils/               # API client, constants
│       ├── hooks/               # Custom React hooks
│       ├── types/               # TypeScript definitions
│       ├── App.tsx
│       └── main.tsx
│
├── backend/                     # Express.js API server
│   └── src/
│       ├── controllers/         # Route handlers
│       ├── models/              # Database models
│       ├── routes/              # Express routers
│       ├── middleware/          # Rate limiting, CORS, errors
│       ├── services/            # OpenRouter, KB service
│       ├── config/              # Environment config
│       ├── ai/                  # Prompt templates, context
│       ├── utils/               # Logger, validators
│       └── app.ts               # Express entry point
│
├── database/                    # SQL schemas & migrations
│   └── schema.sql               # Full database schema
│
├── knowledge-base/              # AI knowledge base (JSON)
│   ├── resume.json
│   ├── skills.json
│   ├── projects.json
│   ├── education.json
│   └── achievements.json
│
├── docs/                        # Project documentation
│   ├── PRD.md                   # Product Requirements
│   ├── TRD.md                   # Technical Requirements
│   ├── api-docs.md              # API Documentation
│   ├── user-journey.md          # User flow diagrams
│   ├── sdlc.md                  # SDLC Documentation
│   └── roadmap.md               # Development Roadmap
│
├── assets/                      # Media assets
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── tests/                       # Test suites
│   ├── frontend/
│   └── backend/
│
├── scripts/                     # Utility scripts
├── .github/workflows/           # CI/CD pipelines
└── README.md
```

---

## Roadmap

| Week | Focus | Key Deliverables |
|------|-------|------------------|
| **Week 1** | Backend Foundation | Express server, PostgreSQL schema, KB JSON, API routes |
| **Week 2** | Frontend Foundation | React app, layout, project/skills/resume pages |
| **Week 3** | AI Chat Integration | Chat UI, OpenRouter flow, session management |
| **Week 4** | Polish & Deploy | Animations, analytics, Vercel + Render deployment |

See full [Development Roadmap](./docs/roadmap.md).

---

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send message to AI twin |
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/:id` | Get single project |
| GET | `/api/skills` | Get skills data |
| GET | `/api/resume` | Get resume data |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/health` | Health check |

Full API documentation: [api-docs.md](./docs/api-docs.md)

---

## Design Theme

**AI Command Center** — Premium, minimal, futuristic, dark.

| Token | Value |
|-------|-------|
| Background | `#0a0a0f` (Deep Void) |
| Surface | `#12121a` |
| Primary | `#6c5ce7` (Electric Purple) |
| Secondary | `#00d4ff` (Cyan Glow) |
| Text | `#e8e8ed` / `#8888a0` |
| Font | Inter + JetBrains Mono |

---

## Author

**Yug Sathavara**

- Diploma in Information Technology — GCET, Vallabh Vidyanagar
- Email: yug.sathavara@example.com
- GitHub: [@yugsathavara](https://github.com/yugsathavara)
- LinkedIn: [Yug Sathavara](https://linkedin.com/in/yugsathavara)

---

<div align="center">
  <sub>Built with  by Yug Sathavara</sub>
  <br>
  <sub>YugAI — 2026</sub>
</div>
