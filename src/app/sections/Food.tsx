import { BRUT_FOOD } from "../data/content";

export default function Food() {
  return (
    <section id="food" className="anchor" style={{ backgroundColor: "#F4E4C7" }}>
      <div className="mx-auto max-w-[1200px] px-6 py-16 text-o-green">
        <h2 className="text-[56px] leading-[1.1] font-b mb-6">{BRUT_FOOD.title}</h2>
        <p className="text-o-green/80 mb-10">
          Simple et soigné, pensé pour accompagner le verre. De la nourriture brute…
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="divide-y divide-o-green/20">
            {BRUT_FOOD.items.map(it => (
              <div key={it.name} className="py-3 flex items-baseline justify-between">
                <div className="font-b">{it.name}</div>
                <div className="font-b">{it.price} €</div>
              </div>
            ))}
          </div>
          <aside className="hidden md:block">
            <div className="rounded-2xl overflow-hidden">
              <img src="/img/food.jpg" alt="Assiette" className="w-full h-[520px] object-cover" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
