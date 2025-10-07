import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Script from "next/script";
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
    <html lang="fr" suppressHydrationWarning>
      <body className={figtree.variable} suppressHydrationWarning>
        {/* Neutralise certains attributs injectés par des extensions AVANT l’hydratation */}
        <Script id="sanitize-ext-attrs" strategy="beforeInteractive">
          {`try{
            var b=document.body;
            if(b){
              // Ex: 'cz-shortcut-listen' (extensions de raccourcis)
              for(var i=b.attributes.length-1;i>=0;i--){
                var a=b.attributes[i];
                if(a && a.name && a.name.startsWith('cz-')){
                  b.removeAttribute(a.name);
                }
              }
            }
          }catch(e){/* noop */}`}
        </Script>

        {children}
      </body>
    </html>
  );
}
