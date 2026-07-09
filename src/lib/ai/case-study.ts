import "server-only";
import { generateObject } from "ai";
import { z } from "zod";
import { languageModel, type ProviderId } from "./providers";

// Structured architecture breakdown. generateObject forces the model to return
// data matching this schema (no free-text parsing).
export const caseStudySchema = z.object({
  title: z.string().describe("A concise title for the system."),
  overview: z.string().describe("A 2-3 sentence plain-language overview."),
  components: z
    .array(z.object({ name: z.string(), responsibility: z.string() }))
    .describe("The main building blocks and what each is responsible for."),
  dataFlow: z
    .array(z.string())
    .describe(
      "Ordered steps describing how a request or data flows through the system.",
    ),
  tradeoffs: z
    .array(z.object({ decision: z.string(), rationale: z.string() }))
    .describe("Key design decisions and why they were made."),
  risks: z.array(z.string()).describe("Failure modes or risks to watch for."),
  stack: z
    .array(z.string())
    .describe("Likely technologies and tools involved."),
});

export type CaseStudy = z.infer<typeof caseStudySchema>;

export async function generateCaseStudy(
  input: string,
  provider: ProviderId,
): Promise<CaseStudy> {
  const { object } = await generateObject({
    model: languageModel(provider),
    schema: caseStudySchema,
    system:
      "You are a senior software architect. Given a description or a repo URL, produce a clear, concrete, pragmatic architecture breakdown. Never use em dashes.",
    prompt: `Break down this system into its architecture:\n\n${input}`,
    maxRetries: 2,
  });
  return object;
}
