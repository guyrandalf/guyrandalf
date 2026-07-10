"use client";

import { useActionState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  createSkill,
  deleteSkill,
  type ResumeFormState,
} from "@/lib/admin/resume-actions";

type Skill = {
  id: string;
  name: string;
  category: string;
  featured: boolean;
};

const field =
  "rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function SkillsManager({ items }: { items: Skill[] }) {
  const [state, action, pending] = useActionState<
    ResumeFormState | null,
    FormData
  >(createSkill, null);

  // Existing categories power the autocomplete + the grouped display.
  const categories = [...new Set(items.map((s) => s.category))];

  return (
    <div className="space-y-6">
      <form
        action={action}
        className="flex flex-wrap items-end gap-2 rounded-lg border border-border p-4"
      >
        <div className="space-y-1">
          <label className="text-sm font-medium">Name</label>
          <input name="name" required className={field} />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Category</label>
          <input
            name="category"
            list="skill-categories"
            required
            className={field}
          />
          <datalist id="skill-categories">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Order</label>
          <input
            name="order"
            type="number"
            defaultValue={0}
            className={`${field} w-20`}
          />
        </div>
        <label className="flex items-center gap-2 pb-2 text-sm">
          <input type="checkbox" name="featured" /> Featured
        </label>
        <Button type="submit" disabled={pending}>
          {pending ? "Adding…" : "Add skill"}
        </Button>
        {state?.error ? (
          <p className="w-full text-sm text-destructive">{state.error}</p>
        ) : null}
      </form>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat}>
            <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {cat}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items
                .filter((s) => s.category === cat)
                .map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2.5 py-1 text-sm"
                  >
                    {s.name}
                    {s.featured ? (
                      <span className="text-primary" title="Featured">
                        ★
                      </span>
                    ) : null}
                    <DeleteSkill id={s.id} />
                  </span>
                ))}
            </div>
          </div>
        ))}
        {items.length === 0 ? (
          <p className="rounded-lg border border-border p-6 text-center text-sm text-muted-foreground">
            No skills yet.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function DeleteSkill({ id }: { id: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(() => deleteSkill(id))}
      className="ml-0.5 rounded text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
      aria-label="Delete skill"
    >
      ✕
    </button>
  );
}
