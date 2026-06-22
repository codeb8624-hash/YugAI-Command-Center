export interface CaseStudy {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  techStack: string[];
  status: string;
  year: number;
  category: string;
  heroImage: string;
  problem: string;
  solution: string;
  architecture: string;
  architectureDiagram: string;
  features: { title: string; desc: string }[];
  challenges: { challenge: string; solution: string; lesson: string }[];
  results: string[];
  futureScope: string[];
  githubUrl: string;
  liveUrl: string | null;
  color: string;
}

export const projects: CaseStudy[] = [
  {
    id: "chitraai",
    slug: "chitraai",
    name: "ChitraAI",
    tagline: "AI Image Generator for Android",
    description:
      "A native Android application that leverages OpenRouter API to generate high-quality images from text prompts. Supports multiple AI models including Stable Diffusion, DALL-E, and GPT-4o for prompt optimization.",
    techStack: ["Java", "Android Studio", "OpenRouter API", "XML", "Material Design"],
    status: "Completed",
    year: 2026,
    category: "Mobile App",
    heroImage: "",
    problem:
      "Android users lacked access to high-quality AI image generation in a native mobile experience. Existing solutions were either web-only, required manual API key configuration, or offered a single model with limited capabilities. There was no unified Android app that abstracted away the complexity of multiple AI providers behind a simple, beautiful interface.",
    solution:
      "ChitraAI bridges this gap by providing a native Android application that connects to OpenRouter's multi-model gateway. Users type a prompt, optionally select a model, and receive generated images directly in the app. The service layer abstracts API complexity, handles authentication, manages rate limits, and parses responses from different models into a consistent format.",
    architecture:
      "The app follows the MVC pattern. The View layer uses XML layouts with Material Design components. The Controller layer (Java Activities/Fragments) handles user interactions and navigation. The Model layer contains the API service, image cache, and data repositories. OpenRouter acts as a gateway routing prompts to the optimal AI model based on user selection.",
    architectureDiagram: `
┌─────────────────────────────────────────────────────┐
│                   ChitraAI Architecture              │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌──────────┐    ┌──────────┐    ┌──────────────┐   │
│  │ Android  │───▶│  Java    │───▶│  OpenRouter  │   │
│  │ UI (XML) │    │ Service  │    │  API Gateway │   │
│  └──────────┘    └──────────┘    └──────┬───────┘   │
│                                          │           │
│                             ┌────────────┴──────┐   │
│                             │                   │   │
│                             ▼                   ▼   │
│                    ┌──────────────┐   ┌──────────┐  │
│                    │   GPT-4o     │   │  Stable  │  │
│                    │(Prompt Opt)  │   │Diffusion │  │
│                    └──────────────┘   └──────────┘  │
│                             │                   │   │
│                             └───────┬───────────┘   │
│                                     ▼               │
│                            ┌──────────────────┐    │
│                            │ Response Parser   │    │
│                            │ + Image Renderer  │    │
│                            └──────────────────┘    │
│                                                       │
│  Key: Service layer abstraction enables swapping      │
│  models without UI changes.                           │
└─────────────────────────────────────────────────────┘`,
    features: [
      {
        title: "Multi-Model AI Support",
        desc: "Connect to GPT-4o, Claude, Stable Diffusion, and more through a single OpenRouter integration. Users can compare outputs across models.",
      },
      {
        title: "Prompt History",
        desc: "All previously generated prompts and images are stored locally. Users can revisit, re-prompt, or share past generations.",
      },
      {
        title: "Image Gallery",
        desc: "A grid view of all generated images with full-screen preview, download, and share functionality built in.",
      },
      {
        title: "Material Design UI",
        desc: "Clean, modern Android interface following Material Design 3 guidelines with dark mode support.",
      },
    ],
    challenges: [
      {
        challenge: "Android network threading for long-running API calls",
        solution:
          "Implemented AsyncTask with progress callbacks. Used a dedicated executor service to manage concurrent requests without blocking the UI thread.",
        lesson:
          "Learned Android's threading model deeply and how to manage background tasks without leaking context.",
      },
      {
        challenge: "Binary image data handling across different models",
        solution:
          "Built a unified response parser that normalizes outputs from different AI models (base64, URL, binary) into a consistent Bitmap format.",
        lesson:
          "Understanding that different API providers return data in varying formats taught me to always build defensive parsing layers.",
      },
      {
        challenge: "Prompt engineering for consistent image quality",
        solution:
          "Developed a prompt enhancement layer that automatically adds style, lighting, and quality keywords to user prompts before sending to the API.",
        lesson:
          "Prompt engineering is as important as code quality. Small tweaks in prompt structure dramatically affect output quality.",
      },
    ],
    results: [
      "Successfully generates high-quality images across 3+ AI models",
      "Clean, intuitive interface with under 50ms UI response time",
      "100% crash-free session rate in testing",
      "Demonstrated integration of cutting-edge AI in a mobile form factor",
    ],
    futureScope: [
      "Add in-app prompt templates and style presets",
      "Batch generation mode for multiple images at once",
      "AI-powered prompt suggestions based on image analysis",
      "Cloud sync for prompt history across devices",
    ],
    githubUrl: "https://github.com/yugsathavara/chitra-ai",
    liveUrl: null,
    color: "#6c5ce7",
  },
  {
    id: "hariom-erp",
    slug: "hariom-erp",
    name: "Hariom Machinery ERP",
    tagline: "Inventory & Billing Management System",
    description:
      "A full-stack ERP solution deployed for Hariom Machinery. Manages inventory tracking, GST-compliant invoicing, customer and supplier relationships, and generates business intelligence reports.",
    techStack: ["React", "Node.js", "MySQL", "Express", "REST API", "JWT"],
    status: "Deployed in Production",
    year: 2025,
    category: "Full-Stack Web App",
    heroImage: "",
    problem:
      "Hariom Machinery relied on paper-based inventory tracking and manual invoice generation. This led to frequent stock discrepancies, slow customer service, invoice errors, and no visibility into business performance. The owner needed a digital system that could be adopted quickly without extensive training.",
    solution:
      "Built a comprehensive ERP with a React dashboard for the frontend and a Node.js + Express REST API backend connected to MySQL. The system provides real-time inventory levels, automated GST-compliant invoice generation, customer/supplier management, and role-based access for admin and staff.",
    architecture:
      "React SPA communicates with the Express REST API over HTTP. The API layer handles authentication (JWT), business logic, and database operations via parameterized MySQL queries. The frontend uses React Router for client-side navigation and context API for global state management.",
    architectureDiagram: `
┌─────────────────────────────────────────────────────────┐
│               Hariom Machinery ERP Architecture          │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────────┐      ┌──────────────────────┐     │
│  │   React SPA      │──────▶   Express REST API   │     │
│  │  - Dashboard     │      │  - Auth (JWT)        │     │
│  │  - Inventory UI  │      │  - Inventory CRUD    │     │
│  │  - Invoice Gen   │      │  - Invoice Engine    │     │
│  │  - Reports       │      │  - Customer/Supplier │     │
│  └──────────────────┘      └──────────┬───────────┘     │
│                                        │                │
│                                        ▼                │
│                              ┌──────────────────┐      │
│                              │     MySQL DB     │      │
│                              │ - Products       │      │
│                              │ - Customers      │      │
│                              │ - Invoices       │      │
│                              │ - Transactions   │      │
│                              └──────────────────┘      │
│                                                           │
│  Security: Role-based access (Admin / Staff)             │
│  State: React Context API for global state               │
└─────────────────────────────────────────────────────────┘`,
    features: [
      {
        title: "Real-Time Inventory Tracking",
        desc: "Live stock levels with automatic low-stock alerts. Every sale or purchase instantly updates inventory counts across the system.",
      },
      {
        title: "GST-Compliant Invoicing",
        desc: "Automated invoice generation with proper GST calculation, HSN codes, and company branding. Invoices can be printed or emailed directly.",
      },
      {
        title: "Customer & Supplier Management",
        desc: "Dedicated modules for managing customers and suppliers with contact details, purchase history, and outstanding balances.",
      },
      {
        title: "Sales & Purchase Reports",
        desc: "Interactive dashboards showing daily, weekly, and monthly sales trends, top products, and revenue analytics.",
      },
    ],
    challenges: [
      {
        challenge: "Real-time stock synchronization across concurrent sessions",
        solution:
          "Implemented database-level locking for critical inventory operations and used optimistic concurrency control with version fields.",
        lesson:
          "Learned that race conditions in inventory systems can cause serious business problems. Transaction isolation is non-negotiable.",
      },
      {
        challenge: "GST invoice format compliance with changing regulations",
        solution:
          "Built a configurable invoice template engine that separates layout from data. Tax rates and HSN codes are stored in database tables for easy updates.",
        lesson:
          "Business software must be designed for regulatory changes from day one. Hard-coding tax logic is a maintenance nightmare.",
      },
      {
        challenge: "User adoption — transitioning staff from paper to digital",
        solution:
          "Designed the UI to mirror their existing paper forms. Provided keyboard shortcuts and batch operations to speed up common tasks.",
        lesson:
          "UX design for non-technical users requires empathy. The best system fails if people won't use it.",
      },
    ],
    results: [
      "Invoice generation time reduced from 15 minutes to under 2 minutes",
      "Inventory discrepancies reduced to near zero",
      "Deployed in production and used daily by Hariom Machinery staff",
      "Positive feedback from owner on business visibility and control",
    ],
    futureScope: [
      "Mobile app for on-the-go inventory checks",
      "Barcode/QR code scanning for faster check-in/checkout",
      "Payment gateway integration for online invoicing",
      "Automated email/SMS notifications for low stock and due payments",
    ],
    githubUrl: "https://github.com/yugsathavara/hariom-erp",
    liveUrl: null,
    color: "#00d4ff",
  },
  {
    id: "school-management",
    slug: "school-management",
    name: "School Management System",
    tagline: "Multi-Role School Administration Platform",
    description:
      "A PHP-based school management platform with a multi-role architecture supporting administrators, teachers, students, and parents. Each role has a tailored dashboard with relevant functionality.",
    techStack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap", "MVC"],
    status: "Completed",
    year: 2025,
    category: "Web Application",
    heroImage: "",
    problem:
      "Schools needed a centralized digital platform to manage attendance, grades, timetables, and parent communication. Existing solutions were either too expensive, overly complex, or didn't support role-specific views for different stakeholders (admin, teachers, students, parents).",
    solution:
      "Built a PHP web application following the MVC pattern with MySQL for persistence. The system features four distinct dashboards, each tailored to the needs of its user role. Session-based authentication ensures secure access, and role-based feature flags control what each user can see and do.",
    architecture:
      "PHP MVC architecture with a front controller pattern. The Model layer handles database interactions via PDO. The View layer uses PHP templates with Bootstrap for responsive design. The Controller layer processes requests, enforces authentication, and routes to appropriate views based on user role.",
    architectureDiagram: `
┌──────────────────────────────────────────────────────────┐
│           School Management System Architecture           │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────────────────────────────────────────┐    │
│  │              PHP Front Controller                 │    │
│  │            (index.php — all requests)             │    │
│  └────────────────────┬─────────────────────────────┘    │
│                       │                                   │
│                       ▼                                   │
│  ┌──────────────────────────────────────────────────┐    │
│  │              Router + Auth Middleware             │    │
│  └──────┬──────────┬──────────┬──────────┬──────────┘    │
│         │          │          │          │               │
│         ▼          ▼          ▼          ▼               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │  Admin   │ │ Teacher  │ │ Student  │ │  Parent  │   │
│  │Dashboard │ │Dashboard │ │Dashboard │ │Dashboard │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│         │          │          │          │               │
│         └──────────┴──────────┴──────────┘               │
│                        │                                  │
│                        ▼                                  │
│              ┌──────────────────┐                        │
│              │  MySQL Database  │                        │
│              │ - Users (roles)  │                        │
│              │ - Attendance     │                        │
│              │ - Grades         │                        │
│              │ - Timetables     │                        │
│              └──────────────────┘                        │
│                                                            │
│  Auth: Session-based with role verification on every req  │
└──────────────────────────────────────────────────────────┘`,
    features: [
      {
        title: "Role-Based Dashboards",
        desc: "Four distinct views — Admin gets full control, Teachers manage classes, Students view grades, Parents monitor progress.",
      },
      {
        title: "Attendance Tracking",
        desc: "Teachers can mark daily attendance with a simple interface. Admins and parents can view attendance reports.",
      },
      {
        title: "Grade Management",
        desc: "Teachers enter grades for assignments and exams. Students and parents see real-time academic performance.",
      },
      {
        title: "Timetable Scheduling",
        desc: "Visual timetable builder for admins. Each role sees their relevant schedule. Supports periodic updates.",
      },
    ],
    challenges: [
      {
        challenge: "Complex role-based access control with granular permissions",
        solution:
          "Implemented a permission matrix stored in the database. Each controller method checks permissions before executing, preventing unauthorized access even if a user guesses a URL.",
        lesson:
          "Never trust the frontend. Every backend endpoint must independently verify authorization. URL guessing is a real attack vector.",
      },
      {
        challenge: "PHP session management across multiple user types",
        solution:
          "Used encrypted session data with role information stored server-side. Implemented session timeout and regeneration after login to prevent fixation attacks.",
        lesson:
          "Session security in PHP requires deliberate attention. Understanding session lifecycle prevents common vulnerabilities.",
      },
      {
        challenge: "Designing a UI that works for all age groups",
        solution:
          "Used Bootstrap for responsive design with larger touch targets. Conducted informal user testing with teachers and students to refine the interface.",
        lesson:
          "User research doesn't need to be formal to be valuable. Watching one real user struggle with your UI teaches more than a hundred assumptions.",
      },
    ],
    results: [
      "Complete working system with 4 role-specific dashboards",
      "Handles attendance, grades, timetables, and communication",
      "Responsive design works on desktop, tablet, and mobile",
      "Demonstrated ability to architect multi-role systems from scratch",
    ],
    futureScope: [
      "SMS/email notification system for attendance and grade updates",
      "Online fee payment integration",
      "Mobile app with push notifications",
      "Integration with Google Classroom API",
    ],
    githubUrl: "https://github.com/yugsathavara/school-mgmt",
    liveUrl: null,
    color: "#ffd700",
  },
];

export const recruiterQuestions = [
  "Why should I hire Yug?",
  "Explain ChitraAI architecture",
  "Show my strongest project",
  "What technologies do I know?",
  "Explain Hariom ERP",
  "Interview me for a Full Stack role",
];

export const chatSuggestions = [
  "Why hire Yug?",
  "Best Project",
  "Show Resume",
  "Skills",
  "Contact",
];

export const systemStatusData = [
  { label: "AI Twin", value: "Online", status: "online" as const },
  { label: "Projects Built", value: "12+", status: "active" as const },
  { label: "Years Learning", value: "3+", status: "active" as const },
  { label: "CGPA", value: "8.14", status: "active" as const },
  { label: "Availability", value: "Open to Work", status: "online" as const },
  { label: "Recruiter Mode", value: "Ready", status: "online" as const },
];

export function getProjectBySlug(slug: string): CaseStudy | undefined {
  return projects.find((p) => p.slug === slug);
}
