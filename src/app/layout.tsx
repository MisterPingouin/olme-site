import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.olmebar.com"),
  title: {
    default: "Olmé — Cocktail Bar à Lyon 7",
    template: "%s · Olmé",
  },
  description:
    "Cocktails de saison & spiritueux premium à Lyon 7. Bar Olmé — qualité, créativité, hospitalité.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://www.olmebar.com",
    title: "Olmé — Cocktail Bar à Lyon 7",
    description:
      "Cocktails de saison & spiritueux premium à Lyon 7.",
    siteName: "Olmé",
    images: ["/og.jpg"], // tu mettras un vrai asset / opengraph-image.tsx plus tard
  },
  twitter: {
    card: "summary_large_image",
    site: "@olmebar",
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body>{children}</body></html>;
}
