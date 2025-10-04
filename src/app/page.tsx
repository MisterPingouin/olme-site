"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TABS } from "./data/content";
import OverlapTabs from "./ui/OverlapTabs";

// Sections existantes
import Mixologie from "./sections/Mixologie";
import Vins from "./sections/Vins";
import Food from "./sections/Food";
import Infos from "./sections/Infos";
import Footer from "./components/Footer";
import MobileMenu from "./ui/MobileMenu";

/** Hook utilitaire : true si viewport < lg (1024px) */
function useIsBelowLG() {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023.98px)");
    const onChange = (e: MediaQueryListEvent) => setIsSmall(e.matches);
    setIsSmall(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isSmall;
}

export default function Home() {
  const [active, setActive] = useState<string>("mixologie");
  const panelTopRef = useRef<HTMLDivElement | null>(null);
  const isSmall = useIsBelowLG();

  const goToPanelTop = () => {
    panelTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSelect = (id: string) => {
    if (isSmall) {
      history.replaceState(null, "", `#${id}`);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setActive(id);
    history.replaceState(null, "", `#${id}`);
    goToPanelTop();
  };

  // Lis l’ancre au chargement
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash || !TABS.some((t) => t.id === hash)) return;

    if (isSmall) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    } else {
      setActive(hash);
      setTimeout(() => goToPanelTop(), 0);
    }
  }, [isSmall]);

  return (
    <>
      {/* HERO */}
      <section className="hero relative min-h-dvh bg-olme overflow-hidden">
        {/* Menu burger visible mobile & tablette */}
        <MobileMenu onSelect={handleSelect} />

        {/* --- MOBILE / TABLETTE (≤ lg) --- */}
        <div className="lg:hidden relative">
          <div
            className="mx-auto max-w-[1000px] px-4 sm:px-5 md:px-6 pb-20"
            style={{
              paddingTop: "calc(env(safe-area-inset-top, 0px) + 64px)",
            }}
          >
            {/* Logo centré */}
            <div className="flex justify-center">
              <img
                src="/logo/logo-olme.svg"
                alt="Olmé"
                className="h-[56px] sm:h-[64px] w-auto select-none"
                draggable={false}
              />
            </div>

            {/* Ornement CENTRÉ entre logo et texte (plus d’absolute) */}
            <div className="mt-4 sm:mt-6 flex justify-center">
              <img
                src="/ornaments/ornament-botanic.svg"
                alt=""
                aria-hidden="true"
                className="h-[72px] sm:h-[88px] md:h-[96px] w-auto opacity-90 select-none"
                draggable={false}
              />
            </div>

            {/* Texte fluide (clamp) */}
            <div className="mt-6 sm:mt-8 text-o-sand space-y-3">
              <h3 className="font-b leading-[1.5] text-[clamp(18px,3.8vw,22px)]">
                Olmé, bar à cocktails à Lyon
              </h3>
              <p className="font-l leading-[1.6] text-[clamp(15px,3.6vw,18px)]">
                Un lieu de vie moderne dédié à la mixologie, au vin et à la bière craft.
              </p>
              <p className="font-l leading-[1.6] text-[clamp(15px,3.6vw,18px)]">
                Un lieu où chaque cocktail évoque un souvenir, un voyage : d’abord le nez,
                puis le goût — le sel, le feu, le kick.
              </p>
              <p className="font-l leading-[1.6] text-[clamp(15px,3.6vw,18px)]">
                Ici, pas besoin de réservation pour boire un bon cocktail.
                <br />
                Nous servons à manger jusqu’à 23h !
              </p>
              <p className="leading-[1.6] text-[clamp(15px,3.6vw,18px)]">
                <span className="font-b">Le + :</span> producteurs engagés et fait maison, du bar aux assiettes.
              </p>
            </div>

            {/* Adresse / Ouverture / Contact masqués en mobile (intentionnel) */}
          </div>
          {/* pas d’onglets en bas sur mobile/tablette */}
        </div>

        {/* --- DESKTOP (≥ lg) : maquette inchangée --- */}
        <div className="hidden lg:block">
          <div className="frame">
            <img
              src="/logo/logo-olme.svg"
              alt="Olmé"
              className="p-logo select-none"
              draggable={false}
            />
            <img
              src="/ornaments/ornament-botanic.svg"
              alt=""
              aria-hidden="true"
              className="p-orn select-none"
              draggable={false}
            />
            <div className="p-text text-o-sand">
              <h3 className="text-16 font-b lh-160">Olmé, bar à cocktails à Lyon</h3>
              <p className="mt-2 text-16 font-l lh-160">
                Un lieu de vie moderne dédié à la mixologie, au vin et à la bière craft.
              </p>
              <p className="text-16 font-l lh-160">
                Un lieu où chaque cocktail évoque un souvenir, un voyage : d’abord le nez,
                puis le goût — le sel, le feu, le kick.
              </p>
              <p className="text-16 font-l lh-160">
                Ici, pas besoin de réservation pour boire un bon cocktail.
                <br />
                Nous servons à manger jusqu’à 23h !
              </p>
              <p className="mt-2 text-16 lh-160">
                <span className="font-b">Le + :</span> producteurs engagés et fait maison, du bar aux assiettes.
              </p>
            </div>

            <div className="p-info">
              <div className="dash-row text-16">
                <div>
                  <div className="font-b text-24">Adresse</div>
                  <div className="font-l lh-160">
                    15 rue montesquieu
                    <br />
                    69007 LYON
                  </div>
                </div>
                <div>
                  <div className="font-b text-24">Ouverture</div>
                  <div className="font-l lh-160">
                    Lundi – Mercredi → 18h – 00h
                    <br />
                    Jeudi – Samedi → 18h – 01h
                  </div>
                </div>
                <div>
                  <div className="font-b text-24">Contact</div>
                  <div className="mb-2 font-l lh-160">
                    <a href="mailto:contact@olmebar.com" className="underline">
                      contact@olmebar.com
                    </a>
                    <br />
                    06 00 00 00 00
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Onglets bas — visibles uniquement desktop */}
          <div className="absolute inset-x-0 bottom-0 z-[50] hidden lg:block">
            <div className="mx-auto max-w-[1280px] px-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
              >
                <OverlapTabs activeId={active} onSelect={handleSelect} size="bottom" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Début des pages */}
      <div ref={panelTopRef} />

      {/* Mobile/tablette : toutes les sections à la suite. Desktop : onglet actif uniquement */}
      {isSmall ? (
        <>
          <Mixologie />
          <Vins />
          <Food />
          <Infos />
        </>
      ) : (
        <>
          {active === "mixologie" && <Mixologie />}
          {active === "vins" && <Vins />}
          {active === "food" && <Food />}
          {active === "infos" && <Infos />}
        </>
      )}

      <Footer />
    </>
  );
}
