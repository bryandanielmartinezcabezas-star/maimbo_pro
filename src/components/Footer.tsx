"use client";

import { categories } from "@/data/catalog";
import { BrandLogo } from "@/components/BrandLogo";

const socials = [
  {
    label: "Instagram",
    handle: "@maimbo.stre",
    href: "https://www.instagram.com/maimbo.stre",
  },
  {
    label: "WhatsApp",
    handle: "75769315",
    href: "https://wa.me/59175769315",
  },
  {
    label: "TikTok",
    handle: "@maimbo.stre",
    href: "https://www.tiktok.com/@maimbo.stre",
  },
  {
    label: "Facebook",
    handle: "MAIMBO",
    href: "https://www.facebook.com/maimbo.stre",
  },
];

export function Footer() {
  return (
    <footer id="footer" className="safe-bottom bg-black pt-10 pb-8 sm:pt-14">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:gap-10 md:grid-cols-[1.3fr_1fr_1fr] lg:px-6">
        <div>
          <BrandLogo size="md" className="sm:hidden" />
          <span className="hidden sm:inline-flex">
            <BrandLogo size="lg" />
          </span>
          <p className="editorial mt-4 max-w-sm text-base leading-snug text-chrome sm:text-lg">
            MAIMBO <span className="text-accent">|</span> Vende Estilo
          </p>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Local en Sucre — Ostria Reyes 555. Enviamos a todo Bolivia.
          </p>
          <form
            className="mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="sr-only" htmlFor="newsletter">
              Email newsletter
            </label>
            <input
              id="newsletter"
              type="email"
              required
              placeholder="Tu email para drops"
              className="w-full border border-line bg-bg-elevated px-3 py-3 text-sm text-text outline-none placeholder:text-muted focus:border-accent"
            />
            <button
              type="submit"
              className="cta-chrome display shrink-0 px-4 py-3 text-lg transition"
            >
              Unirme
            </button>
          </form>
        </div>

        <div>
          <p className="display text-2xl text-text">Shop</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat}>
                <a href={`#${cat.toLowerCase()}`} className="transition hover:text-accent">
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="display text-2xl text-text">Redes</p>
          <ul className="mt-4 space-y-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-0.5 transition"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted group-hover:text-accent">
                    {social.label}
                  </span>
                  <span className="text-sm text-chrome transition group-hover:text-white">
                    {social.handle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2 border-t border-line pt-5 text-sm text-muted">
            <a href="#" className="block transition hover:text-accent">
              Términos y condiciones
            </a>
            <a href="#" className="block transition hover:text-accent">
              Política de cambios
            </a>
            <a href="#" className="block transition hover:text-accent">
              Privacidad
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-line px-4 pt-6 text-[11px] uppercase tracking-[0.16em] text-muted lg:px-6">
        <p>© {new Date().getFullYear()} MAIMBO · Vende Estilo</p>
        <div className="flex flex-wrap gap-4">
          {socials.map((social) => (
            <a
              key={`bar-${social.label}`}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-accent"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
