import Image from "next/image";
import { WINES, BEERS, SOFTS } from "../data/content";
import Footer from "../components/Footer";

function formatPrice(value: number) {
  // affiche 6,5 au lieu de 6.5 en fr-FR
  const needsDecimal = Math.round(value * 10) % 10 !== 0;
  return value.toLocaleString("fr-FR", {
    minimumFractionDigits: needsDecimal ? 1 : 0,
    maximumFractionDigits: 2,
  });
}

export default function Vins() {
  return (
    <>
      <section
        id="vins"
        aria-labelledby="vins-title"
        className="anchor bg-[#DE9E53] text-o-green overflow-x-hidden"
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 py-16">
          {/* Wrapper principal : gauche (titre+texte+listes) | droite (image) */}
          <div className="flex items-start gap-10">
            {/* Colonne gauche */}
            <div className="flex-1 min-w-0">
              {/* Header: titre | sous-texte */}
              <div className="md:flex md:items-center md:justify-between md:gap-10 lg:block lg:space-y-3">
                <div className="flex justify-between items-center md:block">
                  <h2
                    id="vins-title"
                    className="font-b leading-[1.1] break-words text-[clamp(40px,9.5vw,90px)]"
                  >
                    Vins, bières & softs
                  </h2>

                  {/* Illustration mobile (à droite du titre) */}
                  <div className="flex md:hidden">
                    <div className="mx-auto w-full max-w-[75px]">
                      <Image
                        src="/img/Vin.svg"
                        alt="Illustration Vins"
                        width={55}
                        height={75}
                        priority
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                <p className="mt-3 max-w-[640px] text-o-green/80 md:mt-0 md:self-center">
                  Du verre à la bouteille, en passant par la canette : craft, bio, biodynamie, demeter, nature - des jus bien faits par des producteur·ices engagé·es.
                </p>
              </div>

              {/* Règle pointillée */}
              <hr className="mt-6 border-0 border-b-2 border-dotted border-o-green/60" />

              {/* Sections VINS */}
              <div className="mt-8 space-y-10">
                {WINES.map((sec, idx) => (
                  <section key={sec.title} aria-labelledby={`w-${sec.title}`}>
                    <h3
                      id={`w-${sec.title}`}
                      className="font-b text-24 mb-4 tracking-tight"
                    >
                      {sec.title}
                    </h3>

                    <div className="space-y-4">
                      {sec.items.map((item) => {
                        // Ordonner les prix : le premier (verre OU bouteille) doit s’aligner avec le nom
                        const prices: Array<
                          { kind: "glass" | "bottle"; value: number; cl?: number }
                        > = [];
                        if (typeof item.byGlass === "number") {
                          prices.push({ kind: "glass", value: item.byGlass, cl: item.glassCl ?? 12 });
                        }
                        if (typeof item.bottle === "number") {
                          // si pas de byGlass, la bouteille devient le "premier prix"
                          prices.push({ kind: "bottle", value: item.bottle, cl: item.bottleCl ?? 75 });
                        }

                        return (
                          <div
                            key={item.name}
                            className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 sm:gap-6 items-start"
                          >
                            {/* Colonne gauche : nom + domaine (ligne 1), région + cépage (ligne 2), notes (ligne 3) */}
                            <div className="min-w-0">
                              <div className="font-b li-arrow break-words">
                                {item.name}
                                {item.domain && (
                                  <span className="font-normal">
                                    <span className="opacity-70">, </span>
                                    {item.domain}
                                  </span>
                                )}
                              </div>

                              {(item.region || item.grapes) && (
                                <div className="text-16 text-o-green/80 break-words mt-1">
                                  {item.region}
                                  {item.grapes && <> {item.grapes}</>}
                                </div>
                              )}

                              {item.notes && (
                                <div className="text-16 text-o-green/80 break-words mt-1">
                                  {item.notes}
                                </div>
                              )}
                            </div>

                            {/* Colonne droite : prix (1er prix aligné en haut sur la ligne du nom) */}
                            <div className="shrink-0 w-auto text-right">
                              {prices.length > 0 && (
                                <div className="whitespace-nowrap">
                                  <span className="font-b">
                                    {formatPrice(prices[0].value)} €
                                  </span>
                                  {prices[0].cl && (
                                    <span className="opacity-80"> — {prices[0].cl} cl</span>
                                  )}
                                </div>
                              )}
                              {prices.length > 1 && (
                                <div className="whitespace-nowrap mt-1">
                                  <span className="font-b">
                                    {formatPrice(prices[1].value)} €
                                  </span>
                                  {prices[1].cl && (
                                    <span className="opacity-80"> — {prices[1].cl} cl</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Séparateur entre sections */}
                    {idx < WINES.length - 1 && (
                      <hr className="mt-8 border-0 border-b-2 border-dotted border-o-green/40" />
                    )}
                  </section>
                ))}
              </div>

              {/* === Bière craft === */}
              <section aria-labelledby="w-beer" className="mt-12">
                <h3 id="w-beer" className="font-b text-24 mb-4 tracking-tight">
                  Bière craft
                </h3>
                <div className="space-y-3">
                  {BEERS.map((b) => (
                    <div
                      key={b.name}
                      className="flex md:items-baseline justify-between gap-4 sm:gap-6"
                    >
                      <div className="min-w-0">
                        <div className="font-b li-arrow break-words">
                          {b.name}
                        </div>
                        {b.style && (
                          <div className="text-16 text-o-green/80 break-words">
                            {b.style}
                          </div>
                        )}
                      </div>
                      <div className="shrink-0 w-auto md:w-[220px] text-right">
                        <div className="whitespace-nowrap">
                          <span className="font-b">{b.price} €</span>
                          <span className="opacity-80"> — {b.sizeCl} cl</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* === Boissons sans alcool === */}
              <section aria-labelledby="w-softs" className="mt-12">
                <h3 id="w-softs" className="font-b text-24 mb-4 tracking-tight">
                  Boissons sans alcool
                </h3>
                <div className="space-y-3">
                  {SOFTS.map((s) => (
                    <div
                      key={s.name}
                      className="flex md:items-baseline justify-between gap-4 sm:gap-6"
                    >
                      <div className="min-w-0">
                        <div className="font-b li-arrow break-words">
                          {s.name}
                        </div>
                        {s.notes && (
                          <div className="text-16 text-o-green/80 break-words">
                            {s.notes}
                          </div>
                        )}
                      </div>
                      <div className="shrink-0 w-auto md:w-[220px] text-right">
                        <div className="whitespace-nowrap">
                          <span className="font-b">{s.price} €</span>
                          <span className="opacity-80"> — {s.sizeCl} cl</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mention cocktails NA */}
                <p className="mt-4 text-16 text-o-green/80">
                  Cocktails sans alcool — voir page mixologie (8 €)
                </p>
              </section>
            </div>

            {/* Colonne droite : image (≥ lg) */}
            <div className="hidden lg:flex md:mt-0 md:self-start md:shrink-0">
              <div className="mx-auto w-full max-w-[425px] aspect-[425/497]">
                <Image
                  src="/img/Vin.svg"
                  alt="Illustration Vins"
                  width={425}
                  height={497}
                  priority
                  className="w-full h-full object-contain"
                  sizes="(min-width: 1024px) 425px, 0px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer mobile uniquement (comme avant) */}
      <div className="lg:hidden">
        <Footer />
      </div>
    </>
  );
}
