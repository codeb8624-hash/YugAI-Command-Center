import { motion } from "framer-motion";
import { recruiterQuestions } from "../../data/projects";
import { useChat } from "../../context/ChatContext";

export default function QuestionChips() {
  const { open } = useChat();

  return (
    <section id="questions" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-secondary/[0.02] rounded-full blur-[128px]" />
      </div>

      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded-full mb-4">
            <svg aria-hidden="true" className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            ASK YUGAI
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Common <span className="text-gradient">Recruiter Questions</span>
          </h2>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto">
            Click any question to open the AI chat and get an instant answer.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {recruiterQuestions.map((q, i) => (
            <motion.button
              key={q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => open(q)}
              className="group relative px-5 py-2.5 text-sm font-medium text-text-secondary bg-surface border border-border rounded-full hover:border-primary/50 hover:text-text-primary transition-all duration-200 cursor-pointer"
            >
              <span className="relative z-10">{q}</span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-8"
        >
          <span className="text-xs text-text-muted font-mono">
            &gt; {recruiterQuestions.length} questions available · Click any to start a conversation
          </span>
        </motion.div>
      </div>
    </section>
  );
}
