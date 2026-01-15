import type { ReactNode } from "react";

// ================================================
// Données site - Mode "pré-ouverture"
// - Tout ton contenu original est conservé en commentaire.
// - La version "DRAFT" affiche des placeholders publics.
// - Les "Infos pratiques" RESTENT actives.
// ================================================

export type Cocktail = { name: string; notes: string; price: number };
export type CocktailSection = { title: string; subtitle?: string; items: Cocktail[] };

export type BeerItem = {
  name: string;
  style?: string;
  price: number;
  sizeCl: number;
};

export type SoftItem = {
  name: string;
  price: number;
  sizeCl: number;
  notes?: string;
};

// ================================================
// SOFTS
// ================================================

export const SOFTS: SoftItem[] = [
  {
    name: "Rooibos Bio glacé maison",
    notes: "fruit de la passion, fève de tonka, baie de Jamaïque",
    price: 5,
    sizeCl: 30,
  },
  {
    name: "Limonade maison",
    notes: "Gingembre, citron, menthe",
    price: 4.5,
    sizeCl: 30,
  },
  { name: "Ninkasi Ginger Ale bio", price: 5, sizeCl: 25 },
  {
    name: "Ginger Beer Uma",
    price: 6,
    sizeCl: 33,
  },
  { name: "Ninkasi Tonic", price: 5, sizeCl: 25 },
  {
    name: "JNPR Tonic Bio",
    notes: "sans sucres, sans édulcorant",
    price: 6,
    sizeCl: 33,
  },
  { name: "Archipel Kombucha Framboise Bio", price: 6.5, sizeCl: 33 },
  { name: "Archipel Kombucha Pomelo - Gingembre Bio", price: 6.5, sizeCl: 33 },
];

// ================================================
// BEERS
// ================================================

export const BEERS: BeerItem[] = [
  {
    name: "To Øl - 45 Days Organic Pilsner",
    style: "Pilsner bio",
    price: 6,
    sizeCl: 33,
  },
  {
    name: "Fauve - Douce France",
    style: "Lager",
    price: 8,
    sizeCl: 44,
  },
  {
    name: "Fauve - Temps du Bonheur",
    style: "Session IPA",
    price: 7.5,
    sizeCl: 33,
  },
  {
    name: "Sirens - Soundwaves",
    style: "IPA",
    price: 7.5,
    sizeCl: 33,
  },
  {
    name: "Fauve - Pic Flamboyant",
    style: "Berliner Weisse fruits tropicaux",
    price: 7.5,
    sizeCl: 33,
  },
  //   {
  //   name: "Fauve - Océan Indien",
  //   style: "IPA Moderne",
  //   price: 8,
  //   sizeCl: 33,
  // },
];

// // DRAFT - Affichage public provisoire
// export const BEERS: BeerItem[] = [
//   {
//     name: "→ Carte en création",
//     style: "La sélection de bières craft arrive très bientôt.",
//     price: 0,
//     sizeCl: 0
//   }
// ];

// ================================================
// MIXO_SECTIONS (Cocktails)
// ================================================

