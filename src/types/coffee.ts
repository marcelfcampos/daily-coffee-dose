export type Size = "small" | "medium" | "large";
export type Roast = "light" | "medium" | "dark";
export type Species = "arabica" | "robusta" | "other";
export type BrewingMethod =
  | "coado"
  | "moka"
  | "prensa"
  | "espresso"
  | "aeropress"
  | "v60"
  | "chemex"
  | "sifao"
  | "turco";

export interface CoffeeEntry {
  id: string;
  created_at: string;
  size: Size;
  volume_ml: number;
  roast: Roast;
  species: Species;
  species_custom: string | null;
  brewing_method: BrewingMethod;
}

export interface NewDoseInput {
  size: Size;
  roast: Roast;
  species: Species;
  species_custom?: string;
  brewing_method: BrewingMethod;
}

export const SIZE_VOLUME: Record<Size, number> = {
  small: 50,
  medium: 150,
  large: 250,
};

export const SIZE_LABEL: Record<Size, string> = {
  small: "Pequena",
  medium: "Média",
  large: "Grande",
};

export const ROAST_LABEL: Record<Roast, string> = {
  light: "Clara",
  medium: "Média",
  dark: "Escura",
};

export const SPECIES_LABEL: Record<Species, string> = {
  arabica: "Arábica",
  robusta: "Robusta",
  other: "Outros",
};

export const METHOD_LABEL: Record<BrewingMethod, string> = {
  coado: "Coado",
  moka: "Moka",
  prensa: "Prensa Francesa",
  espresso: "Espresso",
  aeropress: "Aeropress",
  v60: "Hario V60",
  chemex: "Chemex",
  sifao: "Sifão",
  turco: "Turco",
};

export const SIZE_OPTIONS: Size[] = ["small", "medium", "large"];
export const ROAST_OPTIONS: Roast[] = ["light", "medium", "dark"];
export const SPECIES_OPTIONS: Species[] = ["arabica", "robusta", "other"];
export const METHOD_OPTIONS: BrewingMethod[] = [
  "coado",
  "moka",
  "prensa",
  "espresso",
  "aeropress",
  "v60",
  "chemex",
  "sifao",
  "turco",
];
