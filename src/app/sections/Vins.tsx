import Image from "next/image";
import { WINES, BEERS, SOFTS } from "../data/content";
import Footer from "../components/Footer";

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
                </div>

                <p className="mt-3 max-w-[640px] text-o-green/80 md:mt-0 md:self-center">
                  Du verre à la bouteille, en passant par la canette : craft, bio, biodynamie, demeter, nature — des jus bien faits par des producteur·ices engagé·es.
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

                    <div className="space-y-3">
                      {sec.items.map((item) => (
                        <div
                          key={item.name}
                          className="grid grid-cols-[1fr_auto] items-center md:flex md:items-baseline md:justify-between gap-x-4 sm:gap-x-6 gap-y-1"
                        >
                          {/* Nom + région */}
                          <div className="min-w-0">
                            <div className="font-b li-arrow break-words">
                              {item.name}
                            </div>
                            {item.region && (
                              <div className="text-16 text-o-green/80 break-words mt-2">
                                {item.region}
                              </div>
                            )}
                          </div>

                          {/* Prix : verre + bouteille */}
                          <div className="justify-self-end self-center md:self-auto shrink-0 w-auto md:w-[220px] text-right">
                            <div className="md:flex md:items-baseline md:justify-end md:gap-10">
                              {item.byGlass && (
                                <div className="whitespace-nowrap">
                                  <span className="font-b">{item.byGlass} €</span>
                                  <span className="opacity-80"> — 15 cl</span>
                                </div>
                              )}
                              {item.bottle && (
                                <div className="whitespace-nowrap mt-2 md:mt-0">
                                  <span className="font-b">{item.bottle} €</span>
                                  <span className="opacity-80"> — 75 cl</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
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
                      className="grid grid-cols-[1fr_auto] items-center md:flex md:items-baseline md:justify-between gap-x-4 sm:gap-x-6 gap-y-1"
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
                      <div className="justify-self-end self-center md:self-auto shrink-0 w-auto md:w-[220px] text-right">
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
                      className="grid grid-cols-[1fr_auto] items-center md:flex md:items-baseline md:justify-between gap-x-4 sm:gap-x-6 gap-y-1"
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
                      <div className="justify-self-end self-center md:self-auto shrink-0 w-auto md:w-[220px] text-right">
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
            {/* <div className="hidden lg:flex md:mt-0 md:self-start md:shrink-0">
              <div className="rounded-2xl overflow-hidden mx-auto w-full max-w-[425px] aspect-[425/520] md:w-[425px] md:h-[520px] md:aspect-auto">
                <Image
                  src="/img/vins.jpg"
                  alt="Verre de vin"
                  width={425}
                  height={520}
                  priority
                  className="w-full h-full object-cover"
                  sizes="(min-width: 1024px) 425px, 0px"
                />
              </div>
            </div> */}
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
