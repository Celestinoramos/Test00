import { Bell, Radio } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const notifications = [
  {
    id: 1,
    title: "Novo certificado emitido",
    description: "Maria Silva — Curso de Engenharia",
    time: "há 5 min",
    unread: true,
  },
  {
    id: 2,
    title: "Validação pendente",
    description: "3 certificados aguardam revisão",
    time: "há 1 h",
    unread: true,
  },
  {
    id: 3,
    title: "Pedido rejeitado",
    description: "João Costa — dados incompletos",
    time: "há 3 h",
    unread: false,
  },
  {
    id: 4,
    title: "Atualização do sistema",
    description: "Nova versão disponível (v1.4.0)",
    time: "ontem",
    unread: false,
  },
];

export function AppTopbar() {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-end px-6 sm:px-8">
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="size-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 size-4 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <span className="text-sm font-semibold">Notificações</span>
              <span className="text-xs text-muted-foreground">
                {unreadCount} novas
              </span>
            </div>
            <ul className="max-h-80 overflow-y-auto divide-y divide-border">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className="px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-2">
                    {n.unread && (
                      <span className="mt-1.5 size-2 rounded-full bg-primary shrink-0" />
                    )}
                    <div className={n.unread ? "flex-1" : "flex-1 pl-4"}>
                      <p className="text-sm font-medium text-foreground">
                        {n.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {n.description}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        {n.time}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-4 py-2 border-t border-border text-center">
              <button className="text-xs text-primary font-medium hover:underline">
                Ver todas
              </button>
            </div>
          </PopoverContent>
        </Popover>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Radio className="size-5" />
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-xs font-medium">
          <span className="size-2 rounded-full bg-emerald-500" />
          Online
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right leading-tight hidden sm:block">
            <div className="text-xs font-semibold text-primary">Profile</div>
          </div>
          <div className="size-9 rounded-full bg-foreground" />
        </div>
      </div>
    </header>
  );
}