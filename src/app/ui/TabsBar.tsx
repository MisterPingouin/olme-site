/* app/ui/TabsBar.tsx */
"use client";

import clsx from "clsx";
import { TABS } from "../data/content";

type Props = {
  tabs?: typeof TABS;
  size?: "sm" | "lg";
};

const srcById: Record<string, string> = {
  mixologie: "/tabs/tab-mixologie.svg",
  vins: "/tabs/tab-vins-softs.svg",
  food: "/tabs/tab-brut-food.svg",
  infos: "/tabs/tab-infos.svg",
};

export default function TabsBar({ tabs = TABS, size = "lg" }: Props) {
  return (
    <nav
      aria-label="Sections"
      className={clsx(
        "flex items-end gap-2 md:gap-3",
        size === "lg" ? "scale-100" : "scale-90 origin-left"
      )}
    >
      {tabs.map((t) => (
        <a
          key={t.id}
          href={`#${t.id}`}
          className="group relative inline-flex select-none"
        >
          {/* SVG du fond (exact visuel de la maquette) */}
          <img
            src={srcById[t.id]}
            alt=""
            aria-hidden="true"
            draggable={false}
            className={clsx(
              "block",
              size === "lg" ? "h-[70px] md:h-[78px]" : "h-[52px] md:h-[56px]"
            )}
          />
          {/* Libellé + index par-dessus */}
          <span
            className={clsx(
              "pointer-events-none absolute left-0 top-0 h-full w-full px-4 md:px-5 flex items-center justify-start",
              "text-o-green"
            )}
          >
            <span className="flex items-center gap-3">
              <span className="font-b tracking-wide opacity-80">
                {String(t.idx).padStart(2, "0")}
              </span>
              <span className="font-b">
                {t.label}
              </span>
            </span>
          </span>
        </a>
      ))}
    </nav>
  );
}
