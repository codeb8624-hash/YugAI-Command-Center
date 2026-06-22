import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjectBySlug } from "../data/projects";
import CaseStudyLayout from "../components/case-study/CaseStudyLayout";

export default function ProjectCaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mx-auto mb-4"
          >
            <svg aria-hidden="true" className="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Project Not Found</h1>
          <p className="text-text-secondary mb-6">The project you're looking for doesn't exist.</p>
          <Link
            to="/#projects"
            className="px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-light transition-all"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return <CaseStudyLayout project={project} />;
}
