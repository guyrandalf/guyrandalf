import PortfolioChat from "@/components/ai/portfolio-chat";

export const metadata = {
  title: "Ask about my work",
};

export default function AssistantPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 py-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Ask about my work</h1>
        <p className="text-muted-foreground">
          A tool-calling assistant grounded in this site&apos;s database, no
          made-up answers. Switch the model to watch the same feature run on Grok
          or Gemini.
        </p>
      </div>
      <PortfolioChat />
    </div>
  );
}
