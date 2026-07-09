"use client";

import type { ReactNode } from "react";
import { Info } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useExplainMode } from "./explain-mode";

interface ExplainerProps {
  title?: string;
  technical: string;
  plain: string;
  /** Optional custom trigger; defaults to a small info button. */
  children?: ReactNode;
  className?: string;
}

/**
 * Hover explainer used across the site: shows a "what is this / why it matters"
 * card whose wording follows the global Simple ⇄ Technical toggle.
 */
export function Explainer({
  title,
  technical,
  plain,
  children,
  className,
}: ExplainerProps) {
  const { mode } = useExplainMode();
  const text = mode === "technical" ? technical : plain;

  return (
    <HoverCard openDelay={120} closeDelay={80}>
      <HoverCardTrigger asChild>
        {children ?? (
          <button
            type="button"
            aria-label={title ? `Explain: ${title}` : "Explain"}
            className={
              className ??
              "inline-flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            }
          >
            <Info className="h-3.5 w-3.5" />
          </button>
        )}
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-1.5">
          {title ? <p className="text-sm font-semibold">{title}</p> : null}
          <p className="text-sm text-muted-foreground">{text}</p>
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground/60">
            {mode === "technical" ? "Technical view" : "Simple view"}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
