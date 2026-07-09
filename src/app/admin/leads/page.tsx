import AdminShell from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { leadsDal } from "@/lib/dal/leads";

export const dynamic = "force-dynamic";
export const metadata = { title: "Leads · Admin" };

export default async function AdminLeadsPage() {
  const leads = await leadsDal.list();

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
      <div className="divide-y divide-border rounded-lg border border-border">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="flex items-center justify-between gap-3 p-3"
          >
            <div className="min-w-0">
              <p className="truncate font-medium">{lead.leadName}</p>
              <p className="truncate text-xs text-muted-foreground">
                {lead.service} · {lead.location}
                {lead.partner ? ` · ${lead.partner}` : ""}
              </p>
            </div>
            <Badge
              variant={lead.status === "REFERRED" ? "secondary" : "outline"}
            >
              {lead.status}
            </Badge>
          </div>
        ))}
        {leads.length === 0 ? (
          <p className="p-6 text-center text-sm text-muted-foreground">
            No leads yet. The referral demo writes here.
          </p>
        ) : null}
      </div>
    </AdminShell>
  );
}
