import Image from "next/image";
import { MIXO_SECTIONS } from "../data/content";
import Footer from "../components/Footer";

/** Coupe "notes — ingrédients" sur le tiret cadratin (—) */
function splitNotes(notes: string) {
  const parts = notes.split("—");
  const descriptors = (parts[0] ?? "").trim();
  const ingredients = (parts[1] ?? "").trim();
  return { descriptors, ingredients };
}

export default function Mixologie() {
  return (
    <>
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
              <div className="flex justify-between items-center md:block">
                <h2
                  id="mixologie-title"
                  className="font-b leading-[1.1] break-words text-[clamp(40px,10vw,90px)]"
                >
                  Mixologie
                </h2>

                {/* Illustration mobile (à droite du titre) */}
                <div className="flex md:hidden">
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
                Ici chaque cocktail évoque un souvenir, un voyage. Nez gourmand ou épicé, bouche acidulée ou sucrée-salée, la créativité n’a pas de limites.
              </p>
            </div>

            {/* Règle pointillée */}
            <hr className="mt-6 border-0 border-b-2 border-dotted border-o-sand/60" />

            {/* Listes */}
            <div className="mt-6 space-y-10">
              {MIXO_SECTIONS.map((sec, idx) => (
                <section key={sec.title} aria-labelledby={`sec-${sec.title}`}>
                  <h3
                    id={`sec-${sec.title}`}
                    className="font-b text-24 mb-4 tracking-tight"
                  >
                    {sec.title} <span className="font-b">{sec.subtitle}</span>
                  </h3>

                  <div className="space-y-4">
                    {sec.items.map((item) => {
                      const { descriptors, ingredients } = splitNotes(item.notes);
                      const hasDescriptors = descriptors.length > 0;
                      return (
                        <div key={item.name} className="flex flex-col">
                          {/* Ligne 1 : [Nom - Notes] .......... [Prix] */}
                          <div className="flex flex-wrap items-baseline gap-y-1">
                            {/* Groupe gauche : Nom - Notes */}
                            <div className="flex min-w-0 items-baseline gap-2 flex-1">
                              <div className="font-b li-arrow shrink-0 break-words">
                                {item.name}
                              </div>

                              {hasDescriptors && (
                                <span className="shrink-0" aria-hidden="true">-</span>
                              )}

                              {hasDescriptors && (
                                <div className="text-16 font-normal italic min-w-0 break-words">
                                  {descriptors}
                                </div>
                              )}
                            </div>

                            {/* Prix à droite */}
                            <div className="ml-auto text-right font-b whitespace-nowrap tabular-nums shrink-0">
                              {item.price} €
                            </div>
                          </div>

                          {/* Ligne 2 : ingrédients */}
                          {ingredients && (
                            <div className="text-16 font-medium text-o-sand/90 break-words mt-1 mb-2">
                              {ingredients}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Séparateur de section */}
                  {idx < MIXO_SECTIONS.length - 1 && (
                    <hr className="mt-8 border-0 border-b-2 border-dotted border-o-sand/50" />
                  )}
                </section>
              ))}
            </div>
          </div>

          {/* Colonne droite : image (≥ lg) */}
          <div className="hidden lg:flex md:mt-0 md:self-start md:shrink-0">
            <div className="mx-auto w-full max-w-[425px] aspect-[425/497]">
              <Image
                src="/img/fleur.svg"
                alt="Illustration botanique"
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
    <Footer /></div></>
  );
}
