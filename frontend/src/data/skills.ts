export interface Skill {
  name: string;
  level: number;
  experience: string;
  keywords: string[];
}

export interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    color: "#6c5ce7",
    skills: [
      { name: "HTML", level: 95, experience: "3 years", keywords: ["semantic HTML", "accessibility", "forms"] },
      { name: "CSS", level: 90, experience: "3 years", keywords: ["flexbox", "grid", "animations", "responsive"] },
      { name: "JavaScript", level: 85, experience: "3 years", keywords: ["ES6+", "async/await", "DOM"] },
      { name: "React", level: 78, experience: "1.5 years", keywords: ["hooks", "state management", "SPA"] },
      { name: "Tailwind CSS", level: 82, experience: "1 year", keywords: ["utility-first", "responsive", "dark mode"] },
      { name: "TypeScript", level: 72, experience: "1 year", keywords: ["types", "interfaces", "generics"] },
    ],
  },
  {
    name: "Backend",
    icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
    color: "#00d4ff",
    skills: [
      { name: "Node.js", level: 72, experience: "1.5 years", keywords: ["Express", "REST APIs", "middleware"] },
      { name: "Express", level: 70, experience: "1.5 years", keywords: ["routing", "middleware", "error handling"] },
      { name: "PHP", level: 75, experience: "2 years", keywords: ["MVC", "sessions", "PDO", "CRUD"] },
      { name: "REST API", level: 78, experience: "2 years", keywords: ["endpoints", "auth", "JSON"] },
    ],
  },
  {
    name: "Database",
    icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
    color: "#ffd700",
    skills: [
      { name: "MySQL", level: 80, experience: "2 years", keywords: ["queries", "joins", "normalization", "indexing"] },
      { name: "Database Design", level: 75, experience: "2 years", keywords: ["ERD", "normalization", "relationships"] },
      { name: "SQL", level: 78, experience: "2 years", keywords: ["complex queries", "aggregation", "subqueries"] },
    ],
  },
  {
    name: "Mobile",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    color: "#00ff88",
    skills: [
      { name: "Java", level: 70, experience: "2 years", keywords: ["OOP", "collections", "multithreading"] },
      { name: "Android Studio", level: 65, experience: "1 year", keywords: ["XML layouts", "intents", "API integration"] },
      { name: "Material Design", level: 68, experience: "1 year", keywords: ["MD3", "theming", "components"] },
    ],
  },
  {
    name: "AI & Tools",
    icon: "M9.75 3L5.25 21m13.5-18L14.25 21M3 9h18M3 15h18",
    color: "#ff4466",
    skills: [
      { name: "AI Integration", level: 78, experience: "1 year", keywords: ["OpenRouter", "API chaining", "prompt design"] },
      { name: "Prompt Engineering", level: 82, experience: "1 year", keywords: ["system prompts", "few-shot", "context injection"] },
      { name: "Git", level: 75, experience: "2 years", keywords: ["version control", "branching", "PRs"] },
      { name: "Postman", level: 70, experience: "1.5 years", keywords: ["API testing", "collections", "environments"] },
    ],
  },
];

export const resumeData = {
  personalInfo: {
    name: "Yug Sathavara",
    title: "Full-Stack Developer & AI Enthusiast",
    email: "yug.sathavara@example.com",
    phone: "+91 98765 43210",
    location: "Anand, Gujarat, India",
    linkedin: "https://linkedin.com/in/yugsathavara",
    github: "https://github.com/yugsathavara",
    summary:
      "Diploma in Information Technology student at GCET with hands-on experience in full-stack development, Android app development, and AI integration. Passionate about building intelligent applications that solve real-world problems. Creator of ChitraAI, an AI image generator Android app, and contributor to ERP and school management systems.",
  },
  experience: [
    {
      title: "ChitraAI — AI Image Generator",
      organization: "Personal Project",
      period: "2026",
      highlights: [
        "Built an Android app for AI-powered image generation",
        "Integrated OpenRouter API for multi-model AI access",
        "Designed intuitive UI for prompt-based image creation",
      ],
    },
    {
      title: "Hariom Machinery ERP",
      organization: "Hariom Machinery",
      period: "2025–2026",
      highlights: [
        "Developed full-stack ERP for inventory and billing management",
        "Built React frontend with Node.js + MySQL backend",
        "Implemented real-time stock tracking and invoice generation",
      ],
    },
    {
      title: "School Management System",
      organization: "Academic Project",
      period: "2025",
      highlights: [
        "Created multi-role PHP + MySQL system for schools",
        "Role-based dashboards for admin, teachers, students, parents",
        "Managed attendance, grades, and timetable modules",
      ],
    },
  ],
  education: [
    {
      degree: "Diploma in Information Technology",
      institution: "G H Patel College of Engineering & Technology (GCET)",
      location: "Vallabh Vidyanagar, Gujarat",
      period: "2023–2026",
      status: "Pursuing",
    },
  ],
  skills: [
    "HTML", "CSS", "JavaScript", "React", "Node.js",
    "PHP", "MySQL", "Java", "Android Studio",
    "AI Integration", "Prompt Engineering",
    "REST APIs", "Git", "TypeScript", "Tailwind CSS",
  ],
  achievements: [
    "First OpenRouter Android Integration",
    "Production ERP Deployment",
    "Complex Multi-Role Architecture",
    "AI Prompt Engineering Specialization",
  ],
};

export const recruiterSummary = {
  totalProjects: 12,
  technologiesUsed: 15,
  majorProjects: 3,
  aiProjects: 5,
  yearsLearning: 3,
  linesOfCode: "50K+",
  productionDeploys: 1,
  availability: "Open to Work",
  verdictScore: 92,
  verdictLabel: "Strong Hire",
  verdictText:
    "Versatile full-stack developer with AI specialization. Proven ability to ship production software across mobile, web, and backend. Strong problem-solving skills demonstrated through real-world deployments.",
};
