import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-o-green text-o-sand">
      {/* MOBILE + TABLET */}
      <div className="md:hidden lg:hidden">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 py-12">
          {/* Logo (réduit) */}
          <div className="flex items-center">
            <img
              src="/logo/logo-olme.svg"
              alt="Olmé"
              className="h-10 md:h-12 w-auto"
              draggable={false}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact seulement */}
            <div className="border-t border-dotted border-current pt-4">
              <div className="font-b text-[18px] md:text-[20px] mb-2">Contact</div>
              <div className="text-[12px] md:text-[14px]">
                <a href="mailto:contact@olmebar.com" className="underline">
                  contact@olmebar.com
                </a>
                <br />
                06 00 00 00 00
                <br />
             <Link href="https://www.instagram.com/olme.bar/" className="hover:underline">@olme.bar</Link>

              </div>
            </div>

            {/* Navigation */}
            <nav className="border-t border-dotted border-current pt-4 md:text-right">
              <ul className="space-y-1 text-[12px] md:text-[14px]">
                <li><Link href="#mixologie" className="hover:underline">Cocktails</Link></li>
                <li><Link href="#vins" className="hover:underline">Vins &amp; softs</Link></li>
                <li><Link href="#food" className="hover:underline">Brut Food</Link></li>
                <li><Link href="/mentions-legales" className="hover:underline">Mentions légales</Link></li>
                
              </ul>
            </nav>
          </div>

          {/* Bas de page */}
          <div className="mt-8 text-[12px] md:text-[14px] opacity-80">
            © {new Date().getFullYear()} Olmé — Tous droits réservés.
          </div>
        </div>
      </div>

      {/* DESKTOP (≥ lg) : INCHANGÉ */}
      <div className="hidden lg:block">
        <div className="mx-auto max-w-[1280px] px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
            {/* Logo rouge à gauche */}
            <div className="md:col-span-1 mt-6">
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
             <div><Link href="https://www.instagram.com/olme.bar/" className="hover:underline">@olme.bar</Link></div>
              </div>
              <nav className="border-t border-dotted border-current pt-4 md:text-right">
                <ul className="space-y-1">
                  <li><Link href="#mixologie">Cocktails</Link></li>
                  <li><Link href="#vins">Vins & softs</Link></li>
                  <li><Link href="#food">Brut Food</Link></li>
                  <li><Link href="/mentions-legales">Mentions légales</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
