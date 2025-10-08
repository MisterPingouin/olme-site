// ================================================
// Données site — Mode "pré-ouverture"
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

/* ===== Ancien contenu (à réactiver à l’ouverture) =====
export const SOFTS: SoftItem[] = [
  { name: "→ Thé glacé rooibos passion & poivre",                 price: 5,   sizeCl: 40 },
  { name: "→ Uma Ginger Beer",                                    price: 6,   sizeCl: 33 },
  { name: "→ JNPR Tonic (sans sucres, sans édulcorant)",          price: 6,   sizeCl: 33 },
  { name: "→ Archipel Kombucha Framboise",                        price: 6.5, sizeCl: 33 },
  { name: "→ Archipel Kombucha Pomelo — Gingembre",               price: 6.5, sizeCl: 33 },
];
*/

// DRAFT — Affichage public provisoire
export const SOFTS: SoftItem[] = [
  {
    name: "→ Sélection en création",
    price: 0,
    sizeCl: 0,
    notes: "Les softs maison & partenaires arrivent très bientôt."
  }
];


// ================================================
// BEERS
// ================================================

/* ===== Ancien contenu (à réactiver à l’ouverture) =====
export const BEERS: BeerItem[] = [
  { name: "→ Hopline Pale",        style: "Pale Ale houblonnée (Citra/Simcoe)", price: 6.5, sizeCl: 33 },
  { name: "→ Guill’ IPA",          style: "India Pale Ale",                     price: 9,   sizeCl: 44 },
  { name: "→ Monts & Mousse Pils", style: "Pils croquante",                     price: 6,   sizeCl: 33 },
  { name: "→ Soierie Session",     style: "Session IPA",                        price: 6.5, sizeCl: 33 },
  { name: "→ Confluence Stout",    style: "Stout torréfié",                     price: 5.5, sizeCl: 25 },
];
*/

// DRAFT — Affichage public provisoire
export const BEERS: BeerItem[] = [
  {
    name: "→ Carte en création",
    style: "La sélection de bières craft arrive très bientôt.",
    price: 0,
    sizeCl: 0
  }
];


// ================================================
// MIXO_SECTIONS (Cocktails)
// ================================================

/* ===== Ancien contenu (à réactiver à l’ouverture) =====
export const MIXO_SECTIONS: CocktailSection[] = [
{
title: "Low ABV",
subtitle: "( 2 à 3 cl d’alcool )",
items: [
{ name: "Golden Drift", notes: "Frais, exotique — Rhum glacé, fruit de la passion, poivre de Jamaïque, banane", price: 9 },
{ name: "Silk Bloom", notes: "Doux, floral — Umeshu, eau d’eglantine, eau pétillante, bitter aphrodite", price: 10 },
{ name: "Autumn Ledger", notes: "Complexe, oxydatif — Vin de noix, sherry, dry vermouth", price: 10 },
],
},
{
title: "Regular ABV",
subtitle: "( 4 à 5 cl d’alcool )",
items: [
{ name: "Volcano Mule", notes: "Fumé, épicé — Mezcal, citron, gingembre & poivre long, bitter, sel", price: 12 },
{ name: "Tonka Sunset", notes: "Fruité, gourmand — Tequila, fève de tonka, clémentine", price: 12 },
{ name: "Smoky Bloom", notes: "Fumé, amer — Gin, Lapsang Souchong, pamplemousse, Cynar", price: 12 },
{ name: "Crimson Spark", notes: "Frais, acidulé — Vodka à l’hibiscus, vinaigre de myrtilles, Prosecco", price: 12 },
],
},
{
title: "High ABV",
subtitle: "( 5 à 7 cl d’alcool )",
items: [
{ name: "Curry Old Fashioned", notes: "Épicé, salin  — Whisky, sirop de sarrasin, curry & sel, Aphrodite bitter", price: 13 },
{ name: "Martinez", notes: "Floral, amer — Gin, vermouth rouge, liqueur de cerise amère, orange bitter", price: 14 },
{ name: "Daiquiri Twist", notes: "Fruité, gourmand — Rhum ananas, rhum jamaïcain, citron vert, sucre muscovado, sel", price: 14 },
],
},
{
title: "No ABV",
subtitle: "( 0 cl d’alcool )",
items: [
{ name: "Solar Detox", notes: "Amer, acidulé — Pamplemousse, citron, sel, eau pétillante, sirop thé fumé, gentiane sans alcool", price: 8 },
{ name: "Dry Zen", notes: "Épicé, fumé — Citron, gingembre, thé fumé, sirop acid", price: 8 },
{ name: "Golden Flow", notes: "Doux, fruité  — Clémentine, fève de tonka, citron, spirit sans alcool", price: 8 },
{ name: "Jungle Air", notes: "Exotique, frais  — Thé glacé, fruit de la passion, poivre de Jamaïque, spirit sans alcool", price: 8 },
],
},
{
title: "Cocktails Omakase",
subtitle: "( Sur mesure )",
items: [
{ name: "Mocktail sur mesure", notes: " Sans alcool —  Une création personnalisée, respectueuse de vos souhaits, fondée sur le savoir-faire de la maison", price: 8 },
{ name: "Cocktail sur mesure", notes: " Avec alcool —  Une création personnalisée, respectueuse de vos souhaits, fondée sur le savoir-faire de la maison", price: 15 },
],
},
];
*/