/* ===== Ancien contenu (à réactiver à l’ouverture) =====
export const MIXO_SECTIONS: CocktailSection[] = [
{
title: "Low ABV",
subtitle: "( 2 à 3 cl d’alcool )",
items: [
{ name: "Golden Drift", notes: "Frais, exotique - Rhum glacé, fruit de la passion, poivre de Jamaïque, banane", price: 9 },
{ name: "Silk Bloom", notes: "Doux, floral - Umeshu, eau d’eglantine, eau pétillante, bitter aphrodite", price: 10 },
{ name: "Autumn Ledger", notes: "Complexe, oxydatif - Vin de noix, sherry, dry vermouth", price: 10 },
],
},
{
title: "Regular ABV",
subtitle: "( 4 à 5 cl d’alcool )",
items: [
{ name: "Volcano Mule", notes: "Fumé, épicé - Mezcal, citron, gingembre & poivre long, bitter, sel", price: 12 },
{ name: "Tonka Sunset", notes: "Fruité, gourmand - Tequila, fève de tonka, clémentine", price: 12 },
{ name: "Smoky Bloom", notes: "Fumé, amer - Gin, Lapsang Souchong, pamplemousse, Cynar", price: 12 },
{ name: "Crimson Spark", notes: "Frais, acidulé - Vodka à l’hibiscus, vinaigre de myrtilles, Prosecco", price: 12 },
],
},
{
title: "High ABV",
subtitle: "( 5 à 7 cl d’alcool )",
items: [
{ name: "Curry Old Fashioned", notes: "Épicé, salin  - Whisky, sirop de sarrasin, curry & sel, Aphrodite bitter", price: 13 },
{ name: "Martinez", notes: "Floral, amer - Gin, vermouth rouge, liqueur de cerise amère, orange bitter", price: 14 },
{ name: "Daiquiri Twist", notes: "Fruité, gourmand - Rhum ananas, rhum jamaïcain, citron vert, sucre muscovado, sel", price: 14 },
],
},
{
title: "No ABV",
subtitle: "( 0 cl d’alcool )",
items: [
{ name: "Solar Detox", notes: "Amer, acidulé - Pamplemousse, citron, sel, eau pétillante, sirop thé fumé, gentiane sans alcool", price: 8 },
{ name: "Dry Zen", notes: "Épicé, fumé - Citron, gingembre, thé fumé, sirop acid", price: 8 },
{ name: "Golden Flow", notes: "Doux, fruité  - Clémentine, fève de tonka, citron, spirit sans alcool", price: 8 },
{ name: "Jungle Air", notes: "Exotique, frais  - Thé glacé, fruit de la passion, poivre de Jamaïque, spirit sans alcool", price: 8 },
],
},
{
title: "Cocktails Omakase",
subtitle: "( Sur mesure )",
items: [
{ name: "Mocktail sur mesure", notes: " Sans alcool -  Une création personnalisée, respectueuse de vos souhaits, fondée sur le savoir-faire de la maison", price: 8 },
{ name: "Cocktail sur mesure", notes: " Avec alcool -  Une création personnalisée, respectueuse de vos souhaits, fondée sur le savoir-faire de la maison", price: 15 },
],
},
];
*/

// // Affichage public – Carte mixologie
export const MIXO_SECTIONS: CocktailSection[] = [
  {
    title: "Léger",
    subtitle: "( 2 à 3 cl d’alcool )",
    items: [
      {
        name: "Été perdu",
        notes:
          "Frais, exotique — Rhum ambré, thé glacé, fruit de la passion & poivre de Jamaïque.",
        price: 9,
      },
      {
        name: "Haïku",
        notes: "Doux, floral — Umeshu, liqueur de rooibos, citron & eau pétillante.",
        price: 10,
      },
    ],
  },
  {
    title: "Modéré",
    subtitle: "( 4 à 5 cl d’alcool )",
    items: [
      {
        name: "Épine verte",
        notes:
          "Végétal, acidulé — Mezcal, poivron vert, cacahuète, citron & Jamaican jerk.",
        price: 13,
      },
      {
        name: "Fumée d’Amalfi",
        notes: "Fumé, amer — Gin, lapsang souchong, pamplemousse, Cynar & citron.",
        price: 13,
      },
      {
        name: "Marie-Antoinette",
        notes:
          "Doux, réconfortant — Vodka, sirop d’hibiscus aux épices douces & verveine glacée.",
        price: 12,
      },
    ],
  },
  {
    title: "Puissant",
    subtitle: "( 5 à 7 cl d’alcool )",
    items: [
      {
        name: "Tramonto a Capri",
        notes: "Onctueux, floral — Grappa, citron, sucre de canne & émulsifiant.",
        price: 14,
      },
      {
        name: "Vent des Caraïbes",
        notes:
          "Exotique, acidulé — Rhum ananas, rhum des Caraïbes, citron vert, sucre de canne & sel.",
        price: 14,
      },
      {
        name: "Grain sauvage",
        notes:
          "Umami, épicé — Whisky de malt & de seigle, sirop de sarrasin & curry, Aphrodite bitters.",
        price: 13,
      },
    ],
  },
  {
    title: "Omakase",
    subtitle: "( Sur mesure )",
    items: [
      {
        name: "Omakase",
        notes:
          "Une création personnalisée, respectueuse de vos souhaits, fondée sur le savoir-faire de la maison.",
        price: 15,
      },
    ],
  },
  {
    title: "Sans alcool",
    subtitle: "( 0 cl d’alcool )",
    items: [
      {
        name: "Latitude Gingembre",
        notes:
          "Exotique, épicé — Gingembre, curry de Madras, fruit de la passion, citron, eau pétillante, sel",
        price: 8,
      },
      {
        name: "Aube Italienne",
        notes: "Amer, fruité — Pamplemousse, citron, amer sans alcool",
        price: 8,
      },
      {
        name: "Paprika Tonic",
        notes: "Frais, végétal — Poivron vert, paprika, tonic, citron",
        price: 8,
      },
      {
        name: "Éclat d’Automne",
        notes:
          "Gourmand, épicé — Osco rouge, sirop d’hibiscus aux épices douces, verveine glacée",
        price: 8,
      },
    ],
  },
];

