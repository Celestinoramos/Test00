import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AppLogo } from "@/components/layout/AppLogo";

export const Route = createFileRoute("/")({
  component: SplashScreen,
});

const SPLASH_DURATION_MS = 1800;

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void navigate({ to: "/login", replace: true });
    }, SPLASH_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-background px-4">
      <div className="flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-700">
        <AppLogo className="h-20 w-20 rounded-2xl shadow-lg mb-6" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground">GCE</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs">
          Gestão de Certificados e Estudantes
        </p>

        <div className="mt-10 flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="size-4 animate-spin text-primary" />
          A iniciar a aplicação…
        </div>
      </div>

      <p className="absolute bottom-6 text-[11px] text-muted-foreground">
        v2.4.0 • Aplicação Desktop
      </p>
    </div>
  );
}
