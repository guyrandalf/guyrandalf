import AdminShell from "@/components/admin/admin-shell";
import { SkillsManager } from "@/components/admin/skills-manager";
import { skillsDal } from "@/lib/dal/skills";

export const dynamic = "force-dynamic";
export const metadata = { title: "Skills · Admin" };

export default async function AdminSkillsPage() {
  const items = await skillsDal.list();

  return (
    <AdminShell>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Skills</h1>
        <p className="text-sm text-muted-foreground">
          Grouped by category on the home page. Mark the ones you go deepest on
          as featured.
        </p>
      </div>
      <SkillsManager items={items} />
    </AdminShell>
  );
}
