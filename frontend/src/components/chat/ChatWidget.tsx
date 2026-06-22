import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "../../context/ChatContext";
import { chatSuggestions } from "../../data/projects";
import { sendChatMessage } from "../../utils/api";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function ChatWidget() {
  const { state, open, minimize, close, expand, pendingQuestion, clearPending } = useChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(chatSuggestions);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (state === "expanded" && messages.length === 0) {
      setMessages([
        {
          role: "ai",
          content:
            "Hello! I'm **YugAI**, the AI career twin of Yug Sathavara. Ask me anything about his skills, projects, experience, and more. How can I help you today?",
        },
      ]);
    }
  }, [state, messages.length]);

  useEffect(() => {
    if (pendingQuestion && state === "expanded") {
      sendMessage(pendingQuestion);
      clearPending();
    }
  }, [pendingQuestion, state]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMsg: Message = { role: "user", content: content.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const chatHistory = messages
        .filter((m) => m.role === "user" || m.role === "ai")
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }));

      const { reply, suggestions: newSuggestions } = await sendChatMessage(content, chatHistory);

      const aiMsg: Message = { role: "ai", content: reply };
      setMessages((prev) => [...prev, aiMsg]);
      if (newSuggestions.length > 0) {
        setSuggestions(newSuggestions.slice(0, 4));
      }
    } catch {
      const fallback = getFallbackResponse(content);
      const aiMsg: Message = { role: "ai", content: fallback.reply };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  }, [messages]);

  function handleSuggestionClick(q: string) {
    sendMessage(q);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  if (state === "closed") {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => open()}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30 flex items-center justify-center cursor-pointer"
        aria-label="Open chat"
      >
        <svg aria-hidden="true" className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </motion.button>
    );
  }

  if (state === "minimized") {
    return (
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-surface border border-border rounded-xl px-4 py-3 shadow-xl cursor-pointer"
        onClick={expand}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
        <span className="text-sm font-medium text-text-primary font-mono">YugAI Online</span>
        <button
          onClick={(e) => { e.stopPropagation(); close(); }}
          className="text-text-muted hover:text-text-primary ml-2 cursor-pointer"
          aria-label="Close chat"
        >
          <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-surface border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
            <div>
              <div className="text-sm font-medium text-text-primary font-mono">YugAI Online</div>
              <div className="text-xs text-text-muted">AI Career Twin</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={minimize}
              className="p-1.5 text-text-muted hover:text-text-primary rounded-md hover:bg-surface-elevated transition-colors cursor-pointer"
              aria-label="Minimize"
            >
              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
              </svg>
            </button>
            <button
              onClick={close}
              className="p-1.5 text-text-muted hover:text-text-primary rounded-md hover:bg-surface-elevated transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2"
              >
                {suggestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestionClick(q)}
                    className="px-3 py-1.5 text-xs font-medium text-text-secondary bg-surface-elevated border border-border rounded-full hover:border-primary/40 hover:text-text-primary transition-all duration-200 cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "ai" && (
                <div className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[10px] font-bold text-white mr-2 mt-1">
                  Y
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-br-sm"
                    : "bg-surface-elevated text-text-primary border border-border rounded-bl-sm"
                }`}
              >
                <div className="prose prose-invert prose-sm max-w-none [&_strong]:text-primary-light [&_code]:text-xs [&_code]:bg-deep-void [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-deep-void [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:text-xs [&_pre]:overflow-x-auto [&_pre]:my-2">
                  <RenderContent content={msg.content} />
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-2"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                Y
              </div>
              <div className="bg-surface-elevated border border-border rounded-xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-border shrink-0">
          <div className="flex items-center gap-2 bg-deep-void border border-border rounded-xl px-3 transition-colors focus-within:border-primary/50">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask YugAI anything..."
              className="flex-1 bg-transparent py-2.5 text-sm text-text-primary placeholder-text-muted outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-1.5 text-text-muted hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Send"
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
              </svg>
            </button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}

function RenderContent({ content }: { content: string }) {
  const parts = content.split(/(```[\s\S]*?```|(?:\*\*.*?\*\*|__.*?__))/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const code = part.slice(3, -3).replace(/^[a-z]+\n/, "").trim();
          return (
            <pre key={i}>
              <code>{code}</code>
            </pre>
          );
        }
        const lines = part.split("\n");
        return (
          <span key={i}>
            {lines.map((line, li) => (
              <span key={li}>
                {li > 0 && <br />}
                <InlineContent text={line} />
              </span>
            ))}
          </span>
        );
      })}
    </>
  );
}

function InlineContent({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        const numberMatch = part.match(/^(\d+)\.\s(.+)/);
        if (numberMatch) {
          return (
            <span key={i}>
              <span className="text-primary">{numberMatch[1]}.</span> {numberMatch[2]}
            </span>
          );
        }
        return part;
      })}
    </>
  );
}

function getFallbackResponse(message: string): { reply: string; suggestions: string[] } {
  const q = message.toLowerCase();
  let reply: string;

  if (q.includes("hire") || q.includes("why"))
    reply = `Great question. Here's why I'd be a strong hire:

1. **Full-Stack Versatility** — I've built Android apps (ChitraAI), web ERPs (Hariom Machinery), and PHP platforms (School Management System).

2. **AI-First Mindset** — I integrate AI into production apps, not just consume it.

3. **Real-World Impact** — My ERP system is deployed and used daily by a manufacturing business.

4. **Growth Trajectory** — From HTML to AI integration in 3 years. I learn fast and ship faster.`;
  else if (q.includes("project") || q.includes("strongest") || q.includes("best"))
    reply = `My strongest project is **ChitraAI** — an Android app that generates images using AI via OpenRouter API.\n\nKey highlights:\n- Native Android with Material Design\n- Multi-model AI support\n- 100% crash-free in testing\n\nI also built **Hariom Machinery ERP** which is deployed in production.`;
  else if (q.includes("skill") || q.includes("technolog") || q.includes("know"))
    reply = `**Frontend:** React, TypeScript, HTML, CSS, JavaScript, Tailwind CSS\n**Backend:** Node.js, Express, PHP\n**Database:** MySQL\n**Mobile:** Java, Android Studio\n**AI:** OpenRouter API, Prompt Engineering\n**Tools:** Git, Postman, VS Code\n\nI have **12+ skills** across these categories.`;
  else if (q.includes("resume"))
    reply = `You can view my resume on the Resume page. Quick summary:\n- Education: Diploma IT at GCET\n- 3 major projects including a production ERP\n- 12+ technologies across the full stack`;
  else if (q.includes("contact"))
    reply = `Email: yug.sathavara@example.com\nLinkedIn: linkedin.com/in/yugsathavara\nGitHub: github.com/yugsathavara`;
  else if (q.includes("hariom") || q.includes("erp"))
    reply = `**Hariom Machinery ERP** — Full-stack inventory & billing system.\n\nTech: React + Node.js + MySQL\nImpact: Reduced invoice time from 15min to 2min. Deployed in production.`;
  else if (q.includes("chitraai") || q.includes("architecture"))
    reply = `**ChitraAI Architecture:**\nAndroid UI → Java Service → OpenRouter API Gateway → GPT-4o / Stable Diffusion\n\nKey: Service layer abstraction enables swapping models without UI changes.`;
  else if (q.includes("interview") || q.includes("full stack") || q.includes("role"))
    reply = `I build across the full stack: React/TypeScript frontends, Node.js/Express APIs, MySQL databases, Android apps with Java, and AI integrations via OpenRouter.\n\nMy edge: I understand how every layer connects — from XML layouts to prompt engineering.`;
  else
    reply = `I'm YugAI, the AI career twin of Yug Sathavara. I can tell you about his skills, projects, education, and experience. What would you like to know?`;

  return {
    reply,
    suggestions: [
      "Why should I hire Yug?",
      "Explain ChitraAI architecture",
      "What technologies do you know?",
      "Show your strongest project",
    ],
  };
}
