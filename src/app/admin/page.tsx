import Link from "next/link";
import AdminShell from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { leadsDal } from "@/lib/dal/leads";
import { projectsDal } from "@/lib/dal/projects";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin" };

export default async function AdminDashboard() {
  const [projects, leads] = await Promise.all([
    projectsDal.listAll(),
    leadsDal.list(),
  ]);

  return (
    <AdminShell>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Projects" value={projects.length} />
        <Stat
          label="Published"
          value={projects.filter((p) => p.published).length}
        />
        <Stat label="Leads" value={leads.length} />
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/admin/projects/new">New project</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/projects">Manage projects</Link>
        </Button>
      </div>
    </AdminShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{value}</CardTitle>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardHeader>
    </Card>
  );
}
