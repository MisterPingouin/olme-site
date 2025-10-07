import Image from "next/image";
import { MIXO_SECTIONS } from "../data/content";

export default function Mixologie() {
  return (
    <section
      id="mixologie"
      aria-labelledby="mixologie-title"
      className="anchor bg-o-red text-o-sand -mt-[2px] overflow-x-hidden"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 py-16">
        {/* Wrapper principal : gauche (titre+texte+listes) | droite (image) */}
        <div className="flex items-start gap-10">
          {/* Colonne gauche */}
          <div className="flex-1 min-w-0">
            {/* Header: titre | texte */}
            <div className="md:flex md:items-center md:justify-between md:gap-10">
              <div className="flex justify-between items-center">
              <h2
                id="mixologie-title"
                className="font-b leading-[1.1] break-words text-[clamp(40px,10vw,90px)]"
              >
                Mixologie
              </h2>
                                              <div className="flex md:hidden lg:hidden md:mt-0 md:self-start md:shrink-0">
            <div className="mx-auto w-full max-w-[75px]">
              <Image
                src="/img/fleur.svg"
                alt="Illustration botanique"
                width={55}
                height={75}
                priority
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          </div>

              <p className="max-w-[520px] text-o-sand/90 mt-4 md:mt-0 md:self-center">
                Un menu cocktail signature. Nez gourmand ou épicé, bouche acidulée au
                sucré-salé, la créativité n’a pas de limites.
              </p>
            </div>

            {/* Règle pointillée plus visible */}
            <hr className="mt-6 border-0 border-b-2 border-dotted border-o-sand/60" />

            {/* Contenu listes */}
            <div className="mt-6 space-y-10">
              {MIXO_SECTIONS.map((sec, idx) => (
                <section key={sec.title} aria-labelledby={`sec-${sec.title}`}>
                  <h3
                    id={`sec-${sec.title}`}
                    className="font-b text-24 mb-4 tracking-tight"
                  >
                    {sec.title} <span className="font-b">{sec.subtitle}</span>
                  </h3>

                  <div className="space-y-3">
                    {sec.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-baseline justify-between gap-4 sm:gap-6"
                      >
                        <div className="min-w-0">
                          <div className="font-b li-arrow break-words">{item.name}</div>
                          <div className="text-16 text-o-sand/90 break-words">
                            {item.notes}
                          </div>
                        </div>

                        {/* Prix : colonne fixe en md+ */}
                        <div className="text-right font-b whitespace-nowrap w-auto md:w-20 shrink-0">
                          {item.price} €
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Séparateur de section */}
                  {idx < MIXO_SECTIONS.length - 1 && (
                    <hr className="mt-8 border-0 border-b-2 border-dotted border-o-sand/50" />
                  )}
                </section>
              ))}
            </div>
          </div>

          {/* Colonne droite : image (responsive) */}
          <div className="hidden md:flex md:mt-0 md:self-start md:shrink-0">
            <div className="mx-auto w-full max-w-[425px] aspect-[425/497]">
              <Image
                src="/img/fleur.svg"
                alt="Illustration botanique"
                width={425}
                height={497}
                priority
                className="w-full h-full object-contain"
                sizes="(min-width: 768px) 425px, 92vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
