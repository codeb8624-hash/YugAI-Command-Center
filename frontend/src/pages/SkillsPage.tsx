import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { skillCategories, type SkillCategory } from "../data/skills";
import { useAnimatedCounter } from "../hooks/useAnimatedCounter";

function SkillBar({ name, level, experience, delay }: { name: string; level: number; experience: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useAnimatedCounter(level, 1200, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="mb-3"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-text-primary">{name}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-text-muted">{experience}</span>
          <span className="text-xs font-mono text-gradient">{count}%</span>
        </div>
      </div>
      <div className="w-full h-2 bg-deep-void rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, var(--color-primary), var(--color-secondary))`,
          }}
        />
      </div>
    </motion.div>
  );
}

function CategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="bg-surface border border-border rounded-xl p-6 hover:border-primary/30 transition-colors duration-300"
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `${category.color}15` }}
        >
          <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke={category.color} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={category.icon} />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text-primary">{category.name}</h3>
          <div className="text-xs text-text-muted font-mono">{category.skills.length} skills</div>
        </div>
      </div>
      {category.skills.map((skill, i) => (
        <SkillBar key={skill.name} {...skill} delay={i * 0.08} />
      ))}
    </motion.div>
  );
}

export default function SkillsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded-full mb-4">
            <svg aria-hidden="true" className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            SKILLS MATRIX
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Technology <span className="text-gradient">Radar</span>
          </h1>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto">
            Interactive skill breakdown across frontend, backend, database, mobile, and AI.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {skillCategories.map((cat, i) => (
              <CategoryCard key={cat.name} category={cat} index={i} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <span className="text-xs text-text-muted font-mono">
            &gt; {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} skills across {skillCategories.length} categories
          </span>
        </motion.div>
      </div>
    </div>
  );
}