// ================================================
// WINES
// ================================================

export type WineItem = {
  name: string;
  domain?: string;
  region?: string;
  grapes?: string; // cépage(s)
  notes?: string; // notes aromatiques
  byGlass?: number; // prix au verre (nombre, ex: 6.5)
  glassCl?: number; // volume du verre en cL (ex: 12)
  bottle?: number; // prix bouteille
  bottleCl?: number; // volume bouteille en cL (ex: 75)
};

export type WineSection = { title: string; items: WineItem[] };

export const WINES: WineSection[] = [
  {
    title: "Blanc engagés",
    items: [
      {
        name: "Entre ciel et terre",
        domain: "dom. Prapin",
        region: "Coteaux-du-Lyonnais - VDF",
        grapes: "100% chardonnay",
        notes: "Fruité et minéral : pêche, ananas",
        byGlass: 6.5,
        glassCl: 12,
        bottle: 33,
        bottleCl: 75,
      },
      {
        name: "Recto Verso",
        domain: "dom. Accoles",
        region: "Rhône",
        grapes: "grenache, clairette rose & blanche",
        notes: "Riche et hors-normes : violette, mentholé",
        byGlass: 7.5,
        glassCl: 12,
        bottle: 39,
        bottleCl: 75,
      },
      {
        name: "Fronteira blanc",
        domain: "Clot de l’Oum",
        region: "Ariège",
        grapes: "carignan blanc & gris, macabeu, lledoner pellut, mourvèdre",
        notes: "Complexe et frais : fleurs, agrume, minéral",
        bottle: 40,
        bottleCl: 75,
      },
      {
        name: "Les cerisiers",
        domain: "dom. Prapin",
        region: "Coteaux-du-Lyonnais",
        grapes: "100% chardonnay",
        notes: "Chaleureux et fruité : boisé, fruits exotiques, beurre",
        bottle: 36,
        bottleCl: 75,
      },
    ],
  },
  {
    title: "Rouge engagés",
    items: [
      {
        name: "Aux vergers",
        domain: "Cosima Bassouls",
        region: "Beaujolais - Lantignié",
        grapes: "100% gamay",
        notes: "Léger et fruité : violette, herbacé",
        byGlass: 8,
        glassCl: 12,
        bottle: 42,
        bottleCl: 75,
      },
      {
        name: "L’envol du milan noir",
        domain: "dom. Prapin",
        region: "Coteaux-du-Lyonnais - VDF",
        grapes: "100% gamaret",
        notes: "Velouté et fruité : cassis, verveine",
        byGlass: 6.5,
        glassCl: 12,
        bottle: 33,
        bottleCl: 75,
      },
      {
        name: "Espoir d’y vin",
        domain: "dom. Prapin",
        region: "Coteaux-du-Lyonnais - VDF",
        grapes: "100% syrah",
        notes: "Fruité et épicé : fruits rouges, poivre, menthol",
        bottle: 40,
        bottleCl: 75,
      },
      {
        name: "Compagnie des papillons",
        domain: "Clot de l’Oum",
        region: "Ariège - VDF",
        grapes: "carignan, syrah, grenache",
        notes: "Épicé et fruité : violette, framboise",
        bottle: 40,
        bottleCl: 75,
      },
    ],
  },
  {
    title: "Pétillant",
    items: [
      {
        name: "Prosecco Fiol Extra Brut",
        region: "Italie",
        byGlass: 7,
        glassCl: 12,
        bottle: 35,
        bottleCl: 75,
      },
      {
        name: "Extra brut",
        domain: "Dom. Mittnacht frères",
        region: "Alsace - Crémant d'Alsace",
        grapes: "100% pinot noir",
        notes: "Complexe et bulle fine : pomme, poire",
        bottle: 45,
        bottleCl: 75,
      },
    ],
  },
];

