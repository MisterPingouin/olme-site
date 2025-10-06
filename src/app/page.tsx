"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TABS } from "./data/content";
import OverlapTabs from "./ui/OverlapTabs";
import MobileBottomTabs from "./ui/MobileBottomTabs";

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

// Barre inline (non-sticky) rendue en haut du contenu sections
function InlineTabs({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const bgById: Record<string, string> = {
    mixologie: "bg-o-red text-o-sand",
    vins: "bg-[#DE9E53] text-o-green",
    food: "bg-[#F4E4C7] text-o-green",
    infos: "bg-o-blue text-o-green",
  };
  return (
    <nav aria-label="Sections" className="w-full">
      <div className="flex w-full overflow-hidden">
        {TABS.map((t, i) => {
          const active = t.id === activeId;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id)}
              aria-current={active ? "page" : undefined}
              className={[
                "relative h-[50px] w-[calc(25%+6px)]",
                i > 0 ? "-ml-2" : "",
                "rounded-tr-[20px] ring-0 border-0",
                "flex items-center justify-center text-center px-3",
                "text-[13px] font-b leading-tight whitespace-normal break-words",
                bgById[t.id],
              ].join(" ")}
              style={{ zIndex: active ? 200 : 100 - i * 10 }}
            >
              <span>{t.label}</span>
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
  const [mobileMode, setMobileMode] = useState<"docked" | "pinned">("docked");
  const [tabsH, setTabsH] = useState<number>(50);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Animations synchronisées (montée / descente)
  const LIFT_DURATION = 0.55;
  const [isLifting, setIsLifting] = useState(false);
  const [isDescending, setIsDescending] = useState(false);
  const [liftY, setLiftY] = useState(0);

  // --- Desktop ---
  const panelTopRef = useRef<HTMLDivElement | null>(null);
  const goToPanelTop = () =>
    panelTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const backToHome = () => {
    // Descente coordonnée onglets + section
    const distance = window.innerHeight - tabsH;
    setLiftY(distance);
    setIsDescending(true);
    window.setTimeout(() => {
      setIsDescending(false);
      setMobileMode("docked");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, LIFT_DURATION * 1000);
  };

  const handleSelect = (id: string) => {
    history.replaceState(null, "", `#${id}`);
    if (isSmall) {
      if (mobileMode === "docked") {
        // Montée coordonnée
        const distance = window.innerHeight - tabsH;
        setLiftY(distance);
        setIsLifting(true);
        setActive(id);
        setMobileMode("pinned");
        window.setTimeout(() => setIsLifting(false), LIFT_DURATION * 1000);
        return;
      }
      if (id === active) {
        // Re-clique sur l'onglet actif => descente coordonnée
        backToHome();
      } else {
        // Changement de section
        setActive(id);
        overlayRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // Desktop (comme avant)
    setActive(id);
    goToPanelTop();
  };

  // Lis l’ancre au chargement
  useEffect(() => {
    const hash =
      typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash || !TABS.some((t) => t.id === hash)) return;

    setActive(hash);
    if (isSmall) {
      setMobileMode("pinned");
      setLiftY(0);
      setIsLifting(false);
      setIsDescending(false);
      setTimeout(() => overlayRef.current?.scrollTo({ top: 0 }), 0);
    } else {
      setTimeout(() => goToPanelTop(), 0);
    }
  }, [isSmall]);

  // Largeurs responsives fidèles à la maquette
  const frameW = "min(351px, calc(100vw - 40px))";
  const contactW = "min(350px, calc(100vw - 40px))";

  return (
    <>
      {/* HERO */}
      <section className="hero relative min-h-dvh bg-olme overflow-hidden">
        {/* --- MOBILE : homepage fidèle à la maquette, centrée horizontalement --- */}
        <div className="lg:hidden relative">
          <div
            className="mx-auto w-full px-5 sm:px-6"
            style={{
              paddingTop: "env(safe-area-inset-top, 0px)",
              paddingBottom:
                "calc(env(safe-area-inset-bottom, 0px) + 70px)", // rien n'est masqué par les onglets
            }}
          >
            {/* Bloc global centré + position verticale stable */}
            <div
              className="relative mx-auto"
              style={{
                marginTop: "clamp(88px, 31vh, 172px)",
                maxWidth: "420px",
                width: "100%",
              }}
            >
              {/* Logo centré */}
              <div className="flex justify-center">
                <img
                  src="/logo/logo-olme.svg"
                  alt="Olmé"
                  className="w-[280px] h-auto select-none"
                  draggable={false}
                />
              </div>

              {/* Intro centrée (largeur maquette) */}
              <div className="mt-6 text-o-sand mx-auto" style={{ width: frameW }}>
                <h3 className="font-b leading-[1.5] text-[18px]">
                  Olmé, bar à cocktails à Lyon
                </h3>
                <p className="mt-2 font-l leading-[1.6] text-[12px]">
                  Un lieu de vie moderne dédié à la mixologie, au vin et à la bière craft.
                </p>
                <p className="font-l leading-[1.6] text-[12px]">
                  Un lieu où chaque cocktail évoque un souvenir, un voyage : d’abord le nez,
                  puis le goût — le sel, le feu, le kick.
                </p>
                <p className="font-l leading-[1.6] text-[12px]">
                  Ici, pas besoin de réservation pour boire un bon cocktail. <br />
                  Nous servons à manger jusqu’à 23h !
                </p>
                <p className="mt-2 leading-[1.6] text-[12px]">
                  <span className="font-b">Le + :</span> producteurs engagés et fait maison, du bar aux assiettes.
                </p>
              </div>

              {/* Adresse / Ouverture */}
              <div className="mt-8 text-o-sand mx-auto" style={{ width: frameW }}>
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
                  className="mt-6 dash-row w-full justify-center mx-auto"
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

      {/* --- MOBILE : vue sections (barre inline NON-STICKY) --- */}
      {isSmall && mobileMode === "pinned" && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[60] overflow-y-auto lg:hidden"
          initial={{ y: isLifting ? liftY : 0 }}
          animate={{ y: isDescending ? liftY : 0 }}
          transition={{ type: "tween", duration: LIFT_DURATION, ease: "easeOut" }}
        >
          {/* Placeholder transparent (évite le “saut” sans changer le fond) */}
          <div style={{ height: tabsH, backgroundColor: "transparent" }}>
            <div style={{ visibility: !isLifting && !isDescending ? "visible" : "hidden" }}>
              <InlineTabs activeId={active} onSelect={handleSelect} />
            </div>
          </div>

          {/* Sections — la barre inline scrolle hors-écran, non sticky */}
          {active === "mixologie" && <Mixologie />}
          {active === "vins" && <Vins />}
          {active === "food" && <Food />}
          {active === "infos" && <Infos />}
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

      {/* Barre mobile FIXE (bas) + anims synchronisées */}
      {isSmall && (mobileMode === "docked" || isLifting || isDescending) && (
        <MobileBottomTabs
          activeId={active}
          onSelect={handleSelect}
          mode={isLifting ? "pinned" : isDescending ? "docked" : "docked"}
          onHeightChange={setTabsH}
          isLifting={isLifting}
          isDescending={isDescending}
        />
      )}
    </>
  );
}
