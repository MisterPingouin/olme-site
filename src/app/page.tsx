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

export default function Home() {
  const [active, setActive] = useState<string>("mixologie"); // par défaut
  const panelTopRef = useRef<HTMLDivElement | null>(null);

  // Si on clique un onglet depuis le hero, on monte la section & on défile jusqu'au header (non sticky)
  const goToPanelTop = () => {
    panelTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSelect = (id: string) => {
    setActive(id);
    // met à jour l’ancre (utile pour partage) sans recharger
    history.replaceState(null, "", `#${id}`);
    goToPanelTop();
  };

  // lis l'ancre si l'utilisateur arrive avec #vins, etc.
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash && TABS.some((t) => t.id === hash)) {
      setActive(hash);
      // on positionne directement sur le header des onglets
      setTimeout(() => goToPanelTop(), 0);
    }
  }, []);

  return (
    <>
      {/* HERO — No-scroll.png (aucun petit logo en haut, onglets en bas) */}
      <section className="hero relative min-h-dvh bg-olme overflow-hidden">
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
                  15 rue montesquieu<br/>69007 LYON
                </div>
              </div>
              <div>
                <div className="font-b text-24">Ouverture</div>
                <div className="font-l lh-160">
                  Lundi – Mercredi → 18h – 00h<br/>
                  Jeudi – Samedi → 18h – 01h
                </div>
              </div>
              <div>
                <div className="font-b text-24">Contact</div>
                <div className="mb-2 font-l lh-160">
                  <a href="mailto:contact@olmebar.com" className="underline">contact@olmebar.com</a><br/>
                  06 00 00 00 00
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Onglets du bas dans le hero (chevauchement + animation légère) */}
<div className="absolute inset-x-0 bottom-0 z-[50]">
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
      </section>

      {/* Début des pages « onglets » (header non-sticky + contenu de l’onglet actif) */}
      <div ref={panelTopRef} />

      {/* Une seule section montée selon l’onglet actif */}
      {active === "mixologie" && <Mixologie />}
      {active === "vins" && <Vins />}
      {active === "food" && <Food />}
      {active === "infos" && <Infos />}
    </>
  );
}
