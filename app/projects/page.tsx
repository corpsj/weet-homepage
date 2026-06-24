import { supabase } from "@/lib/supabase";
import type { Project } from "@/types/supabase";
import { isPublicReadyProject } from "@/lib/projects/publicProjects";
import { getPublicGalleryItems } from "@/app/actions/gallery-actions";
import { getSiteSettings } from "@/lib/site-settings.server";
import ProjectsClient from "./ProjectsClient";

// ISR: cache + revalidate every 5 minutes rather than force-dynamic. (F12)
export const revalidate = 300;

export default async function ProjectsPage() {
  const [{ data: projects }, galleryItems, settings] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .eq("status", "completed")
      .order("completed_at", { ascending: false }),
    getPublicGalleryItems(12),
    getSiteSettings(),
  ]);

  const publicProjects = ((projects as Project[] | null) ?? []).filter(isPublicReadyProject);

  return (
    <ProjectsClient publicProjects={publicProjects} galleryItems={galleryItems} settings={settings} />
  );
}
