import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";

interface MetricCardProps {
  value: number;
  suffix?: string;
  label: string;
  sublabel: string;
  delay: number;
}

function MetricCard({
  value,
  suffix = "",
  label,
  sublabel,
  delay,
}: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useAnimatedCounter(value, 1500, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03, borderColor: "#6c5ce7" }}
      className="relative bg-surface border border-border rounded-xl p-5 text-center overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="text-3xl sm:text-4xl font-bold font-mono text-gradient">
          {count}
          {suffix}
        </div>
        <div className="mt-1.5 text-sm font-medium text-text-primary">
          {label}
        </div>
        <div className="mt-0.5 text-xs text-text-muted">{sublabel}</div>
      </div>
    </motion.div>
  );
}

const metrics = [
  { value: 12, suffix: "+", label: "Projects Built", sublabel: "Across all stacks" },
  { value: 15, suffix: "+", label: "Technologies Used", sublabel: "Frontend to AI" },
  { value: 5, suffix: "+", label: "AI Projects", sublabel: "LLMs & integrations" },
  { value: 814, suffix: "", label: "CGPA", sublabel: "Out of 10 — scaled" },
  { value: 3, suffix: "+", label: "Years Learning", sublabel: "Since 2023" },
  { value: 50, suffix: "K+", label: "Lines of Code", sublabel: "And counting" },
];

export default function LiveMetrics() {
  return (
    <section id="metrics" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[128px]" />
      </div>

      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono text-secondary bg-secondary/10 border border-secondary/20 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            LIVE METRICS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            By the <span className="text-gradient">Numbers</span>
          </h2>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto">
            Data-driven proof of work. Updated as the portfolio evolves.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.label} {...metric} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
