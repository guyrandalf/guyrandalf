import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  featured: boolean;
}

export function Skills({ skills }: { skills: SkillItem[] }) {
  if (skills.length === 0) return null;

  // Preserve DAL ordering (already sorted by order, then name) while grouping.
  const groups = new Map<string, SkillItem[]>();
  for (const skill of skills) {
    const bucket = groups.get(skill.category) ?? [];
    bucket.push(skill);
    groups.set(skill.category, bucket);
  }

  return (
    <section id="skills" className="scroll-mt-24 py-14">
      <SectionHeader
        eyebrow="Skills"
        title="What I build with"
        description="The stack I reach for, day to day. Highlighted ones are where I go deepest."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {[...groups.entries()].map(([category, items], i) => (
          <Reveal key={category} delay={(i % 2) * 0.06}>
            <div className="h-full rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill) => (
                  <span
                    key={skill.id}
                    className={cn(
                      "rounded-md border px-2.5 py-1 text-sm",
                      skill.featured
                        ? "border-primary/30 bg-primary/10 font-medium text-primary"
                        : "border-border bg-muted text-foreground",
                    )}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
