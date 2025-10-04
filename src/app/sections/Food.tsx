import Image from "next/image";
import { BRUT_FOOD } from "../data/content";

export default function Food() {
  return (
    <section
      id="food"
      aria-labelledby="food-title"
      className="anchor bg-[#F4E4C7] text-o-green"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        {/* Layout principal : gauche (contenu) | droite (image) */}
        <div className="md:flex md:items-start md:gap-10">
          {/* Colonne gauche */}
          <div className="flex-1 min-w-0">
            <h2 id="food-title" className="text-[90px] leading-[1.1] font-b">
              {BRUT_FOOD.title}
            </h2>

            {/* Sous-titre SOUS le titre */}
            <p className="mt-2 max-w-[640px] text-o-green/80">
              Simple et soigné, pensé pour accompagner le verre. De la nourriture brute…
            </p>

            {/* Règle pointillée (plus visible) */}
            <hr className="mt-5 border-0 border-b-2 border-dotted border-o-green/60" />

            {/* Liste des items */}
            <div className="mt-8 space-y-3">
              {BRUT_FOOD.items.map((it) => (
                <div
                  key={it.name}
                  className="flex items-baseline justify-between gap-6"
                >
                  <div className="min-w-0 font-b li-arrow">{it.name}</div>

                  {/* Prix : colonne fixe en md+ */}
                  <div className="text-right font-b whitespace-nowrap w-auto md:w-20 shrink-0">
                    {it.price} €
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne droite : image */}
          <aside className="mt-8 md:mt-0 md:self-start md:shrink-0">
            <div className="rounded-2xl overflow-hidden w-[425px] h-[520px]">
              <Image
                src="/img/food.jpg"
                alt="Assiette"
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
