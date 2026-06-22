# SDLC Documentation — YugAI Portfolio

---

**Software Development Life Cycle: Waterfall-Agile Hybrid**

This project follows a hybrid SDLC approach — structured phases for planning and design (Waterfall) with iterative sprints for development (Agile).

---

## Phase 1: Planning (Day 1–2)

### Activities

| Activity                        | Owner           | Artifact                       |
| ------------------------------- | --------------- | ------------------------------ |
| Define project vision & scope   | Product Owner   | PRD                            |
| Identify user personas          | Product Owner   | PRD §4                         |
| Define success metrics          | Product Owner   | PRD §8                         |
| Create project roadmap          | Tech Lead       | Roadmap                        |
| Resource estimation             | Tech Lead       | Resource plan                  |
| Risk identification             | Team            | Risk register                  |

### Risks Identified

| Risk                              | Likelihood | Impact | Mitigation                              |
| --------------------------------- | ---------- | ------ | --------------------------------------- |
| AI API cost overrun               | Medium     | High   | Cache responses; limit tokens           |
| OpenRouter downtime               | Low        | Medium | Fallback model configuration            |
| Knowledge base drift              | Medium     | Low    | Version-controlled JSON + review cycle  |
| Mobile responsiveness issues      | Low        | Medium | Mobile-first design from Day 1          |

---

## Phase 2: Requirement Analysis (Day 3–4)

### Activities

| Activity                        | Owner           | Artifact                       |
| ------------------------------- | --------------- | ------------------------------ |
| Gather functional requirements  | Product Owner   | PRD §5                         |
| Define non-functional reqs      | Tech Lead       | TRD §8, §9                     |
| Finalize tech stack             | Tech Lead       | TRD §2                         |
| Design database schema          | Backend Dev     | Schema SQL                     |
| Define API contracts            | Backend Dev     | API Documentation              |
| Create knowledge base structure | Full Team       | JSON files                     |

### Functional Requirements Summary

| ID     | Requirement                          | Priority |
| ------ | ------------------------------------ | -------- |
| FR-001 | User can chat with AI twin           | P0       |
| FR-002 | AI responds using knowledge base     | P0       |
| FR-003 | User can view projects               | P0       |
| FR-004 | User can view skills                 | P0       |
| FR-005 | User can view/download resume        | P0       |
| FR-006 | User can submit contact form         | P1       |
| FR-007 | Chat history persists per session    | P1       |
| FR-008 | Admin can view analytics             | P2       |

### Non-Functional Requirements Summary

| ID     | Requirement                          | Target      |
| ------ | ------------------------------------ | ----------- |
| NFR-01 | Page load time                       | < 2 sec     |
| NFR-02 | API response (chat)                  | < 3 sec     |
| NFR-03 | Lighthouse score                     | > 95        |
| NFR-04 | Uptime                               | > 99.5%     |
| NFR-05 | Dark theme consistency               | 100%        |
| NFR-06 | Responsive on all screen sizes       | Full        |

---

## Phase 3: Design (Day 5–7)

### Activities

| Activity                        | Owner           | Artifact                       |
| ------------------------------- | --------------- | ------------------------------ |
| Design system (colors, fonts)   | Designer        | TRD §3 (Styling table)         |
| Component tree architecture     | Frontend Dev    | TRD §3 (Dir structure)         |
| Wireframe key screens           | Designer        | Figma / Excalidraw             |
| AI prompt engineering           | AI/Backend Dev  | TRD §5 (Prompt templates)      |
| API route design                | Backend Dev     | Route files                    |
| Database relationship diagram   | Backend Dev     | ER diagram                     |

### Design Principles

1. **Dark-first** — Default theme is dark; light mode is additive
2. **Terminal-inspired** — Monospace fonts, command-line aesthetics
3. **Glow accents** — Purple/cyan neon glow on interactive elements
4. **Glassmorphism** — Subtle backdrop blur on cards
5. **Micro-animations** — Framer Motion for smooth transitions

### Component Tree (High-Level)

```
App
├── Navbar
│   ├── Logo (Terminal Prompt)
│   ├── NavLinks (Projects, Skills, Resume, Contact)
│   └── ThemeToggle
├── Routes
│   ├── HomePage
│   │   ├── HeroSection (TerminalIntro + CTA)
│   │   ├── ProjectPreview (2–3 cards)
│   │   ├── SkillHighlights (Radar/Grid)
│   │   └── ChatPreview (Floating chat bubble)
│   ├── ProjectsPage
│   │   ├── ProjectGrid
│   │   └── ProjectCard[]
│   └── ContactPage
│       └── ContactForm
├── AI Chat Overlay (Floating)
│   ├── ChatContainer
│   ├── ChatMessage[]
│   ├── ChatInput
│   └── TypingIndicator
└── Footer
    ├── SocialLinks
    └── Copyright
```

---

## Phase 4: Development (Week 2–4)

### Sprint Breakdown

