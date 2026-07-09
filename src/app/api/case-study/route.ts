import { z } from "zod";
import { generateCaseStudy } from "@/lib/ai/case-study";
import { resolveProvider, PROVIDERS } from "@/lib/ai/providers";
import { rateLimit } from "@/lib/ai/rate-limit";

export const maxDuration = 30;

const bodySchema = z.object({
  input: z.string().min(8).max(2000),
  provider: z.string().optional(),
});

function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export async function POST(req: Request) {
  const limit = rateLimit(`cs:${clientIp(req)}`);
  if (!limit.ok) {
    return Response.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 },
    );
  }

  let body: z.infer<typeof bodySchema>;
  try {
    body = bodySchema.parse(await req.json());
  } catch {
    return Response.json(
      { error: "Describe a system in 8 to 2000 characters." },
      { status: 400 },
    );
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
    const caseStudy = await generateCaseStudy(body.input, providerId);
    return Response.json({ caseStudy });
  } catch (err) {
    console.error("case-study error:", err);
    return Response.json(
      { error: "Could not generate a breakdown. Try again or switch the model." },
      { status: 502 },
    );
  }
}
