import { motion } from "framer-motion";
import GlowButton from "../ui/GlowButton";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 snap-start"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.015] rounded-full blur-[200px]" />
      </div>

      <div className="container-main relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono text-success bg-success/10 border border-success/20 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            AI_TWIN_ONLINE
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
        >
          <span className="text-gradient">Meet YugAI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
        >
          AI-Powered Career Twin &amp; Full Stack Developer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-3 text-sm text-text-muted font-mono max-w-xl mx-auto"
        >
          &gt; I build intelligent apps. React · Node.js · AI Integration · 3+
          years of crafting
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GlowButton
            variant="primary"
            size="lg"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <svg aria-hidden="true"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
            Enter Command Center
          </GlowButton>
          <GlowButton
            variant="secondary"
            size="lg"
            onClick={() =>
              document
                .getElementById("recruiter")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Open Recruiter Mode
          </GlowButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-surface rounded-lg border border-border">
            <span className="text-xs text-text-muted font-mono">
              {"<"}
              <span className="text-primary">AI</span>
              {">"}
            </span>
            <span className="text-xs text-text-muted font-mono mx-2">
              |
            </span>
            {["React", "TypeScript", "Node.js", "AI", "MySQL"].map(
              (tech, i) => (
                <span
                  key={tech}
                  className="text-xs text-text-secondary font-mono hidden sm:inline"
                >
                  {i > 0 && (
                    <span className="text-text-muted mx-1.5">·</span>
                  )}
                  {tech}
                </span>
              )
            )}
            <span className="text-xs text-text-muted font-mono">
              {"</"}
              <span className="text-primary">AI</span>
              {">"}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-8 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-text-muted cursor-pointer"
            onClick={() =>
              document
                .getElementById("metrics")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <svg aria-hidden="true"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
