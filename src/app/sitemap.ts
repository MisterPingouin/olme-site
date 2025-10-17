// app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE = "https://olmebar.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      // Déclare l’OG image principale pour aider l’indexation images
      images: [`${BASE}/og/og.jpg`],
    },
    {
      url: `${BASE}/mentions-legales`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
