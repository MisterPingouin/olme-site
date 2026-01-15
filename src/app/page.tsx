"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";
import { TABS } from "./data/content";
import SitePopup from "./components/SitePopup";

// Code-splitting des composants lourds non critiques LCP
const OverlapTabs = dynamic(() => import("./ui/OverlapTabs"), { ssr: true });
const Mixologie = dynamic(() => import("./sections/Mixologie"), { ssr: true });
const Vins = dynamic(() => import("./sections/Vins"), { ssr: true });
const Food = dynamic(() => import("./sections/Food"), { ssr: true });
const Infos = dynamic(() => import("./sections/Infos"), { ssr: true });
const Footer = dynamic(() => import("./components/Footer"), { ssr: true });

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

// ----- Onglets (design maquette, anim clip pour i>0, SANS chiffres) -----
function InlineTabs({
  activeId,
  onSelect,
  // MASK_BG: notifier la fin de l’animation de l’onglet actif (02–04)
  onActiveAnimEnd,
}: {
  activeId: string;
  onSelect: (id: string) => void;
  onActiveAnimEnd?: () => void;
}) {
  const OVERLAP = 30;
  const REVEAL = 26;
  const DUR = 0.26;

  const surfaceBgById = useMemo<Record<string, string>>(
    () => ({
      mixologie: "bg-o-red",
      vins: "bg-[#DE9E53]",
      food: "bg-[#F1D6A5]",
      infos: "bg-o-blue",
    }),
    []
  );

  const textById = useMemo<Record<string, string>>(
    () => ({
      mixologie: "text-o-sand",
      vins: "text-o-green",
      food: "text-o-green",
      infos: "text-o-green",
    }),
    []
  );

  const labelById = useMemo<Record<string, string>>(
    () => ({
      mixologie: "Mixologie",
      vins: "Vins,\nbières\n& softs",
      food: "Brut\nFood",
      infos: "Infos,\nréservations",
    }),
    []
  );

  return (
    <nav aria-label="Sections" className="w-full">
      <div className="flex w-full overflow-hidden">
        {TABS.map((t, i) => {
          const active = t.id === activeId;
          const animateThis = active && i > 0; // on garde le clip pour 02–04
          const prevId = i > 0 ? TABS[i - 1].id : t.id;

          return (
            <motion.button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id)}
              aria-current={active ? "page" : undefined}
              className={[
                "relative shrink-0 grow-0 h-[60px]",
                textById[t.id],
                "rounded-tr-[20px] ring-0 border-0 px-3",
                "flex items-center overflow-hidden select-none",
              ].join(" ")}
              style={{
                width: `calc((100% + ${OVERLAP * 3}px) / 4)`,
                marginLeft: i > 0 ? -OVERLAP : 0,
                zIndex: active ? 200 : 100 - i * 10,
              }}
              initial={false}
              animate={{
                clipPath: animateThis
                  ? [
                      "inset(0px 0px 0px 0px)",
                      `inset(0px 0px 0px ${REVEAL}px)`,
                      `inset(0px 0px 0px ${REVEAL}px round 20px 0px 0px 0px)`,
                    ]
                  : "inset(0px 0px 0px 0px)",
              }}
              transition={{
                clipPath: animateThis
                  ? { duration: DUR, times: [0, 0.85, 1], ease: "easeInOut" }
                  : { duration: DUR / 2, ease: "easeInOut" },
              }}
              // MASK_BG: quand l’anim de l’onglet actif (02–04) se termine
              onAnimationComplete={() => {
                if (animateThis) onActiveAnimEnd?.();
              }}
            >
              {/* Fond coloré coupé par le clip */}
              <div
                aria-hidden
                className={[
                  "absolute inset-0",
                  surfaceBgById[t.id],
                  "rounded-tr-[20px]",
                ].join(" ")}
                style={{ zIndex: 0 }}
              />

              {/* Patch couleur à gauche pour 2→4 inactif */}
              {i > 0 && !active && (
                <span
                  aria-hidden
                  className={["absolute top-0 h-full", surfaceBgById[prevId]].join(
                    " "
                  )}
                  style={{ left: -OVERLAP, width: OVERLAP, zIndex: 0 }}
                />
              )}

              {/* SEUL le label (droite) – plus de chiffres */}
              <div className="relative z-10 flex w-full items-center justify-end">
                <span className="font-b text-[14px] leading-[1.06] whitespace-pre-line text-right">
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

  const TABS_H = 60;
  const [sheetOpen, setSheetOpen] = useState(false);

  // MASK_BG: fond plein après anim (évite de voir le hero derrière)
  const [sheetMasked, setSheetMasked] = useState(false);

  // Header (barre) + logo
  const [headerVisible, setHeaderVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [logoAtTop, setLogoAtTop] = useState(true);

  // zone scrollable
  const sheetRef = useRef<HTMLDivElement | null>(null);

  // --- SWIPE (mobile) ---
  // seuils swipe
  const SWIPE_MIN_DIST = 60; // px
  const SWIPE_MAX_DURATION_OPEN = 350; // ms (pour ouvrir)
  const SWIPE_MAX_DURATION_CLOSE = 500; // ms (pour fermer)
  const touchStartY = useRef<number>(0);
  const touchStartT = useRef<number>(0);
  const canCloseFromTop = useRef<boolean>(false);
  const hasMoved = useRef<boolean>(false);

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isSmall) return;
    const t = e.touches[0];
    touchStartY.current = t.clientY;
    touchStartT.current = Date.now();
    hasMoved.current = false;

    // Autoriser la fermeture via swipe uniquement si on est en haut du scroll
    if (sheetOpen && sheetRef.current) {
      canCloseFromTop.current = sheetRef.current.scrollTop <= 2;
    } else {
      canCloseFromTop.current = false;
    }
  }, [isSmall, sheetOpen]);

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isSmall) return;
    if (!touchStartT.current) return;
    const dy = e.touches[0].clientY - touchStartY.current;
    // Quand sheet est fermé et qu'on switche vers le haut, on empêche le scroll page
    if (!sheetOpen && dy < -8) {
      e.preventDefault();
      e.stopPropagation();
    }
    hasMoved.current = true;
  }, [isSmall, sheetOpen]);

  const onTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isSmall) return;
    if (!touchStartT.current) return;
    const dt = Date.now() - touchStartT.current;
    const touch = e.changedTouches[0];
    const dy = touch.clientY - touchStartY.current;

    // SWIPE UP -> ouvrir (depuis l'état fermé)
    if (!sheetOpen && dy <= -SWIPE_MIN_DIST && dt <= SWIPE_MAX_DURATION_OPEN) {
      setHeaderVisible(true);
      setLogoVisible(false);
      setSheetOpen(true);
      setSheetMasked(false);
      requestAnimationFrame(() => sheetRef.current?.scrollTo(0, 0));
      return;
    }

    // SWIPE DOWN -> fermer (si contenu au top, pour éviter les conflits avec le scroll)
    if (
      sheetOpen &&
      canCloseFromTop.current &&
      dy >= SWIPE_MIN_DIST &&
      dt <= SWIPE_MAX_DURATION_CLOSE
    ) {
      setSheetOpen(false);
      setLogoVisible(false);
      setSheetMasked(false);
      setHeaderVisible(false);
      if (typeof window !== "undefined") {
        history.replaceState(null, "", window.location.pathname);
      }
    }
  }, [isSmall, sheetOpen]);

  // FIX: no-scroll when sheet closed (mobile only)
  useEffect(() => {
    if (!isSmall) return;
    const el = sheetRef.current;
    if (!el) return;

    const blockScroll = (e: Event) => {
      if (!sheetOpen) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    el.addEventListener("touchmove", blockScroll, { passive: false });
    el.addEventListener("wheel", blockScroll, { passive: false });

    return () => {
      el.removeEventListener("touchmove", blockScroll as EventListener);
      el.removeEventListener("wheel", blockScroll as EventListener);
    };
  }, [isSmall, sheetOpen]);

  // Logo au top en fonction du scroll INTERNE du sheet (uniquement quand ouvert)
  useEffect(() => {
    if (!isSmall || !sheetOpen) return;
    const el = sheetRef.current;
    if (!el) return;

    let raf = 0;
    const THRESH = 6;

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setLogoAtTop(el.scrollTop <= THRESH);
      });
    };

    setLogoAtTop(el.scrollTop <= THRESH);
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isSmall, sheetOpen]);

  // --- Desktop ---
  const panelTopRef = useRef<HTMLDivElement | null>(null);
  const goToPanelTop = useCallback(
    () => panelTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    []
  );

  const activeIndex = useMemo(
    () => TABS.findIndex((t) => t.id === active),
    [active]
  );

  const handleSelect = useCallback((id: string) => {
    history.replaceState(null, "", `#${id}`);

    if (isSmall) {
      // --- MOBILE ---
      // 1) si fermé -> ouvrir + activer la section
      if (!sheetOpen) {
        setActive(id);
        setHeaderVisible(true);
        setLogoVisible(false);
        setSheetOpen(true);
        setSheetMasked(false); // MASK_BG: on attend la fin d’anim
        requestAnimationFrame(() => sheetRef.current?.scrollTo(0, 0));
        return;
      }

      // 2) si ouvert et on reclique l'actif -> fermer
      if (sheetOpen && id === active) {
        setSheetOpen(false);
        setLogoVisible(false);
        setSheetMasked(false);
        setHeaderVisible(false);
        if (typeof window !== "undefined") {
          history.replaceState(null, "", window.location.pathname);
        }
        return;
      }

      // 3) si ouvert et on clique un autre onglet -> switch + scroll top
      if (id !== active) {
        setActive(id);
        sheetRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // --- DESKTOP ---
    setActive(id);
    goToPanelTop();
  }, [active, goToPanelTop, isSmall, sheetOpen]);

  const handleLogoHome = useCallback(() => {
    setSheetOpen(false);
    setLogoVisible(false);
    setSheetMasked(false); // MASK_BG: retire le fond quand on redescend
    setActive("mixologie");
    if (typeof window !== "undefined") {
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  // ouverture via hash au chargement
  useEffect(() => {
    const hash =
      typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash || !TABS.some((t) => t.id === hash)) return;

    setActive(hash);
    if (isSmall) {
      setHeaderVisible(true);
      setLogoVisible(false);
      setSheetOpen(true);
      setSheetMasked(false); // attend fin anim
      setTimeout(() => sheetRef.current?.scrollTo(0, 0), 0);
    } else {
      setTimeout(() => goToPanelTop(), 0);
    }
  }, [isSmall, goToPanelTop]);

  // Largeurs responsives (maquette)
  const frameW = "min(351px, calc(100vw - 40px))";

  return (
    <>
    <SitePopup />
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
            {/* Bloc global aligné GAUCHE */}
            <div
              className="relative"
              style={{
                marginTop: "95px",
                maxWidth: "420px",
              }}
            >
              {/* Logo principal homepage — LCP mobile (priority + fetchPriority) */}
              <div className="flex">
                <Image
                  src="/logo/logo-olme.svg"
                  alt="Olmé"
                  width={656}
                  height={210}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1023px) 280px, 656px"
                  className="w-[280px] h-auto mt-12 select-none"
                  draggable={false}
                />
              </div>
              {/* Intro */}
              <div className="mt-6 text-o-sand" style={{ width: frameW }}>
                <h1 className="font-b leading-[1.5] text-[18px]">
                  Bar à cocktails et vins engagés à Lyon
                </h1>
                <p className="mt-2 font-l leading-[1.6] text-[12px]">
                  Un lieu de vie moderne et cosy dédié à la mixologie, au vin et la bière craft. Ici on travaille avec des producteurs engagés et on fait maison, du bar aux assiettes.
                </p>
              </div>

              {/* Adresse / Ouverture / Contact */}
              <div className="mt-8 text-o-sand" style={{ width: frameW }}>
                <div className="dash-row w-full">
                  <div className="pr-4">
                    <div className="font-b text-[18px]">Adresse</div>
                    <div className="font-l lh-160 text-[12px]">
                      15 rue Montesquieu <br /> 69007 LYON
                    </div>
                  </div>
                  <div className="pl-4">
                    <div className="font-b text-[18px]">Ouverture</div>
                    <div className="font-l lh-160 text-[12px]">
                      Mardi – Mercredi → 18h – 00h <br />
                      Jeudi – Samedi → 18h – 01h
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Fin bloc contenu mobile */}
          </div>
        </div>

        {/* --- DESKTOP (≥ lg) --- */}
        <div className="hidden lg:block">
          <div className="frame">
            <Image
              src="/logo/logo-olme.svg"
              alt="Olmé"
              width={656}
              height={210}
              priority
              fetchPriority="high"
              sizes="656px"
              className="p-logo select-none"
              draggable={false}
            />

            <picture>
              <source
                media="(min-width:1024px)"
                srcSet="/ornaments/ornament-botanic.svg"
              />
              <img
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
                alt="Illustration olmé"
                aria-hidden="true"
                className="p-orn select-none"
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </picture>

            <div className="p-text text-o-sand mt-8">
              <h1 className="text-16 font-b lh-160">Olmé, bar à cocktails à Lyon</h1>
                            <p className="mt-8 font-l leading-[1.6] text-16">
                  Un lieu de vie moderne et cosy dédié à la mixologie, au vin de vignerons et la bière craft. Ici on travaille avec des producteurs engagés et on fait maison, du bar aux assiettes.
                </p>
            </div>

            <div className="p-info">
              <div className="dash-row text-16">
                <div>
                  <div className="font-b text-24">Adresse</div>
                  <div className="font-l lh-160">15 rue montesquieu <br /> 69007 LYON</div>
                </div>
                <div>
                  <div className="font-b text-24">Ouverture</div>
                  <div className="font-l lh-160">Mardi – Mercredi → 18h – 00h <br /> Jeudi – Samedi → 18h – 01h</div>
                </div>
                <div>
                  <div className="font-b text-24">Contact</div>
                  <div className="mb-2 font-l lh-160">
        <a href="mailto:contact@olmebar.com" className="underline">
          contact@olmebar.com
        </a>
        <br />
        <a
          href="tel:+33750952535"
        >
          07 50 95 25 35
        </a>                  </div>
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
<div ref={panelTopRef} className="lg:scroll-mt-[65px]" />
      {/* --- MOBILE : SHEET (header sticky + onglets + section) --- */}
      {isSmall && (
        <motion.div
          // MASK_BG: on applique la couleur une fois l’anim terminée
          className={[
            "fixed inset-0 z-[60] lg:hidden flex flex-col",
            sheetOpen && sheetMasked ? "bg-[#072821]" : "bg-transparent",
          ].join(" ")}
          style={{ pointerEvents: "auto", willChange: "transform" }}
          initial={false}
          animate={{ y: sheetOpen ? 0 : Math.max(vh - TABS_H, 0) }}
          transition={{ type: "tween", duration: 0.45, ease: "easeOut" }}
          onAnimationComplete={() => {
            if (sheetOpen) {
              // Fin de l’anim de montée : si onglet 01 -> masquer maintenant
              if (activeIndex === 0) setSheetMasked(true);
              setLogoVisible(true);
            } else {
              setHeaderVisible(false);
              setSheetMasked(false); // en descente, on retire le masque
            }
          }}
          // === SWIPE HANDLERS (mobile only) ===
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Zone scrollable (le header est STICKY dedans) */}
          <div
            ref={sheetRef}
            className={[
              "flex-1",
              sheetOpen ? "overflow-y-auto overscroll-contain" : "overflow-hidden overscroll-none",
              sheetOpen ? "touch-auto" : "touch-none",
              "select-none",
            ].join(" ")}
            style={{ touchAction: sheetOpen ? "auto" : "none" }}
          >
            {/* HEADER STICKY tout en haut pendant le scroll */}
            {headerVisible && (
              <div
                className="sticky top-0 z-50 flex items-center gap-3 px-4 h-14"
                style={{ top: "env(safe-area-inset-top, 0px)" }}
              >
                <button
                  onClick={handleLogoHome}
                  className={[
                    "inline-flex items-center gap-2 transition-opacity duration-200",
                    logoVisible && logoAtTop
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none",
                  ].join(" ")}
                  aria-label="Revenir à l’accueil"
                >
                  <Image
                    src="/logo/logo-olme.svg"
                    alt="Olmé"
                    width={88}
                    height={28}
                    sizes="88px"
                    loading="lazy"
                    className="h-6 w-auto"
                  />
                </button>
              </div>
            )}

            {/* Onglets puis contenu */}
            <InlineTabs
              activeId={active}
              onSelect={handleSelect}
              onActiveAnimEnd={() => {
                // MASK_BG: si onglet 02–04, on masque après l’anim du clip
                if (sheetOpen && activeIndex > 0) setSheetMasked(true);
              }}
            />
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
