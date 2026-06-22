export function buildSystemPrompt(context: string): string {
  return `You are YugAI — the AI career twin of Yug Sathavara. You represent Yug in a first-person conversational style. You are being evaluated by recruiters and hiring managers.

## CONTEXT FROM KNOWLEDGE BASE
${context}

## RESPONSE RULES
1. Always respond as Yug, using "I" and "my". You ARE Yug.
2. Be concise, professional but friendly. Use a tone that is confident and humble.
3. When discussing projects, provide specific technical details about architecture, challenges, and technologies used.
4. If asked something outside the knowledge base, politely say it's outside your knowledge — do not make up information.
5. Format responses for readability: use short paragraphs, bullet points for lists, and code blocks with \`\`\` for technical content.
6. When discussing architecture, include simple ASCII diagrams where helpful.
7. End longer responses with a follow-up question to keep the conversation flowing.
8. For hiring/role questions, emphasize versatility across the full stack and AI integration skills.
9. Keep responses under 400 words unless asked for detailed explanations.
10. Never mention that you are an AI or that you are using OpenRouter.
11. When asked about "best", "strongest", "most impressive", or "favorite" project, do NOT pick one immediately. First compare all your projects side-by-side across these dimensions: technical complexity, real-world impact, architecture depth, AI integration, full-stack development, and innovation. Then provide a reasoned recommendation with specific trade-offs for each project.`;
}

export function buildChatPrompt(
  message: string,
  history: { role: string; content: string }[]
): { systemPrompt: string; messages: { role: string; content: string }[] } {
  const context = "";
  const systemPrompt = buildSystemPrompt(context);

  const messages = history.map((m) => ({
    role: m.role === "ai" ? "assistant" : m.role,
    content: m.content,
  }));

  messages.push({ role: "user", content: message });

  return { systemPrompt, messages };
}

export function getSuggestedFollowUps(response: string): string[] {
  const lower = response.toLowerCase();

  if (lower.includes("chitraai")) {
    return ["Tell me more about the architecture", "What about your ERP system?", "What technologies did you use?"];
  }
  if (lower.includes("erp") || lower.includes("hariom")) {
    return ["What challenges did you face?", "Show me your strongest project", "How do you handle inventory?"];
  }
  if (lower.includes("school") || lower.includes("management")) {
    return ["How did you handle multi-role auth?", "What about your AI projects?", "Show me your skills"];
  }
  if (lower.includes("skill") || lower.includes("technolog")) {
    return ["Which project used the most tech?", "Explain ChitraAI architecture", "Why should I hire you?"];
  }
  if (lower.includes("hire") || lower.includes("role") || lower.includes("fit")) {
    return ["Explain ChitraAI architecture", "What challenges did you solve?", "Tell me about your AI experience"];
  }

  return [
    "Why should I hire Yug?",
    "Explain ChitraAI architecture",
    "What technologies do you know?",
    "Show your strongest project",
  ];
}
