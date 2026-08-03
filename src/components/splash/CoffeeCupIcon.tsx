import { cn } from "@/lib/utils";

interface CoffeeCupIconProps {
  className?: string;
}

/** Xícara de café com fumaça — traço em currentColor para reuso. */
export function CoffeeCupIcon({ className }: CoffeeCupIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Xícara de café com fumaça"
      className={cn("h-20 w-20", className)}
    >
      <path d="M18 8c2.5 3-2.5 5 0 8" className="animate-[pulse_2.6s_ease-in-out_infinite]" />
      <path
        d="M32 5c2.5 3.5-2.5 6 0 10"
        className="animate-[pulse_2.6s_ease-in-out_infinite] [animation-delay:0.4s]"
      />
      <path
        d="M46 8c2.5 3-2.5 5 0 8"
        className="animate-[pulse_2.6s_ease-in-out_infinite] [animation-delay:0.8s]"
      />
      <path d="M12 24h36v10a18 18 0 0 1-18 18h0a18 18 0 0 1-18-18V24Z" />
      <path d="M48 28h4a7 7 0 0 1 0 14h-4" />
      <path d="M8 58h44" />
    </svg>
  );
}
