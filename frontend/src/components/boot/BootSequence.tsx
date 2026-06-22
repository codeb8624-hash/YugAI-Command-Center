import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootSequenceProps {
  onComplete: () => void;
}

const lines = [
  { text: "INITIALIZING YUGAI_OS v2.0.0", done: false },
  { text: "LOADING NEURAL PROFILE", done: false },
  { text: "AUTHENTICATING EXPERIENCE DATABASE", done: false },
  { text: "SKILLS MATRIX LOADED", done: false },
  { text: "PROJECTS DATABASE CONNECTED", done: false },
  { text: "CALIBRATING AI_RESPONSE_ENGINE", done: false },
  { text: "AI TWIN ONLINE", done: false },
  { text: "WELCOME RECRUITER", done: false },
];

const statusMap = ["OK", "OK", "OK", "OK", "OK", "OK", "ONLINE", ""];

function useBootTimer() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [currentTyping, setCurrentTyping] = useState(0);
  const [typingChars, setTypingChars] = useState(0);
  const [showEnterButton, setShowEnterButton] = useState(false);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let timer: ReturnType<typeof setTimeout>;

    const typeNextChar = () => {
      const line = lines[lineIndex];
      if (!line) return;

      charIndex++;
      setTypingChars(charIndex);

      if (charIndex <= line.text.length) {
        timer = setTimeout(typeNextChar, 28);
      } else {
        setVisibleLines((prev) => [...prev, lineIndex]);
        lineIndex++;
        charIndex = 0;

        if (lineIndex < lines.length) {
          setCurrentTyping(lineIndex);
          timer = setTimeout(typeNextChar, 240);
        } else {
          setTimeout(() => setShowEnterButton(true), 400);
        }
      }
    };

    setCurrentTyping(0);
    timer = setTimeout(typeNextChar, 400);

    return () => clearTimeout(timer);
  }, []);

  return { visibleLines, currentTyping, typingChars, showEnterButton };
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const { visibleLines, currentTyping, typingChars, showEnterButton } =
    useBootTimer();

  const currentLineText = lines[currentTyping]?.text ?? "";
  const typedText = currentLineText.slice(0, typingChars);

  const handleEnter = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="w-full max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="border border-[#1a3a1a] rounded-xl p-6 md:p-8 bg-[#050508]"
        >
          <div className="mb-4 flex items-center gap-3 text-text-muted font-mono text-xs tracking-widest uppercase">
            <span className="inline-block w-2 h-2 rounded-full bg-success animate-pulse" />
            YugAI Command Center — Boot Sequence
          </div>

          <div className="font-mono text-sm space-y-1.5">
            {lines.map((line, idx) => {
              const isVisible = visibleLines.includes(idx);
              const isTyping = idx === currentTyping && !isVisible;
              const status = statusMap[idx];

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2 ${
                    isVisible || isTyping ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-200`}
                >
                  <span className="text-text-muted shrink-0">{">"}</span>
                  <span className="text-success">
                    {isVisible ? line.text : isTyping ? typedText : ""}
                  </span>
                  {isTyping && typingChars <= line.text.length && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="inline-block w-2 h-4 bg-success"
                    />
                  )}
                  {isVisible && status && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-auto text-success text-xs shrink-0"
                    >
                      [{status}]
                    </motion.span>
                  )}
                  {isVisible && idx === 6 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-auto text-xs shrink-0"
                    >
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse [animation-delay:0.4s]" />
                      </span>
                    </motion.span>
                  )}
                </div>
              );
            })}

            <AnimatePresence>
              {visibleLines.length === lines.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2 flex items-center gap-2 text-text-muted"
                >
                  <span>{">"}</span>
                  <span className="text-text-muted">
                    SYSTEM READY.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <AnimatePresence>
          {showEnterButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mt-8"
            >
              <motion.button
                onClick={handleEnter}
                className="relative px-10 py-3.5 font-mono text-sm tracking-widest uppercase text-[#00ff88] bg-transparent border border-[#00ff88]/40 rounded-lg cursor-pointer overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(0,255,136,0.15)",
                    "0 0 25px rgba(0,255,136,0.35)",
                    "0 0 10px rgba(0,255,136,0.15)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Enter Command Center
                </span>
                <span className="absolute inset-0 bg-[#00ff88] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
