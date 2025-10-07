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

// ----- Onglets (design maquette, chiffres + anim clip pour i>0) -----
function InlineTabs({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const OVERLAP = 30;   // chevauchement pour masquer tout interstice / chiffres
  const REVEAL = 26;    // largeur évidée à gauche quand actif (i>0)
  const DUR = 0.26;     // durée du clip

  // Couleurs (fond séparé du texte)
  const surfaceBgById: Record<string, string> = {
    mixologie: "bg-o-red",
    vins: "bg-[#DE9E53]",
    food: "bg-[#F4E4C7]",
    infos: "bg-o-blue",
  };
  const textById: Record<string, string> = {
    mixologie: "text-o-sand",
    vins: "text-o-green",
    food: "text-o-green",
    infos: "text-o-green",
  };

  // Libellés formatés (sauts de ligne forcés)
  const labelById: Record<string, string> = {
    mixologie: "Mixologie",
    vins: "Vins,\nbières\n& softs",
    food: "Brut\nFood",
    infos: "Infos\npratiques",
  };

  return (
    <nav aria-label="Sections" className="w-full">
      <div className="flex w-full overflow-hidden">
        {TABS.map((t, i) => {
          const active = t.id === activeId;
          const animateThis = active && i > 0; // pas d’anim spéciale pour Mixologie (01)
          const prevId = i > 0 ? TABS[i - 1].id : t.id;
          const num = String(i + 1).padStart(2, "0");

          return (
            <motion.button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id)}
              aria-current={active ? "page" : undefined}
              className={[
                "relative shrink-0 grow-0",
                "h-[60px]",
                textById[t.id],
                "rounded-tr-[20px] ring-0 border-0",
                "px-3",
                "flex items-center",
                "overflow-hidden", // important: pour le clip-path et le hit-test
              ].join(" ")}
              style={{
                width: `calc((100% + ${OVERLAP * 3}px) / 4)`,
                marginLeft: i > 0 ? -OVERLAP : 0,
                zIndex: active ? 200 : 100 - i * 10,
              }}
              initial={false}
              animate={{
                // on CLIPPE le bouton lui-même pour libérer le clic à gauche
                clipPath: animateThis
                  ? [
                      "inset(0px 0px 0px 0px)",                                       // départ
                      `inset(0px 0px 0px ${REVEAL}px)`,                                // clippage
                      `inset(0px 0px 0px ${REVEAL}px round 20px 0px 0px 0px)`,         // arrondi TL à la fin
                    ]
                  : "inset(0px 0px 0px 0px)",
              }}
              transition={{
                clipPath: animateThis
                  ? { duration: DUR, times: [0, 0.85, 1], ease: "easeInOut" }
                  : { duration: DUR / 2, ease: "easeInOut" },
              }}
            >
              {/* Fond coloré (coupé par le clip du bouton) */}
              <div
                aria-hidden
                className={[
                  "absolute inset-0",
                  surfaceBgById[t.id],
                  "rounded-tr-[20px]", // TR toujours rond
                ].join(" ")}
                style={{ zIndex: 0 }}
              />

              {/* Patch couleur à gauche pour 2→4 INACTIF (évite les fuites de fond, pas d'arrondi ici) */}
              {i > 0 && !active && (
                <span
                  aria-hidden
                  className={["absolute top-0 h-full", surfaceBgById[prevId]].join(" ")}
                  style={{ left: -OVERLAP, width: OVERLAP, zIndex: 0 }}
                />
              )}

              {/* Contenu : chiffre à gauche (disparaît quand actif 02–04) / label à droite (toujours visible) */}
              <div className="relative z-10 flex w-full items-center justify-between gap-2">
                <motion.span
                  className="font-b text-[14px] leading-[1.06] tracking-[0]"
                  initial={false}
                  animate={{ opacity: animateThis ? 0 : 1 }}
                  transition={{ duration: DUR * 0.85, ease: "easeInOut" }}
                >
                  {num}
                </motion.span>

                <span className="font-b text-[14px] leading-[1.06] tracking-[0] whitespace-pre-line text-right">
                  {labelById[t.id] ?? t.label}
                </span>
              </div>
            </motion.button>
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
  const TABS_H = 60;
  const [sheetOpen, setSheetOpen] = useState(false);

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
            {/* Bloc global aligné GAUCHE ; offset léger conservé */}
            <div
              className="relative"
              style={{
                marginTop: "calc(clamp(56px, 23vh, 132px) - 10px)",
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

              {/* Intro */}
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
          {/* Les onglets dans la zone scrollable => disparaissent au scroll */}
          <div className="flex-1 overflow-y-auto">
            <InlineTabs activeId={active} onSelect={handleSelect} />
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
