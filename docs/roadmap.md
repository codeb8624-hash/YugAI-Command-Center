# Development Roadmap — YugAI Portfolio

---

**Timeline:** 4 Weeks
**Start Date:** 2026-06-19
**End Date:** 2026-07-17

---

## Week 1 — Foundation & Backend Core (Jun 19 – Jun 25)

### Milestones

| Day  | Milestone                                    | Deliverables                                     |
| ---- | -------------------------------------------- | ------------------------------------------------ |
| 1    | Project scaffold & documentation             | Folder structure, PRD, TRD, KB JSON files        |
| 2    | Database schema & setup                      | SQL schema, Prisma models, migration scripts     |
| 3    | Express server foundation                    | app.ts, middleware (cors, rate-limit, error)     |
| 4    | API routes — static data                     | GET /projects, /skills, /resume — working        |
| 5    | OpenRouter service integration               | openRouterService.ts, prompt templates           |
| 6    | POST /chat — basic flow                      | Chat controller, context builder, KB injector    |
| 7    | Testing & bug fixes                          | Backend tests, POST /contact endpoint            |

### Tasks

```
☐ Create docs (PRD, TRD, SDLC, Roadmap)
☐ Create knowledge base JSON files (x5)
☐ Initialize backend project (Node + Express + TS)
☐ Configure Prisma with PostgreSQL schema
☐ Run initial migration
☐ Implement GET /projects endpoint
☐ Implement GET /skills endpoint
☐ Implement GET /resume endpoint
☐ Implement POST /contact endpoint
☐ Build OpenRouter API service
☐ Build prompt template engine
☐ Implement POST /chat endpoint
☐ Add rate limiting middleware
☐ Add error handling middleware
☐ Write backend unit tests
```

### Success Criteria

- All static GET endpoints return correct KB data
- POST /chat returns AI response successfully
- POST /contact writes to database
- Rate limiting blocks excess requests

---

## Week 2 — Frontend Foundation (Jun 26 – Jul 2)

### Milestones

| Day  | Milestone                                    | Deliverables                                     |
| ---- | -------------------------------------------- | ------------------------------------------------ |
| 8    | Frontend project initialization              | Vite + React + TS + Tailwind setup               |
| 9    | Design system & global styles                | globals.css, theme variables, font setup         |
| 10   | Layout components                            | Navbar, Footer, Layout wrapper                   |
| 11   | HomePage — Hero + Terminal Intro             | Animated terminal hero with CTA                  |
| 12   | ProjectsPage — ProjectGrid + ProjectCard     | Cards displaying project data from API           |
| 13   | Skills visualization                         | Skills grid / radar component                    |
| 14   | Contact form page                             | Validated form with API integration              |

### Tasks

```
☐ Initialize Vite + React + TypeScript project
☐ Configure Tailwind CSS with custom theme
☐ Add global styles (dark theme, fonts, animations)
☐ Build Navbar component
☐ Build Footer component
☐ Build Layout wrapper
☐ Build HeroSection with terminal animation
☐ Build ProjectCard component
☐ Build ProjectGrid layout
☐ Build SkillsRadar / SkillsGrid component
☐ Build ContactForm with validation
☐ Connect pages to backend API
☐ Add responsive breakpoints
```

### Success Criteria

- All pages render correctly on desktop and mobile
- Projects load from API and display correctly
- Skills visualization renders
- Contact form validates and submits to backend
- Lighthouse mobile score > 80

---

## Week 3 — AI Chat Integration (Jul 3 – Jul 10)

### Milestones

| Day  | Milestone                                    | Deliverables                                     |
| ---- | -------------------------------------------- | ------------------------------------------------ |
| 15   | Chat UI — Container + Messages               | Chat bubble layout, message components           |
| 16   | Chat Input + Typing Indicator                | Input bar, send button, typing animation         |
| 17   | AI chat integration (Frontend → Backend)     | Full chat flow, loading states                   |
| 18   | Context management                           | Session-based chat history, memory of last 5     |
| 19   | Suggested questions & onboarding             | Welcome message, suggestion chips                |
| 20   | Chat polish — animations, markdown, code     | Smooth animations, code block formatting         |
| 21   | End-to-end chat testing                      | Multiple conversation flows tested               |

### Tasks

```
☐ Build ChatContainer component
☐ Build ChatMessage component (user + AI)
☐ Build ChatInput component
☐ Build TypingIndicator component
☐ Implement useChat hook (API calls, state mgmt)
☐ Integrate SSE streaming for responses
☐ Add chat history per session (localStorage)
☐ Add welcome message with suggestions
☐ Add markdown rendering for AI responses
☐ Add code syntax highlighting
☐ Add smooth scroll on new messages
☐ Test edge cases (long messages, errors, empty)
```

### Success Criteria

- Chat UI matches design system
- AI responds within 3 seconds
- Conversation history persists within session
- Typing indicator animates during API call
- Code blocks render with syntax highlighting
- Error states handled gracefully

---

## Week 4 — Polish, Analytics & Deploy (Jul 11 – Jul 17)

### Milestones

| Day  | Milestone                                    | Deliverables                                     |
| ---- | -------------------------------------------- | ------------------------------------------------ |
| 22   | Resume viewer + download                     | Formatted resume page, JSON/PDF download         |
| 23   | Analytics tracking                            | Page views, chat events, project views           |
| 24   | Performance optimization                      | Lazy loading, bundle analysis, image optimization |
| 25   | Final UI polish & micro-animations           | Framer Motion transitions, hover effects         |
| 26   | Deployment — Staging                         | Vercel + Render staging environment              |
| 27   | Production deployment & custom domain        | Production URLs, DNS setup                       |
| 28   | Final testing, docs & handover               | Full test suite, updated README, handoff notes   |

### Tasks

```
☐ Build ResumeView component (formatted from KB)
☐ Add resume download (JSON format)
☐ Implement analytics service (custom)
☐ Track page views and chat events
☐ Track project card clicks
☐ Lazy load routes (React.lazy + Suspense)
☐ Optimize bundle with code splitting
☐ Compress images (WebP)
☐ Add Framer Motion page transitions
☐ Add hover/glow effects on cards and buttons
☐ Set up Vercel project (frontend)
☐ Set up Render project (backend)
☐ Configure environment variables
☐ Run DB migration on production
☐ Configure custom domain
☐ Final Lighthouse audit
☐ Update README with live URLs
```

### Success Criteria

- Lighthouse score > 95 (desktop) and > 85 (mobile)
- All APIs respond within targets
- Analytics data visible in database
- Chat works in production
- Contact form sends email notification
- Custom domain resolves with HTTPS
- All tests pass

---

## Post-Launch (Future Sprints)

| Sprint | Focus                            | Features                                    |
| ------ | -------------------------------- | ------------------------------------------- |
| S5     | Voice Input                      | Speech-to-text for chat                     |
| S6     | Admin Dashboard                  | KB editor, analytics dashboard              |
| S7     | AI Fine-Tuning                   | Train model on Yug's conversation logs      |
| S8     | Multi-lingual                    | Hindi/Gujarati support                      |

---

## Key Dependencies

| Dependency                  | Version    | Notes                                |
| --------------------------- | ---------- | ------------------------------------ |
| Node.js                     | >= 20 LTS  | Backend runtime                      |
| PostgreSQL                  | >= 16      | Database                             |
| OpenRouter API Key          | —          | Required for AI chat endpoint        |
| Vercel CLI                  | Latest     | Frontend deployment                  |
| GitHub Actions              | —          | CI/CD pipeline                       |

---

*End of Development Roadmap*
