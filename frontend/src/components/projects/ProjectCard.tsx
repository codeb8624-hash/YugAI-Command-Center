import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { CaseStudy } from "../../data/projects";

interface ProjectCardProps {
  project: CaseStudy;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -4 }}
      className="group relative bg-surface border border-border rounded-xl overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at 50% 0%, ${project.color}08, transparent)`,
        }}
      />

      <div className="relative p-6 sm:p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold"
              style={{ background: `${project.color}15`, color: project.color }}
            >
              {project.name[0]}
            </div>
            <div>
              <div className="text-lg font-semibold text-text-primary">
                {project.name}
              </div>
              <div className="text-xs text-text-muted font-mono">
                {project.category}
              </div>
            </div>
          </div>
          <span
            className="shrink-0 px-2.5 py-1 text-[10px] font-medium rounded-full border"
            style={{
              color: project.color,
              borderColor: `${project.color}30`,
              background: `${project.color}10`,
            }}
          >
            {project.status}
          </span>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-mono text-text-muted bg-deep-void border border-border rounded"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="px-2 py-0.5 text-[10px] font-mono text-text-muted bg-deep-void border border-border rounded">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Link
            to={`/projects/${project.slug}`}
            className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-light transition-colors"
          >
            <span>View Case Study</span>
            <svg aria-hidden="true" className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Source
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
      />
    </motion.div>
  );
}
