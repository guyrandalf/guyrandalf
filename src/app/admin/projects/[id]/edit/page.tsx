import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/admin-shell";
import { MediaManager } from "@/components/admin/media-manager";
import { ProjectForm } from "@/components/admin/project-form";
import { projectsDal } from "@/lib/dal/projects";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit project · Admin" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await projectsDal.byId(id);
  if (!project) notFound();

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold tracking-tight">
        Edit: {project.title}
      </h1>
      <ProjectForm project={project} />
      <div className="space-y-3 border-t border-border/60 pt-6">
        <h2 className="text-lg font-semibold">Media</h2>
        <p className="text-sm text-muted-foreground">
          Upload screenshots or videos (e.g. your Swift / CoreAI apps).
        </p>
        <MediaManager projectId={project.id} media={project.media} />
      </div>
    </AdminShell>
  );
}
