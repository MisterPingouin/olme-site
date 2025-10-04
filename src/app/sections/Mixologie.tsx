import Image from "next/image";
import { MIXO_SECTIONS } from "../data/content";

export default function Mixologie() {
  return (
    <section
      id="mixologie"
      aria-labelledby="mixologie-title"
      className="anchor bg-o-red text-o-sand -mt-[2px]"
    >
      <div className="mx-auto px-30 py-16">
        {/* Grille titre | texte | image */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_520px_425px] md:grid-rows-[auto_auto_auto] md:gap-x-10">
          <h2
            id="mixologie-title"
            className="text-[90px] leading-[1.1] font-b md:row-start-1 md:col-start-1"
          >
            Mixologie
          </h2>

          {/* Centrage vertical du paragraphe par rapport au titre */}
          <p className="text-o-sand/90 max-w-[520px] md:row-start-1 md:col-start-2 md:self-center mt-4 md:mt-0">
            Un menu cocktail signature. Nez gourmand ou épicé, bouche acidulée au
            sucré-salé, la créativité n’a pas de limites.
          </p>

          {/* Image à droite, reste alignée en haut et couvre aussi le contenu */}
          <div className="mt-8 md:mt-0 md:row-start-1 md:row-span-3 md:col-start-3 md:self-start md:justify-self-end">
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

          {/* Règle pointillée plus visible */}
          <hr className="col-span-1 md:col-span-2 mt-5 border-0 border-b-2 border-dotted border-o-sand/60" />

          {/* Contenu */}
          <div className="mt-6 col-span-1 md:col-span-2 space-y-10">
            {MIXO_SECTIONS.map((sec, idx) => (
              <section key={sec.title} aria-labelledby={`sec-${sec.title}`}>
                <h3
                  id={`sec-${sec.title}`}
                  className="font-b text-24 mb-4 tracking-tight"
                >
                  {sec.title}{" "}
                  {/* Sous-titre en gras */}
                  <span className="font-b">{sec.subtitle}</span>
                </h3>

                <div className="space-y-3">
                  {sec.items.map((item) => (
                    <div
                      key={item.name}
                      className="md:grid md:grid-cols-[minmax(0,1fr)_80px] md:items-baseline md:gap-6 flex items-baseline justify-between"
                    >
                      <div className="min-w-0">
                        <div className="font-b li-arrow">{item.name}</div>
                        <div className="text-16 text-o-sand/90">
                          {item.notes}
                        </div>
                      </div>
                      <div className="text-right font-b whitespace-nowrap">
                        {item.price} €
                      </div>
                    </div>
                  ))}
                </div>

                {idx < MIXO_SECTIONS.length - 1 && (
                  <hr className="mt-8 border-0 border-b-2 border-dotted border-o-sand/50" />
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
