"use client";

import { cn } from "../lib/cn";
import { TABS } from "../data/content";

type Props = {
  activeId: string;
  onSelect: (id: string) => void;
  size?: "bottom" | "top";
  className?: string;
};

const srcById: Record<string, string> = {
  mixologie: "/tabs/tab-mixologie.svg",
  vins: "/tabs/tab-vins-softs.svg",
  food: "/tabs/tab-brut-food.svg",
  infos: "/tabs/tab-infos.svg",
};

// z-index de base pour respecter l'ordre visuel 01 > 02 > 03 > 04.
// si un onglet est actif, il prend zIndex=100.
const BASE_Z = [90, 80, 70, 60]; // i=0..3

export default function OverlapTabs({
  activeId,
  onSelect,
  size = "bottom",
  className,
}: Props) {
  const h = size === "bottom" ? "h-[70px] md:h-[78px]" : "h-[52px] md:h-[56px]";
  const ml = size === "bottom" ? "-ml-3 md:-ml-4" : "-ml-2 md:-ml-3";

  return (
    <nav aria-label="Onglets" className={cn("flex items-end", className)}>
      {TABS.map((t, i) => {
        const isActive = t.id === activeId;
        return (
          <button
            key={t.id}
            onClick={(e) => {
              e.preventDefault();
              onSelect(t.id);
            }}
            className={cn(
              "relative inline-flex select-none transition-transform focus:outline-none",
              i === 0 ? "" : ml,
              isActive ? "drop-shadow" : "hover:translate-y-[-1px]"
            )}
            style={{ zIndex: isActive ? 100 : BASE_Z[i] }} // <-- ordre par défaut + actif devant
            aria-pressed={isActive}
          >
            {/* Aucun texte ajouté : les SVG contiennent déjà index + label */}
            <img
              src={srcById[t.id]}
              alt={t.label}
              draggable={false}
              className={cn("block", h)}
            />
          </button>
        );
      })}
    </nav>
  );
}
