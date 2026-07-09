"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  changePassword,
  type PasswordFormState,
} from "@/lib/admin/account-actions";

const field =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState<
    PasswordFormState | null,
    FormData
  >(changePassword, null);

  return (
    <form action={action} className="max-w-sm space-y-3">
      <div className="space-y-1.5">
        <label htmlFor="current" className="text-sm font-medium">
          Current password
        </label>
        <input
          id="current"
          name="current"
          type="password"
          autoComplete="current-password"
          required
          className={field}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="next" className="text-sm font-medium">
          New password
        </label>
        <input
          id="next"
          name="next"
          type="password"
          autoComplete="new-password"
          required
          className={field}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="confirm" className="text-sm font-medium">
          Confirm new password
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          className={field}
        />
      </div>
      {state?.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}
      {state?.ok ? (
        <p className="text-sm text-emerald-600">
          Password updated. Other sessions were signed out.
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Updating…" : "Change password"}
      </Button>
    </form>
  );
}
