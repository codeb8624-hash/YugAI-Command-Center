import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { resumeData, recruiterSummary, skillCategories } from "../data/skills";
import { useAnimatedCounter } from "../hooks/useAnimatedCounter";
import SEO from "../components/seo/SEO";

function StatCard({ value, suffix = "", label, delay }: { value: number; suffix?: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const count = useAnimatedCounter(value, 1200, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="bg-deep-void/50 border border-border rounded-lg p-3 text-center"
    >
      <div className="text-xl sm:text-2xl font-bold font-mono text-gradient">{count}{suffix}</div>
      <div className="text-[10px] text-text-muted uppercase tracking-wider mt-0.5">{label}</div>
    </motion.div>
  );
}

function SkillBarMini({ name, level, index }: { name: string; level: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="mb-2.5">
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-xs text-text-secondary">{name}</span>
        <span className="text-[10px] font-mono text-text-muted">{level}%</span>
      </div>
      <div className="w-full h-1.5 bg-deep-void rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.04, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
        />
      </div>
    </div>
  );
}

function ProjectMini({ project, index }: { project: { id: string; name: string; tagline: string; tech: string[]; slug: string }; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-deep-void/50 border border-border rounded-lg p-4"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-sm font-medium text-text-primary">{project.name}</div>
          <div className="text-xs text-text-muted mt-0.5">{project.tagline}</div>
        </div>
        <Link
          to={project.slug}
          className="text-[10px] font-medium text-primary hover:text-primary-light transition-colors shrink-0"
        >
          Case Study →
        </Link>
      </div>
      <div className="flex flex-wrap gap-1">
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} className="px-1.5 py-0.5 text-[9px] font-mono text-text-muted bg-surface border border-border rounded">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

const miniProjects = [
  { id: "chitraai", name: "ChitraAI", tagline: "AI Image Generator for Android", tech: ["Java", "Android", "OpenRouter"], slug: "/projects/chitraai" },
  { id: "hariom-erp", name: "Hariom Machinery ERP", tagline: "Inventory & Billing System", tech: ["React", "Node.js", "MySQL"], slug: "/projects/hariom-erp" },
  { id: "school-management", name: "School Management System", tagline: "Multi-Role Platform", tech: ["PHP", "MySQL", "Bootstrap"], slug: "/projects/school-management" },
];

export default function RecruiterPage() {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatTyping, setChatTyping] = useState(false);

  const handleInterviewAsk = () => {
    if (!chatInput.trim()) return;
    const question = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: "user", content: question }]);
    setChatInput("");
    setChatTyping(true);
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `I'd be happy to answer that. As Yug's AI twin, I can tell you that ${question.toLowerCase().includes("skill") ? "his strongest area is full-stack development with a specialization in AI integration." : "his project experience spans Android, web ERP, and multi-role systems — all built from scratch."} Would you like me to dive deeper into a specific project or technology?`,
        },
      ]);
      setChatTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <SEO
        title="Recruiter Dashboard | YugAI"
        description="Quick evaluation dashboard for recruiters with skills, projects, resume, and AI interview assistant."
        ogUrl="https://yugai.vercel.app/recruiter"
        canonical="https://yugai.vercel.app/recruiter"
      />
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary font-mono transition-colors"
          >
            <svg aria-hidden="true" className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Command Center
          </Link>
          <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            RECRUITER MODE ACTIVE
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl sm:text-4xl font-bold">
              <svg aria-hidden="true" className="w-7 h-7 inline-block mr-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Recruiter <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="mt-3 text-text-secondary">Everything you need to evaluate Yug. One page, under 3 minutes.</p>
          </motion.div>

          {/* Section 1: Professional Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-6 sm:p-8 mb-6"
          >
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-bold text-white">
                YS
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary">{resumeData.personalInfo.name}</h2>
                <p className="text-sm text-text-secondary mt-0.5">{resumeData.personalInfo.title}</p>
                <p className="text-xs text-text-muted mt-1">{resumeData.personalInfo.summary.slice(0, 200)}...</p>
                <div className="flex flex-wrap gap-3 mt-3">
                  <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-xs text-text-secondary hover:text-text-primary transition-colors">GitHub</a>
                  <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-text-secondary hover:text-text-primary transition-colors">LinkedIn</a>
                  <span className="text-xs text-text-muted">{resumeData.personalInfo.location}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Skills Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-surface border border-border rounded-xl p-6 mb-6"
          >
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Skills Overview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1">
              {skillCategories.flatMap((cat) =>
                cat.skills.map((skill, i) => (
                  <SkillBarMini key={skill.name} name={skill.name} level={skill.level} index={i} />
                ))
              )}
            </div>
          </motion.div>

          {/* Section 3: Top Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-surface border border-border rounded-xl p-6 mb-6"
          >
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Top Projects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {miniProjects.map((p, i) => (
                <ProjectMini key={p.id} project={p} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Section 4: Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-surface border border-border rounded-xl p-6 mb-6"
          >
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Quick Stats
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard value={recruiterSummary.totalProjects} suffix="+" label="Projects Built" delay={0} />
              <StatCard value={recruiterSummary.technologiesUsed} suffix="+" label="Technologies" delay={0.05} />
              <StatCard value={recruiterSummary.aiProjects} suffix="+" label="AI Projects" delay={0.1} />
              <StatCard value={recruiterSummary.yearsLearning} suffix="+" label="Years Learning" delay={0.15} />
            </div>
          </motion.div>

          {/* Section 5: Resume Download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="bg-surface border border-border rounded-xl p-6 mb-6"
          >
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Resume Download
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(resumeData, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "yug_sathavara_resume.json";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-primary rounded-lg hover:bg-primary-light transition-all duration-200 cursor-pointer"
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download JSON
              </button>
              <Link
                to="/resume"
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-text-secondary border border-border rounded-lg hover:border-primary/40 hover:text-primary transition-all duration-200"
              >
                View Full Resume
              </Link>
            </div>
          </motion.div>

          {/* Section 6: AI Interview Assistant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-surface border border-border rounded-xl p-6 mb-6"
          >
            <h3 className="text-sm font-semibold text-text-primary mb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              AI Interview Assistant
            </h3>
            <p className="text-xs text-text-muted mb-4">Ask me anything about Yug's qualifications, experience, or fit for your role.</p>
            <div className="mb-4 max-h-40 overflow-y-auto space-y-2">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${msg.role === "user" ? "bg-primary text-white" : "bg-deep-void text-text-secondary border border-border"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {chatTyping && (
                <div className="flex items-start gap-1.5">
                  <div className="bg-deep-void border border-border rounded-lg px-3 py-2">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); handleInterviewAsk(); }}
              className="flex items-center gap-2 bg-deep-void border border-border rounded-lg px-3"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 bg-transparent py-2 text-xs text-text-primary placeholder-text-muted outline-none"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="p-1 text-text-muted hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
                </svg>
              </button>
            </form>
          </motion.div>

          {/* Section 7: Hire Verdict */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="bg-gradient-to-br from-success/5 to-primary/5 border border-success/20 rounded-xl p-6 sm:p-8"
          >
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <svg aria-hidden="true" className="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3h14M9 3v2a4 4 0 004 4h2M9 3H5v4a4 4 0 004 4m0 0v4m0 0H7m2 0h6m-6 0v4m0 0H7m2 0h6m-6 0v2a1 1 0 001 1h4a1 1 0 001-1v-2" />
              </svg>
              Hire Verdict
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              <div className="text-center shrink-0">
                <div className="text-4xl font-bold font-mono text-gradient">{recruiterSummary.verdictScore}</div>
                <div className="text-xs text-text-muted font-mono">/ 100</div>
              </div>
              <div className="flex-1">
                <div className="w-full h-2 bg-deep-void rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1500" style={{ width: `${recruiterSummary.verdictScore}%` }} />
                </div>
                <div className="mt-2 text-sm font-semibold text-text-primary">{recruiterSummary.verdictLabel}</div>
                <div className="mt-1 text-xs text-text-secondary leading-relaxed">{recruiterSummary.verdictText}</div>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-success/20 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`mailto:${resumeData.personalInfo.email}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-medium text-deep-void bg-success rounded-lg hover:bg-success/90 transition-all duration-200"
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Interview Request
              </a>
              <a
                href={resumeData.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-medium text-text-secondary border border-border rounded-lg hover:border-text-muted hover:text-text-primary transition-all duration-200"
              >
                View LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
