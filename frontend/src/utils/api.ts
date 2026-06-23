const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

interface ChatResponse {
  success: boolean;
  data: {
    sessionId: string;
    reply: string;
    suggestions: string[];
    metadata: {
      model: string;
      tokensUsed: number;
      responseTimeMs: number;
    };
  } | null;
  error: { code: string; message: string } | null;
}

interface StreamMetadata {
  model: string;
  tokensUsed: number;
  responseTimeMs: number;
}

interface StreamChunk {
  type: "chunk" | "done" | "error";
  content?: string;
  suggestions?: string[];
  metadata?: StreamMetadata;
  error?: string;
}

export async function sendChatMessage(
  message: string,
  history: { role: string; content: string }[]
): Promise<{ reply: string; suggestions: string[] }> {
  const chatHistory = history.map((m) => ({
    role: m.role === "ai" ? "ai" : "user",
    content: m.content,
  }));

  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      sessionId: `web_${Date.now()}`,
      history: chatHistory,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`API returned ${res.status}: ${errBody}`);
  }

  const json: ChatResponse = await res.json();

  if (!json.success || !json.data) {
    throw new Error(json.error?.message || "Unknown API error");
  }

  return {
    reply: json.data.reply,
    suggestions: json.data.suggestions,
  };
}

export async function sendChatMessageStream(
  message: string,
  history: { role: string; content: string }[],
  onChunk: (text: string) => void,
  onDone: (suggestions: string[], metadata?: StreamMetadata) => void,
  onError: (error: string) => void,
  signal?: AbortSignal
): Promise<void> {
  const chatHistory = history.map((m) => ({
    role: m.role === "ai" ? "ai" : "user",
    content: m.content,
  }));

  try {
    const res = await fetch(`${API_URL}/chat/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        sessionId: `web_${Date.now()}`,
        history: chatHistory,
      }),
      signal,
    });

    if (!res.ok) {
      throw new Error(`Stream API returned ${res.status}`);
    }

    const reader = res.body?.getReader();
    if (!reader) throw new Error("No response body");

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const jsonStr = line.slice(6).trim();
        if (!jsonStr) continue;

        try {
          const chunk: StreamChunk = JSON.parse(jsonStr);
          switch (chunk.type) {
            case "chunk":
              if (chunk.content) onChunk(chunk.content);
              break;
            case "done":
              onDone(chunk.suggestions || [], chunk.metadata);
              return;
            case "error":
              onError(chunk.error || "Stream error");
              return;
          }
        } catch {
          // skip malformed JSON
        }
      }
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return;
    onError(err instanceof Error ? err.message : "Stream error");
  }
}

export async function fetchResumeData() {
  const res = await fetch(`${API_URL}/resume`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error?.message);
  return data.data;
}

export async function fetchSkillsData() {
  const res = await fetch(`${API_URL}/skills`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error?.message);
  return data.data;
}

export async function fetchProjectsData() {
  const res = await fetch(`${API_URL}/projects`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error?.message);
  return data.data;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactForm(payload: ContactPayload): Promise<{ id: number | string; createdAt: string }> {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    const msg = data?.error?.message || `API returned ${res.status}`;
    throw new Error(msg);
  }

  if (!data.success || !data.data) {
    throw new Error(data?.error?.message || "Unknown API error");
  }

  return data.data;
}
