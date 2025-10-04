import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800","900"],
  display: "swap",
  variable: "--font-figtree",
  fallback: ["system-ui","Segoe UI","Roboto","Helvetica Neue","Arial"],
});

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
  return (
    <html lang="fr">
<head>
  <link
    rel="preload"
    as="image"
    href="/bg/fond-degrade.webp"                 
    imageSrcSet="/bg/fond-degrade.webp 1x, /bg/fond-degrade@2x.webp 2x"
    imageSizes="100vw"
    type="image/webp"
  />
</head>

      <body className={`${figtree.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
