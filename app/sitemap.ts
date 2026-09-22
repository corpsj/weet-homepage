import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/types/supabase";
import { isPublicReadyProject } from "@/lib/projects/publicProjects";
import { getPublicCustomizeCatalog } from "@/app/actions/customize-actions";
import { COST_GUIDE_PATH, COST_GUIDE_UPDATED, modelPath } from "@/lib/model-pages";

export const revalidate = 300;

async function getPublishedProjectEntries(): Promise<MetadataRoute.Sitemap> {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "completed")
    .order("completed_at", { ascending: false });

  const publicProjects = ((data as Project[] | null) ?? []).filter(
    isPublicReadyProject,
  );

  return publicProjects.map((project) => {
    const projectDate = project.completed_at ?? project.created_at;
    const parsed = projectDate ? new Date(projectDate) : null;

    return {
      url: `${SITE_URL}/projects/${project.id}`,
      ...(parsed && !Number.isNaN(parsed.getTime()) ? { lastModified: parsed } : {}),
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/customize", changeFrequency: "weekly", priority: 0.9 },
    { path: "/products", changeFrequency: "weekly", priority: 0.9 },
    { path: "/projects", changeFrequency: "weekly", priority: 0.8 },
    { path: "/modular", changeFrequency: "monthly", priority: 0.8 },
    { path: "/bespoke", changeFrequency: "monthly", priority: 0.7 },
    { path: "/solution", changeFrequency: "monthly", priority: 0.8 },
    { path: "/solution/cctv", changeFrequency: "monthly", priority: 0.6 },
    { path: "/solution/network", changeFrequency: "monthly", priority: 0.6 },
    { path: "/solution/iot", changeFrequency: "monthly", priority: 0.6 },
    { path: "/solution/energy", changeFrequency: "monthly", priority: 0.6 },
    { path: "/company", changeFrequency: "monthly", priority: 0.7 },
    { path: "/support", changeFrequency: "monthly", priority: 0.8 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  try {
    const [projectEntries, catalog] = await Promise.all([getPublishedProjectEntries(), getPublicCustomizeCatalog()]);
    const modelEntries: MetadataRoute.Sitemap = catalog.models.filter((model) => model.isActive).map((model) => ({ url: `${SITE_URL}${modelPath(model)}`, changeFrequency: 'weekly', priority: 0.8 }));
    return [...staticEntries, ...modelEntries, { url: `${SITE_URL}${COST_GUIDE_PATH}`, lastModified: COST_GUIDE_UPDATED, changeFrequency: 'monthly', priority: 0.7 }, ...projectEntries];
  } catch {
    // The sitemap must never throw; fall back to the static routes only.
    return [...staticEntries, { url: `${SITE_URL}${COST_GUIDE_PATH}`, lastModified: COST_GUIDE_UPDATED }];
  }
}
