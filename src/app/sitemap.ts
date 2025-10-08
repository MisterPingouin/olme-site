// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://olmebar.com";
  const lastmod = new Date().toISOString();

  const routes = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1.0 },
  ] as MetadataRoute.Sitemap;

  return routes.map((r) => ({ ...r, lastModified: lastmod }));
}
