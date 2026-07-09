import { projectsDal } from "@/lib/dal/projects";
import { Hero } from "@/components/home/hero";
import { Capabilities } from "@/components/home/capabilities";
import { Work } from "@/components/home/work";
import { NativeRuntime, type NativeProject } from "@/components/home/native-runtime";
import { About } from "@/components/home/about";
import { Contact } from "@/components/home/contact";
import type { CardProject } from "@/components/home/project-card";

// Admin-editable content, render fresh (Phase 6 adds tag-based caching).
export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await projectsDal.listPublished();

  const cards: CardProject[] = projects.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    kind: p.kind,
    tags: p.tags,
    liveUrl: p.liveUrl,
    repoUrl: p.repoUrl,
    thumbnailUrl: p.thumbnailUrl,
    featured: p.featured,
    explainerTech: p.explainerTech,
    explainerPlain: p.explainerPlain,
  }));

  const workCards = cards.filter((p) => p.kind !== "NATIVE_APP");
  const nativeApps: NativeProject[] = projects
    .filter((p) => p.kind === "NATIVE_APP")
    .map((p) => ({
      id: p.id,
      title: p.title,
      summary: p.summary,
      explainerTech: p.explainerTech,
      explainerPlain: p.explainerPlain,
      thumbnailUrl: p.thumbnailUrl,
      media: p.media.map((m) => ({
        type: m.type,
        url: m.url,
        caption: m.caption,
      })),
    }));

  return (
    <>
      <Hero />
      <Capabilities />
      <Work projects={workCards} />
      <NativeRuntime apps={nativeApps} />
      <About />
      <Contact />
    </>
  );
}
