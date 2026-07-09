import {
  streamText,
  convertToModelMessages,
  stepCountIs,
  type UIMessage,
} from "ai";
import {
  languageModel,
  resolveProvider,
  PROVIDERS,
} from "@/lib/ai/providers";
import { portfolioTools } from "@/lib/ai/tools";
import { buildSystemPrompt } from "@/lib/ai/prompt";
import { rateLimit } from "@/lib/ai/rate-limit";

export const maxDuration = 30;

// Guardrails ported from the referral-assistant.
const MAX_TOOL_ROUNDS = 5;
const MAX_HISTORY = 24;

function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export async function POST(req: Request) {
  const limit = rateLimit(clientIp(req));
  if (!limit.ok) {
    return Response.json(
      { error: "You're sending messages a bit fast. Give it a moment." },
      { status: 429, headers: { "retry-after": String(limit.retryAfter ?? 30) } },
    );
  }

  let body: { messages?: UIMessage[]; provider?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const providerId = resolveProvider(body.provider);
  const messages = Array.isArray(body.messages)
    ? body.messages.slice(-MAX_HISTORY)
    : [];
  if (messages.length === 0) {
    return Response.json({ error: "A message is required." }, { status: 400 });
  }

  // Graceful degradation when the selected provider isn't configured.
  const keyPresent =
    providerId === "google"
      ? Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY)
      : Boolean(process.env.XAI_API_KEY);
  if (!keyPresent) {
    return Response.json(
      { error: `${PROVIDERS[providerId].label} is not configured on the server.` },
      { status: 503 },
    );
  }

  const result = streamText({
    model: languageModel(providerId),
    system: buildSystemPrompt(),
    messages: await convertToModelMessages(messages),
    tools: portfolioTools,
    stopWhen: stepCountIs(MAX_TOOL_ROUNDS),
    abortSignal: req.signal,
    maxRetries: 2,
  });

  return result.toUIMessageStreamResponse({
    onError: (error) => {
      console.error("chat stream error:", error);
      return "The assistant hit an error. Try again, or switch the model.";
    },
  });
}
