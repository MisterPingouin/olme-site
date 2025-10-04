"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SectionId = "mixologie" | "vins" | "food" | "infos";

type Props = {
  onSelect: (id: SectionId) => void;
};

const ITEMS: Array<{ id: SectionId; label: string }> = [
  { id: "mixologie", label: "Mixologie" },
  { id: "vins", label: "Vins, Bières & Softs" },
  { id: "food", label: "Street Food" },
  { id: "infos", label: "Infos pratiques" },
];

export default function MobileMenu({ onSelect }: Props) {
  const [open, setOpen] = useState(false);

  // Empêche le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <>
      {/* Bouton burger : plus visible (z), marges "safe area", hitbox large.
          SANS fond, traits sable #F1D6A5 */}
      <button
        type="button"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden fixed z-[80] inline-flex h-12 w-12 items-center justify-center"
        style={{
          top: "calc(env(safe-area-inset-top, 0px) + 10px)",
          right: "calc(env(safe-area-inset-right, 0px) + 16px)", // un peu plus de marge à droite
        }}
      >
        <span className="relative block h-5 w-6">
          <motion.span
            className="absolute left-0 top-0 h-[2px] w-full"
            style={{ backgroundColor: "#F1D6A5" }}
            animate={{ rotate: open ? 45 : 0, y: open ? 10 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          />
          <motion.span
            className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2"
            style={{ backgroundColor: "#F1D6A5" }}
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="absolute left-0 bottom-0 h-[2px] w-full"
            style={{ backgroundColor: "#F1D6A5" }}
            animate={{ rotate: open ? -45 : 0, y: open ? -10 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          />
        </span>
      </button>

      {/* Menu plein écran responsive + scrollable si besoin */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="lg:hidden fixed inset-0 z-[70] bg-olme text-o-sand overflow-y-auto"
            style={{ minHeight: "100dvh" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Menu principal"
          >
            <div
              className="px-5 sm:px-6 pb-10 flex flex-col"
              style={{
                paddingTop: "calc(env(safe-area-inset-top, 0px) + 84px)", // laisse la croix respirer
                paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)",
              }}
            >
              <ul className="space-y-3">
                {ITEMS.map((it, idx) => (
                  <li key={it.id}>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onSelect(it.id);
                        setOpen(false);
                      }}
                      className="w-full rounded-xl border border-o-sand/20 px-5 py-4 text-left hover:bg-o-sand/10 focus:outline-none"
                    >
                      {/* D’abord le nombre (plus petit), puis le titre (clamp) */}
                      <div className="text-sm sm:text-base font-b opacity-80">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="mt-1 font-b tracking-tight text-[clamp(18px,4.6vw,24px)] leading-[1.25]">
                        {it.label}
                      </div>
                    </motion.button>
                  </li>
                ))}
              </ul>

              {/* espace flex pour pousser en bas sur grands écrans, scroll auto sur petits */}
              <div className="mt-6 sm:mt-8 grow" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
