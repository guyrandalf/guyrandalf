import AdminShell from "@/components/admin/admin-shell";
import { ProjectForm } from "@/components/admin/project-form";

export const metadata = { title: "New project · Admin" };

export default function NewProjectPage() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold tracking-tight">New project</h1>
      <ProjectForm />
    </AdminShell>
  );
}
