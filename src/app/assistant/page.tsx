import PortfolioChat from "@/components/ai/portfolio-chat";

export const metadata = {
  title: "Ask about my work",
};

export default function AssistantPage() {
  return (
    <div className="mx-auto max-w-2xl py-14">
      <div className="mb-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Assistant
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Ask about my work
        </h1>
        <p className="mt-3 text-pretty text-muted-foreground">
          A tool-calling assistant grounded in this site&apos;s database, no
          made-up answers. Switch the model to watch the same feature run on Grok
          or Gemini.
        </p>
      </div>
      <PortfolioChat />
    </div>
  );
}
