import AdminShell from "@/components/admin/admin-shell";
import { ChangePasswordForm } from "@/components/admin/change-password-form";

export const dynamic = "force-dynamic";
export const metadata = { title: "Settings · Admin" };

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <div className="max-w-md rounded-lg border border-border p-5">
        <h2 className="font-medium">Change password</h2>
        <p className="mb-4 mt-1 text-sm text-muted-foreground">
          Updates your admin login and signs out your other sessions.
        </p>
        <ChangePasswordForm />
      </div>
    </AdminShell>
  );
}
