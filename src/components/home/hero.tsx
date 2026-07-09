"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PROFILE } from "@/lib/ai/profile";
import { SpecStrip } from "./spec-strip";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  const reduce = useReducedMotion();
  const group = reduce
    ? {}
    : {
        variants: container,
        initial: "hidden" as const,
        animate: "show" as const,
      };
  const el = reduce ? {} : { variants: item };

  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-24">
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 -z-10"
      />
      <motion.div {...group} className="mx-auto max-w-3xl text-center">
        <motion.p
          {...el}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground shadow-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Model card
        </motion.p>
        <motion.h1
          {...el}
          className="font-display text-5xl font-semibold leading-[1.03] tracking-tight text-balance sm:text-7xl"
        >
          {PROFILE.name}
        </motion.h1>
        <motion.p
          {...el}
          className="mt-5 font-display text-2xl font-medium tracking-tight text-balance sm:text-3xl"
        >
          I ship <span className="text-primary">production AI systems</span>,
          end to end.
        </motion.p>
        <motion.p
          {...el}
          className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground"
        >
          {PROFILE.summary}
        </motion.p>
        <motion.div
          {...el}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            asChild
            size="lg"
            className="bg-violet-cta text-white shadow-lg shadow-primary/20 hover:opacity-95"
          >
            <Link href="/assistant">Ask the assistant</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#work">See the work</Link>
          </Button>
        </motion.div>
        <motion.div {...el} className="mt-12">
          <SpecStrip
            items={[
              { label: "Role", value: PROFILE.role },
              { label: "Providers", value: "Grok · Gemini · swap-ready" },
              { label: "Runtime", value: "Web + on-device (Swift)" },
              {
                label: "Status",
                value: (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Open to work · US hours
                  </span>
                ),
              },
            ]}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
