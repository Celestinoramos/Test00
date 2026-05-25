import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  FileText,
  History as HistoryIcon,
  ArrowRight,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import { useDocumentTitle } from "@/lib/use-document-title";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

const stats = [
  { label: "Total de Estudantes", value: "12,450", icon: Users, change: "+8.2%", positive: true },
  { label: "Documentos Emitidos", value: "8,234", icon: FileText, change: "+12.5%", positive: true },
  { label: "Emissões Recentes", value: "142", icon: HistoryIcon, change: "+23", positive: true },
  { label: "Taxa de Aprovação", value: "94.2%", icon: TrendingUp, change: "+2.1%", positive: true },
];

const activity = [
  { name: "Maria Inês Silva", course: "Licenciatura em Engenharia", when: "Hoje, 10:23", status: "Emitido" },
  { name: "João Pedro Costa", course: "Mestrado em Gestão", when: "Hoje, 09:15", status: "Emitido" },
  { name: "Ana Beatriz Sousa", course: "Doutoramento em Física", when: "Ontem, 16:45", status: "Pendente" },
  { name: "Carlos Eduardo Lima", course: "Licenciatura em Design", when: "Ontem, 14:30", status: "Emitido" },
  { name: "Marta Filipa Dias", course: "Pós-Graduação em Marketing", when: "22 Abr, 11:20", status: "Emitido" },
  { name: "Rui Miguel Santos", course: "Licenciatura em Direito", when: "22 Abr, 09:00", status: "Rejeitado" },
  { name: "Sofia Margarida Pinto", course: "Mestrado em Psicologia", when: "21 Abr, 15:45", status: "Emitido" },
];

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
const barData = [42, 58, 71, 95, 64, 82];

function Dashboard() {
  useDocumentTitle("Dashboard");
  const max = Math.max(...barData);
  return (
    <div className="space-y-6 w-full">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bem-vindo, Administrador</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Aqui está o resumo da atividade do sistema de certificação.
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-xs text-muted-foreground">Última atualização</p>
          <p className="text-sm font-medium text-foreground">Hoje, 10:45</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5 flex items-start justify-between hover:shadow-sm transition-shadow">
            <div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-3xl font-bold text-foreground mt-2">{s.value}</p>
              <p className={`text-xs font-medium mt-1 ${s.positive ? "text-green-600" : "text-red-500"}`}>
                {s.change} vs. mês anterior
              </p>
            </div>
            <div className="size-11 rounded-full flex items-center justify-center bg-secondary text-primary">
              <s.icon className="size-5" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Emissões por Mês</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Total de certificados emitidos nos últimos 6 meses</p>
            </div>
            <button className="text-sm text-primary font-medium hover:underline inline-flex items-center gap-1">
              Ver Relatório <ArrowRight className="size-3.5" />
            </button>
          </div>
          <div className="h-72 flex items-end gap-5 px-2">
            {barData.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full">
                <div className="w-full flex-1 flex items-end relative group">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary/50 transition-all duration-300 group-hover:from-primary group-hover:to-primary/70"
                    style={{ height: `${(v / max) * 100}%` }}
                  />
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-foreground text-primary-foreground text-xs font-medium px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {v}
                  </div>
                </div>
                <span className={`text-xs font-medium ${i === 3 ? "text-primary" : "text-muted-foreground"}`}>
                  {months[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-foreground">Atividade Recente</h3>
            <span className="text-xs text-muted-foreground">7 registos</span>
          </div>
          <ul className="space-y-3.5">
            {activity.map((a) => (
              <li key={a.name} className="flex items-start gap-3">
                <div className="size-9 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                  <GraduationCap className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{a.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{a.course}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground">{a.when}</p>
                  <span className={`inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    a.status === "Emitido"
                      ? "bg-green-100 text-green-700"
                      : a.status === "Pendente"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {a.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <button className="mt-5 w-full h-10 rounded-lg border border-border text-sm font-medium hover:bg-secondary transition-colors">
            Ver Todo o Histórico
          </button>
        </div>
      </div>
    </div>
  );
}
