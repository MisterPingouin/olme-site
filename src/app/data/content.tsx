import type { ReactNode } from "react";

// ================================================
// Données site - Mode "pré-ouverture"
// - Tout ton contenu original est conservé en commentaire.
// - La version "DRAFT" affiche des placeholders publics.
// - Les "Infos pratiques" RESTENT actives.
// ================================================

export type Cocktail = {
  name: string;
  notes: string;
  price: number;
  happyHourPrice?: number;
};
export type CocktailSection = { title: string; subtitle?: string; items: Cocktail[] };

export type BeerItem = {
  name: string;
  style?: string;
  price?: number;
  sizeCl?: number;
  happyHourPrice?: number;
  byGlass?: number;
  glassCl?: number;
  happyHourByGlass?: number;
  pint?: number;
  pintCl?: number;
  happyHourPint?: number;
};


export type SoftItem = {
  name: string;
  price: number;
  sizeCl: number;
  notes?: string;
  happyHourPrice?: number;
};

// ================================================
// SOFTS
// ================================================

export const SOFTS: SoftItem[] = [
  // {
  //   name: "Rooibos Bio glacé maison",
  //   notes: "fruit de la passion, fève de tonka, baie de Jamaïque",
  //   price: 5,
  //   sizeCl: 30,
  // },
  {
    name: "Limonade maison",
    notes: "Gingembre, citron, menthe",
    price: 4.5,
    sizeCl: 30,
  },
  { name: "Ninkasi - Ginger Ale Bio", price: 5, sizeCl: 25 },
    { name: "Ninkasi Tonic", price: 5, sizeCl: 25 },
    { 
  name: "ChariTea - Mate Bio",
  price: 5,
  sizeCl: 33,
},
  {
    name: "Uma - Orangeade Bio",
    price: 6,
    sizeCl: 33,
  },
  {
    name: "Uma - Ginger Beer Bio",
    price: 6,
    sizeCl: 33,
  },
  {
    name: "JNPR - Tonic Bio",
    notes: "sans sucres, sans édulcorant",
    price: 6,
    sizeCl: 33,
  },
  { name: "Archipel - Kombucha Framboise Bio", price: 6.5, sizeCl: 33 },
    {
    name: "Schorles - Groseille Bio",
    price: 6.5,
    sizeCl: 33,
  },
      {
    name: "Océan 52 - Eau minérale pétillante",
    price: 3,
    sizeCl: 33,
  },
];

// ================================================
// BEERS
// ================================================

export const BEERS: BeerItem[] = [
  // === PRESSION (2 lignes) ===
  {
    name: "Azimut - Premium Pils",
    style: "Pilsner — 5%",
    byGlass: 4,
    glassCl: 25,
    pint: 7,
    pintCl: 50,
    happyHourPint: 6,
  },
  {
    name: "Fauve - Session IPA",
    style: "IPA — 4%",
    byGlass: 4.5,
    glassCl: 25,
    pint: 8.5,
    pintCl: 50,
  },

  // === CANETTE (1 ligne) ===
  {
    name: "Fauve - Pic Flamboyant (canette)",
    style: "Sour aux fruits tropicaux — 5%",
    price: 7.5,
    sizeCl: 33,
  },
    {
    name: "Fauve - Rejaillir le feu (canette)",
    style: "Neipa — 6,2%",
    price: 7.5,
    sizeCl: 33,
  },
  {
    name: "Fauve - Douce France (canette)",
    style: "Lager — 5%",
    price: 8,
    sizeCl: 44,
  },
  {
  name: "Azimut - Blanche Lime Basilic (canette)",
  style: "Blanche au citron et basilic — 4,5%",
  price: 8.5,
  sizeCl: 44,
},
];

