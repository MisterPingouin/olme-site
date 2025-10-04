import { INFOS } from "../data/content";

export default function Infos() {
  return (
    <section
      id="infos"
      aria-labelledby="infos-title"
      className="anchor bg-[#41BEDF] text-o-green"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <h2 id="infos-title" className="text-[90px] leading-[1.1] font-b">
          {INFOS.heading}
        </h2>

        {/* Règle pointillée sous le titre */}
        <hr className="mt-5 border-0 border-b-2 border-dotted border-o-green/60" />

        {/* 3 blocs : Adresse | Ouverture | Contact (full Flex) */}
        <div className="mt-8 md:flex md:gap-10">
          {/* Adresse */}
          <div className="flex-1 min-w-0 pt-4 border-t-2 border-dotted border-o-green/50">
            <div className="font-b text-24 mb-2">Adresse</div>
            <div className="space-y-1">
              {INFOS.address.map((l) => (
                <div key={l}>{l}</div>
              ))}
            </div>
          </div>

          {/* Ouverture */}
          <div className="flex-1 min-w-0 pt-4 mt-8 md:mt-0 border-t-2 border-dotted border-o-green/50">
            <div className="font-b text-24 mb-2">Ouverture</div>
            <div className="space-y-1">
              {INFOS.opening.map((l) => (
                <div key={l}>{l}</div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex-1 min-w-0 pt-4 mt-8 md:mt-0 border-t-2 border-dotted border-o-green/50">
            <div className="font-b text-24 mb-2">Contact</div>
            <div className="space-y-1">
              {INFOS.contact.map((l) => (
                <div key={l}>{l}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Bas de page : deux encarts */}
        <div className="mt-12 md:flex md:gap-10 text-o-green/90">
          <div className="flex-1 min-w-0">
            <div className="font-b mb-1">Groupes & privatisation</div>
            <p>{INFOS.groups}</p>
          </div>
          <div className="flex-1 min-w-0 mt-8 md:mt-0">
            <div className="font-b mb-1">Terrasses</div>
            <p>{INFOS.terraces}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
