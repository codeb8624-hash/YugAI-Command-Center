# User Journey Diagrams — YugAI Portfolio

---

## 1. Visitor Flow (General Browsing)

```
                    ┌──────────────────────┐
                    │  Arrives at YugAI     │
                    │  Portfolio            │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Landing Page         │
                    │  - Hero Section       │
                    │  - Terminal Prompt    │
                    │  - "Ask YugAI" CTA    │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
                    ▼                      ▼
          ┌──────────────────┐  ┌──────────────────┐
          │  Scrolls to      │  │  Clicks "Ask     │
          │  Projects/Skills │  │  YugAI"          │
          └────────┬─────────┘  └────────┬─────────┘
                   │                     │
                   ▼                     ▼
          ┌──────────────────┐  ┌──────────────────┐
          │  Views Projects  │  │  Chat Interface  │
          │  - Project Cards  │  │  Opens           │
          │  - Tech Tags     │  │  - Welcome Msg   │
          │  - Links         │  │  - Suggested Qs  │
          └────────┬─────────┘  └────────┬─────────┘
                   │                     │
                   │                     ▼
                   │              ┌──────────────────┐
                   │              │  User Types      │
                   │              │  Question         │
                   │              │  - AI Processes  │
                   │              │  - KB Lookup     │
                   │              │  - Response      │
                   │              └────────┬─────────┘
                   │                       │
                   │              ┌────────┴─────────┐
                   │              │  Continue Chat?   │
                   │              ┌─────┬──────┬─────┐
                   │              │     │      │     │
                   │              ▼     ▼      ▼     │
                   │             Yes   New    No     │
                   │              Q                   │
                   │              │                  │
                   │              ▼                  ▼
                   │        ┌──────────┐     ┌────────────┐
                   │        │ Continue │     │ Scroll to  │
                   │        │ Chat     │     │ Explore    │
                   │        └──────────┘     │ More       │
                   │                         └─────┬──────┘
                   ▼                               │
          ┌──────────────────┐                      │
          │  Explores More   │◀─────────────────────┘
          │  - Skills Radar  │
          │  - Resume View   │
          │  - Contact Form  │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │  Leaves Site     │
          │  or Submits      │
          │  Contact Form    │
          └──────────────────┘
```

---

## 2. Recruiter Flow (High-Intent Visitor)

```
                    ┌──────────────────────┐
                    │  Recruiter arrives    │
                    │  (from LinkedIn/Git)  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Landing Page         │
                    │  Hears "AI Career     │
                    │  Twin" — intrigued    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Opens Chat           │
                    │  "Tell me about       │
                    │   yourself"           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  AI Response:         │
                    │  - Summary           │
                    │  - Skills overview   │
                    │  - Project highlight │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
                    ▼                      ▼
          ┌──────────────────┐  ┌──────────────────┐
          │  Asks technical  │  │  "What projects  │
          │  questions:      │  │   have you done?" │
          │  - Stack used?   │  └────────┬─────────┘
          │  - Architecture? │           │
          │  - Role?         │           ▼
          └────────┬─────────┘  ┌──────────────────┐
                   │            │  AI shows top 3  │
                   │            │  projects with   │
                   │            │  tech stack      │
                   ▼            └────────┬─────────┘
          ┌──────────────────┐           │
          │  AI responds     │◀──────────┘
          │  with depth on   │
          │  each topic      │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────────┐
          │  Recruiter satisfied │
          │  → Downloads Resume  │
          │  → Views GitHub      │
          │  → Clicks Contact    │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │  Submits Contact     │
          │  Form / Sends Email  │
          │  → Interview request │
          └──────────────────────┘
```

---

## 3. AI Chat Flow (Detailed State Machine)

