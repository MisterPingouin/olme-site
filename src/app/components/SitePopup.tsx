"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SITE_POPUP } from "./sitePopup.config";

const LS_KEY = "olme_site_popup_seen_v";

function getFocusable(root: HTMLElement | null) {
  if (!root) return [];
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
}

function isNowWithinWindow(from?: string, until?: string) {
  const now = Date.now();

  const fromMs = from ? Date.parse(from) : Number.NEGATIVE_INFINITY;
  const untilMs = until ? Date.parse(until) : Number.POSITIVE_INFINITY;

  // Si une date est invalide, on désactive par sécurité
  if (Number.isNaN(fromMs) || Number.isNaN(untilMs)) return false;

  return now >= fromMs && now <= untilMs;
}

export default function SitePopup() {
  const reducedMotion = useReducedMotion();
  const titleId = useId();
  const descId = useId();

  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const shouldShow = useMemo(() => {
    if (!SITE_POPUP.enabled) return false;
    if (typeof window === "undefined") return false;

    const activeNow = isNowWithinWindow(SITE_POPUP.activeFrom, SITE_POPUP.activeUntil);
    if (!activeNow) return false;

    if (!SITE_POPUP.showOnce) return true;
    const seen = window.localStorage.getItem(LS_KEY);
    return seen !== SITE_POPUP.version;
  }, []);

  useEffect(() => {
    if (!shouldShow) return;
    setOpen(true);
  }, [shouldShow]);

  // lock scroll + focus management
  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";

    const t = window.setTimeout(() => {
      const focusables = getFocusable(dialogRef.current);
      focusables[0]?.focus?.();
    }, 0);

    return () => {
      window.clearTimeout(t);
      document.documentElement.style.overflow = "";
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  // ESC + focus trap
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }

      if (e.key === "Tab") {
        const focusables = getFocusable(dialogRef.current);
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const markSeen = () => {
    if (typeof window === "undefined") return;
    if (SITE_POPUP.showOnce) {
      window.localStorage.setItem(LS_KEY, SITE_POPUP.version);
    }
  };

  const close = () => {
    markSeen();
    setOpen(false);
  };

  if (!SITE_POPUP.enabled) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden={false}
        >
          {/* Overlay */}
          <button
            type="button"
            onClick={close}
            aria-label="Fermer la fenêtre"
            className="absolute inset-0 cursor-default"
          >
            <span className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
          </button>

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className={[
              "relative w-full",
              "max-w-[560px]",
              "rounded-[22px]",
              "bg-[#072821] text-o-sand",
              "shadow-[0_20px_80px_rgba(0,0,0,0.55)]",
              "border border-white/10",
              "overflow-hidden",
            ].join(" ")}
            style={{
              width: "min(560px, calc(100vw - 32px))",
              maxHeight: "min(80vh, 620px)",
            }}
            initial={
              reducedMotion ? { opacity: 0 } : { y: 18, opacity: 0, scale: 0.98 }
            }
            animate={reducedMotion ? { opacity: 1 } : { y: 0, opacity: 1, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { y: 12, opacity: 0, scale: 0.98 }}
            transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
          >
            {/* Accent top bar (Olmé red) */}
            <div className="h-[6px] w-full bg-o-red" />

            <div className="p-5 lg:p-6 overflow-auto">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  {/* Desktop title */}
                  <h2
                    id={titleId}
                    className="hidden lg:block font-b text-[20px] leading-[1.2]"
                  >
                    {SITE_POPUP.title}
                  </h2>

                  {/* Mobile title (2 lignes) */}
                  <div className="lg:hidden">
                    <div
                      className="font-b text-[20px] leading-[1.1]"
                      aria-hidden={false}
                    >
                      {SITE_POPUP.mobileTitle ?? SITE_POPUP.title}
                    </div>
                    <div className="mt-1 font-b text-[14px] leading-[1.2] text-o-sand/80">
                      {SITE_POPUP.mobileSubtitle ?? ""}
                    </div>
                    {/* Pour l’accessibilité: le titre du dialog reste bien annoncé via aria-labelledby */}
                    <span className="sr-only">{SITE_POPUP.title}</span>
                  </div>

                  <p
                    id={descId}
                    className="mt-2 font-l text-[13px] lg:text-[14px] leading-[1.65] text-o-sand/90"
                  >
                    {SITE_POPUP.message}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={close}
                  className={[
                    "shrink-0 inline-flex items-center justify-center",
                    "h-10 w-10 rounded-full",
                    "bg-white/5 hover:bg-white/10",
                    "border border-white/10",
                    "transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-o-red/80",
                  ].join(" ")}
                  aria-label="Fermer"
                >
                  <span className="text-o-sand text-[18px] leading-none">×</span>
                </button>
              </div>

              <div className="mt-5 flex flex-col lg:flex-row gap-2">
                <a
                  href={SITE_POPUP.ctaPrimary.href}
                  onClick={markSeen}
                  className={[
                    "inline-flex items-center justify-center",
                    "h-11 px-4 rounded-[16px]",
                    "bg-o-red text-o-sand",
                    "font-b text-[14px]",
                    "hover:opacity-95 transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
                  ].join(" ")}
                >
                  {SITE_POPUP.ctaPrimary.label}
                </a>

                <button
                  type="button"
                  onClick={close}
                  className={[
                    "inline-flex items-center justify-center",
                    "h-11 px-4 rounded-[16px]",
                    "bg-white/5 text-o-sand",
                    "border border-white/10",
                    "font-b text-[14px]",
                    "hover:bg-white/10 transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-o-red/80",
                    "lg:ml-auto",
                  ].join(" ")}
                >
                  Accéder à la carte
                </button>
              </div>

              {/* Safe area bottom iOS */}
              <div className="h-[env(safe-area-inset-bottom,0px)]" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
