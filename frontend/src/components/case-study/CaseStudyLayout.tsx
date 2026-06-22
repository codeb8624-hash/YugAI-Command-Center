import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { CaseStudy } from "../../data/projects";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

function Section({ title, children, delay = 0 }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className="mb-14"
    >
      <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        {title}
      </h3>
      {children}
    </motion.section>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 hover:border-primary/30 transition-colors duration-200">
      <div className="text-sm font-medium text-text-primary mb-1">{title}</div>
      <div className="text-xs text-text-secondary leading-relaxed">{desc}</div>
    </div>
  );
}

function ChallengeCard({
  challenge,
  solution,
  lesson,
  index,
}: {
  challenge: string;
  solution: string;
  lesson: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border border-border rounded-lg p-5 space-y-3 bg-surface/50"
    >
      <div>
        <div className="flex items-center gap-2 mb-1">
          <svg aria-hidden="true" className="w-4 h-4 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-text-primary">Challenge</span>
        </div>
        <p className="text-sm text-text-secondary">{challenge}</p>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <svg aria-hidden="true" className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-text-primary">Solution</span>
        </div>
        <p className="text-sm text-text-secondary">{solution}</p>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <svg aria-hidden="true" className="w-4 h-4 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="text-sm font-medium text-text-primary">Lesson</span>
        </div>
        <p className="text-sm text-text-secondary italic">{lesson}</p>
      </div>
    </motion.div>
  );
}

interface CaseStudyLayoutProps {
  project: CaseStudy;
}

export default function CaseStudyLayout({ project }: CaseStudyLayoutProps) {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/#projects"
            className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary font-mono transition-colors"
          >
            <svg aria-hidden="true" className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
        </motion.div>

        <div
          className="rounded-xl p-8 sm:p-12 mb-12 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
            border: `1px solid ${project.color}20`,
          }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${project.color}, transparent)`,
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-mono text-xl font-bold"
                style={{ background: `${project.color}20`, color: project.color }}
              >
                {project.name[0]}
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">
                  {project.name}
                </h1>
                <p className="text-text-secondary mt-1">{project.tagline}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-[11px] font-mono border rounded"
                  style={{
                    color: project.color,
                    borderColor: `${project.color}30`,
                    background: `${project.color}10`,
                  }}
                >
                  {tech}
                </span>
              ))}
              <span className="px-2.5 py-1 text-[11px] font-mono text-text-muted border border-border rounded">
                {project.status}
              </span>
              <span className="px-2.5 py-1 text-[11px] font-mono text-text-muted border border-border rounded">
                {project.year}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-5">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View Source
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-3xl">
          <Section title="The Problem">
            <p className="text-sm text-text-secondary leading-relaxed">{project.problem}</p>
          </Section>

          <Section title="The Solution" delay={0.1}>
            <p className="text-sm text-text-secondary leading-relaxed">{project.solution}</p>
          </Section>

          <Section title="Architecture" delay={0.15}>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">{project.architecture}</p>
            <div className="bg-deep-void border border-border rounded-xl p-4 sm:p-6 overflow-x-auto">
              <pre className="text-xs text-success font-mono leading-relaxed whitespace-pre">
                {project.architectureDiagram}
              </pre>
            </div>
          </Section>

          <Section title="Key Features" delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((f) => (
                <FeatureCard key={f.title} title={f.title} desc={f.desc} />
              ))}
            </div>
          </Section>

          <Section title="Challenges & Solutions" delay={0.25}>
            <div className="space-y-4">
              {project.challenges.map((c, i) => (
                <ChallengeCard key={i} {...c} index={i} />
              ))}
            </div>
          </Section>

          <Section title="Results & Impact" delay={0.3}>
            <ul className="space-y-2">
              {project.results.map((r, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="flex items-start gap-2 text-sm text-text-secondary"
                >
                  <span className="text-success mt-0.5 shrink-0">▹</span>
                  {r}
                </motion.li>
              ))}
            </ul>
          </Section>

          <Section title="Future Scope" delay={0.35}>
            <ul className="space-y-2">
              {project.futureScope.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="flex items-start gap-2 text-sm text-text-secondary"
                >
                  <span className="text-secondary mt-0.5 shrink-0">→</span>
                  {f}
                </motion.li>
              ))}
            </ul>
          </Section>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/#projects"
            className="px-5 py-2.5 text-sm font-medium text-text-secondary border border-border rounded-lg hover:border-text-muted hover:text-text-primary transition-all duration-200"
          >
            ← All Projects
          </Link>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-light transition-all duration-200"
          >
            View on GitHub
          </a>
        </motion.div>
      </div>
    </div>
  );
}
