// Coach chat API route - sends conversation to OpenAI grounded in FitPlate's domain

import { NextRequest, NextResponse } from "next/server";
import { getOpenAI, CHAT_SYSTEM_PROMPT } from "@/lib/openai";

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 2000;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Runtime guard for client-supplied chat history: TypeScript types only
// restrict `role` at compile time, so without this a request body can still
// carry an arbitrary role (e.g. "system") and inject a second system message
// that overrides CHAT_SYSTEM_PROMPT. Also caps message count/length to bound
// cost and request size on this OpenAI-backed route.
function sanitizeMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input) || input.length === 0) return null;
  if (input.length > MAX_MESSAGES) return null;

  const messages: ChatMessage[] = [];
  for (const entry of input) {
    if (
      !entry ||
      (entry.role !== "user" && entry.role !== "assistant") ||
      typeof entry.content !== "string" ||
      entry.content.length === 0 ||
      entry.content.length > MAX_CONTENT_LENGTH
    ) {
      return null;
    }
    messages.push({ role: entry.role, content: entry.content });
  }
  return messages;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages = sanitizeMessages(body?.messages);

    if (!messages) {
      return NextResponse.json(
        {
          success: false,
          error: `messages is required: an array of 1-${MAX_MESSAGES} { role: "user" | "assistant", content: string } entries, each content up to ${MAX_CONTENT_LENGTH} characters`,
        },
        { status: 400 }
      );
    }

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: CHAT_SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({ success: true, data: { reply } });
  } catch (error) {
    console.error("Failed to get chat completion:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get a reply from the assistant" },
      { status: 500 }
    );
  }
}
