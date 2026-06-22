import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type ChatState = "closed" | "minimized" | "expanded";

interface ChatContextValue {
  state: ChatState;
  open: (question?: string) => void;
  minimize: () => void;
  close: () => void;
  expand: () => void;
  pendingQuestion: string | null;
  clearPending: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ChatState>("closed");
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);

  const open = useCallback((question?: string) => {
    if (question) setPendingQuestion(question);
    setState("expanded");
  }, []);

  const minimize = useCallback(() => setState("minimized"), []);
  const close = useCallback(() => {
    setState("closed");
    setPendingQuestion(null);
  }, []);
  const expand = useCallback(() => setState("expanded"), []);
  const clearPending = useCallback(() => setPendingQuestion(null), []);

  return (
    <ChatContext.Provider
      value={{ state, open, minimize, close, expand, pendingQuestion, clearPending }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
