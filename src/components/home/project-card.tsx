import Link from "next/link";
import { ArrowRight, ExternalLink, Code2 } from "lucide-react";
import { MotionCard } from "./motion-card";
import { Explainer } from "@/components/explain/explainer";
import { cn } from "@/lib/utils";

const KIND_STYLE: Record<
  string,
  { label: string; chip: string; bar: string; dot: string }
> = {
  AI_SYSTEM: {
    label: "Live AI system",
    chip: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
    bar: "bg-violet-500",
    dot: "bg-violet-500",
  },
  EXTERNAL_LIVE: {
    label: "Live · external",
    chip: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
    bar: "bg-sky-500",
    dot: "bg-sky-500",
  },
  INTERNAL_DEMO: {
    label: "Demo",
    chip: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
    bar: "bg-amber-500",
    dot: "bg-amber-500",
  },
  NATIVE_APP: {
    label: "Native app",
    chip: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
    bar: "bg-emerald-500",
    dot: "bg-emerald-500",
  },
};

export interface CardProject {
  id: string;
  slug: string;
  title: string;
  summary: string;
  kind: string;
  tags: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  thumbnailUrl: string | null;
  featured: boolean;
  explainerTech: string | null;
  explainerPlain: string | null;
}

export function ProjectCard({ project }: { project: CardProject }) {
  const style = KIND_STYLE[project.kind] ?? KIND_STYLE.INTERNAL_DEMO;
  const primaryHref = project.liveUrl ?? project.repoUrl ?? null;
  const internal = primaryHref?.startsWith("/") ?? false;
  const ctaLabel = project.liveUrl
    ? internal
      ? "Try it"
      : "Visit"
    : "View code";
  const external = internal
    ? {}
    : { target: "_blank" as const, rel: "noopener noreferrer" };

  return (
    <MotionCard className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-foreground/15 hover:shadow-[0_10px_34px_-8px_rgb(0_0_0/0.14)]">
      <div className={cn("h-1 w-full", style.bar)} />
      {project.thumbnailUrl ? (
        <div className="aspect-[16/9] overflow-hidden border-b border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.thumbnailUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
              style.chip,
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", style.dot)} />
            {style.label}
          </span>
          <Explainer
            title={project.title}
            plain={project.explainerPlain ?? project.summary}
            technical={project.explainerTech ?? project.summary}
          />
        </div>

        {primaryHref ? (
          <Link
            href={primaryHref}
            {...external}
            className="font-display text-lg font-semibold tracking-tight transition-colors hover:text-primary"
          >
            {project.title}
          </Link>
        ) : (
          <h3 className="font-display text-lg font-semibold tracking-tight">
            {project.title}
          </h3>
        )}

        <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        {primaryHref ? (
          <div className="mt-auto flex items-center gap-4 pt-4 text-sm">
            <Link
              href={primaryHref}
              {...external}
              className="inline-flex items-center gap-1 font-medium text-primary"
            >
              {ctaLabel}
              {internal ? (
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              ) : (
                <ExternalLink className="h-3.5 w-3.5" />
              )}
            </Link>
            {project.repoUrl && project.repoUrl !== primaryHref ? (
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                Code <Code2 className="h-3.5 w-3.5" />
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </MotionCard>
  );
}
