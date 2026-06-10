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

  return routes.map((route) => ({
    url: `${siteUrl.origin}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