```
                            ┌─────────────────────┐
                            │  User sends message  │
                            └──────────┬──────────┘
                                       │
                                       ▼
                            ┌─────────────────────┐
                            │  Input Validation    │
                            │  - Empty check       │
                            │  - Length check      │
                            │  - Sanitize          │
                            └──────────┬──────────┘
                                       │
                                       ▼
                            ┌─────────────────────┐
                            │  Context Builder     │
                            │  - Get last 5 msgs   │
                            │    from session      │
                            │  - Load KB entries   │
                            │  - Build system      │
                            │    prompt            │
                            └──────────┬──────────┘
                                       │
                                       ▼
                            ┌─────────────────────┐
                            │  Intent Classifier   │
                            │  ┌─────────────────┐│
                            │  │ Project Q? →    ││
                            │  │ Inject projects ││
                            │  │ Skill Q? →      ││
                            │  │ Inject skills   ││
                            │  │ General →       ││
                            │  │ Full KB context ││
                            │  └─────────────────┘│
                            └──────────┬──────────┘
                                       │
                                       ▼
                            ┌─────────────────────┐
                            │  Call OpenRouter     │
                            │  Model: gpt-4o      │
                            │  Temp: 0.7          │
                            │  Max tokens: 1024   │
                            └──────────┬──────────┘
                                       │
                            ┌──────────┴──────────┐
                            │                     │
                            ▼                     ▼
                   ┌──────────────────┐  ┌──────────────────┐
                   │  Success          │  │  Error / Timeout │
                   │  - Parse response │  │  - Retry (3x)   │
                   │  - Format output  │  │  - Fallback msg │
                   │  - Log to DB      │  │  - Log error    │
                   └────────┬─────────┘  └────────┬─────────┘
                            │                      │
                            ▼                      ▼
                   ┌──────────────────┐  ┌──────────────────┐
                   │  Return response │  │  Return fallback │
                   │  via SSE stream  │  │  message         │
                   │  (typing effect) │  └──────────────────┘
                   └────────┬─────────┘
                            │
                            ▼
                   ┌──────────────────┐
                   │  Update Chat UI  │
                   │  - Append msg    │
                   │  - Show suggested│
                   │    follow-ups    │
                   └──────────────────┘
```

---

## 4. Contact Flow

```
                    ┌──────────────────────┐
                    │  User clicks         │
                    │  "Contact" /         │
                    │  "Hire Me"           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Contact Form Opens   │
                    │  - Name              │
                    │  - Email             │
                    │  - Subject           │
                    │  - Message           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Validate Input       │
                    │  - Required fields    │
                    │  - Email format       │
                    │  - Captcha (optional) │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
                    ▼                      ▼
          ┌──────────────────┐  ┌──────────────────┐
          │  Valid            │  │  Invalid          │
          └────────┬─────────┘  │  → Show error     │
                   │            │  → User fixes     │
                   ▼            └──────────────────┘
          ┌──────────────────┐
          │  POST /contact   │
          │  → Save to DB    │
          │  → Send email    │
          │    notification  │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │  Success Toast   │
          │  "Thanks! I'll   │
          │   get back soon" │
          └──────────────────┘
```

---

## 5. Session & Analytics Flow

```
                    ┌──────────────────────┐
                    │  Visitor lands        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Create Session       │
                    │  - sessionId (UUID)  │
                    │  - timestamp         │
                    │  - referrer          │
                    │  - userAgent         │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
                    ▼                      ▼
          ┌──────────────────┐  ┌──────────────────┐
          │  Page Views      │  │  Chat Events     │
          │  - Track route   │  │  - Msg sent      │
          │  - Time on page  │  │  - Msg received  │
          │  - Scroll depth  │  │  - Session len   │
          └────────┬─────────┘  └────────┬─────────┘
                   │                      │
                   ▼                      ▼
          ┌──────────────────────────────────────┐
          │        Aggregate Analytics            │
          │  - Total visitors (unique)            │
          │  - Chat sessions started              │
          │  - Popular projects viewed            │
          │  - Top questions asked               │
          │  - Resume downloads                   │
          │  - Contact submissions                │
          └──────────────────────────────────────┘
```

---

*End of User Journey Diagrams*
