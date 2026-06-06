DROP POLICY IF EXISTS "Authenticated users can manage customize models" ON customize_models;
DROP POLICY IF EXISTS "Authenticated users can manage customize categories" ON customize_categories;
DROP POLICY IF EXISTS "Authenticated users can manage customize options" ON customize_options;
DROP POLICY IF EXISTS "Authenticated users can manage customize conflicts" ON customize_option_conflicts;
DROP POLICY IF EXISTS "Authenticated users can manage customize included specs" ON customize_included_specs;
DROP POLICY IF EXISTS "Authenticated users can manage customize consultations" ON customize_consultations;

CREATE UNIQUE INDEX IF NOT EXISTS idx_customize_included_specs_global_key
  ON customize_included_specs(key)
  WHERE model_id IS NULL;

COMMENT ON TABLE customize_models IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
COMMENT ON TABLE customize_categories IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
COMMENT ON TABLE customize_options IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
COMMENT ON TABLE customize_option_conflicts IS 'Public users can read conflicts for active options only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
COMMENT ON TABLE customize_included_specs IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
COMMENT ON TABLE customize_consultations IS 'Public users can insert new consultation requests only. Reads, updates, and deletes are performed through requireAdmin-protected server actions using the service role.';
