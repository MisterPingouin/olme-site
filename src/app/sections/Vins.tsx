import { WINES } from "../data/content";


export default function Vins(){
return (
<section id="vins" className="anchor" style={{ backgroundColor: "#DE9E53" }}>
<div className="mx-auto max-w-[1200px] px-6 py-16 text-o-green">
<h2 className="text-[90px] leading-[1.1] font-b mb-6">Vins, bières & softs</h2>
<p className="text-o-green/80 mb-10">Carte courte et vivante. Du verre à la bouteille : classiques, biodynamie, nature – des jus bien faits et des belles trouvailles de vignerons.</p>


<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
<div className="space-y-10">
{WINES.map(sec => (
<div key={sec.title}>
<h3 className="font-b text-24 mb-3">{sec.title}</h3>
<div className="divide-y divide-o-green/30">
{sec.items.map(item => (
<div key={item.name} className="py-3 flex items-baseline justify-between gap-6">
<div>
<div className="font-b">{item.name}</div>
<div className="text-o-green/80 text-16">{item.region}</div>
</div>
<div className="whitespace-nowrap text-right min-w-[160px]">
{item.byGlass && <div>{item.byGlass} € - 15 cl</div>}
{item.bottle && <div className="font-b">{item.bottle} € - 75 cl</div>}
</div>
</div>
))}
</div>
</div>
))}
</div>


<aside className="hidden md:block">
<div className="rounded-2xl overflow-hidden">
<img src="/img/vins.jpg" alt="Verre de vin" className="w-full h-[520px] object-cover" />
</div>
</aside>
</div>
</div>
</section>
);
}