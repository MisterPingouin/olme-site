import { MIXO_SECTIONS } from "../data/content";


export default function Mixologie(){
return (
<section id="mixologie" className="anchor bg-o-red text-o-sand">
<div className="mx-auto px-20 py-16">
    <div className="flex items-center gap-10">
<h2 className="text-[90px] leading-[1.1] font-b mb-6">Mixologie</h2>
<p className="text-o-sand/90 max-w-99">Un menu cocktail signature. Nez gourmand ou épicé, bouche acidulée au sucré-salé, la créativité n’a pas de limites.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
<div className="space-y-10">
{MIXO_SECTIONS.map(sec => (
<div key={sec.title}>
<h3 className="font-b text-24 mb-3">{sec.title} <span className="font-r opacity-80">{sec.subtitle}</span></h3>
<div className="divide-y divide-o-sand/40">
{sec.items.map(item => (
<div key={item.name} className="py-3 flex items-baseline justify-between gap-6">
<div>
<div className="font-b">{item.name}</div>
<div className="text-o-sand/90 text-16">{item.notes}</div>
</div>
<div className="whitespace-nowrap font-b">{item.price} €</div>
</div>
))}
</div>
</div>
))}
</div>


<aside className="hidden md:block">
<div className="rounded-2xl overflow-hidden">
<img src="/img/fleur.svg" alt="Cocktail" className="w-full h-[520px] object-cover" />
</div>
</aside>
</div>
</div>
</section>
);
}