"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TABS } from "../data/content";
import { cn } from "../lib/cn";

type Mode = "docked" | "pinned";
type Props = {
  activeId: string;
  onSelect: (id: string) => void;
  mode: Mode;                          // "docked" (en bas) | "pinned" (en haut)
  onHeightChange?: (h: number) => void;
  // Nouveaux flags pour synchroniser les animations avec la section
  isLifting?: boolean;
  isDescending?: boolean;
};

// Couleurs mobile (vins en #DE9E53)
const bgById: Record<string, string> = {
  mixologie: "bg-o-red text-o-sand",
  vins: "bg-[#DE9E53] text-o-green",
  food: "bg-[#F4E4C7] text-o-green",
  infos: "bg-o-blue text-o-green",
};

const LIFT_DURATION = 0.55;

export default function MobileBottomTabs({
  activeId,
  onSelect,
  mode,
  onHeightChange,
  isLifting = false,
  isDescending = false,
}: Props) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [dockY, setDockY] = useState(0);
  const [measured, setMeasured] = useState(false);

  // colle la barre au bord bas (sans espace)
  const measure = () => {
    const h = wrapRef.current?.offsetHeight ?? 50;
    onHeightChange?.(h);
    setDockY(window.innerHeight - h);
    setMeasured(true);
  };

  useEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Pour la descente, on veut partir du HAUT (y=0) et aller à dockY.
  const initialY = isDescending ? 0 : dockY;
  const animateY = mode === "docked" ? dockY : 0;
  const animated = isLifting || isDescending;

  return (
    <motion.div
      ref={wrapRef}
      className={cn("fixed left-0 right-0 top-0 z-[90] lg:hidden select-none border-0")}
      style={{ visibility: measured ? "visible" : "hidden" }}
      initial={{ y: initialY }}
      animate={{ y: animateY }}
      transition={
        reduce
          ? { duration: 0 }
          : { type: "tween", duration: animated ? LIFT_DURATION : 0, ease: "easeOut" }
      }
    >
      <nav aria-label="Sections" className="w-full">
        {/* Design d’origine : chevauchement + 100% largeur */}
        <div className="flex w-full overflow-hidden">
          {TABS.map((t, i) => {
            const active = t.id === activeId;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelect(t.id)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative h-[50px] w-[calc(25%+6px)]",
                  i > 0 ? "-ml-2" : "",
                  "rounded-tr-[20px] ring-0 border-0",
                  "flex items-center justify-center text-center px-3",
                  "text-[13px] font-b leading-tight whitespace-normal break-words",
                  bgById[t.id]
                )}
                style={{ zIndex: active ? 200 : 100 - i * 10 }}
              >
                {/* chiffres retirés */}
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </motion.div>
  );
}
