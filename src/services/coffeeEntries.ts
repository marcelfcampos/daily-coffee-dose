import { supabase } from "@/integrations/supabase/client";
import { SIZE_VOLUME, type CoffeeEntry, type NewDoseInput } from "@/types/coffee";

export async function fetchCoffeeEntries(): Promise<CoffeeEntry[]> {
  const { data, error } = await supabase
    .from("coffee_entries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) throw error;
  return (data ?? []) as CoffeeEntry[];
}

export async function createCoffeeEntry(input: NewDoseInput): Promise<CoffeeEntry> {
  const { data, error } = await supabase
    .from("coffee_entries")
    .insert({
      size: input.size,
      volume_ml: SIZE_VOLUME[input.size],
      roast: input.roast,
      species: input.species,
      species_custom:
        input.species === "other" ? (input.species_custom?.trim() ?? null) : null,
      brewing_method: input.brewing_method,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data as CoffeeEntry;
}
