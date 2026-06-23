import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import ProjectCard from "../components/projects/ProjectCard";
import SEO from "../components/seo/SEO";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <SEO
        title="Projects"
        description="Explore Yug Sathavara's portfolio of engineering projects — AI apps, ERP systems, full-stack platforms, and more."
        ogUrl="https://yugai.vercel.app/projects"
        canonical="https://yugai.vercel.app/projects"
      />
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
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
        </motion.div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono text-secondary bg-secondary/10 border border-secondary/20 rounded-full mb-4">
            <svg aria-hidden="true" className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            PORTFOLIO
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            All <span className="text-gradient">Projects</span>
          </h1>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto">
            Every project is a case study. Click through to see architecture, challenges, and lessons learned.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
