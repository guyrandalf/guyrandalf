import Link from "next/link";
import AdminShell from "@/components/admin/admin-shell";
import { ProjectRowActions } from "@/components/admin/project-row-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projectsDal } from "@/lib/dal/projects";

export const dynamic = "force-dynamic";
export const metadata = { title: "Projects · Admin" };

export default async function AdminProjectsPage() {
  const projects = await projectsDal.listAll();

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <Button asChild>
          <Link href="/admin/projects/new">New project</Link>
        </Button>
      </div>

      <div className="divide-y divide-border rounded-lg border border-border">
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between gap-3 p-3"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate font-medium">{p.title}</span>
                {!p.published ? <Badge variant="outline">draft</Badge> : null}
                {p.featured ? (
                  <Badge variant="secondary">featured</Badge>
                ) : null}
              </div>
              <p className="truncate text-xs text-muted-foreground">
                {p.slug} · {p.kind}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Button asChild variant="outline" size="sm">
                <Link href={`/admin/projects/${p.id}/edit`}>Edit</Link>
              </Button>
              <ProjectRowActions id={p.id} published={p.published} />
            </div>
          </div>
        ))}
        {projects.length === 0 ? (
          <p className="p-6 text-center text-sm text-muted-foreground">
            No projects yet.
          </p>
        ) : null}
      </div>
    </AdminShell>
  );
}
