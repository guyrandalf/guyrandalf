import { projectsDal } from "@/lib/dal/projects";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Explainer } from "@/components/explain/explainer";
import type { ProjectKind } from "@/generated/prisma/client";

// Content is admin-editable, so render fresh from the DB (Phase 5 adds caching).
export const dynamic = "force-dynamic";

const KIND_LABEL: Record<ProjectKind, string> = {
  AI_SYSTEM: "Live AI system",
  EXTERNAL_LIVE: "Live · external",
  INTERNAL_DEMO: "Demo",
  NATIVE_APP: "Native app",
};

export default async function Home() {
  const projects = await projectsDal.listPublished();

  return (
    <div className="space-y-20 py-16">
      <section className="flex flex-col items-center gap-6 text-center">
        <span className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground">
          Phase 2 · content now served from Postgres
        </span>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          Building production AI systems, end to end.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground text-pretty">
          Full-stack AI engineer. RAG, agents, and LLM-integrated products,
          shipped with Claude Code.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Selected work</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    <CardTitle>{project.title}</CardTitle>
                    <Explainer
                      title={project.title}
                      technical={project.explainerTech ?? project.summary}
                      plain={project.explainerPlain ?? project.summary}
                    />
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {KIND_LABEL[project.kind]}
                  </Badge>
                </div>
                <CardDescription>{project.summary}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
