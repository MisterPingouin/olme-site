import Image from "next/image";
import { MIXO_SECTIONS } from "../data/content";

export default function Mixologie() {
  return (
    <section
      id="mixologie"
      aria-labelledby="mixologie-title"
      className="anchor bg-o-red text-o-sand -mt-[2px]"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        {/* Wrapper principal : gauche (titre+texte+listes) | droite (image) */}
        <div className="md:flex md:items-start md:gap-10">
          {/* Colonne gauche */}
          <div className="flex-1 min-w-0">
            {/* Header: titre | texte (aligné au centre vertical du titre) */}
            <div className="md:flex md:items-center md:justify-between md:gap-10">
              <h2 id="mixologie-title" className="text-[90px] leading-[1.1] font-b">
                Mixologie
              </h2>

              <p className="max-w-[520px] text-o-sand/90 mt-4 md:mt-0 md:self-center">
                Un menu cocktail signature. Nez gourmand ou épicé, bouche acidulée au
                sucré-salé, la créativité n’a pas de limites.
              </p>
            </div>

            {/* Règle pointillée plus visible */}
            <hr className="mt-5 border-0 border-b-2 border-dotted border-o-sand/60" />

            {/* Contenu listes */}
            <div className="mt-6 space-y-10">
              {MIXO_SECTIONS.map((sec, idx) => (
                <section key={sec.title} aria-labelledby={`sec-${sec.title}`}>
                  <h3
                    id={`sec-${sec.title}`}
                    className="font-b text-24 mb-4 tracking-tight"
                  >
                    {sec.title}{" "}
                    <span className="font-b">{sec.subtitle}</span>
                  </h3>

                  <div className="space-y-3">
                    {sec.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-baseline justify-between gap-6"
                      >
                        <div className="min-w-0">
                          <div className="font-b li-arrow">{item.name}</div>
                          <div className="text-16 text-o-sand/90">{item.notes}</div>
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

          {/* Colonne droite : image (fixe) */}
          <div className="mt-8 md:mt-0 md:self-start md:shrink-0">
            <Image
              src="/img/fleur.svg"
              alt="Illustration botanique"
              width={425}
              height={497}
              priority
              className="w-[425px] h-[497px] object-contain"
              sizes="(min-width: 1024px) 425px, 60vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
