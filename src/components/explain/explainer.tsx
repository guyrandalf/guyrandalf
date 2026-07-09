"use client";

import { Info } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { useExplainMode, type ExplainMode } from "./explain-mode";
import { cn } from "@/lib/utils";

interface ExplainerProps {
  title?: string;
  technical: string;
  plain: string;
  className?: string;
}

const MODES: { value: ExplainMode; label: string }[] = [
  { value: "plain", label: "Simple" },
  { value: "technical", label: "Technical" },
];

/**
 * Click/tap to open a "what is this / why it matters" card. The Simple ⇄
 * Technical switch lives inside it (and syncs the global toggle), so flipping it
 * changes the text live. Click-based so it works on touch, not just hover.
 */
export function Explainer({ title, technical, plain, className }: ExplainerProps) {
  const { mode, setMode } = useExplainMode();
  const text = mode === "technical" ? technical : plain;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-label={title ? `Explain: ${title}` : "Explain"}
          className={cn(
            "inline-flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground",
            className,
          )}
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={6}
          collisionPadding={12}
          className="z-50 w-80 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <div className="mb-2 flex items-center justify-between gap-3">
            {title ? (
              <p className="text-sm font-semibold leading-tight">{title}</p>
            ) : (
              <span />
            )}
            <div className="flex shrink-0 rounded-md border border-border p-0.5">
              {MODES.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMode(m.value)}
                  aria-pressed={mode === m.value}
                  className={cn(
                    "rounded px-1.5 py-0.5 text-[11px] font-medium transition-colors",
                    mode === m.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{text}</p>
          <Popover.Arrow className="fill-border" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
