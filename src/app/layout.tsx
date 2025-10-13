import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://olmebar.com";
const siteName = "Olmé";
const siteDesc =
  "Olmé — bar à cocktails à Lyon 7 (Guillotière). Cocktails signatures de saison, classiques revisités, avec et sans alcool, vins engagés, bières craft et petites assiettes maison.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Olmé — Bar à cocktails à Lyon 7 (Guillotière)",
    template: "%s · Olmé",
  },
  description: siteDesc,
  keywords: [
    "bar à cocktails Lyon",
    "bar à cocktails Lyon 7",
    "bar Guillotière",
    "cocktails signatures Lyon",
    "mocktails Lyon",
    "vins nature Lyon",
    "bière craft Lyon",
    "Olmé bar",
  ],
  alternates: {
    canonical: siteUrl,
    languages: {
      "fr-FR": "/",
    },
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
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  // Couleurs adaptées aux thèmes pour les navigateurs
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0E1E1A" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1E1A" },
  ],
  openGraph: {
    title: "Olmé — Bar à cocktails à Lyon 7 (Guillotière)",
    description:
      "Signatures, classiques, avec ou sans alcool et produits de saison à Lyon 7. 15 rue Montesquieu, 69007 Lyon.",
    url: siteUrl,
    siteName: "Olmé",
    images: [
      {
        url: "/og/og.jpg",
        width: 1200,
        height: 630,
        alt: "Olmé — Bar à cocktails à Lyon 7",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Olmé — Bar à cocktails à Lyon 7 (Guillotière)",
    description:
      "Cocktails signatures, avec ou sans alcool, vins engagés, bières craft. Ouverture le 7 nov. 2025.",
    images: ["/og/og.jpg"],
    // site: "@olme.bar", // à ajouter si handle X/Twitter
  },
  verification: {
    // google: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // code GSC
  },
  formatDetection: { telephone: false, address: false, email: false },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Olmé",
  },
  manifest: "/site.webmanifest",
  category: "Bar",
  applicationName: "Olmé",
  creator: "Olmé",
  publisher: "Olmé",
  // facultatif: authors: [{ name: "Olmé", url: siteUrl }],
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
  // JSON-LD LocalBusiness (BarOrPub) — coordonnées approx. de la rue Montesquieu (Guillotière)
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: "Olmé — Cocktail Bar",
    url: siteUrl,
    image: `${siteUrl}/og/og.jpg`,
    description: siteDesc,
    priceRange: "€€",
    servesCuisine: ["Cocktails", "Vins engagés", "Bières craft", "Petites assiettes maison"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "15 rue Montesquieu",
      addressLocality: "Lyon",
      postalCode: "69007",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.749654,
      longitude: 4.847879,
    },
    areaServed: ["Lyon 7e", "Guillotière", "Lyon"],
    // "telephone": "+33 ", // à compléter
    sameAs: ["https://www.instagram.com/olme.bar/"],
    hasMenu: `${siteUrl}/#mixologie`,
    acceptsReservations: true,
    openingDate: "2025-11-07",
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "18:00", closes: "01:00" },
    ],
  };

  // JSON-LD Organization (pour les signaux d'entité / E-E-A-T)
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Olmé",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/og/og.jpg`,
      width: 1200,
      height: 630,
    },
    sameAs: ["https://www.instagram.com/olme.bar/"],
  };

  // JSON-LD FAQPage (capter les People Also Ask sur “bar cocktail lyon 7 / mocktails / résa”)
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Faut-il réserver chez Olmé ?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "La réservation est conseillée le week-end et pour les groupes. Les autres soirs, nous gardons toujours quelques places au comptoir.",
        },
      },
      {
        "@type": "Question",
        name: "Proposez-vous des cocktails sans alcool (mocktails) ?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Oui. Notre carte inclut des créations sans alcool au même niveau d’exigence que nos signatures.",
        },
      },
      {
        "@type": "Question",
        name: "Où se situe Olmé à Lyon 7 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Au 15 rue Montesquieu, dans le quartier de la Guillotière (Lyon 7). À quelques minutes à pied de la place Saint-Louis.",
        },
      },
    ],
  };

  // JSON-LD BreadcrumbList (simple mais utile pour la compréhension du site)
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: siteUrl,
      },
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
        <Script id="ld-organization" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(organization)}
        </Script>
        <Script id="ld-faq" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(faq)}
        </Script>
        <Script id="ld-breadcrumbs" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(breadcrumbs)}
        </Script>

        {children}
      </body>
    </html>
  );
}