// DRAFT — Affichage public provisoire
export const MIXO_SECTIONS: CocktailSection[] = [
  {
    title: "Low ABV",
    subtitle: "( 2 à 3 cl d’alcool )",
    items: [
      { name: "→ Carte en création", notes: "Les cocktails low ABV arrivent très bientôt.", price: 0 }
    ],
  },
  {
    title: "Regular ABV",
    subtitle: "( 4 à 5 cl d’alcool )",
    items: [
      { name: "→ Carte en création", notes: "Nos signatures Regular ABV seront dévoilées à l’ouverture.", price: 0 }
    ],
  },
  {
    title: "High ABV",
    subtitle: "( 5 à 7 cl d’alcool )",
    items: [
      { name: "→ Carte en création", notes: "Sélection High ABV en cours de finalisation.", price: 0 }
    ],
  },
  {
    title: "No ABV",
    subtitle: "( 0 cl d’alcool )",
    items: [
      { name: "→ Carte en création", notes: "Mocktails travaillés, sans alcool : bientôt en ligne.", price: 0 }
    ],
  },
  {
    title: "Cocktails Omakase",
    subtitle: "( Sur mesure )",
    items: [
      { name: "→ Omakase bientôt dispo", notes: "Créations personnalisées à la demande dès l’ouverture.", price: 0 }
    ],
  },
];


// ================================================
// WINES
// ================================================

export type WineItem = { name: string; region?: string; notes?: string; byGlass?: number; bottle?: number };
export type WineSection = { title: string; items: WineItem[] };

export const WINES: WineSection[] = [
{ title: "Blanc", items: [
{ name: "Hédoniste", region: "Rhône — 100% viognier, La Durbane", byGlass: 8, bottle: 40 },
{ name: "Entre ciel et terre", region: "Coteaux-du-lyonnais — 100% chardonnay, dom. Prapin", byGlass: 8, bottle: 40 },
{ name: "Les cerisiers", region: "Coteaux-du-lyonnais — 100% chardonnay, dom. Prapin",  bottle: 40 },
{ name: "Fronteira", region: "Ardège — 4 cépages, Clot de l’Oum", bottle: 40 },
]},
{ title: "Rouge", items: [
{ name: "Aux vergers", region: "Beaujolais — 100% gamay, Cosima", byGlass: 8, bottle: 40 },
{ name: "L’envol du milan noir", region: "Coteaux-du-lyonnais — 100% gamaret, dom. Prapin", byGlass: 8, bottle: 40 },
{ name: "Espoir d’y rin", region: "Coteaux-du-lyonnais — 100% syrah, dom. Prapin", bottle: 40 },
{ name: "Compagnie des papillons", region: "Ariège — Carignan, syrah, grenache, Clot de l’Oum", bottle: 40 },
]},
  {
    title: "Pétillant",
    items: [
      { name: "En création", region: "Bulles & pétillants en cours de sélection." }
    ],
  },
];



// ================================================
// BRUT_FOOD
// ================================================

export const BRUT_FOOD: { title: string; items: { name: string; price: number }[] } = {
title: "Brut Food",
items: [
{ name: "→ Olives italiennes", price: 5 },
{ name: "→ Artichauts à l’huile", price: 6 },
{ name: "→ Crème de betterave, feta et huile de sésame", price: 8 },
{ name: "→ Houmous de petits pois et amandes, betteraves multicolores", price: 8 },
{ name: "→ Grilled cheese au pesto verde", price: 10 },
{ name: "→ Brillat savarin & noix", price: 8 },
{ name: "→ Fromage de brebis AOP Ossau Iraty", price: 8 },
{ name: "→ Chorizo ibérique 110 grs", price: 8 },
{ name: "→ Jambon Ibérico Cebo de Campo 110 grs", price: 14 },
],
};



// ================================================
// INFOS PRATIQUES (ACTIF — NON MODIFIÉ)
// ================================================

export const INFOS = {
  heading: "Infos pratiques",
  address: ["15 rue montesquieu", "69007 LYON"],
  opening: ["Lundi - Mercredi → 18h - 00h", "Jeudi - Samedi → 18h - 01h"],
  contact: ["contact@olmebar.com", "06 00 00 00 00"],
  groups: "Un espace dédié pour vos évènements (anniversaire, afterwork, pot de départ, ...). Privatisation possible sur demande.",
  terraces: "Dès mars, deux terrasses cosy pour profiter de l’extérieur.",
  reservation: "La réservation n’est pas obligatoire mais conseillée pour les groupes de 4 personnes et plus sur contact@olmebar.com.",
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
