import type { MetadataRoute } from "next";

const siteUrl = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");
  } catch {
    return new URL("http://localhost:3000");
  }
})();

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/modular", changeFrequency: "monthly", priority: 0.8 },
    { path: "/products", changeFrequency: "weekly", priority: 0.9 },
    { path: "/bespoke", changeFrequency: "monthly", priority: 0.7 },
    { path: "/solution", changeFrequency: "monthly", priority: 0.8 },
    { path: "/solution/cctv", changeFrequency: "monthly", priority: 0.6 },
    { path: "/solution/network", changeFrequency: "monthly", priority: 0.6 },
    { path: "/solution/iot", changeFrequency: "monthly", priority: 0.6 },
    { path: "/solution/design", changeFrequency: "monthly", priority: 0.6 },
    { path: "/company", changeFrequency: "monthly", priority: 0.7 },
    { path: "/support", changeFrequency: "monthly", priority: 0.7 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
    // Redesign pages
    { path: "/home", changeFrequency: "weekly", priority: 1 },
    { path: "/products-v2", changeFrequency: "weekly", priority: 0.9 },
    { path: "/modular-v2", changeFrequency: "monthly", priority: 0.8 },
    { path: "/bespoke-v2", changeFrequency: "monthly", priority: 0.7 },
    { path: "/solution-v2", changeFrequency: "monthly", priority: 0.8 },
    { path: "/company-v2", changeFrequency: "monthly", priority: 0.7 },
    { path: "/support-v2", changeFrequency: "monthly", priority: 0.7 },
    { path: "/shelter", changeFrequency: "monthly", priority: 0.8 },
    { path: "/quote", changeFrequency: "monthly", priority: 0.8 },
    { path: "/ar", changeFrequency: "monthly", priority: 0.5 },
  ];

  return routes.map((route) => ({
    url: `${siteUrl.origin}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

