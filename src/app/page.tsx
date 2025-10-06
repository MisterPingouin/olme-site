"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TABS } from "./data/content";
import OverlapTabs from "./ui/OverlapTabs";

// Sections
import Mixologie from "./sections/Mixologie";
import Vins from "./sections/Vins";
import Food from "./sections/Food";
import Infos from "./sections/Infos";
import Footer from "./components/Footer";

/** true si viewport < lg (1024px) */
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

/** hauteur viewport (utile pour calculer la position close du sheet) */
function useViewportH() {
  const [vh, setVh] = useState<number>(
    typeof window !== "undefined" ? window.innerHeight : 0
  );
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return vh;
}

// ----- Onglets (design maquette, avec numéros & multi-lignes) -----
function InlineTabs({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  // ↑ chevauchement un peu plus fort pour recouvrir 02/03/04
  const OVERLAP = 24;
  const TAB_H = 60;

  const bgById: Record<string, string> = {
    mixologie: "bg-o-red text-o-sand",
    vins: "bg-[#DE9E53] text-o-green",
    food: "bg-[#F4E4C7] text-o-green",
    infos: "bg-o-blue text-o-green",
  };

  // Libellés formatés (sauts de ligne forcés)
  const labelById: Record<string, string> = {
    mixologie: "Mixologie",
    vins: "Vins,\nbières\n& softs",
    food: "Brut\nFood",
    infos: "Infos\npratiques",
  };

  const getBg = (id: string) => bgById[id] ?? "";

  return (
    <nav aria-label="Sections" className="w-full">
      <div className="flex w-full overflow-hidden">
        {TABS.map((t, i) => {
          const active = t.id === activeId;
          const prevId = i > 0 ? TABS[i - 1].id : t.id;
          const num = String(i + 1).padStart(2, "0");

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id)}
              aria-current={active ? "page" : undefined}
              className={[
                "relative shrink-0 grow-0",
                `h-[${TAB_H}px]`,
                "rounded-tr-[20px] ring-0 border-0",
                // ❌ plus de radius en haut-gauche pour tous (y compris quand actif)
                "flex items-center px-3",
                getBg(t.id),
              ].join(" ")}
              style={{
                // largeur = (100% + somme des overlaps) / 4
                width: `calc((100% + ${OVERLAP * 3}px) / 4)`,
                marginLeft: i > 0 ? -OVERLAP : 0,
                zIndex: active ? 200 : 100 - i * 10,
              }}
            >
              {/* Patch couleur à gauche (onglets 2→4) pour fond invisible */}
              {i > 0 && !active && (
                <span
                  aria-hidden
                  className={["absolute top-0 h-full", getBg(prevId)].join(" ")}
                  style={{ left: -OVERLAP, width: OVERLAP, zIndex: 0 }}
                />
              )}

              {/* Contenu interne : numéro à gauche, libellé à droite */}
              <div className="relative z-10 flex w-full items-center justify-between gap-2">
                {/* Numéro – Figtree 700 / 14px / 106% / 0 */}
                <span className="font-b text-[14px] leading-[1.06] tracking-[0]">
                  {num}
                </span>

                {/* Libellé multi-lignes aligné à droite – même typo */}
                <span className="font-b text-[14px] leading-[1.06] tracking-[0] whitespace-pre-line text-right">
                  {labelById[t.id] ?? t.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default function Home() {
  const [active, setActive] = useState<string>("mixologie");

  // --- Mobile ---
  const isSmall = useIsBelowLG();
  const vh = useViewportH();
  const sheetRef = useRef<HTMLDivElement | null>(null);

  // "Sheet" unique (onglets + section) pour animations perfs
  const TABS_H = 60; // (garde cohérence avec InlineTabs)
  const [sheetOpen, setSheetOpen] = useState(false);
  const CLOSED_Y = Math.max(vh - TABS_H, 0); // onglets posés sur le bas

  // --- Desktop ---
  const panelTopRef = useRef<HTMLDivElement | null>(null);
  const goToPanelTop = () =>
    panelTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleSelect = (id: string) => {
    history.replaceState(null, "", `#${id}`);

    if (isSmall) {
      if (!sheetOpen) {
        setActive(id);
        setSheetOpen(true);
        requestAnimationFrame(() => sheetRef.current?.scrollTo(0, 0));
      } else {
        if (id === active) {
          setSheetOpen(false); // retour accueil
        } else {
          setActive(id);
          sheetRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
      return;
    }

    // Desktop (inchangé)
    setActive(id);
    goToPanelTop();
  };

  // ouverture si hash au chargement
  useEffect(() => {
    const hash =
      typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash || !TABS.some((t) => t.id === hash)) return;

    setActive(hash);
    if (isSmall) {
      setSheetOpen(true);
      setTimeout(() => sheetRef.current?.scrollTo(0, 0), 0);
    } else {
      setTimeout(() => goToPanelTop(), 0);
    }
  }, [isSmall]);

  // Largeurs responsives (fidèles à la maquette)
  const frameW = "min(351px, calc(100vw - 40px))";
  const contactW = "min(350px, calc(100vw - 40px))";

  return (
    <>
      {/* HERO */}
      <section className="hero relative min-h-dvh bg-olme overflow-hidden">
        {/* --- MOBILE : homepage --- */}
        <div className="lg:hidden relative">
          <div
            className="mx-auto w-full px-5 sm:px-6"
            style={{
              paddingTop: "env(safe-area-inset-top, 0px)",
              paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + ${TABS_H + 24}px)`,
            }}
          >
            {/* Bloc global aligné GAUCHE ; position contrôlée */}
            <div
              className="relative"
              style={{
                marginTop: "clamp(64px, 25vh, 140px)",
                maxWidth: "420px",
              }}
            >
              {/* Logo à gauche */}
              <div className="flex">
                <img
                  src="/logo/logo-olme.svg"
                  alt="Olmé"
                  className="w-[280px] h-auto select-none"
                  draggable={false}
                />
              </div>

              {/* Intro (alignée à gauche, largeur maquette) */}
              <div className="mt-6 text-o-sand" style={{ width: frameW }}>
                <h3 className="font-b leading-[1.5] text-[18px]">
                  Olmé, bar à cocktails à Lyon
                </h3>
                <p className="mt-2 font-l leading-[1.6] text-[12px]">
                  Un lieu de vie moderne dédié à la mixologie, au vin et à la
                  bière craft.
                </p>
                <p className="font-l leading-[1.6] text-[12px]">
                  Un lieu où chaque cocktail évoque un souvenir, un voyage :
                  d’abord le nez, puis le goût — le sel, le feu, le kick.
                </p>
                <p className="font-l leading-[1.6] text-[12px]">
                  Ici, pas besoin de réservation pour boire un bon cocktail.{" "}
                  <br />
                  Nous servons à manger jusqu’à 23h !
                </p>
                <p className="mt-2 leading-[1.6] text-[12px]">
                  <span className="font-b">Le + :</span> producteurs engagés et
                  fait maison, du bar aux assiettes.
                </p>
              </div>

              {/* Adresse / Ouverture */}
              <div className="mt-8 text-o-sand" style={{ width: frameW }}>
                <div className="dash-row w-full">
                  <div className="pr-4">
                    <div className="font-b text-[18px]">Adresse</div>
                    <div className="font-l lh-160 text-[12px]">
                      15 rue montesquieu <br /> 69007 LYON
                    </div>
                  </div>
                  <div className="pl-4">
                    <div className="font-b text-[18px]">Ouverture</div>
                    <div className="font-l lh-160 text-[12px]">
                      Lundi – Mercredi → 18h – 00h <br />
                      Jeudi – Samedi → 18h – 01h
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div
                  className="mt-6 dash-row w-full justify-center"
                  style={{ width: contactW }}
                >
                  <div className="text-center px-4">
                    <div className="font-b text-[18px]">Contact</div>
                    <div className="font-l lh-160 text-[12px]">
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
            {/* Fin bloc contenu mobile */}
          </div>
        </div>

        {/* --- DESKTOP (≥ lg) : inchangé --- */}
        <div className="hidden lg:block">
          <div className="frame">
            <img src="/logo/logo-olme.svg" alt="Olmé" className="p-logo select-none" draggable={false} />
            <img src="/ornaments/ornament-botanic.svg" alt="" aria-hidden="true" className="p-orn select-none" draggable={false} />
            <div className="p-text text-o-sand">
              <h3 className="text-16 font-b lh-160">Olmé, bar à cocktails à Lyon</h3>
              <p className="mt-2 text-16 font-l lh-160">Un lieu de vie moderne dédié à la mixologie, au vin et à la bière craft.</p>
              <p className="text-16 font-l lh-160">Un lieu où chaque cocktail évoque un souvenir, un voyage : d’abord le nez, puis le goût — le sel, le feu, le kick.</p>
              <p className="text-16 font-l lh-160">Ici, pas besoin de réservation pour boire un bon cocktail. <br /> Nous servons à manger jusqu’à 23h !</p>
              <p className="mt-2 text-16 lh-160"><span className="font-b">Le + :</span> producteurs engagés et fait maison, du bar aux assiettes.</p>
            </div>
            <div className="p-info">
              <div className="dash-row text-16">
                <div>
                  <div className="font-b text-24">Adresse</div>
                  <div className="font-l lh-160">15 rue montesquieu <br /> 69007 LYON</div>
                </div>
                <div>
                  <div className="font-b text-24">Ouverture</div>
                  <div className="font-l lh-160">Lundi – Mercredi → 18h – 00h <br /> Jeudi – Samedi → 18h – 01h</div>
                </div>
                <div>
                  <div className="font-b text-24">Contact</div>
                  <div className="mb-2 font-l lh-160"><a href="mailto:contact@olmebar.com" className="underline">contact@olmebar.com</a><br /> 06 00 00 00 00</div>
                </div>
              </div>
            </div>
          </div>

          {/* Onglets bas desktop */}
          <div className="absolute inset-x-0 bottom-0 z-[50]">
            <div className="mx-auto max-w-[1280px] px-4">
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 180, damping: 18 }}>
                <OverlapTabs activeId={active} onSelect={handleSelect} size="bottom" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Ancre haut de panneau desktop */}
      <div ref={panelTopRef} />

      {/* --- MOBILE : SHEET (onglets + section) performant --- */}
      {isSmall && (
        <motion.div
          ref={sheetRef}
          className="fixed inset-0 z-[60] lg:hidden flex flex-col bg-transparent"
          style={{ pointerEvents: "auto", willChange: "transform" }}
          initial={false}
          animate={{ y: sheetOpen ? 0 : Math.max(vh - 60, 0) }}
          transition={{ type: "tween", duration: 0.45, ease: "easeOut" }}
        >
          <InlineTabs activeId={active} onSelect={handleSelect} />

          <div className="flex-1 overflow-y-auto">
            {active === "mixologie" && <Mixologie />}
            {active === "vins" && <Vins />}
            {active === "food" && <Food />}
            {active === "infos" && <Infos />}
          </div>
        </motion.div>
      )}

      {/* --- DESKTOP : contenu selon onglet --- */}
      {!isSmall && (
        <>
          {active === "mixologie" && <Mixologie />}
          {active === "vins" && <Vins />}
          {active === "food" && <Food />}
          {active === "infos" && <Infos />}
          <Footer />
        </>
      )}
    </>
  );
}
