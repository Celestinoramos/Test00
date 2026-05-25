import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { AppLogo } from "@/components/layout/AppLogo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    void navigate({ to: "/dashboard", replace: true });
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-sm p-8 sm:p-10">
        <header className="flex flex-col items-center text-center mb-6">
          <AppLogo className="h-40 w-40 "/>
          <h1 className="text-xl font-semibold text-foreground">Acesso ao GCE</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestão de Certificados e Estudantes
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
              Utilizador
            </label>
            <input
              type="text"
              placeholder="Digite o seu utilizador"
              className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
                Senha
              </label>
              <button
                type="button"
                className="text-xs font-medium text-primary hover:underline bg-transparent border-0 p-0 cursor-pointer"
              >
                Esqueceu a senha?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                placeholder="Digite a sua senha"
                className="w-full h-11 px-3 pr-10 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" className="size-4 rounded border-input" />
            Lembrar neste dispositivo
          </label>

          <Button type="submit" className="w-full h-11 text-sm font-semibold">
            Entrar <LogIn className="size-4" />
          </Button>

          <p className="pt-4 border-t border-border text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <button
              type="button"
              className="text-primary font-medium hover:underline bg-transparent border-0 p-0 cursor-pointer"
            >
              Solicitar acesso
            </button>
          </p>
        </form>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">v2.4.0 • Suporte Institucional</p>
    </div>
  );
}
