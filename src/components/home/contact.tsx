import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { PROFILE } from "@/lib/ai/profile";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-14">
      <Reveal className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 text-center sm:p-16">
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-0 opacity-70"
        />
        <div className="relative">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Deploy me
          </p>
          <h2 className="mx-auto max-w-xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Want an engineer who ships production AI end to end?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
            Available for full-time work. Remote, US business hours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-violet-cta text-white">
              <Link href={`mailto:${PROFILE.contact.email}`}>Email me</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/assistant">Ask my assistant</Link>
            </Button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4 font-mono text-xs text-muted-foreground">
            <Link
              href={PROFILE.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              github
            </Link>
            <span aria-hidden>·</span>
            <Link
              href={PROFILE.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              linkedin
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