// ================================================
// BRUT_FOOD
// ================================================

export const BRUT_FOOD: { title: string; items: { name: string; price: number }[] } = {
  title: "Brut Food",
  items: [
    { name: "Olives vertes italiennes", price: 5 },
    { name: "Artichauts alla Romana", price: 6 },
    { name: "Houmous de petits pois et amandes, betteraves multicolores", price: 8 },
    { name: "Croquettes de choux-fleurs au paprika, crème sweet & sour", price: 9 },
    { name: "Saucisse laotienne à la citronnelle", price: 9 },
    // { name: "Brillat savarin & noix", price: 8 },
    { name: "Fromage de brebis Azkorria Ossau Iraty", price: 8 },
    { name: "Chorizo Ibérique", price: 10 },
    { name: "Jambon Ibérique Cebo de Campo", price: 14 },
    { name: "Succulent au chocolat", price: 6 },
  ],
};

// ================================================
// INFOS PRATIQUES (ACTIF - NON MODIFIÉ)
// ================================================

export type InfosContent = {
  heading: string;
  address: string[];
  opening: string[];
  contact: string[];
  groups: string;
  terraces: string;
  reservation: ReactNode;
};

export const INFOS: InfosContent = {
  heading: "Infos pratiques",
  address: ["15 rue montesquieu", "69007 LYON"],
  opening: ["Lundi - Mercredi → 18h - 00h", "Jeudi - Samedi → 18h - 01h"],
  contact: ["contact@olmebar.com", "07 50 95 25 35"],
  groups:
    "Un espace dédié pour vos évènements (anniversaire, afterwork, pot de départ, ...). Privatisation possible sur demande.",
  terraces: "Dès mars, deux terrasses cosy pour profiter de l’extérieur.",
  reservation: (
    <>
      La réservation n’est pas obligatoire mais conseillée pour les groupes de 4 personnes et plus{" "}
      <a
        href="https://reservation.laddition.com/booking/olm%C3%A9#/date"
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-4 decoration-o-green/40 hover:decoration-o-green"
      >
        sur notre plateforme de réservation
      </a>{" "}
      ou par mail sur{" "}
      <a
        href="mailto:contact@olmebar.com"
        className="underline underline-offset-4 decoration-o-green/40 hover:decoration-o-green"
      >
        contact@olmebar.com
      </a>
      .
    </>
  ),
};

// ================================================
// TABS (ACTIF)
// ================================================

export const TABS = [
  { id: "mixologie", idx: 1, label: "Mixologie", color: "red" as const },
  { id: "vins", idx: 2, label: "Vins, bières & softs", color: "sand" as const },
  { id: "food", idx: 3, label: "Brut Food", color: "cream" as const },
  { id: "infos", idx: 4, label: "Infos pratiques", color: "blue" as const },
];
