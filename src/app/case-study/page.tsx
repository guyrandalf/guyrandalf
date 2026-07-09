import CaseStudyGenerator from "@/components/ai/case-study-generator";

export const metadata = {
  title: "AI case-study generator",
};

export default function CaseStudyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 py-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          AI case-study generator
        </h1>
        <p className="text-muted-foreground">
          Describe a system (or paste a repo URL) and get a structured
          architecture breakdown, forced into a typed schema so it&apos;s never
          free-text guesswork. Runs on Grok or Gemini.
        </p>
      </div>
      <CaseStudyGenerator />
    </div>
  );
}
