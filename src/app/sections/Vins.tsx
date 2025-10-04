import Image from "next/image";
import { WINES } from "../data/content";

export default function Vins() {
  return (
    <section
      id="vins"
      aria-labelledby="vins-title"
      className="anchor bg-[#DE9E53] text-o-green"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        {/* Layout principal : gauche (contenu) | droite (image) */}
        <div className="md:flex md:items-start md:gap-10">
          {/* Colonne gauche */}
          <div className="flex-1 min-w-0">
            <h2 id="vins-title" className="text-[90px] leading-[1.1] font-b">
              Vins, bières & softs
            </h2>

            {/* Sous-titre SOUS le titre */}
            <p className="mt-2 max-w-[640px] text-o-green/80">
              Carte courte et vivante. Du verre à la bouteille : classiques,
              biodynamie, nature — des jus bien faits et des belles trouvailles
              de vignerons. Bière craft et Soda sauvage. Sélection de bières
              artisanales et sodas maison pour changer des habitudes.
            </p>

            {/* Règle pointillée (plus visible) */}
            <hr className="mt-5 border-0 border-b-2 border-dotted border-o-green/60" />

            {/* Sections */}
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
                        className="flex items-baseline justify-between gap-6"
                      >
                        {/* Nom + sous-titre (sous le nom) */}
                        <div className="min-w-0">
                          <div className="font-b li-arrow">{item.name}</div>
                          <div className="text-16 text-o-green/80">
                            {item.region}
                          </div>
                        </div>

                        {/* Prix : verre + bouteille sur une seule ligne en MD+ */}
                        <div className="shrink-0 w-auto md:w-[220px] text-right">
                          <div className="md:flex md:items-baseline md:justify-end md:gap-10">
                            {item.byGlass && (
                              <div className="whitespace-nowrap">
                                <span className="font-b">{item.byGlass} €</span>
                                <span className="opacity-80"> — 15 cl</span>
                              </div>
                            )}
                            {item.bottle && (
                              <div className="whitespace-nowrap">
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
          </div>

          {/* Colonne droite : image */}
          <aside className="mt-8 md:mt-0 md:self-start md:shrink-0">
            <div className="rounded-2xl overflow-hidden w-[425px] h-[520px]">
              <Image
                src="/img/vins.jpg"
                alt="Verre de vin"
                width={425}
                height={520}
                priority
                className="w-full h-full object-cover"
                sizes="(min-width: 1024px) 425px, 100vw"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
