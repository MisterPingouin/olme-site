import { INFOS } from "../data/content";


export default function Infos(){
return (
<section id="infos" className="anchor" style={{ backgroundColor: "#41BEDF" }}>
<div className="mx-auto max-w-[1200px] px-6 py-16 text-o-green">
<h2 className="text-[90px] leading-[1.1] font-b mb-10">{INFOS.heading}</h2>


<div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14">
<div className="border-t border-dashed border-o-green/40 pt-4">
<div className="font-b text-24 mb-2">Adresse</div>
{INFOS.address.map(l => <div key={l}>{l}</div>)}
</div>
<div className="border-t border-dashed border-o-green/40 pt-4">
<div className="font-b text-24 mb-2">Ouverture</div>
{INFOS.opening.map(l => <div key={l}>{l}</div>)}
</div>
<div className="border-t border-dashed border-o-green/40 pt-4">
<div className="font-b text-24 mb-2">Contact</div>
{INFOS.contact.map(l => <div key={l}>{l}</div>)}
</div>
</div>


<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-o-green/90">
<div>
<div className="font-b mb-1">Groupes & privatisation</div>
<p>{INFOS.groups}</p>
</div>
<div>
<div className="font-b mb-1">Terrasses</div>
<p>{INFOS.terraces}</p>
</div>
</div>
</div>
</section>
);
}