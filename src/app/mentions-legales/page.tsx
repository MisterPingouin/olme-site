// app/mentions-legales/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales — Olmé",
  description:
    "Mentions légales du site Olmé : éditeur, hébergeur, propriété intellectuelle, données personnelles et médiation.",
  alternates: { canonical: "/mentions-legales" },
  openGraph: {
    title: "Mentions légales — Olmé",
    description:
      "Informations légales et coordonnées de l’éditeur du site Olmé.",
    url: "/mentions-legales",
    siteName: "Olmé",
    type: "article",
  },
};

export default function MentionsLegales() {
  return (
    <section className="bg-o-sand text-o-green">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 py-16">
        {/* En-tête */}
        <header className="flex items-start justify-between gap-6">
          <h1 className="font-b leading-[1.1] text-[clamp(36px,8vw,72px)]">
            Mentions légales
          </h1>
          {/* Mini-logo / lien retour */}
          <Link
            href="/#mixologie"
            className="hidden md:inline-block underline underline-offset-4 hover:opacity-90"
            aria-label="Revenir à la page d’accueil"
          >
            Revenir à l’accueil
          </Link>
        </header>

        <hr className="mt-6 border-0 border-b-2 border-dotted border-o-green/60" />

        {/* Contenu */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Colonne 1 */}
          <div className="space-y-8">
            <section aria-labelledby="editeur">
              <h2 id="editeur" className="font-b text-24 mb-2">
                Éditeur du site
              </h2>
              <div className="space-y-1">
                <p>SAS LINAM</p>
                <p>Olmé — Bar à cocktails</p>
                <p>15 rue Montesquieu, 69007 Lyon — France</p>
                <p>SIREN : <span className="opacity-80">991626672</span></p>
                <p>RCS : <span className="opacity-80">991 626 672 R.C.S. Lyon</span></p>
                <p>TVA intracommunautaire : <span className="opacity-80">FR26991626672</span></p>
                <p>
                  Email :{" "}
                  <a href="mailto:contact@olmebar.com" className="underline">
                    contact@olmebar.com
                  </a>
                </p>
                <p>Tél. : <span className="opacity-80">[à compléter]</span></p>
              </div>
            </section>


            <section aria-labelledby="hebergeur">
              <h2 id="hebergeur" className="font-b text-24 mb-2">
                Hébergeur
              </h2>
              <div className="space-y-1">
                <p>
                  <span className="opacity-80">Vercel</span>
                </p>
                <p>
                  <span className="opacity-80">Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.</span>
                </p>
                <p>
                  <span className="opacity-80">https://vercel.com</span>
                </p>
              </div>
            </section>
          </div>

          {/* Colonne 2 */}
          <div className="space-y-8">
            <section aria-labelledby="ip">
              <h2 id="ip" className="font-b text-24 mb-2">
                Propriété intellectuelle
              </h2>
              <p className="opacity-90">
                L’ensemble des contenus (textes, logos, visuels, photographies, vidéos, charte
                graphique, code) est protégé par le droit de la propriété intellectuelle. Toute
                reproduction, représentation, modification ou diffusion, totale ou partielle, sans
                autorisation écrite préalable d’Olmé est interdite.
              </p>
            </section>

            <section aria-labelledby="donnees">
              <h2 id="donnees" className="font-b text-24 mb-2">
                Données personnelles & cookies
              </h2>
              <p className="opacity-90">
                Les informations éventuellement collectées via nos formulaires sont utilisées
                uniquement pour vous répondre et ne sont pas cédées à des tiers. Vous disposez
                d’un droit d’accès, de rectification et de suppression de vos données
                (RGPD). Contact :{" "}
                <a href="mailto:contact@olmebar.com" className="underline">
                  contact@olmebar.com
                </a>.
              </p>
              <p className="opacity-90 mt-2">
                Les cookies utilisés servent au bon fonctionnement du site et à la mesure d’audience.
                Vous pouvez configurer vos préférences dans votre navigateur.
              </p>
            </section>

            <section aria-labelledby="credits">
              <h2 id="credits" className="font-b text-24 mb-2">
                Crédits
              </h2>
              <p className="opacity-90">
                Design & développement : Charles Lambert / Anthony Pham
                
                {/* Photographies :{" "}
                <span className="opacity-80">[crédits photo le cas échéant]</span>. */}
              </p>
            </section>
          </div>
        </div>

        <hr className="mt-10 border-0 border-b-2 border-dotted border-o-green/40" />

        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="opacity-80">
            © {new Date().getFullYear()} Olmé — Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/#mixologie" className="underline underline-offset-4">
              Retour à l’accueil
            </Link>
            {/* Prévois une page dédiée si besoin */}
            {/* <Link href="/politique-de-confidentialite" className="underline underline-offset-4">
              Politique de confidentialité
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
}
