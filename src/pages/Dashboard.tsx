import { Coffee, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { LatestEntriesTable } from "@/components/dashboard/LatestEntriesTable";
import { WeeklyChart } from "@/components/charts/WeeklyChart";
import { NewDoseDialog } from "@/components/coffee/NewDoseDialog";
import { useCoffeeEntries } from "@/hooks/useCoffeeEntries";

export default function Dashboard() {
  const { stats, isLoading } = useCoffeeEntries();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Coffee className="size-5" />
          </span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Controle de café</h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe seu consumo diário em poucos toques.
            </p>
          </div>
        </div>
        <NewDoseDialog>
          <Button size="lg" className="gap-2">
            <Plus className="size-4" />
            Nova dose
          </Button>
        </NewDoseDialog>
      </header>

      <div className="mt-8 space-y-6">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Carregando registros...</p>
        ) : (
          <>
            <StatsCards stats={stats} />
            <WeeklyChart data={stats.chart_data} />
            <LatestEntriesTable entries={stats.latest_entries} />
          </>
        )}
      </div>
    </main>
  );
}
