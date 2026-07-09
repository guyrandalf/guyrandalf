import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The model-card "spec strip": mono label/value rows with hairline dividers. */
export function SpecStrip({
  items,
  className,
}: {
  items: { label: string; value: ReactNode }[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border font-mono text-sm sm:grid-cols-2",
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1 bg-card px-4 py-3">
          <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {item.label}
          </dt>
          <dd className="text-foreground">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
