import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const host = "https://olmebar.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/draft", "/draft/*", "/preview", "/_next/static/chunks/*.map"],
      },
    ],
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
