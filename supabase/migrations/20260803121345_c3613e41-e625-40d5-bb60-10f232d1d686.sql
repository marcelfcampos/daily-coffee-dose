REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public;

DROP POLICY IF EXISTS "Authenticated can insert coffee entries" ON public.coffee_entries;
CREATE POLICY "Authenticated can insert coffee entries" ON public.coffee_entries
  FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);