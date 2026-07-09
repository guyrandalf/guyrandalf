import { generateObject } from "ai";
import { z } from "zod";
import { languageModel, PROVIDERS, resolveProvider } from "@/lib/ai/providers";
import { rateLimit } from "@/lib/ai/rate-limit";

export const maxDuration = 30;

const bodySchema = z.object({
  topic: z.string().min(3).max(500),
  context: z.string().max(2000).optional(),
  provider: z.string().optional(),
});

// Dual-audience explanation. Powers the AI-generated hover explainers (the
// admin uses this to fill a project's Simple + Technical text).
const explainSchema = z.object({
  plain: z
    .string()
    .describe(
      "A friendly, jargon-free explanation for a non-technical reviewer (2 to 3 sentences): what it is and why it matters in the real world.",
    ),
  technical: z
    .string()
    .describe(
      "A precise explanation for an engineer (2 to 3 sentences): how it works and the key techniques.",
    ),
});

function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export async function POST(req: Request) {
  const limit = rateLimit(`explain:${clientIp(req)}`);
  if (!limit.ok) {
    return Response.json({ error: "Too many requests." }, { status: 429 });
  }

  let body: z.infer<typeof bodySchema>;
  try {
    body = bodySchema.parse(await req.json());
  } catch {
    return Response.json({ error: "A topic is required." }, { status: 400 });
  }

  const providerId = resolveProvider(body.provider);
  const keyPresent =
    providerId === "google"
      ? Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY)
      : Boolean(process.env.XAI_API_KEY);
  if (!keyPresent) {
    return Response.json(
      { error: `${PROVIDERS[providerId].label} is not configured.` },
      { status: 503 },
    );
  }

  try {
    const { object } = await generateObject({
      model: languageModel(providerId),
      schema: explainSchema,
      system:
        "You write dual-audience explanations of software features and design decisions. Be concrete and honest. Never use em dashes.",
      prompt: `Explain this feature or decision.\nTopic: ${body.topic}${
        body.context ? `\nContext: ${body.context}` : ""
      }`,
      maxRetries: 2,
    });
    return Response.json({ explanation: object });
  } catch (err) {
    console.error("explain error:", err);
    return Response.json(
      { error: "Could not generate an explanation." },
      { status: 502 },
    );
  }
}
