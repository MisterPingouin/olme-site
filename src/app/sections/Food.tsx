import Image from "next/image";
import { BRUT_FOOD } from "../data/content";

export default function Food() {
  return (
    <section id="food" className="anchor" style={{ backgroundColor: "#F4E4C7" }}>
      <div className="mx-auto max-w-[1200px] px-6 py-16 text-o-green">
        <div className="flex items-start gap-10">
          <h2 className="text-[90px] leading-[1.1] font-b">{BRUT_FOOD.title}</h2>
          <p className="text-o-green/80 max-w-[520px]">
            Simple et soigné, pensé pour accompagner le verre. De la nourriture brute…
          </p>
        </div>
        <div className="mt-4 border-b border-dotted border-o-green/30" />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="divide-y divide-o-green/20 divide-dotted">
            {BRUT_FOOD.items.map((it) => (
              <div key={it.name} className="py-3 flex items-baseline justify-between">
                <div className="font-b li-arrow">{it.name}</div>
                <div className="font-b">{it.price} €</div>
              </div>
            ))}
          </div>

          <aside className="hidden md:block">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/img/food.jpg"
                alt="Assiette"
                width={640}
                height={520}
                className="w-full h-[520px] object-cover"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
