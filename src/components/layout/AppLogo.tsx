import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

type AppLogoProps = {
  className?: string;
  alt?: string;
};

export function AppLogo({ className, alt = "GCE" }: AppLogoProps) {
  return (
    <img
      src={logo}
      alt={alt}
      className={cn("object-contain", className)}
    />
  );
}
