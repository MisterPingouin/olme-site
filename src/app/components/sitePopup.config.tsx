export const SITE_POPUP = {
  enabled: true,

  // ✅ Fenêtre d’activation (format ISO avec fuseau conseillé)
  activeFrom: "2025-12-15T10:00:00+01:00",
  activeUntil: "2026-01-01T03:00:00+01:00",

  // ✅ Afficher une seule fois par visiteur (par "version")
  version: "nye-2025",
  showOnce: true,

  // ✅ Titres (desktop vs mobile)
  title: "Nouvel An — Ouvert le 31 décembre",
  mobileTitle: "Nouvel an",
  mobileSubtitle: "Ouvert le 31 décembre",

  // ✅ Contenu
  message:
    "Ambiance comme à la maison avec des cocktails et des cotillons ! 🔥",

  ctaPrimary: {
    label: "Réserver",
    href: "https://reservation.laddition.com/booking/olm%C3%A9#/date",
  },
};
