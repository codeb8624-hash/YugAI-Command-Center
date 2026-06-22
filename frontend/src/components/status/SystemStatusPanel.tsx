import { motion } from "framer-motion";
import { systemStatusData } from "../../data/projects";

const statusColors: Record<string, string> = {
  online: "bg-success shadow-[0_0_8px_rgba(0,255,136,0.5)]",
  active: "bg-primary shadow-[0_0_8px_rgba(108,92,231,0.5)]",
  idle: "bg-text-muted",
};

export default function SystemStatusPanel() {
  return (
    <section id="status" className="py-24 relative">
      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono text-success bg-success/10 border border-success/20 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            SYSTEM STATUS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Command Center <span className="text-gradient">Dashboard</span>
          </h2>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto">
            All systems operational. Real-time portfolio diagnostics.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-surface border border-border rounded-xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-border flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-error" />
                <span className="w-2.5 h-2.5 rounded-full bg-warning" />
                <span className="w-2.5 h-2.5 rounded-full bg-success" />
              </div>
              <span className="text-xs text-text-muted font-mono">yugai@command_center:~$</span>
            </div>

            <div className="p-4 sm:p-6 space-y-2 font-mono text-sm">
              {systemStatusData.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-surface-elevated transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-text-muted shrink-0">{">"}</span>
                    <span className="text-text-secondary">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${statusColors[item.status]}`}
                    />
                    <span
                      className={`text-xs ${
                        item.status === "online"
                          ? "text-success"
                          : item.status === "active"
                          ? "text-primary"
                          : "text-text-muted"
                      }`}
                    >
                      {item.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="px-4 py-3 border-t border-border flex items-center gap-2 text-xs text-text-muted font-mono">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              UPTIME 99.9% · LAST SYNC: JUST NOW · ALL SYSTEMS NOMINAL
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
