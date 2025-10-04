import HeroBackground from "./components/HeroBackground";
import BottomTabs from "./components/BottomTabs";

export default function Home() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <HeroBackground />

      <div className="mx-auto w-full max-w-[1200px] px-8 pt-20">
        {/* Logo SVG – couleur via currentColor */}
        <div className="text-[color:var(--color-flame)]">
          <img
            src="/logo/logo-olme.svg"
            alt="Olmé"
            className="block w-[620px] h-auto" /* ajuste pour matcher Figma */
            priority-loading="true"
          />
          {/* Pour l’accessibilité/SEO, tu peux ajouter une balise sr-only */}
          <span className="sr-only">Olmé — Cocktail Bar</span>
        </div>

        {/* Bloc texte à droite */}
        <section className="mt-6 max-w-[560px] ml-auto text-sand">
          <h2 className="ty-body-strong">Olmé, bar à cocktails à Lyon</h2>
          <p className="ty-body mt-2">
            Un lieu de vie moderne dédié à la mixologie, au vin et à la bière craft. Un lieu où
            chaque cocktail évoque un souvenir, un voyage : d'abord le nez, puis le goût — le sel,
            le feu, le kick. Ici, pas besoin de réservation pour boire un bon cocktail. Nous servons
            à manger jusqu'à 23h !
          </p>
          <p className="ty-body mt-2">
            Le + : producteurs engagés et fait maison, du bar aux assiettes.
          </p>
        </section>

        {/* Grille Adresse / Ouverture / Contact */}
        <section className="mt-8 grid grid-cols-3 gap-6 max-w-[980px] text-sand">
          <div className="p-5 dashed-box">
            <h3 className="ty-title-16">Adresse</h3>
            <p className="ty-body mt-2">
              15 rue montesquieu<br/>69007 LYON
            </p>
          </div>
          <div className="p-5 dashed-box">
            <h3 className="ty-title-16">Ouverture</h3>
            <p className="ty-body mt-2">
              Lundi – Mercredi → 18h - 00h<br/>Jeudi – Samedi → 18h - 01h
            </p>
          </div>
          <div className="p-5 dashed-box">
            <h3 className="ty-title-16">Contact</h3>
            <a className="ty-body-strong underline underline-offset-4 mt-2 block"
               href="mailto:contact@olmebar.com">contact@olmebar.com</a>
            <p className="ty-body">06 00 00 00 00</p>
          </div>
        </section>
      </div>

      {/* Onglets en bas, centrés */}
      <BottomTabs />
    </main>
  );
}
