import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  Search,
  QrCode,
  Upload,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
} from "lucide-react";
import { useDocumentTitle } from "@/lib/use-document-title";

export const Route = createFileRoute("/_app/validation")({
  component: ValidationPage,
});

type ValidationResult = {
  valid: boolean;
  code: string;
  student?: string;
  course?: string;
  issuedAt?: string;
  institution?: string;
};

const recent: ValidationResult[] = [
  { valid: true, code: "GCE-2025-0142", student: "Maria Inês Silva", course: "Licenciatura em Engenharia", issuedAt: "22 Mai 2026, 10:23", institution: "Universidade GCE" },
  { valid: true, code: "GCE-2025-0141", student: "João Pedro Costa", course: "Mestrado em Gestão", issuedAt: "22 Mai 2026, 09:15", institution: "Universidade GCE" },
  { valid: false, code: "GCE-2025-XXXX", issuedAt: "21 Mai 2026, 18:02" },
  { valid: true, code: "GCE-2025-0139", student: "Carlos Eduardo Lima", course: "Licenciatura em Design", issuedAt: "21 Mai 2026, 14:30", institution: "Universidade GCE" },
];

function ValidationPage() {
  useDocumentTitle("Validação");
  const [code, setCode] = useState("");
  const [result, setResult] = useState<ValidationResult | null>(null);

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    const match = recent.find((r) => r.code.toLowerCase() === code.trim().toLowerCase());
    setResult(
      match ?? { valid: false, code: code.trim() },
    );
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Validação</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Verifique a autenticidade de documentos emitidos pelo sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="size-5 text-primary" />
            <h3 className="font-semibold text-foreground">Validar Documento</h3>
          </div>
          <form onSubmit={handleValidate} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Insira o código (ex: GCE-2025-0142)"
                className="w-full h-11 pl-10 pr-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              type="submit"
              className="h-11 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Validar
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <button className="flex items-center gap-3 p-4 rounded-lg border border-dashed border-border hover:border-primary hover:bg-secondary/50 transition-colors text-left">
              <QrCode className="size-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Ler QR Code</p>
                <p className="text-xs text-muted-foreground">Use a câmara do dispositivo</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-lg border border-dashed border-border hover:border-primary hover:bg-secondary/50 transition-colors text-left">
              <Upload className="size-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Carregar PDF</p>
                <p className="text-xs text-muted-foreground">Verificar assinatura digital</p>
              </div>
            </button>
          </div>

          {result && (
            <div
              className={`mt-6 rounded-xl border p-5 ${
                result.valid
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-start gap-3">
                {result.valid ? (
                  <CheckCircle2 className="size-6 text-green-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="size-6 text-red-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`font-semibold ${result.valid ? "text-green-800" : "text-red-800"}`}>
                    {result.valid ? "Documento Autêntico" : "Documento Inválido"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">Código: {result.code}</p>
                  {result.valid && (
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">
                      <div>
                        <dt className="text-xs text-muted-foreground">Estudante</dt>
                        <dd className="font-medium text-foreground">{result.student}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">Curso</dt>
                        <dd className="font-medium text-foreground">{result.course}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">Instituição</dt>
                        <dd className="font-medium text-foreground">{result.institution}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">Emitido em</dt>
                        <dd className="font-medium text-foreground">{result.issuedAt}</dd>
                      </div>
                    </dl>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Estatísticas</h3>
          <div className="space-y-4">
            {[
              { label: "Validações hoje", value: "37", icon: ShieldCheck, color: "text-primary" },
              { label: "Documentos válidos", value: "1,284", icon: CheckCircle2, color: "text-green-600" },
              { label: "Tentativas inválidas", value: "12", icon: XCircle, color: "text-red-600" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <s.icon className={`size-5 ${s.color}`} />
                  <span className="text-sm text-foreground">{s.label}</span>
                </div>
                <span className="text-lg font-bold text-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Validações Recentes</h3>
          <span className="text-xs text-muted-foreground">{recent.length} registos</span>
        </div>
        <ul className="divide-y divide-border">
          {recent.map((r, i) => (
            <li key={i} className="flex items-center gap-3 py-3">
              <div className={`size-9 rounded-full flex items-center justify-center shrink-0 ${
                r.valid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {r.valid ? <CheckCircle2 className="size-4" /> : <XCircle className="size-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {r.student ?? "Tentativa inválida"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  <FileText className="inline size-3 mr-1" />
                  {r.code}
                </p>
              </div>
              <div className="text-right shrink-0 text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="size-3" /> {r.issuedAt}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}