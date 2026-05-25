import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutGrid,
  Users,
  FileSignature,
  ShieldCheck,
  History,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/students", label: "Estudantes", icon: Users },
  { to: "/issuance", label: "Emissão", icon: FileSignature },
  { to: "/validation", label: "Validação", icon: ShieldCheck },
  { to: "/history", label: "Histórico", icon: History },
  { to: "/settings", label: "Definições", icon: Settings },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-sidebar border-r border-sidebar-border">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-sm">
          <GraduationCap className="size-5" />
        </div>
        <div className="leading-tight">
          <div className="text-base font-bold text-primary">GCE</div>
          <div className="text-xs text-muted-foreground">Gerenciamento Academico</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map((item) => {
          const active = pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-sidebar-border">
        <Link
          to="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/60"
        >
          <LogOut className="size-4" />
          Sair
        </Link>
      </div>
    </aside>
  );
}