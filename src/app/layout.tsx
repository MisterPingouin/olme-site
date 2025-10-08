// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://olmebar.com";
const siteName = "Olmé — Cocktail Bar";
const siteDesc =
  "Bar à cocktails à Lyon 7 : signatures de saison, classiques revisités, vins engagés, bière craft et options sans alcool.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s · Olmé",
  },
  description: siteDesc,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico"
  },
  themeColor: "#0E1E1A", // ton vert profond Olmé si tu veux
  openGraph: {
    title: siteName,
    description: "Signatures, classiques et produits de saison à Lyon 7.",
    url: siteUrl,
    siteName: "Olmé",
    images: [{ url: "/og/og.jpg", width: 1200, height: 630, alt: "Olmé Cocktail Bar" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: "Cocktails, classiques et produits de saison à Lyon 7.",
    images: ["/og/og.jpg"],
    // creator: "@tonhandle", // ajoute quand tu auras le handle
  },
  verification: {
    // google: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // GSC (à coller)
  },
  category: "Bar",
  applicationName: "Olmé",
  other: {
    "format-detection": "telephone=no, address=no, email=no",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--ff",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD LocalBusiness (BarOrPub)
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: "Olmé — Cocktail Bar",
    url: siteUrl,
    image: `${siteUrl}/og/og.jpg`,
    description: siteDesc,
    priceRange: "€€",
    servesCuisine: ["Cocktails", "Vins nature", "Tapas maison"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "15 rue Montesquieu",
      addressLocality: "Lyon",
      postalCode: "69007",
      addressCountry: "FR",
    },
    // "telephone": "+33 ...", // ajoute-le quand tu veux
    // Ajoute ton Instagram quand il sera défini :
    sameAs: [
     "https://www.instagram.com/olme.bar/",
      // "https://www.facebook.com/...",
      // "https://g.page/r/PLACE_ID", // après création Fiche Google
    ],
    // Menu & réservations (mets tes URL réelles si besoin)
    hasMenu: `${siteUrl}/#mixologie`,
    acceptsReservations: true,
    openingDate: "2025-11-07",
    // OpeningHoursSpecification : ajuste quand tes horaires sont fixés
    openingHoursSpecification: [
      // { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday","Saturday"], opens: "18:00", closes: "01:00" },
    ],
  };

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={figtree.variable} suppressHydrationWarning>
        {/* Neutralise certains attributs injectés par des extensions AVANT l’hydratation */}
        <Script id="sanitize-ext-attrs" strategy="beforeInteractive">
          {`try{
            var b=document.body;
            if(b){
              for(var i=b.attributes.length-1;i>=0;i--){
                var a=b.attributes[i];
                if(a && a.name && a.name.startsWith('cz-')){
                  b.removeAttribute(a.name);
                }
              }
            }
          }catch(e){/* noop */}`}
        </Script>

        {/* JSON-LD Local SEO */}
        <Script id="ld-localbusiness" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(localBusiness)}
        </Script>

        {children}
      </body>
    </html>
  );
}
