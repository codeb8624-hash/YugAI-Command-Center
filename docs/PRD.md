# Product Requirements Document — YugAI Portfolio

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

## 1. Problem Statement

Traditional portfolios are static documents or websites that fail to engage visitors beyond surface-level browsing. Recruiters and collaborators often need to dig through multiple pages to piece together a candidate's skills, experience, and personality. There is no interactive, conversational layer that allows a visitor to ask questions, get tailored answers, or experience the developer's expertise first-hand.

---

## 2. Solution

**YugAI — AI Career Twin Portfolio** is a next-generation, AI-powered interactive portfolio that features an **AI twin** of Yug Sathavara. Visitors can converse with the AI, ask about projects, skills, experience, and even technical advice. The AI responds contextually using a knowledge base of Yug's real-world data (resume, projects, education, skills, achievements), providing an immersive, human-like portfolio exploration.

The site follows a premium, minimal, dark-themed "AI Command Center" aesthetic inspired by OpenAI, Linear, and Vercel.

---

## 3. Objectives

| # | Objective                                              | Priority |
| - | ------------------------------------------------------ | -------- |
| 1 | Build an interactive AI chat twin that answers visitor queries | P0       |
| 2 | Present Yug's portfolio in a modern, futuristic UI     | P0       |
| 3 | Provide real-time project, skill, and resume access via chat | P0       |
| 4 | Capture visitor analytics and chat history              | P1       |
| 5 | Enable contact form submissions via chat or form        | P1       |
| 6 | Deploy with CI/CD pipeline for continuous updates       | P2       |

---

## 4. User Personas

### Persona A: The Recruiter

| Attribute    | Detail                                            |
| ------------ | ------------------------------------------------- |
| **Name**     | Priya Mehta                                       |
| **Role**     | Technical Recruiter at a SaaS startup             |
| **Goals**    | Evaluate Yug's skills, experience, and culture fit quickly |
| **Pain**     | Boring resumes and static portfolios; hard to gauge real expertise |
| **Behavior** | Will ask the AI twin project-specific and role-specific questions |

### Persona B: The Collaborator

| Attribute    | Detail                                            |
| ------------ | ------------------------------------------------- |
| **Name**     | Rohan Desai                                       |
| **Role**     | Freelance Full-Stack Developer                    |
| **Goals**    | Find a skilled partner for an AI-integration project |
| **Pain**     | Needs to verify technical depth before reaching out |
| **Behavior** | Asks technical questions about ChitraAI, ERP architecture |

### Persona C: The Curious Visitor

| Attribute    | Detail                                            |
| ------------ | ------------------------------------------------- |
| **Name**     | Ananya Sharma                                     |
| **Role**     | Final-year IT student                             |
| **Goals**    | Seek inspiration, understand how to build AI-integrated projects |
| **Pain**     | Limited exposure to real-world project architectures |
| **Behavior** | Explores projects, asks about tech stack decisions |

---

## 5. Features

### Core Features (P0)

| Feature                        | Description                                           |
| ------------------------------ | ----------------------------------------------------- |
| AI Chat Twin                   | Real-time conversational AI with Yug's knowledge base |
| Project Showcase               | Dynamic display of all projects with tech tags        |
| Skills Visualization           | Interactive skill radar / grid                        |
| Resume Viewer                  | Formatted resume with download option                 |
| Knowledge Base                 | Structured JSON data feeding the AI                   |

### Engagement Features (P1)

| Feature                        | Description                                           |
| ------------------------------ | ----------------------------------------------------- |
| Contact Form                   | Send message directly to Yug via API                  |
| Chat History                   | Persistent session context for better conversations   |
| Analytics Dashboard            | Visitor count, chat topics, popular projects          |

### Polish Features (P2)

| Feature                        | Description                                           |
| ------------------------------ | ----------------------------------------------------- |
| Dark/Light Theme Toggle        | User preference theming                               |
| Typing Animations              | Simulated AI thinking and typing effect               |
| Responsive Design              | Fully mobile-optimized                                |
| Voice Input (Future)           | Speak to the AI twin                                  |

---

## 6. Scope

### In Scope (Day 1 — Current)

- Project folder structure and architecture
- Product and Technical Requirements Documents
- Knowledge base JSON files (resume, skills, projects, education, achievements)
- Database schema (contacts, chat history, projects, analytics)
- API endpoint documentation
- User journey and SDLC documentation
- README and setup instructions
- CI/CD pipeline configuration

### Out of Scope (Future Phases)

- Frontend UI component development
- Backend API implementation
- AI model fine-tuning (will use OpenRouter API)
- Voice input / multimodal features
- Admin dashboard
- Multi-language support

---

## 7. Future Scope

| Feature                      | Description                                              |
| ---------------------------- | -------------------------------------------------------- |
| AI Fine-Tuning               | Fine-tune a small LLM on Yug's conversation data         |
| Voice Interface              | Speech-to-text input for the AI twin                     |
| Admin Panel                  | Edit knowledge base, view analytics in real-time         |
| Multi-lingual Support        | Respond in Hindi, Gujarati, etc.                         |
| LinkedIn / GitHub Sync       | Auto-update knowledge base from social profiles          |
| AI Call Scheduling           | Let recruiters book a call via the AI twin               |

---

## 8. Success Metrics

| Metric                        | Target              | How to Measure                      |
| ----------------------------- | ------------------- | ----------------------------------- |
| Visitor-to-Chat Conversion    | > 60%               | Analytics: page load vs chat start  |
| Average Session Duration      | > 3 minutes         | Session recording                   |
| Chat Completion Rate          | > 80%               | Messages sent vs. intent fulfilled  |
| Contact Form Submissions      | > 10 / month        | Database count                      |
| Resume Downloads              | > 20 / month        | Download analytics                  |
| Uptime                        | > 99.5%             | Monitoring tool                     |
| Page Load Time                | < 2 seconds         | Lighthouse / Web Vitals             |

---

## 9. Assumptions & Constraints

- AI responses are powered by OpenRouter API (GPT-4 / Claude) — no local LLM hosting
- Knowledge base is statically defined in JSON and may require manual updates
- No authentication system for visitors (public portfolio)
- Hosting budget is limited — prefer static-site-friendly deployment (Vercel frontend, Render / Railway backend)

---

*End of PRD*
