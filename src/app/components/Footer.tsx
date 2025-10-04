import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-o-green text-o-sand">
      <div className="mx-auto max-w-[1280px] px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
          {/* Logo rouge à gauche */}
          <div className="md:col-span-1">
            <img
              src="/logo/logo-olme.svg"
              alt="Olmé"
              className="h-14 w-auto"
              draggable={false}
            />
          </div>

          <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="border-t border-dotted border-current pt-4">
              <div className="font-b text-24 mb-2">Adresse</div>
              <div>15 rue montesquieu</div>
              <div>69007 LYON</div>
            </div>
            <div className="border-t border-dotted border-current pt-4">
              <div className="font-b text-24 mb-2">Ouverture</div>
              <div>Lundi – Mercredi → 18h – 00h</div>
              <div>Jeudi – Samedi → 18h – 01h</div>
            </div>
            <div className="border-t border-dotted border-current pt-4">
              <div className="font-b text-24 mb-2">Contact</div>
              <div>
                <a href="mailto:contact@olmebar.com" className="underline">
                  contact@olmebar.com
                </a>
              </div>
              <div>06 00 00 00 00</div>
            </div>
            <nav className="border-t border-dotted border-current pt-4 md:text-right">
              <ul className="space-y-1">
                <li><Link href="#mixologie">Mixologie</Link></li>
                <li><Link href="#vins">Vins & softs</Link></li>
                <li><Link href="#food">Brut Food</Link></li>
                <li><Link href="#infos">Infos pratiques</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
