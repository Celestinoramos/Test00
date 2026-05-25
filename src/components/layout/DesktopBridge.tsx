import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { getDesktopBridge } from "@/lib/desktop";

export function DesktopBridge() {
  const router = useRouter();

  useEffect(() => {
    const desktop = getDesktopBridge();
    if (!desktop?.onMenuAction) return;

    return desktop.onMenuAction((event) => {
      if (event.action === "navigate" && event.to) {
        // Menu emits raw string paths; cast since router uses typed paths.
        void router.navigate({ to: event.to as never, replace: true });
        return;
      }
      if (event.action === "show-about") {
        void desktop.notify?.({
          title: "GCE",
          body: "Gestão de Certificados e Estudantes — v2.4.0",
        });
      }
    });
  }, [router]);

  return null;
}
