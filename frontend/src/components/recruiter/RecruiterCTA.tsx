import { motion } from "framer-motion";

const perks = [
  {
    title: "Instant Evaluation",
    desc: "Full profile in under 3 minutes — skills, projects, and summary at a glance.",
    icon: (
      <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "AI Interview Assistant",
    desc: "Ask anything about my qualifications, experience, and fit for your role.",
    icon: (
      <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "Resume + Case Studies",
    desc: "Download my resume and explore detailed architecture breakdowns of every project.",
    icon: (
      <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export default function RecruiterCTA() {
  return (
    <section id="recruiter" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/[0.03] rounded-full blur-[160px]" />
      </div>

      <div className="container-main relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded-full mb-4">
              <svg aria-hidden="true" className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              RECRUITER MODE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Evaluate Me in{" "}
              <span className="text-gradient">3 Minutes</span>
            </h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Everything a hiring manager needs. One click, full picture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {perks.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-surface border border-border rounded-xl p-5 hover:border-primary/40 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                  {perk.icon}
                </div>
                <h3 className="text-sm font-semibold text-text-primary mb-1.5">
                  {perk.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {perk.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <motion.a
              href="#recruiter-dashboard"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 font-medium text-white bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-200"
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Open Recruiter Dashboard
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
