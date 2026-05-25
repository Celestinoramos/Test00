import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal, Download, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/lib/use-document-title";

export const Route = createFileRoute("/_app/students")({
  component: StudentsPage,
});

const students = [
  { initials: "AM", name: "Ana Maria Conceição", bi: "001234567LA045", course: "Engenharia Informática", status: "Ativo" },
  { initials: "JD", name: "João Diogo Silva", bi: "009876543BA092", course: "Gestão de Empresas", status: "Inativo" },
  { initials: "MP", name: "Maria Paulo Mendes", bi: "004561237CA011", course: "Direito", status: "Ativo" },
  { initials: "CA", name: "Carlos Alberto Sousa", bi: "007891234HA088", course: "Arquitetura", status: "Ativo" },
];

function StudentsPage() {
  useDocumentTitle("Estudantes");
  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestão de Estudantes</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie os registros, status e documentação dos estudantes da instituição.
          </p>
        </div>
        <Button className="h-10">
          <Plus className="size-4" /> Adicionar Estudante
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl">
        <div className="p-4 flex flex-wrap items-center gap-3 border-b border-border">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pesquisar por Nome ou Número do BI..."
              className="w-full h-10 pl-9 pr-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <button className="h-10 px-3 inline-flex items-center gap-2 rounded-md border border-input text-sm hover:bg-secondary">
            <SlidersHorizontal className="size-4" /> Filtros
          </button>
          <button className="h-10 px-3 inline-flex items-center gap-2 rounded-md border border-input text-sm hover:bg-secondary">
            <Download className="size-4" /> Exportar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                <th className="font-medium px-5 py-3">Nome do Estudante</th>
                <th className="font-medium px-5 py-3">Número do BI</th>
                <th className="font-medium px-5 py-3">Curso</th>
                <th className="font-medium px-5 py-3">Estado</th>
                <th className="font-medium px-5 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.bi} className="border-b border-border last:border-0 hover:bg-secondary/40">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-secondary text-primary text-xs font-semibold flex items-center justify-center">
                        {s.initials}
                      </div>
                      <span className="font-medium text-foreground">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-foreground/80">{s.bi}</td>
                  <td className="px-5 py-3.5 text-foreground/80">{s.course}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        s.status === "Ativo"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="text-muted-foreground">Mostrando 1 a 4 de 248 registros</p>
          <div className="flex items-center gap-1">
            <button className="size-8 rounded-md border border-input hover:bg-secondary">‹</button>
            <button className="size-8 rounded-md bg-primary text-primary-foreground">1</button>
            <button className="size-8 rounded-md border border-input hover:bg-secondary">2</button>
            <button className="size-8 rounded-md border border-input hover:bg-secondary">3</button>
            <span className="px-1 text-muted-foreground">…</span>
            <button className="size-8 rounded-md border border-input hover:bg-secondary">25</button>
            <button className="size-8 rounded-md border border-input hover:bg-secondary">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}