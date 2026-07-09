import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "./section-header";
import { Explainer } from "@/components/explain/explainer";

interface MediaItem {
  type: string;
  url: string;
  caption: string | null;
}

export interface NativeProject {
  id: string;
  title: string;
  summary: string;
  explainerTech: string | null;
  explainerPlain: string | null;
  thumbnailUrl: string | null;
  media: MediaItem[];
}

export function NativeRuntime({ apps }: { apps: NativeProject[] }) {
  if (apps.length === 0) return null;
  return (
    <section className="py-14">
      <SectionHeader
        eyebrow="On-device runtime"
        title="AI that runs on the device"
        description="Native Swift apps built with Claude Code, running local foundation models. They can't be embedded in a web page, so here they are as video."
      />
      <div className="grid gap-6">
        {apps.map((app, i) => {
          const video = app.media.find((m) => m.type === "VIDEO");
          const image = app.media.find((m) => m.type === "IMAGE");
          const poster = image?.url ?? app.thumbnailUrl ?? undefined;
          return (
            <Reveal key={app.id} delay={(i % 2) * 0.06}>
              <div className="grid overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2">
                <div className="aspect-video overflow-hidden border-b border-border bg-muted md:aspect-auto md:border-b-0 md:border-r">
                  {video ? (
                    <video
                      src={video.url}
                      poster={poster}
                      controls
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : poster ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={poster}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full min-h-56 w-full items-center justify-center">
                      <span className="font-mono text-sm text-muted-foreground">
                        video coming soon
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center gap-2 p-6 sm:p-8">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      {app.title}
                    </h3>
                    <Explainer
                      title={app.title}
                      plain={app.explainerPlain ?? app.summary}
                      technical={app.explainerTech ?? app.summary}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{app.summary}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    runtime: on-device · framework: SwiftUI · built with: Claude
                    Code
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
