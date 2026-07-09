"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deleteProject, togglePublish } from "@/lib/admin/actions";

export function ProjectRowActions({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const [pending, start] = useTransition();
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        disabled={pending}
        onClick={() => start(() => togglePublish(id, !published))}
      >
        {published ? "Unpublish" : "Publish"}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        disabled={pending}
        onClick={() => {
          if (confirm("Delete this project? This cannot be undone.")) {
            start(() => deleteProject(id));
          }
        }}
      >
        Delete
      </Button>
    </>
  );
}
