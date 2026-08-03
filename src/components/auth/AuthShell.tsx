import type { ReactNode } from "react";
import { CoffeeCupIcon } from "@/components/splash/CoffeeCupIcon";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

/** Layout reutilizável para as telas de login e cadastro. */
export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(160deg,oklch(0.82_0.13_82)_0%,oklch(0.65_0.13_60)_48%,oklch(0.34_0.07_45)_100%)] px-4 py-12">
      <div className="w-full max-w-md animate-fade-in rounded-3xl bg-card p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <CoffeeCupIcon className="h-8 w-8" />
          </span>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-card-foreground">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <div className="mt-8">{children}</div>

        <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
      </div>
    </main>
  );
}
