import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCoffeeEntry, fetchCoffeeEntries } from "@/services/coffeeEntries";
import type { CoffeeEntry, NewDoseInput } from "@/types/coffee";

const QUERY_KEY = ["coffee-entries"];

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export interface ChartPoint {
  date: string;
  label: string;
  volume_ml: number;
}

export interface DashboardStats {
  today_doses: number;
  today_volume_ml: number;
  week_doses: number;
  daily_average_ml: number;
  chart_data: ChartPoint[];
  latest_entries: CoffeeEntry[];
}

export function useCoffeeEntries() {
  const query = useQuery({ queryKey: QUERY_KEY, queryFn: fetchCoffeeEntries });
  const entries = query.data ?? [];

  const stats = useMemo<DashboardStats>(() => {
    const today = startOfDay(new Date());
    const days: ChartPoint[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      days.push({
        date: d.toISOString().slice(0, 10),
        label: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
        volume_ml: 0,
      });
    }

    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - 6);

    let todayDoses = 0;
    let todayVolume = 0;
    let weekDoses = 0;
    let weekVolume = 0;

    for (const entry of entries) {
      const created = new Date(entry.created_at);
      const dayKey = startOfDay(created).toISOString().slice(0, 10);

      if (dayKey === today.toISOString().slice(0, 10)) {
        todayDoses += 1;
        todayVolume += entry.volume_ml;
      }

      const point = days.find((d) => d.date === dayKey);
      if (point) {
        point.volume_ml += entry.volume_ml;
        weekDoses += 1;
        weekVolume += entry.volume_ml;
      }
    }

    return {
      today_doses: todayDoses,
      today_volume_ml: todayVolume,
      week_doses: weekDoses,
      daily_average_ml: weekVolume === 0 ? 0 : Math.round(weekVolume / 7),
      chart_data: days,
      latest_entries: entries.slice(0, 5),
    };
  }, [entries]);

  return { ...query, entries, stats };
}

export function useCreateDose() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: NewDoseInput) => createCoffeeEntry(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
