import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "./section-header";

export interface EducationItem {
  id: string;
  school: string;
  credential: string;
  field: string | null;
  startYear: number;
  endYear: number | null;
  current: boolean;
  description: string | null;
}

function yearRange(item: EducationItem) {
  const end =
    item.current || item.endYear == null ? "Present" : String(item.endYear);
  return `${item.startYear} - ${end}`;
}

export function EducationSection({ items }: { items: EducationItem[] }) {
  if (items.length === 0) return null;

  return (
    <section id="education" className="scroll-mt-24 py-14">
      <SectionHeader
        eyebrow="Education"
        title="Where I'm learning"
        description="Formal study alongside the daily practice of shipping real software."
      />
      <div className="mx-auto max-w-2xl space-y-4">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={(i % 3) * 0.05}>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {item.school}
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {yearRange(item)}
                  {item.current ? (
                    <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                      current
                    </span>
                  ) : null}
                </span>
              </div>
              <p className="mt-1 text-sm text-foreground">
                {item.credential}
                {item.field ? (
                  <span className="text-muted-foreground"> · {item.field}</span>
                ) : null}
              </p>
              {item.description ? (
                <p className="mt-2 text-pretty text-sm text-muted-foreground">
                  {item.description}
                </p>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
