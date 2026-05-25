export type DesktopMenuAction =
  | { action: "navigate"; to: string }
  | { action: "show-about" };

export type DesktopBridge = {
  platform: string;
  versions: NodeJS.ProcessVersions;
  onMenuAction: (callback: (event: DesktopMenuAction) => void) => () => void;
  confirm: (message?: string) => Promise<boolean>;
  notify: (options: { title?: string; body?: string }) => Promise<boolean>;
};

declare global {
  interface Window {
    desktop?: DesktopBridge;
  }
}

export function getDesktopBridge(): DesktopBridge | undefined {
  if (typeof window === "undefined") return undefined;
  return window.desktop;
}
