import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Olmé — Cocktail Bar",
  description: "Bar à cocktails à Lyon 7, signatures & classiques revisités.",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  openGraph: {
    title: "Olmé — Cocktail Bar",
    description: "Signatures, classiques et produits de saison à Lyon 7.",
    url: "https://olmebar.com",
    siteName: "Olmé",
    images: [{ url: "/og/og.jpg", width: 1200, height: 630 }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Olmé — Cocktail Bar",
    description: "Signatures, classiques et produits de saison à Lyon 7.",
    images: ["/og/og.jpg"],
  },
};

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--ff",        // relie à --font-sans du thème
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={figtree.variable}>{children}</body>
    </html>
  );
}
