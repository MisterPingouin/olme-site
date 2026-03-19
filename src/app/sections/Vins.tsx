import Image from "next/image";
import { WINES, BEERS, SOFTS } from "../data/content";
import Footer from "../components/Footer";

function formatPrice(value: number) {
  const needsDecimal = Math.round(value * 10) % 10 !== 0;
  return value.toLocaleString("fr-FR", {
    minimumFractionDigits: needsDecimal ? 1 : 0,
    maximumFractionDigits: 2,
  });
}

function PriceLine({
  price,
  sizeCl,
  happyHourPrice,
}: {
  price: number;
  sizeCl?: number;
  happyHourPrice?: number;
}) {
  return (
    <div className="inline-flex max-w-full items-center justify-end gap-1.5 sm:gap-2 flex-wrap text-right">
      {typeof happyHourPrice === "number" && (
        <div className="inline-flex items-center gap-1 whitespace-nowrap text-[12px] sm:text-[13px] font-medium text-o-green/75">
          <span className="inline-flex items-center rounded-full border border-o-green/30 px-1.5 py-[1px] text-[10px] sm:text-[11px] font-b leading-none">
            HH
          </span>
          <span>{formatPrice(happyHourPrice)} €</span>
        </div>
      )}

      <div className="whitespace-nowrap">
        <span className="font-b">{formatPrice(price)} €</span>
        {sizeCl && <span className="opacity-80"> — {sizeCl} cl</span>}
      </div>
    </div>
  );
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
          <div className="flex items-start gap-10">
            <div className="flex-1 min-w-0">
              <div className="md:flex md:items-center md:justify-between md:gap-10 lg:block lg:space-y-3">
                <div className="flex justify-between items-center md:block">
                  <h2
                    id="vins-title"
                    className="font-b leading-[1.1] break-words text-[clamp(40px,9.5vw,90px)]"
                  >
                    Vins, bières & softs
                  </h2>

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
                  Du verre à la bouteille, en passant par la canette : craft, bio,
                  biodynamie, demeter, nature - des jus bien faits par des
                  producteur·ices engagé·es.
                </p>
              </div>

              <hr className="mt-6 border-0 border-b-2 border-dotted border-o-green/60" />

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
                        const prices: Array<{
                          kind: "glass" | "bottle";
                          value: number;
                          cl?: number;
                        }> = [];

                        if (typeof item.byGlass === "number") {
                          prices.push({
                            kind: "glass",
                            value: item.byGlass,
                            cl: item.glassCl ?? 12,
                          });
                        }

                        if (typeof item.bottle === "number") {
                          prices.push({
                            kind: "bottle",
                            value: item.bottle,
                            cl: item.bottleCl ?? 75,
                          });
                        }

                        return (
                          <div
                            key={item.name}
                            className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 sm:gap-6 items-start"
                          >
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

                            <div className="shrink-0 w-auto max-w-[42vw] sm:max-w-none text-right">
                              {prices.length > 0 && (
                                <div className="whitespace-nowrap">
                                  <span className="font-b">
                                    {formatPrice(prices[0].value)} €
                                  </span>
                                  {prices[0].cl && (
                                    <span className="opacity-80">
                                      {" "}
                                      — {prices[0].cl} cl
                                    </span>
                                  )}
                                </div>
                              )}

                              {prices.length > 1 && (
                                <div className="whitespace-nowrap mt-1">
                                  <span className="font-b">
                                    {formatPrice(prices[1].value)} €
                                  </span>
                                  {prices[1].cl && (
                                    <span className="opacity-80">
                                      {" "}
                                      — {prices[1].cl} cl
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {idx < WINES.length - 1 && (
                      <hr className="mt-8 border-0 border-b-2 border-dotted border-o-green/40" />
                    )}
                  </section>
                ))}
              </div>

              <hr className="mt-8 border-0 border-b-2 border-dotted border-o-green/40" />

              <section aria-labelledby="w-beer" className="mt-12">
                <h3 id="w-beer" className="font-b text-24 mb-4 tracking-tight">
                  Bière craft
                </h3>

                <div className="space-y-3">
                  {BEERS.map((b, i) => {
                    const hasPression =
                      typeof b.byGlass === "number" || typeof b.pint === "number";

                    const hasCanette =
                      typeof b.price === "number" || typeof b.sizeCl === "number";

                    return (
                      <div
                        key={`${b.name}-${i}`}
                        className="flex items-start md:items-baseline justify-between gap-3 sm:gap-6"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="font-b li-arrow break-words">{b.name}</div>
                          {b.style && (
                            <div className="text-16 text-o-green/80 break-words">
                              {b.style}
                            </div>
                          )}
                        </div>

                        <div className="shrink-0 w-auto max-w-[42vw] sm:max-w-none md:w-[220px] text-right">
                          {hasPression ? (
                            <>
                              {typeof b.byGlass === "number" && (
                                <PriceLine
                                  price={b.byGlass}
                                  happyHourPrice={b.happyHourByGlass}
                                  sizeCl={b.glassCl ?? 25}
                                />
                              )}

                              {typeof b.pint === "number" && (
                                <div className="mt-1">
                                  <PriceLine
                                    price={b.pint}
                                    happyHourPrice={b.happyHourPint}
                                    sizeCl={b.pintCl ?? 50}
                                  />
                                </div>
                              )}
                            </>
                          ) : hasCanette && typeof b.price === "number" ? (
                            <PriceLine
                              price={b.price}
                              happyHourPrice={b.happyHourPrice}
                              sizeCl={b.sizeCl}
                            />
                          ) : (
                            <div className="whitespace-nowrap opacity-70">—</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <hr className="mt-8 border-0 border-b-2 border-dotted border-o-green/40" />

              <section aria-labelledby="w-softs" className="mt-12">
                <h3 id="w-softs" className="font-b text-24 mb-4 tracking-tight">
                  Boissons sans alcool
                </h3>

                <div className="space-y-3">
                  {SOFTS.map((s) => (
                    <div
                      key={s.name}
                      className="flex items-start md:items-baseline justify-between gap-3 sm:gap-6"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-b li-arrow break-words">{s.name}</div>
                        {s.notes && (
                          <div className="text-16 text-o-green/80 break-words">
                            {s.notes}
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 w-auto max-w-[42vw] sm:max-w-none md:w-[220px] text-right">
                        <PriceLine
                          price={s.price}
                          happyHourPrice={s.happyHourPrice}
                          sizeCl={s.sizeCl}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-16 text-o-green/80">
                  Cocktails sans alcool — voir page mixologie
                </p>
              </section>
            </div>

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

      <div className="lg:hidden">
        <Footer />
      </div>
    </>
  );
}