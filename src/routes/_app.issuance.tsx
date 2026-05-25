import { createFileRoute } from "@tanstack/react-router";
import { FileText, Sparkles, Info, Search, Download } from "lucide-react";
import { AppLogo } from "@/components/layout/AppLogo";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/lib/use-document-title";

export const Route = createFileRoute("/_app/issuance")({
  component: IssuancePage,
});

function IssuancePage() {
  useDocumentTitle("Emissão");
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Emissão de Documentos</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure e gere documentos académicos oficiais para validação.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="space-y-5">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <FileText className="size-4 text-primary" />
              <h3 className="font-semibold text-foreground">Configuração</h3>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
                  Selecionar Estudante
                </label>
                <div className="relative">
                  <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    placeholder="Pesquisar por BI ou Nome..."
                    className="w-full h-10 pl-9 pr-3 rounded-md border border-input bg-background text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
                  Tipo de Documento
                </label>
                <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-muted-foreground">
                  <option>Selecione o tipo…</option>
                  <option>Certificado de Habilitações</option>
                  <option>Declaração de Matrícula</option>
                  <option>Histórico Académico</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
                  Curso Relacionado
                </label>
                <input
                  disabled
                  placeholder="Aguardando seleção de estudante…"
                  className="w-full h-10 px-3 rounded-md border border-input bg-secondary/40 text-sm text-muted-foreground"
                />
              </div>

              <Button className="w-full h-11 uppercase tracking-wide text-xs font-semibold">
                <Sparkles className="size-4" /> Gerar Documento
              </Button>
            </div>
          </div>

          <div className="bg-accent border border-border rounded-xl p-4 flex gap-3">
            <Info className="size-4 text-primary mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-primary">Validação Criptográfica</p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                Os documentos gerados incluem um QR Code único para verificação instantânea
                no portal público.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Pré-visualização</h3>
            <button className="text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-input text-muted-foreground hover:bg-secondary">
              <Download className="size-3.5" /> Imprimir
            </button>
          </div>

          <div className="rounded-lg border border-border bg-background p-8 min-h-[520px] flex flex-col items-center">
            <AppLogo className="size-14 mb-4" />
            <h2 className="text-lg font-bold tracking-wider text-foreground">REPÚBLICA MODELO</h2>
            <p className="text-xs text-muted-foreground mt-1">Ministério da Educação e Ciência</p>

            <div className="mt-8 px-6 py-2 border-y-2 border-primary">
              <p className="text-base font-bold text-primary tracking-widest">
                CERTIFICADO DE HABILITAÇÕES
              </p>
            </div>

            <div className="w-full mt-10 space-y-3 px-4">
              {[100, 92, 80, 96, 88, 70].map((w, i) => (
                <div key={i} className="h-2.5 rounded bg-secondary" style={{ width: `${w}%` }} />
              ))}
            </div>

            <div className="w-full mt-auto pt-10 flex items-end justify-between">
              <div>
                <div className="size-16 rounded bg-secondary grid grid-cols-3 grid-rows-3 gap-0.5 p-1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-[2px] ${
                        [0, 2, 4, 5, 6, 8].includes(i) ? "bg-foreground" : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 font-mono">
                  ID: A20F-8482-C109
                </p>
              </div>
              <div className="text-right">
                <div className="w-40 h-px bg-foreground/40 mb-1" />
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  O Diretor da Instituição
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}