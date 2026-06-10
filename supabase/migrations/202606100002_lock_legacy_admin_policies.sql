-- Lock legacy policies that treated every authenticated Supabase user as an admin.
-- Admin reads and writes must go through requireAdmin-protected server actions
-- that use the service role from the server only.

DROP POLICY IF EXISTS "Admin can delete gallery" ON public.gallery;
DROP POLICY IF EXISTS "Admin can insert gallery" ON public.gallery;
DROP POLICY IF EXISTS "Admin can update gallery" ON public.gallery;
DROP POLICY IF EXISTS "Admins can manage faqs" ON public.faqs;
DROP POLICY IF EXISTS "Admins can manage hero slides" ON public.hero_slides;
DROP POLICY IF EXISTS "Admins can manage notices" ON public.notices;
DROP POLICY IF EXISTS "Admins can manage solutions" ON public.solutions;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON public.hero_slides;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.hero_slides;
DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Authenticated users can delete inquiries" ON public.inquiries;

DROP POLICY IF EXISTS "Anyone can insert inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Anyone can insert customize consultations" ON public.customize_consultations;

DROP POLICY IF EXISTS "Public Read Access" ON public.projects;
DROP POLICY IF EXISTS "Public can view completed projects" ON public.projects;
CREATE POLICY "Public can view completed projects" ON public.projects
  FOR SELECT TO anon, authenticated
  USING (status = 'completed');

DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
CREATE POLICY "Anyone can view active products" ON public.products
  FOR SELECT TO anon, authenticated
  USING (is_active = TRUE);

DROP POLICY IF EXISTS "Public can view active faqs" ON public.faqs;
CREATE POLICY "Public can view active faqs" ON public.faqs
  FOR SELECT TO anon, authenticated
  USING (is_active = TRUE);

DROP POLICY IF EXISTS "Public can view active hero slides" ON public.hero_slides;
CREATE POLICY "Public can view active hero slides" ON public.hero_slides
  FOR SELECT TO anon, authenticated
  USING (is_active = TRUE);

DROP POLICY IF EXISTS "Public can view active notices" ON public.notices;
CREATE POLICY "Public can view active notices" ON public.notices
  FOR SELECT TO anon, authenticated
  USING (is_active = TRUE);

DROP POLICY IF EXISTS "Public can view active solutions" ON public.solutions;
CREATE POLICY "Public can view active solutions" ON public.solutions
  FOR SELECT TO anon, authenticated
  USING (is_active = TRUE);

DROP POLICY IF EXISTS "Public can view gallery" ON public.gallery;
DROP POLICY IF EXISTS "Public can view active gallery" ON public.gallery;
CREATE POLICY "Public can view active gallery" ON public.gallery
  FOR SELECT TO anon, authenticated
  USING (is_active = TRUE);

COMMENT ON TABLE public.gallery IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
COMMENT ON TABLE public.hero_slides IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
COMMENT ON TABLE public.faqs IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
COMMENT ON TABLE public.notices IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
COMMENT ON TABLE public.solutions IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
COMMENT ON TABLE public.inquiries IS 'Public submissions are accepted only through validated server actions using the service role. Reads, updates, and deletes are performed through requireAdmin-protected server actions using the service role.';
COMMENT ON TABLE public.projects IS 'Public users can read completed projects only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
COMMENT ON TABLE public.products IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
COMMENT ON TABLE public.customize_consultations IS 'Public submissions are accepted only through validated server actions using the service role. Reads, updates, and deletes are performed through requireAdmin-protected server actions using the service role.';
