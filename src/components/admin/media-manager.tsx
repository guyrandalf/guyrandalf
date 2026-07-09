"use client";

import { useActionState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  deleteMedia,
  type MediaFormState,
  uploadMedia,
} from "@/lib/admin/actions";

type MediaItem = {
  id: string;
  type: "IMAGE" | "VIDEO";
  url: string;
  caption: string | null;
};

const field =
  "rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function MediaManager({
  projectId,
  media,
}: {
  projectId: string;
  media: MediaItem[];
}) {
  const [state, action, pending] = useActionState<
    MediaFormState | null,
    FormData
  >(uploadMedia, null);

  return (
    <div className="space-y-4">
      <form action={action} className="flex flex-wrap items-end gap-2">
        <input type="hidden" name="projectId" value={projectId} />
        <input type="file" name="file" required className="text-sm" />
        <select name="type" defaultValue="IMAGE" className={field}>
          <option value="IMAGE">Image</option>
          <option value="VIDEO">Video</option>
        </select>
        <input
          name="caption"
          placeholder="Caption (optional)"
          className={field}
        />
        <Button type="submit" disabled={pending}>
          {pending ? "Uploading…" : "Upload"}
        </Button>
      </form>
      {state?.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-3">
        {media.map((m) => (
          <div
            key={m.id}
            className="space-y-1 rounded-md border border-border p-2"
          >
            {m.type === "IMAGE" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={m.url}
                alt={m.caption ?? ""}
                className="h-28 w-full rounded object-cover"
              />
            ) : (
              <video src={m.url} controls className="h-28 w-full rounded" />
            )}
            {m.caption ? (
              <p className="truncate text-xs text-muted-foreground">
                {m.caption}
              </p>
            ) : null}
            <DeleteMedia id={m.id} projectId={projectId} />
          </div>
        ))}
      </div>
    </div>
  );
}

function DeleteMedia({ id, projectId }: { id: string; projectId: string }) {
  const [pending, start] = useTransition();
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() => start(() => deleteMedia(id, projectId))}
    >
      Remove
    </Button>
  );
}
