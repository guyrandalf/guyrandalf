import { Reveal } from "@/components/motion/reveal";
import { PROFILE } from "@/lib/ai/profile";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-14">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            About
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            A full-stack engineer who treats AI as production infrastructure.
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            I build the whole stack: data models, APIs, the AI integration
            layer, and the interface. I use Claude Code as my daily driver to
            ship faster without losing the plot. My bias is the simplest thing
            that works, guarded well, and owned end to end.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="space-y-2.5">
            {PROFILE.focus.map((f) => (
              <li
                key={f}
                className="flex gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
