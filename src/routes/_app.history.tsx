import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  Download,
  Filter,
  FileText,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { useDocumentTitle } from "@/lib/use-document-title";

export const Route = createFileRoute("/_app/history")({
  component: HistoryPage,
});

type Status = "Emitido" | "Pendente" | "Rejeitado";

type HistoryRecord = {
  code: string;
  student: string;
  course: string;
  type: string;
  date: string;
  status: Status;
};

const records: HistoryRecord[] = [
  { code: "GCE-2025-0142", student: "Maria Inês Silva", course: "Eng. Informática", type: "Certificado", date: "22 Mai 2026", status: "Emitido" },
  { code: "GCE-2025-0141", student: "João Pedro Costa", course: "Mestrado Gestão", type: "Diploma", date: "22 Mai 2026", status: "Emitido" },
  { code: "GCE-2025-0140", student: "Ana Beatriz Sousa", course: "Doutoramento Física", type: "Declaração", date: "21 Mai 2026", status: "Pendente" },
  { code: "GCE-2025-0139", student: "Carlos Eduardo Lima", course: "Lic. Design", type: "Certificado", date: "21 Mai 2026", status: "Emitido" },
  { code: "GCE-2025-0138", student: "Marta Filipa Dias", course: "Pós-Grad. Marketing", type: "Certificado", date: "20 Mai 2026", status: "Emitido" },
  { code: "GCE-2025-0137", student: "Rui Miguel Santos", course: "Lic. Direito", type: "Diploma", date: "20 Mai 2026", status: "Rejeitado" },
  { code: "GCE-2025-0136", student: "Sofia Margarida Pinto", course: "Mestrado Psicologia", type: "Declaração", date: "19 Mai 2026", status: "Emitido" },
  { code: "GCE-2025-0135", student: "Tiago André Ferreira", course: "Lic. Economia", type: "Certificado", date: "19 Mai 2026", status: "Emitido" },
  { code: "GCE-2025-0134", student: "Inês Luísa Carvalho", course: "Mestrado Arquitetura", type: "Diploma", date: "18 Mai 2026", status: "Pendente" },
  { code: "GCE-2025-0133", student: "Pedro Henrique Rocha", course: "Lic. Medicina", type: "Certificado", date: "18 Mai 2026", status: "Emitido" },
];

function HistoryPage() {
  useDocumentTitle("Histórico");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"Todos" | Status>("Todos");

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const matchesQuery =
        !query ||
        r.student.toLowerCase().includes(query.toLowerCase()) ||
        r.code.toLowerCase().includes(query.toLowerCase()) ||
        r.course.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === "Todos" || r.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Histórico</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Todas as emissões registadas no sistema.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-border bg-card text-sm font-medium hover:bg-secondary transition-colors">
          <Download className="size-4" /> Exportar CSV
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total", value: records.length },
          { label: "Emitidos", value: records.filter((r) => r.status === "Emitido").length },
          { label: "Pendentes", value: records.filter((r) => r.status === "Pendente").length },
          { label: "Rejeitados", value: records.filter((r) => r.status === "Rejeitado").length },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl">
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Procurar por estudante, código ou curso..."
              className="w-full h-10 pl-10 pr-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary">
            {(["Todos", "Emitido", "Pendente", "Rejeitado"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 h-8 rounded-md text-xs font-medium transition-colors ${
                  filter === f
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-border text-sm font-medium hover:bg-secondary transition-colors">
            <Filter className="size-4" /> Filtros
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-muted-foreground border-b border-border">
                <th className="px-4 py-3 font-medium">Código</th>
                <th className="px-4 py-3 font-medium">Estudante</th>
                <th className="px-4 py-3 font-medium">Curso</th>
                <th className="px-4 py-3 font-medium">Tipo</th>
                <th className="px-4 py-3 font-medium">Data</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.code} className="border-b border-border last:border-0 hover:bg-secondary/40">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.code}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{r.student}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.course}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <FileText className="size-3" /> {r.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      r.status === "Emitido"
                        ? "bg-green-100 text-green-700"
                        : r.status === "Pendente"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground" title="Ver">
                        <Eye className="size-4" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground" title="Descarregar">
                        <Download className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                    Nenhum registo encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-border text-xs text-muted-foreground">
          <span>A mostrar {filtered.length} de {records.length} registos</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-md hover:bg-secondary disabled:opacity-50" disabled>
              <ChevronLeft className="size-4" />
            </button>
            <span className="px-2">Página 1 de 1</span>
            <button className="p-1.5 rounded-md hover:bg-secondary disabled:opacity-50" disabled>
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}