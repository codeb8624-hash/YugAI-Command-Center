# API Documentation — YugAI Portfolio

---

**Base URL (Dev):** `http://localhost:4000/api`
**Base URL (Prod):** `https://yugai-api.onrender.com/api`

**Content-Type:** `application/json`

---

## Endpoints Overview

| Method | Endpoint            | Auth | Rate Limit | Description              |
| ------ | ------------------- | ---- | ---------- | ------------------------ |
| POST   | `/chat`             | No   | 10/min     | Send message to AI twin  |
| GET    | `/projects`         | No   | 30/min     | Retrieve all projects    |
| GET    | `/projects/:id`     | No   | 30/min     | Retrieve single project  |
| GET    | `/skills`           | No   | 30/min     | Retrieve skills data     |
| GET    | `/resume`           | No   | 20/min     | Retrieve resume data     |
| POST   | `/contact`          | No   | 5/min      | Submit contact form      |
| GET    | `/health`           | No   | —          | Health check             |

---

## Standard Response Envelope

```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

### Error Response

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Please slow down."
  }
}
```

---

## POST /chat

Send a message to the YugAI career twin and receive an AI-generated response.

### Request

```json
{
  "sessionId": "abc123-def456",
  "message": "What projects have you worked on?"
}
```

| Field       | Type   | Required | Description                                    |
| ----------- | ------ | -------- | ---------------------------------------------- |
| sessionId   | string | Yes      | Unique session identifier (generated client-side) |
| message     | string | Yes      | User's message to the AI twin (1–1000 chars)   |

### Response (Success — 200 OK)

```json
{
  "success": true,
  "data": {
    "sessionId": "abc123-def456",
    "reply": "I've worked on three major projects. My most recent is ChitraAI, an AI image generator Android app...",
    "suggestions": [
      "Tell me more about ChitraAI",
      "What tech stack did you use?",
      "Can I see your skills?"
    ],
    "metadata": {
      "model": "gpt-4o",
      "tokensUsed": 342,
      "responseTimeMs": 1482
    }
  },
  "error": null
}
```

### Response (Error — 429 Too Many Requests)

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Please wait before sending another message."
  }
}
```

### Response (Error — 400 Bad Request)

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Message must be between 1 and 1000 characters."
  }
}
```

---

## GET /projects

Retrieve all projects from the knowledge base.

### Request

```
GET /projects
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "chitra-ai",
        "name": "ChitraAI",
        "tagline": "AI Image Generator for Android",
        "description": "ChitraAI is an Android application that leverages the power of AI...",
        "techStack": ["Java", "Android Studio", "OpenRouter API", "XML"],
        "category": "Mobile App",
        "year": 2026,
        "status": "Completed",
        "highlights": [
          "Multi-model AI image generation via OpenRouter",
          "Clean Material Design UI"
        ],
        "links": {
          "github": "https://github.com/yugsathavara/chitra-ai",
          "demo": null
        }
      },
      {
        "id": "hariom-erp",
        "name": "Hariom Machinery ERP",
        "tagline": "Inventory & Billing Management System",
        "description": "A comprehensive ERP solution designed for Hariom Machinery...",
        "techStack": ["React", "Node.js", "MySQL", "Express", "REST API"],
        "category": "Full-Stack Web App",
        "year": 2025,
        "status": "Deployed",
        "highlights": [
          "Real-time inventory tracking with low-stock alerts",
          "Automated GST-compliant invoice generation"
        ],
        "links": {
          "github": "https://github.com/yugsathavara/hariom-erp",
          "demo": null
        }
      }
    ],
    "total": 3
  },
  "error": null
}
```

---

## GET /projects/:id

Retrieve a single project by its ID.

### Request

```
GET /projects/chitra-ai
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "chitra-ai",
    "name": "ChitraAI",
    "tagline": "AI Image Generator for Android",
    "description": "ChitraAI is an Android application that leverages the power of AI...",
    "techStack": ["Java", "Android Studio", "OpenRouter API", "XML"],
    "category": "Mobile App",
    "year": 2026,
    "status": "Completed",
    "highlights": [
      "Multi-model AI image generation via OpenRouter",
      "Clean Material Design UI",
      "Prompt history and local gallery storage",
      "Image sharing and download features"
    ],
    "links": {
      "github": "https://github.com/yugsathavara/chitra-ai",
      "demo": null
    },
    "images": ["chitra-ai-1.png", "chitra-ai-2.png"]
  },
  "error": null
}
```

