import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.olmebar.com/", lastModified: new Date() },
    // on ajoutera les autres sections/pages quand elles existent
  ];
}
