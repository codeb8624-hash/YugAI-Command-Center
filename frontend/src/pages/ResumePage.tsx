import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { resumeData, recruiterSummary } from "../data/skills";
import SEO from "../components/seo/SEO";

function Section({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay }}
      className="mb-10"
    >
      <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        {title}
      </h3>
      {children}
    </motion.section>
  );
}

export default function ResumePage() {
  const { personalInfo, experience, education, skills, achievements } = resumeData;
  const resumeRef = useRef<HTMLDivElement>(null);

  async function downloadPDF() {
    if (!resumeRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");
    const canvas = await html2canvas(resumeRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#0a0a0f",
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = (canvas.height * pdfW) / canvas.width;
    let heightLeft = pdfH;
    let position = 0;
    pdf.addImage(imgData, "PNG", 0, position, pdfW, pdfH);
    heightLeft -= pdf.internal.pageSize.getHeight();
    while (heightLeft > 0) {
      position = heightLeft - pdfH;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfW, pdfH);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }
    pdf.save("yug_sathavara_resume.pdf");
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <SEO
        title="Resume | Yug Sathavara"
        description="Professional resume, education, achievements, skills, and projects."
        ogUrl="https://yugai.vercel.app/resume"
        canonical="https://yugai.vercel.app/resume"
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
          <div className="flex gap-2">
            <button
              onClick={downloadPDF}
              className="px-4 py-2 text-xs font-medium text-white bg-primary rounded-lg hover:bg-primary-light transition-all duration-200 cursor-pointer"
            >
              Download PDF
            </button>
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
              className="px-4 py-2 text-xs font-medium text-text-secondary border border-border rounded-lg hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-pointer"
            >
              Download JSON
            </button>
          </div>
        </motion.div>

        <div ref={resumeRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-surface border border-border rounded-xl p-6 sm:p-8 mb-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white shrink-0">
                  {personalInfo.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">{personalInfo.name}</h1>
                  <p className="text-text-secondary mt-1">{personalInfo.title}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-text-muted">
                    <span>{personalInfo.location}</span>
                    <span className="text-text-muted">|</span>
                    <a href={`mailto:${personalInfo.email}`} className="text-primary hover:text-primary-light transition-colors">
                      {personalInfo.email}
                    </a>
                    <span className="text-text-muted">|</span>
                    <span>{personalInfo.phone}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors"
                >
                  <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  GitHub
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors"
                >
                  <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </motion.div>

            <Section title="Professional Summary" delay={0.1}>
              <p className="text-sm text-text-secondary leading-relaxed">{personalInfo.summary}</p>
            </Section>

            <Section title="Education" delay={0.15}>
              {education.map((edu) => (
                <div key={edu.degree} className="bg-surface border border-border rounded-lg p-4">
                  <div className="text-sm font-medium text-text-primary">{edu.degree}</div>
                  <div className="text-xs text-text-secondary mt-0.5">{edu.institution}</div>
                  <div className="text-xs text-text-muted mt-1 flex items-center gap-2">
                    <span>{edu.period}</span>
                    <span className="w-1 h-1 rounded-full bg-text-muted" />
                    <span className="text-success">{edu.status}</span>
                  </div>
                </div>
              ))}
            </Section>

            <Section title="Projects" delay={0.2}>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.title} className="bg-surface border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-medium text-text-primary">{exp.title}</div>
                        <div className="text-xs text-text-muted">{exp.organization} · {exp.period}</div>
                      </div>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-text-secondary flex items-start gap-1.5">
                          <span className="text-primary mt-0.5">▹</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Skills" delay={0.25}>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-mono text-text-secondary bg-surface border border-border rounded-full hover:border-primary/40 hover:text-text-primary transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Section>

            <Section title="Achievements" delay={0.3}>
              <ul className="space-y-2">
                {achievements.map((ach, i) => (
                  <motion.li
                    key={ach}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span className="text-success mt-0.5 shrink-0">▹</span>
                    {ach}
                  </motion.li>
                ))}
              </ul>
            </Section>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-5"
            >
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Recruiter Summary
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Projects", value: `${recruiterSummary.totalProjects}+` },
                    { label: "Technologies", value: `${recruiterSummary.technologiesUsed}+` },
                    { label: "AI Projects", value: `${recruiterSummary.aiProjects}+` },
                    { label: "Experience", value: `${recruiterSummary.yearsLearning}+ years` },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-deep-void/50 rounded-lg p-2.5 text-center">
                      <div className="text-sm font-bold font-mono text-gradient">{stat.value}</div>
                      <div className="text-[10px] text-text-muted">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-deep-void/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-muted">Hire Score</span>
                    <span className="text-xs font-mono text-success">{recruiterSummary.verdictScore}/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-deep-void rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                      style={{ width: `${recruiterSummary.verdictScore}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs font-medium text-text-primary">{recruiterSummary.verdictLabel}</div>
                  <div className="mt-0.5 text-[11px] text-text-muted">{recruiterSummary.verdictText}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-surface border border-border rounded-xl p-5"
            >
              <h3 className="text-sm font-semibold text-text-primary mb-3">Download Resume</h3>
              <div className="space-y-2">
                <button
                  onClick={downloadPDF}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-primary rounded-lg hover:bg-primary-light transition-all duration-200 cursor-pointer"
                >
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Download PDF
                </button>
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
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-text-secondary border border-border rounded-lg hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-pointer"
                >
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download JSON
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-surface border border-border rounded-xl p-5"
            >
              <h3 className="text-sm font-semibold text-text-primary mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  to="/recruiter"
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-text-secondary border border-border rounded-lg hover:border-primary/40 hover:text-primary transition-all duration-200"
                >
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Open Recruiter Dashboard
                </Link>
                <Link
                  to="/skills"
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-text-secondary border border-border rounded-lg hover:border-primary/40 hover:text-primary transition-all duration-200"
                >
                  Skills Matrix
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
