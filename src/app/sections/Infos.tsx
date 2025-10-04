import { INFOS } from "../data/content";

export default function Infos() {
  return (
    <section
      id="infos"
      aria-labelledby="infos-title"
      className="anchor bg-[#41BEDF] text-o-green overflow-x-hidden"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 py-16">
        <h2
          id="infos-title"
          className="font-b leading-[1.1] break-words text-[clamp(40px,10vw,90px)]"
        >
          {INFOS.heading}
        </h2>

        {/* Règle pointillée sous le titre */}
        <hr className="mt-6 border-0 border-b-2 border-dotted border-o-green/60" />

        {/* 3 blocs : Adresse | Ouverture | Contact */}
        <div className="mt-8 md:flex md:gap-10">
          {/* Adresse */}
          <div className="flex-1 min-w-0 pt-4 border-t-2 border-dotted border-o-green/50">
            <div className="font-b text-24 mb-2">Adresse</div>
            <div className="space-y-1">
              {INFOS.address.map((l) => (
                <div key={l} className="break-words">
                  {l}
                </div>
              ))}
            </div>
          </div>

          {/* Ouverture */}
          <div className="flex-1 min-w-0 pt-4 mt-8 md:mt-0 border-t-2 border-dotted border-o-green/50">
            <div className="font-b text-24 mb-2">Ouverture</div>
            <div className="space-y-1">
              {INFOS.opening.map((l) => (
                <div key={l} className="break-words">
                  {l}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex-1 min-w-0 pt-4 mt-8 md:mt-0 border-t-2 border-dotted border-o-green/50">
            <div className="font-b text-24 mb-2">Contact</div>
            <div className="space-y-1">
              {INFOS.contact.map((l) => (
                <div key={l} className="break-words">
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bas de page : deux encarts */}
        <div className="mt-12 md:flex md:gap-10 text-o-green/90">
          <div className="flex-1 min-w-0">
            <div className="font-b mb-1">Groupes & privatisation</div>
            <p className="break-words">{INFOS.groups}</p>
          </div>
          <div className="flex-1 min-w-0 mt-8 md:mt-0">
            <div className="font-b mb-1">Terrasses</div>
            <p className="break-words">{INFOS.terraces}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
