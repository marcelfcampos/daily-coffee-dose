import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CoffeeCupIcon } from "@/components/splash/CoffeeCupIcon";

export default function Splash() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(160deg,oklch(0.82_0.13_82)_0%,oklch(0.65_0.13_60)_48%,oklch(0.34_0.07_45)_100%)] px-6 py-16">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

      <section className="relative flex w-full max-w-md flex-col items-center text-center text-primary-foreground">
        <div className="animate-scale-in">
          <CoffeeCupIcon className="h-24 w-24 text-primary-foreground drop-shadow-lg sm:h-28 sm:w-28" />
        </div>

        <h1 className="mt-8 animate-fade-in text-4xl font-semibold tracking-tight sm:text-5xl">
          Controle de Café
        </h1>

        <p className="mt-4 animate-fade-in text-base leading-relaxed text-primary-foreground/85 [animation-delay:0.15s] sm:text-lg">
          Monitore sua ingestão de cafeína e mantenha o equilíbrio da sua energia diária.
        </p>

        <Link
          to="/"
          className="group mt-10 inline-flex animate-fade-in items-center gap-2 rounded-full bg-card px-8 py-4 text-base font-medium text-card-foreground shadow-xl transition-transform duration-200 [animation-delay:0.3s] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-card focus-visible:ring-offset-2"
        >
          Começar Agora
          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </section>
    </main>
  );
}
