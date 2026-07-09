"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  captureThumbnail,
  type ProjectFormState,
  saveProject,
} from "@/lib/admin/actions";
import type { ProjectWithMedia } from "@/lib/dal/projects";

const KIND_OPTIONS = [
  { value: "AI_SYSTEM", label: "AI system" },
  { value: "EXTERNAL_LIVE", label: "External / live" },
  { value: "INTERNAL_DEMO", label: "Internal demo" },
  { value: "NATIVE_APP", label: "Native app" },
];

const field =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring";

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium">{children}</label>;
}

export function ProjectForm({ project }: { project?: ProjectWithMedia }) {
  const [state, formAction, pending] = useActionState<
    ProjectFormState | null,
    FormData
  >(saveProject, null);

  const [title, setTitle] = useState(project?.title ?? "");
  const [summary, setSummary] = useState(project?.summary ?? "");
  const [liveUrl, setLiveUrl] = useState(project?.liveUrl ?? "");
  const [thumbnailUrl, setThumbnailUrl] = useState(project?.thumbnailUrl ?? "");
  const [explainerPlain, setExplainerPlain] = useState(
    project?.explainerPlain ?? "",
  );
  const [explainerTech, setExplainerTech] = useState(
    project?.explainerTech ?? "",
  );
  const [aiBusy, setAiBusy] = useState(false);
  const [thumbBusy, setThumbBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  async function aiFill() {
    setAiBusy(true);
    setNote(null);
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: title || "this project",
          context: summary,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setExplainerPlain(data.explanation.plain);
        setExplainerTech(data.explanation.technical);
      } else {
        setNote(data.error ?? "Could not generate explainers.");
      }
    } catch {
      setNote("Network error generating explainers.");
    } finally {
      setAiBusy(false);
    }
  }

  async function grabThumb() {
    if (!liveUrl) {
      setNote("Add a live URL first.");
      return;
    }
    setThumbBusy(true);
    setNote(null);
    try {
      const r = await captureThumbnail(liveUrl);
      if (r.url) setThumbnailUrl(r.url);
      else setNote(r.error ?? "Could not capture a thumbnail.");
    } finally {
      setThumbBusy(false);
    }
  }

  return (
    <form action={formAction} className="space-y-5">
      {project ? <input type="hidden" name="id" value={project.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Title</Label>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={field}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Slug</Label>
          <input
            name="slug"
            defaultValue={project?.slug}
            placeholder="lowercase-with-hyphens"
            required
            className={field}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Summary</Label>
        <textarea
          name="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={2}
          required
          className={`${field} resize-none`}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label>Kind</Label>
          <select
            name="kind"
            defaultValue={project?.kind ?? "AI_SYSTEM"}
            className={field}
          >
            {KIND_OPTIONS.map((k) => (
              <option key={k.value} value={k.value}>
                {k.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label>Tags (comma-separated)</Label>
          <input
            name="tags"
            defaultValue={project?.tags.join(", ")}
            className={field}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Order</Label>
          <input
            name="order"
            type="number"
            defaultValue={project?.order ?? 0}
            className={field}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Repo URL</Label>
          <input
            name="repoUrl"
            defaultValue={project?.repoUrl ?? ""}
            className={field}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Live URL</Label>
          <input
            name="liveUrl"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            className={field}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label>Thumbnail URL</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={grabThumb}
            disabled={thumbBusy}
          >
            {thumbBusy ? "Capturing…" : "Capture from live URL"}
          </Button>
        </div>
        <input
          name="thumbnailUrl"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          className={field}
        />
        {thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnailUrl}
            alt="thumbnail preview"
            className="mt-2 max-h-40 rounded-md border border-border"
          />
        ) : null}
      </div>

      <div className="space-y-1.5">
        <Label>Long-form write-up (optional)</Label>
        <textarea
          name="longform"
          defaultValue={project?.longform ?? ""}
          rows={4}
          className={`${field} resize-y`}
        />
      </div>

      <div className="rounded-lg border border-border p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium">Hover explainers</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={aiFill}
            disabled={aiBusy}
          >
            {aiBusy ? "Writing…" : "AI-fill both"}
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Simple (non-technical)</Label>
            <textarea
              name="explainerPlain"
              value={explainerPlain}
              onChange={(e) => setExplainerPlain(e.target.value)}
              rows={3}
              className={`${field} resize-none`}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Technical</Label>
            <textarea
              name="explainerTech"
              value={explainerTech}
              onChange={(e) => setExplainerTech(e.target.value)}
              rows={3}
              className={`${field} resize-none`}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project ? project.featured : false}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked={project ? project.published : true}
          />
          Published
        </label>
      </div>

      {note ? <p className="text-sm text-amber-600">{note}</p> : null}
      {state?.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save project"}
      </Button>
    </form>
  );
}
