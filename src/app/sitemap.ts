import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.olmebar.com"; // remplace par ton domaine
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/mentions-legales`, lastModified: new Date() },
  ];
}
