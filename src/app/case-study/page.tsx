import CaseStudyGenerator from "@/components/ai/case-study-generator";

export const metadata = {
  title: "AI case-study generator",
};

export default function CaseStudyPage() {
  return (
    <div className="mx-auto max-w-3xl py-14">
      <div className="mb-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Case study
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          AI case-study generator
        </h1>
        <p className="mt-3 text-pretty text-muted-foreground">
          Describe a system (or paste a repo URL) and get a structured
          architecture breakdown, forced into a typed schema so it&apos;s never
          free-text guesswork. Runs on Grok or Gemini.
        </p>
      </div>
      <CaseStudyGenerator />
    </div>
  );
}