| Sprint   | Duration     | Focus                          | Deliverables                          |
| -------- | ------------ | ------------------------------ | ------------------------------------- |
| Sprint 1 | Week 2       | Backend Foundation             | Express server, DB, KB, API routes    |
| Sprint 2 | Week 3       | Frontend Core                  | React app, layout, pages, components  |
| Sprint 3 | Week 4       | AI Integration + Polish        | Chat flow, animations, deploy         |

### Development Standards

| Standard        | Rule                                              |
| --------------- | ------------------------------------------------- |
| **Git Flow**    | Feature branches → PR → main                      |
| **Commits**     | Conventional commits (`feat:`, `fix:`, `docs:`)   |
| **Code Review** | At least 1 approval before merge                  |
| **Linting**     | ESLint (TS) + Prettier                            |
| **Typing**      | Strict TypeScript everywhere                       |
| **Testing**     | Vitest (frontend), Jest (backend)                 |

---

## Phase 5: Testing (Throughout Development)

### Testing Layers

```
Layer                  Tool / Approach          Target
────────────────────────────────────────────────────────────
Unit Testing           Vitest / Jest            Individual functions, hooks
Component Testing      @testing-library/react   React components
API Integration        Supertest + Jest         Express routes
AI Response Testing    Manual + Snapshot        Prompt output quality
E2E Testing            Playwright (optional)    Critical user flows
Performance            Lighthouse CI            Bundle size, load time
Security               npm audit, Snyk          Dependency vulnerabilities
```

### Test Scenarios (High Priority)

| Scenario                     | Steps                                                          | Expected Result                      |
| ---------------------------- | -------------------------------------------------------------- | ------------------------------------ |
| Chat sends message           | Type question → Submit                                         | AI responds within 3s                |
| Chat handles empty input     | Submit empty form                                              | Error message shown                  |
| Projects list loads          | Navigate to /projects                                          | 3 project cards displayed            |
| Contact form submits         | Fill all fields → Submit                                       | Success toast; DB record created     |
| Contact form validation      | Fill invalid email → Submit                                    | Field-level error shown              |
| Resume downloads             | Click download button                                          | JSON / PDF downloads                 |
| Chat context maintained      | Ask follow-up question                                         | AI references previous messages      |
| API rate limiting            | Send 11+ chat requests in 1 min                                | 429 response                         |

---

## Phase 6: Deployment

### Deployment Checklist

| Task                          | Owner           | Status       |
| ----------------------------- | --------------- | ------------ |
| Setup Vercel project          | Frontend Dev    | ☐            |
| Setup Render / Railway        | Backend Dev     | ☐            |
| Configure environment vars    | Tech Lead       | ☐            |
| Setup PostgreSQL (Neon)       | Backend Dev     | ☐            |
| Configure CORS for prod       | Backend Dev     | ☐            |
| Run migration scripts         | Backend Dev     | ☐            |
| Configure custom domain       | Tech Lead       | ☐            |
| Enable HTTPS                  | Platform (auto) | ☐            |
| Setup GitHub Actions          | Tech Lead       | ☐            |
| Smoke test all endpoints      | QA / Dev        | ☐            |
| Lighthouse audit              | Frontend Dev    | ☐            |
| Analytics verification        | Tech Lead       | ☐            |

### Environment Variables (.env)

```env
# Backend
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/yugai
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxx
CORS_ORIGIN=http://localhost:5173

# Frontend
VITE_API_URL=http://localhost:4000/api
```

---

## Phase 7: Maintenance

### Regular Tasks

| Frequency   | Task                                  | Owner       |
| ----------- | ------------------------------------- | ----------- |
| Weekly      | Review chat logs for quality          | AI/Backend  |
| Bi-weekly   | Update knowledge base (if needed)     | Product Own |
| Monthly     | Dependency updates                    | Tech Lead   |
| Monthly     | Analytics review                      | Product Own |
| Quarterly   | Full security audit                   | Tech Lead   |
| On-demand   | Add new projects/skills to KB         | Product Own |

### Monitoring & Alerts

| Metric                    | Alert Threshold      | Action                          |
| ------------------------- | -------------------- | ------------------------------- |
| API error rate            | > 5% in 5 min       | Rollback / investigate          |
| AI response time          | > 5s avg             | Fallback to faster model        |
| Database connection count | > 80% max           | Scale up connection pool        |
| Uptime                    | < 99.5%             | Check hosting provider          |
| OpenRouter API errors     | > 10 in 1 hour      | Rotate API key / switch model   |

### Backup Strategy

| Data            | Frequency | Retention | Method                  |
| --------------- | --------- | --------- | ----------------------- |
| Database        | Daily     | 30 days   | pg_dump → cloud storage |
| Knowledge Base  | Git-based | Permanent | Version control (Git)   |
| Environment     | Per deploy | —        | Vercel/Render dashboards |
| Chat Logs       | Real-time | 90 days   | DB table (auto-cleanup) |

---

*End of SDLC Documentation*