// // Affichage public – Carte mixologie
export const MIXO_SECTIONS: CocktailSection[] = [
  {
    title: "Léger",
    subtitle: "( 2 à 3 cl d’alcool )",
    items: [
      {
        name: "Été perdu",
        notes:
          "Frais, exotique — Rhum ambré, Rooibos glacé, fruit de la passion & poivre de Jamaïque.",
        price: 9,
        happyHourPrice: 8,

      },
      // {
      //   name: "Haïku",
      //   notes: "Doux, floral — Umeshu, liqueur cuir lointain, citron & eau pétillante.",
      //   price: 10,
      // },
            {
        name: "Saudade",
        notes:
          "Floral, légèrement amer — Porto blanc, Suze, citron.",
        price: 10,
      },
      //       {
      //   name: "Pedro y Palomino",
      //   notes:
      //     "Oxydatif, épicé — Oloroso, eau-de-vie de mirabelle, super vin & ginger ale.",
      //   price: 11,
      // },
    ],
  },
  {
    title: "Modéré",
    subtitle: "( 4 à 5 cl d’alcool )",
    items: [
            {
        name: "Marie-Antoinette",
        notes:
          "Doux, enveloppant — Vodka, sirop d’hibiscus aux épices douces & verveine glacée.",
        price: 12,
        happyHourPrice: 11,
      },
            {
        name: "Mushu",
        notes:
          "Frais, végétal — Vodka, liqueur de pandan, sirop de wasabi, coriandre & citron.",
        price: 12,
      },
//       {
//   name: "Rivage épicé",
//   notes:
//     "Doux, profond — Rhum Tidal Spice, thé noir, sucre de canne, poivre sansho & Memphis BBQ.",
//   price: 13,
// },
      {
        name: "Épine verte",
        notes:
          "Végétal, acidulé — Mezcal, poivron vert, cacahuète, citron & épices Jamaican jerk.",
        price: 13,
      },
      {
        name: "Fumée d’Amalfi",
        notes: "Fumé, amer — Gin, lapsang souchong, pamplemousse, Cynar & citron.",
        price: 13,
      },
      {
        name: "Back to the roots",
        notes:
          "Herbacé, acidulé — Gin, mastika, citron, sucre de canne, thym & émulsifiant.",
        price: 13,
      },
    ],
  },
  {
    title: "Puissant",
    subtitle: "( 5 à 7 cl d’alcool )",
    items: [
      {
  name: "Ame Negroni",
  notes: "Fumé, amer — Mezcal au café, vermouth rouge & campari.",
  price: 13,
},

      // {
      //   name: "Tramonto a Capri",
      //   notes: "Onctueux, floral — Grappa, citron vert, sucre de canne & émulsifiant.",
      //   price: 14,
      // },
      {
        name: "Vent des Caraïbes",
        notes:
          "Exotique, acidulé — Rhum ananas, rhum des Caraïbes, citron vert, sucre de canne & sel.",
        price: 14,
      },
      {
        name: "Grain sauvage",
        notes:
          "Umami, épicé — Whisky de malt & de seigle, sirop de sarrasin & curry, Abbotts bitters.",
        price: 13,
      },
      {
        name: "L’Ombre du Noyer",
        notes: "Boisé, oxydatif — Whisky, whisky tourbé, vermouth, amontillado, liqueur Denoix.",
        price: 16,
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
        happyHourPrice: 7,
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
        happyHourPrice: 7,
      },
      {
        name: "Éclat d’Automne",
        notes:
          "Gourmand, épicé — Osco rouge, sirop d’hibiscus aux épices douces, verveine glacée",
        price: 8,
        happyHourPrice: 7,
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
        name: "Les Pierres Dorées",
        domain: "Dom. des Prévelières",
        region: "Beaujolais -",
        grapes: "100% chardonnay",
        notes: "Solaire et végétal : agrumes, poire",
        byGlass: 6,
        glassCl: 12,
        bottle: 29,
        bottleCl: 75,
      },
      // {
      //   name: "Entre ciel et terre",
      //   domain: "dom. Prapin",
      //   region: "Coteaux-du-Lyonnais - VDF",
      //   grapes: "100% chardonnay",
      //   notes: "Fruité et minéral : pêche, ananas",
      //   byGlass: 6.5,
      //   glassCl: 12,
      //   bottle: 33,
      //   bottleCl: 75,
      // },
      {
        name: "Recto Verso",
        domain: "dom. Accoles",
        region: "Ardèche -",
        grapes: "grenache, clairette rose & blanche",
        notes: "Riche et hors-normes : violette, mentholé",
        byGlass: 7,
        glassCl: 12,
        bottle: 34,
        bottleCl: 75,
      },
      {
  name: "Le Grand Frais",
  domain: "dom. Hautes Noëlles",
  region: "Loire - AOP Gros Plant du Pays Nantais",
  grapes: "100% folle blanche",
  notes: "Vif et floral : fleurs blanches, citron, salin",
  bottle: 28,
  bottleCl: 75,
},
      {
        name: "4 Faïsses",
        domain: "dom. Accoles",
        region: "Ardèche -",
        grapes: "100% chardonnay",
        notes: "Frais et généreux : Poire, fleurs blanches",
        bottle: 36,
        bottleCl: 75,
      },
      {
        name: "Fronteira blanc",
        domain: "Clot de l’Oum",
        region: "Ariège",
        grapes: "carignan blanc & gris, macabeu, lledoner pellut, mourvèdre",
        notes: "Complexe et frais : fleurs, agrume, minéral",
        bottle: 37,
        bottleCl: 75,
      },
      {
  name: "Zephyr",
  domain: "dom. Hautes Noëlles",
  region: "Loire - Muscadet Côtes de Grandlieu",
  grapes: "100% melon de Bourgogne",
  notes: "Complexe et minéral : fruits blancs, amande, salin",
  bottle: 38,
  bottleCl: 75,
},
      // {
      //   name: "Les cerisiers",
      //   domain: "dom. Prapin",
      //   region: "Coteaux-du-Lyonnais",
      //   grapes: "100% chardonnay",
      //   notes: "Chaleureux et fruité : boisé, fruits exotiques, beurre",
      //   bottle: 36,
      //   bottleCl: 75,
      // },
    ],
  },
  {
    title: "Rouge engagés",
    items: [
            {
        name: "L’envol du milan noir",
        domain: "dom. Prapin",
        region: "Coteaux-du-Lyonnais -",
        grapes: "100% gamaret",
        notes: "Velouté et fruité : cassis, verveine",
        byGlass: 6.5,
        glassCl: 12,
        bottle: 32,
        bottleCl: 75,
      },
                  {
        name: "Aux vergers",
        domain: "Cosima Bassouls",
        region: "Beaujolais -",
        grapes: "100% gamay",
        notes: "Léger et fruité : violette, herbacé",
        byGlass: 7,
        glassCl: 12,
        bottle: 35,
        bottleCl: 75,
      },
//       {
//   name: "Les Coulaires",
//   domain: "Domaine Vendome",
//   region: "Crozes-Hermitage",
//   grapes: "100% syrah",
//   notes: "Frais et épicé : mûre, violette, poivre noir",
//   byGlass: 8.5,
//   glassCl: 12,
//   bottle: 52,
//   bottleCl: 75,
// },
      {
        name: "Compagnie des papillons",
        domain: "Clot de l’Oum",
        region: "Ariège -",
        grapes: "carignan, syrah, grenache",
        notes: "Épicé et fruité : violette, framboise",
        bottle: 34,
        bottleCl: 75,
      },
            {
        name: "Espoir d’y vin",
        domain: "dom. Prapin",
        region: "Coteaux-du-Lyonnais -",
        grapes: "100% syrah",
        notes: "Fruité et épicé : fruits rouges, poivre, menthol",
        bottle: 35,
        bottleCl: 75,
      },
      {
  name: "Pichao",
  domain: "Clot de l’Oum",
  region: "Ariège - IGP Côtes Catalanes",
  grapes: "syrah",
  notes: "Hors-norme et épicé : fruits noirs, lard fumé, poivre",
  bottle: 44,
  bottleCl: 75,
},
    ],
  },
  {
    title: "Rosé engagés",
    items: [
      {
        name: "Gamay Rosé",
        domain: "Dom. des Prévelières",
        region: "Beaujolais -",
        grapes: "100% Gamay",
        notes: "Aromatique et ample : fruits exotiques, pêche, abricot",
        // byGlass: 5,
        // glassCl: 12,
        bottle: 24,
        bottleCl: 75,
      },
      //       {
      //   name: "Solis Lumen Rosé",
      //   domain: "Dom. Montrose",
      //   region: "IGP Pays d'Oc -",
      //   grapes: "80% Grenache, 20% Cinsualt",
      //   notes: "Frais et fruité : fruits rouges, agrumes",
      //   // byGlass: 5,
      //   // glassCl: 12,
      //   bottle: 24,
      //   bottleCl: 75,
      // },
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
        bottle: 42,
        bottleCl: 75,
      },
            {
  name: "Pétillant Naturel - Holograppe",
  domain: "Dom. Balansa",
  region: "Languedoc -",
  grapes: "carignan blanc, carignan gris",
  notes: "Tendu et salin : agrumes, pomme fraîche, finale iodée",
  bottle: 44,
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
    { name: "Olives de Kalamata & d’Italie", price: 5 },
    { name: "Artichauts alla Romana", price: 6 },
    { name: "Houmous de petits pois et amandes, radis multicolores", price: 8 },
    { name: "Croquettes de choux-fleurs au paprika, crème sweet & sour", price: 9 },
    { name: "Saucisse laotienne à la citronnelle", price: 9 },
    { name: "Brillat savarin & noix", price: 8 },
    { name: "Tomme de brebis basque", price: 8 },
    { name: "Chorizo Ibérique", price: 10 },
    { name: "Saucisson Bellota Ibérique", price: 10 },
    { name: "Jambon Basque Duroc 30 mois d’affinage", price: 12 },
    // { name: "Succulent au chocolat", price: 6 },
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
  groups: ReactNode;
  terraces: string;
  reservation: ReactNode;
};

export const INFOS: InfosContent = {
  heading: "Infos, réservation",
  address: ["15 rue montesquieu", "69007 LYON"],
  opening: ["Mardi - Mercredi → 17h30 - 00h", "Jeudi - Samedi → 17h30 - 01h"],
  contact: ["contact@olmebar.com", "07 50 95 25 35"],
 groups: (
  <>
    Un espace dédié pour vos évènements (anniversaire, afterwork, pot de départ,vernissage ...). Privatisation
    possible sur demande par mail sur{" "}
    <a
      href="mailto:contact@olmebar.com"
      className="underline underline-offset-4 decoration-o-green/40 hover:decoration-o-green"
    >
      contact@olmebar.com
    </a>
    .
  </>
),

  terraces: "Dès mars, deux terrasses cosy pour profiter de l’extérieur.",
  reservation: (
      <>
    La réservation n’est pas obligatoire, mais recommandée par{" "}
    <a
      href="https://reservation.laddition.com/booking/olm%C3%A9#/date"
      target="_blank"
      rel="noreferrer"
      className="underline underline-offset-4 decoration-o-green/40 hover:decoration-o-green"
    >
      <strong>ici</strong>
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
  { id: "infos", idx: 4, label: "Infos, Réserver", color: "blue" as const },
];
