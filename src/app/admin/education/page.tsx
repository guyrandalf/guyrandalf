import AdminShell from "@/components/admin/admin-shell";
import { EducationManager } from "@/components/admin/education-manager";
import { educationDal } from "@/lib/dal/education";

export const dynamic = "force-dynamic";
export const metadata = { title: "Education · Admin" };

export default async function AdminEducationPage() {
  const items = await educationDal.list();

  return (
    <AdminShell>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Education</h1>
        <p className="text-sm text-muted-foreground">
          Resume-style entries shown on the home page. Add completed and current
          study.
        </p>
      </div>
      <EducationManager items={items} />
    </AdminShell>
  );
}
