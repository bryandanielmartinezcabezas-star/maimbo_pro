"use client";

import { categories } from "@/data/catalog";
import { BrandLogo } from "@/components/BrandLogo";
import { SOCIAL_LINKS, SocialIcon } from "@/components/SocialLinks";

export function Footer() {
  return (
    <footer id="footer" className="safe-bottom bg-black pt-10 pb-8 sm:pt-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:gap-10 sm:px-5 md:grid-cols-[1.25fr_1fr_1.15fr] lg:gap-12 lg:px-6">
        <div className="min-w-0">
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
              className="w-full min-w-0 border border-line bg-bg-elevated px-3 py-3 text-sm text-text outline-none placeholder:text-muted focus:border-accent"
            />
            <button
              type="submit"
              className="cta-chrome display w-full shrink-0 px-4 py-3 text-lg transition sm:w-auto"
            >
              Unirme
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:gap-10 md:contents">
          <div className="min-w-0">
            <p className="display text-xl text-text sm:text-2xl">Shop</p>
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

          <div className="min-w-0 md:col-auto">
            <p className="display text-xl text-text sm:text-2xl">Redes</p>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 border border-transparent px-1.5 py-2 transition hover:border-line hover:bg-white/[0.03] sm:gap-3 sm:px-2"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center border border-line text-chrome transition group-hover:border-accent group-hover:text-accent">
                      <SocialIcon id={social.id} />
                    </span>
                    <span className="min-w-0 flex flex-col gap-0.5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted transition group-hover:text-accent sm:text-[11px] sm:tracking-[0.2em]">
                        {social.label}
                      </span>
                      <span className="truncate text-xs text-chrome transition group-hover:text-white sm:text-sm">
                        {social.handle}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-2 border-t border-line pt-4 text-xs text-muted sm:mt-6 sm:pt-5 sm:text-sm">
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
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-line px-4 pt-6 text-[10px] uppercase tracking-[0.14em] text-muted sm:mt-12 sm:flex-row sm:items-center sm:px-5 sm:text-[11px] sm:tracking-[0.16em] lg:px-6">
        <p>© {new Date().getFullYear()} MAIMBO · Vende Estilo</p>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={`bar-${social.id}`}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              title={social.label}
              className="grid h-10 w-10 place-items-center border border-line text-chrome transition hover:border-accent hover:text-accent sm:h-9 sm:w-9"
            >
              <SocialIcon id={social.id} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
