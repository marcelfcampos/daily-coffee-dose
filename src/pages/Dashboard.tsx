import { Coffee, LogOut, Plus } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { LatestEntriesTable } from "@/components/dashboard/LatestEntriesTable";
import { WeeklyChart } from "@/components/charts/WeeklyChart";
import { NewDoseDialog } from "@/components/coffee/NewDoseDialog";
import { useCoffeeEntries } from "@/hooks/useCoffeeEntries";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const { stats, isLoading } = useCoffeeEntries();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  }

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
        <div className="flex items-center gap-2">
          <NewDoseDialog>
            <Button size="lg" className="gap-2">
              <Plus className="size-4" />
              Nova dose
            </Button>
          </NewDoseDialog>
          <Button size="lg" variant="outline" className="gap-2" onClick={handleSignOut}>
            <LogOut className="size-4" />
            Sair
          </Button>
        </div>
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
