CREATE TYPE public.coffee_size AS ENUM ('small','medium','large');
CREATE TYPE public.coffee_roast AS ENUM ('light','medium','dark');
CREATE TYPE public.coffee_species AS ENUM ('arabica','robusta','other');
CREATE TYPE public.coffee_brewing_method AS ENUM ('coado','moka','prensa','espresso','aeropress','v60','chemex','sifao','turco');

CREATE TABLE public.coffee_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  size public.coffee_size NOT NULL,
  volume_ml integer NOT NULL,
  roast public.coffee_roast NOT NULL,
  species public.coffee_species NOT NULL,
  species_custom text,
  brewing_method public.coffee_brewing_method NOT NULL
);

GRANT SELECT, INSERT ON public.coffee_entries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.coffee_entries TO authenticated;
GRANT ALL ON public.coffee_entries TO service_role;

ALTER TABLE public.coffee_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read coffee entries"
  ON public.coffee_entries FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert coffee entries"
  ON public.coffee_entries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX coffee_entries_created_at_idx ON public.coffee_entries (created_at DESC);