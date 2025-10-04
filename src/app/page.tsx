export default function Home() {
  return (
    <>
      <section className="hero bg-olme relative">
        <div className="frame">
          {/* Logo (rouge, 656×210 dans la maquette) */}
          <img
            src="/logo/logo-olme.svg"
            alt="Olmé"
            className="p-logo select-none"
            draggable={false}
          />

          {/* Ornament (197×203, coin haut-droit du cadre) */}
          <img
            src="/ornaments/ornament-botanic.svg"
            alt=""
            aria-hidden="true"
            className="p-orn select-none"
            draggable={false}
          />

          {/* Texte bas-droit (540×208) */}
          <div className="p-text text-o-sand">
            <h3 className="text-16 font-b lh-160">
              Olmé, bar à cocktails à Lyon
            </h3>
            <p className="mt-2 text-16 font-l lh-160">
              Un lieu de vie moderne dédié à la mixologie, au vin et à la bière craft.
            </p>
            <p className="text-16 font-l lh-160">
              Un lieu où chaque cocktail évoque un souvenir, un voyage : d’abord le nez,
              puis le goût — le sel, le feu, le kick.
            </p>
            <p className="text-16 font-l lh-160">
              Ici, pas besoin de réservation pour boire un bon cocktail.
              <br />Nous servons à manger jusqu’à 23h !
            </p>
            <p className="mt-2 text-16 lh-160">
              <span className="font-b">Le + :</span> producteurs engagés et fait maison, du bar aux assiettes.
            </p>
          </div>

          {/* Adresse / Ouverture / Contact (654×137) */}
          <div className="p-info">
            <div className="dash-row text-16">
              {/* Adresse (pas de bordure gauche) */}
              <div>
                <div className="font-b text-24">Adresse</div>
                <div className="font-l lh-160">
                  15 rue montesquieu<br />69007 LYON
                </div>
              </div>

              {/* Ouverture (séparateur pointillé à gauche) */}
              <div>
                <div className="font-b text-24">Ouverture</div>
                <div className="font-l lh-160">
                  Lundi – Mercredi → 18h – 00h<br />
                  Jeudi – Samedi → 18h – 01h
                </div>
              </div>

              {/* Contact (pas de bordure à droite globale) */}
              <div>
                <div className="font-b text-24">Contact</div>
                <div className="mb-2 font-l lh-160">
                  <a href="mailto:contact@olmebar.com" className="underline">
                    contact@olmebar.com
                  </a>
                  <br />
                  06 00 00 00 00
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* contenu après le hero */}
      <section className="px-6 py-24 text-o-green">
        {/* … */}
      </section>
    </>
  );
}