### Response (404 Not Found)

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "NOT_FOUND",
    "message": "Project with ID 'non-existent' not found."
  }
}
```

---

## GET /skills

Retrieve all skills data including categories and proficiency levels.

### Request

```
GET /skills
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "name": "Frontend Development",
        "icon": "code",
        "skills": [
          { "name": "HTML", "level": 95, "experience": "3 years" },
          { "name": "CSS", "level": 90, "experience": "3 years" },
          { "name": "JavaScript", "level": 85, "experience": "3 years" },
          { "name": "React", "level": 75, "experience": "1.5 years" },
          { "name": "Tailwind CSS", "level": 80, "experience": "1 year" }
        ]
      },
      {
        "name": "Backend Development",
        "icon": "server",
        "skills": [
          { "name": "Node.js", "level": 70, "experience": "1.5 years" },
          { "name": "PHP", "level": 75, "experience": "2 years" }
        ]
      },
      {
        "name": "Databases",
        "icon": "database",
        "skills": [
          { "name": "MySQL", "level": 80, "experience": "2 years" }
        ]
      },
      {
        "name": "Mobile Development",
        "icon": "smartphone",
        "skills": [
          { "name": "Java", "level": 70, "experience": "2 years" },
          { "name": "Android Studio", "level": 65, "experience": "1 year" }
        ]
      },
      {
        "name": "AI & Emerging Tech",
        "icon": "brain",
        "skills": [
          { "name": "AI Integration", "level": 78, "experience": "1 year" },
          { "name": "Prompt Engineering", "level": 82, "experience": "1 year" }
        ]
      }
    ],
    "skillTags": [
      { "tag": "Frontend", "items": ["React", "HTML", "CSS", "JavaScript", "Tailwind CSS"] },
      { "tag": "Backend", "items": ["Node.js", "PHP", "Express"] },
      { "tag": "Database", "items": ["MySQL"] },
      { "tag": "Mobile", "items": ["Java", "Android Studio"] },
      { "tag": "AI", "items": ["AI Integration", "Prompt Engineering", "OpenRouter"] }
    ]
  },
  "error": null
}
```

---

## GET /resume

Retrieve formatted resume data.

### Request

```
GET /resume
```

### Query Parameters (Optional)

| Parameter | Type   | Description                        | Default |
| --------- | ------ | ---------------------------------- | ------- |
| format    | string | Response format (`json` or `pdf`)  | `json`  |

### Response (200 OK — JSON)

```json
{
  "success": true,
  "data": {
    "personalInfo": {
      "name": "Yug Sathavara",
      "title": "Full-Stack Developer & AI Enthusiast",
      "email": "yug.sathavara@example.com",
      "phone": "+91 98765 43210",
      "location": "Anand, Gujarat, India",
      "linkedin": "https://linkedin.com/in/yugsathavara",
      "github": "https://github.com/yugsathavara",
      "summary": "Diploma in Information Technology student at GCET..."
    },
    "experience": [
      {
        "type": "project",
        "title": "ChitraAI — AI Image Generator",
        "organization": "Personal Project",
        "period": "2026",
        "highlights": [
          "Built an Android app for AI-powered image generation",
          "Integrated OpenRouter API for multi-model AI access"
        ]
      }
    ],
    "education": [
      {
        "degree": "Diploma in Information Technology",
        "institution": "G H Patel College of Engineering & Technology (GCET)",
        "period": "2023–2026",
        "status": "Pursuing"
      }
    ],
    "skills": ["HTML", "CSS", "JavaScript", "React", "Node.js", "PHP", "MySQL", "Java", "Android Studio", "AI Integration", "Prompt Engineering"],
    "languages": ["English", "Hindi", "Gujarati"]
  },
  "error": null
}
```

---

## POST /contact

Submit a contact form message.

### Request

```json
{
  "name": "Priya Mehta",
  "email": "priya.mehta@example.com",
  "subject": "Opportunity at TechCorp",
  "message": "Hi Yug, I came across your portfolio and was impressed by your work on ChitraAI. Would you be interested in discussing a full-stack developer role at TechCorp?"
}
```

| Field   | Type   | Required | Description                        |
| ------- | ------ | -------- | ---------------------------------- |
| name    | string | Yes      | Sender's full name (2–100 chars)   |
| email   | string | Yes      | Sender's email (valid format)      |
| subject | string | Yes      | Message subject (3–200 chars)      |
| message | string | Yes      | Message body (10–5000 chars)       |

### Response (201 Created)

```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "message": "Thank you for reaching out! I'll get back to you within 24 hours."
  },
  "error": null
}
```

### Response (422 Unprocessable Entity)

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format.",
    "fields": {
      "email": "Please provide a valid email address."
    }
  }
}
```

---

## GET /health

Health check endpoint to verify server status.

### Request

```
GET /health
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "uptime": 3600,
    "timestamp": "2026-06-19T12:00:00Z",
    "version": "1.0.0",
    "database": "connected"
  },
  "error": null
}
```

---

## Rate Limiting

| Endpoint       | Window | Max Requests | Response Header                     |
| -------------- | ------ | ------------ | ----------------------------------- |
| `/chat`        | 1 min  | 10           | `Retry-After: seconds`              |
| `/projects`    | 1 min  | 30           | `X-RateLimit-Remaining: N`          |
| `/skills`      | 1 min  | 30           | `X-RateLimit-Remaining: N`          |
| `/resume`      | 1 min  | 20           | `X-RateLimit-Remaining: N`          |
| `/contact`     | 1 min  | 5            | `Retry-After: seconds`              |

Rate limit headers included in all responses:

```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 8
X-RateLimit-Reset: 1624100000
```

---

## Error Codes

| Code               | HTTP Status | Description                          |
| ------------------ | ----------- | ------------------------------------ |
| `RATE_LIMITED`     | 429         | Too many requests                    |
| `VALIDATION_ERROR` | 400/422     | Invalid input data                   |
| `NOT_FOUND`        | 404         | Resource not found                   |
| `AI_ERROR`         | 502         | AI service unavailable               |
| `INTERNAL_ERROR`   | 500         | Unexpected server error              |
| `SERVICE_UNAVAILABLE` | 503      | Temporary maintenance or overload    |

---

*End of API Documentation*
