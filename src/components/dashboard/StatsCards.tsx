import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Droplets, CalendarDays, Gauge } from "lucide-react";
import type { DashboardStats } from "@/hooks/useCoffeeEntries";

const items = [
  { key: "today_doses", label: "Doses hoje", icon: Coffee, suffix: "" },
  { key: "today_volume_ml", label: "Volume hoje", icon: Droplets, suffix: " ml" },
  { key: "week_doses", label: "Doses na semana", icon: CalendarDays, suffix: "" },
  { key: "daily_average_ml", label: "Média diária", icon: Gauge, suffix: " ml" },
] as const;

export function StatsCards({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ key, label, icon: Icon, suffix }) => (
        <Card key={key} className="border-border/60 bg-card/80 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
              </p>
              <p className="mt-0.5 truncate text-2xl font-semibold text-foreground">
                {stats[key]}
                <span className="text-sm font-normal text-muted-foreground">{suffix}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
