import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/auth/actions";
import { requireAdmin } from "@/lib/auth/session";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminShell({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireAdmin();
  return (
    <div className="space-y-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
        <nav className="flex items-center gap-4 text-sm">
          {navItems.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="hidden sm:inline">{user.email}</span>
          <form action={logoutAction}>
            <Button type="submit" variant="outline" size="sm">
              Log out
            </Button>
          </form>
        </div>
      </div>
      {children}
    </div>
  );
}
