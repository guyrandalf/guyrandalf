import { About } from "@/components/home/about";
import { Capabilities } from "@/components/home/capabilities";
import { Contact } from "@/components/home/contact";
import { EducationSection } from "@/components/home/education";
import { Hero } from "@/components/home/hero";
import {
  type NativeProject,
  NativeRuntime,
} from "@/components/home/native-runtime";
import type { CardProject } from "@/components/home/project-card";
import { Skills } from "@/components/home/skills";
import { Work } from "@/components/home/work";
import { educationDal } from "@/lib/dal/education";
import { projectsDal } from "@/lib/dal/projects";
import { skillsDal } from "@/lib/dal/skills";

// Admin-editable content, render fresh (Phase 6 adds tag-based caching).
export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, skills, education] = await Promise.all([
    projectsDal.listPublished(),
    skillsDal.list(),
    educationDal.list(),
  ]);

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
      <Skills skills={skills} />
      <EducationSection items={education} />
      <About />
      <Contact />
    </>
  );
}
