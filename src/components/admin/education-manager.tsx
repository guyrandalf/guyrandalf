"use client";

import type { ReactNode } from "react";
import { useActionState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  createEducation,
  deleteEducation,
  type ResumeFormState,
} from "@/lib/admin/resume-actions";

type Edu = {
  id: string;
  school: string;
  credential: string;
  field: string | null;
  startYear: number;
  endYear: number | null;
  current: boolean;
};

const field =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

export function EducationManager({ items }: { items: Edu[] }) {
  const [state, action, pending] = useActionState<
    ResumeFormState | null,
    FormData
  >(createEducation, null);

  return (
    <div className="space-y-6">
      <form
        action={action}
        className="grid gap-3 rounded-lg border border-border p-4 sm:grid-cols-2"
      >
        <Field label="School">
          <input name="school" required className={field} />
        </Field>
        <Field label="Credential (degree / certificate)">
          <input name="credential" required className={field} />
        </Field>
        <Field label="Field of study (optional)">
          <input name="field" className={field} />
        </Field>
        <Field label="Display order">
          <input
            name="order"
            type="number"
            defaultValue={0}
            className={field}
          />
        </Field>
        <Field label="Start year">
          <input
            name="startYear"
            type="number"
            required
            placeholder="2023"
            className={field}
          />
        </Field>
        <Field label="End year (leave blank if current)">
          <input
            name="endYear"
            type="number"
            placeholder="2026"
            className={field}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Description (optional)">
            <textarea name="description" rows={2} className={field} />
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" name="current" /> I currently study here
        </label>
        {state?.error ? (
          <p className="text-sm text-destructive sm:col-span-2">
            {state.error}
          </p>
        ) : null}
        <div className="sm:col-span-2">
          <Button type="submit" disabled={pending}>
            {pending ? "Adding…" : "Add education"}
          </Button>
        </div>
      </form>

      <div className="divide-y divide-border rounded-lg border border-border">
        {items.map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between gap-3 p-3"
          >
            <div className="min-w-0">
              <p className="truncate font-medium">{e.school}</p>
              <p className="truncate text-xs text-muted-foreground">
                {e.credential} · {e.startYear} -{" "}
                {e.current || e.endYear == null ? "Present" : e.endYear}
              </p>
            </div>
            <DeleteEducation id={e.id} />
          </div>
        ))}
        {items.length === 0 ? (
          <p className="p-6 text-center text-sm text-muted-foreground">
            No education yet.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function DeleteEducation({ id }: { id: string }) {
  const [pending, start] = useTransition();
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (confirm("Delete this education entry?")) {
          start(() => deleteEducation(id));
        }
      }}
    >
      Delete
    </Button>
  );
}
