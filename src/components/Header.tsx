"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { NAV_LINKS } from "@/config/sections";
import { BrandLogo } from "@/components/BrandLogo";
import { SOCIAL_LINKS, SocialIcon } from "@/components/SocialLinks";
import { siteConfig } from "@/lib/seo";

const TOP_ZONE = 140;
const THRESHOLD = 8;

const easeOut = [0.16, 1, 0.3, 1] as const;

const listVariants = {
  closed: {},
  open: {
    transition: { staggerChildren: 0.055, delayChildren: 0.12 },
  },
};

const itemVariants = {
  closed: { opacity: 0, x: -28 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-5" aria-hidden>
      <motion.span
        className="absolute left-0 top-0 h-[1.5px] w-full origin-center bg-current"
        animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.35, ease: easeOut }}
      />
      <motion.span
        className="absolute left-0 top-[6px] h-[1.5px] w-full bg-current"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.22, ease: easeOut }}
      />
      <motion.span
        className="absolute left-0 top-[12px] h-[1.5px] w-full origin-center bg-current"
        animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.35, ease: easeOut }}
      />
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [cartCount] = useState(2);
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();
  const previous = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - previous.current;
    if (Math.abs(delta) < THRESHOLD) return;
    previous.current = y;
    if (open) return;
    setHidden(y > TOP_ZONE && delta > 0);
  });

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const goToSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    }, open ? 340 : 0);
  };

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.28, ease: easeOut }}
        className={`safe-top sticky top-0 border-b border-line/80 bg-bg/90 backdrop-blur-xl ${
          open ? "z-[60]" : "z-40"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-2 lg:px-6">
          <motion.button
            type="button"
            className="relative grid h-11 w-11 shrink-0 place-items-center border border-line/80 text-chrome touch-manipulation transition hover:border-accent hover:text-accent lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            whileTap={{ scale: 0.94 }}
          >
            <motion.span
              className="pointer-events-none absolute inset-0 bg-white/[0.04]"
              animate={open ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
            <HamburgerIcon open={open} />
          </motion.button>

          <div className="flex min-w-0 flex-1 justify-center lg:flex-none lg:justify-start">
            <BrandLogo size="sm" className="sm:hidden" priority />
            <span className="hidden sm:inline-flex">
              <BrandLogo size="md" priority />
            </span>
          </div>

          <nav
            className="hidden max-w-[min(52vw,34rem)] items-center gap-3 overflow-x-auto xl:gap-5 lg:flex"
            aria-label="Categorías"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={goToSection(link.id)}
                className="shrink-0 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] text-muted transition hover:text-accent xl:text-[11px] xl:tracking-[0.16em]"
              >
                {link.navLabel}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <button
              type="button"
              className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-muted transition hover:text-text md:inline"
              aria-label="Buscar"
            >
              Buscar
            </button>
            <button
              type="button"
              className="relative min-h-10 border border-line px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] touch-manipulation transition hover:border-accent hover:text-accent sm:min-h-0 sm:px-3 sm:py-2 sm:text-[11px]"
              aria-label="Carrito"
            >
              Bolsa
              <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-white to-[#b0b0b0] text-[10px] font-bold text-black">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav-root"
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <motion.button
              type="button"
              aria-label="Cerrar menú"
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
              initial={{ x: "-105%" }}
              animate={{ x: 0 }}
              exit={{ x: "-105%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34, mass: 0.85 }}
              className="safe-top safe-bottom absolute inset-y-0 left-0 flex w-[min(90vw,22.5rem)] flex-col overflow-hidden border-r border-white/10 bg-bg shadow-[20px_0_60px_rgba(0,0,0,0.55)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -left-10 top-24 h-56 w-56 rounded-full bg-white/[0.06] blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
              />

              <div className="relative flex items-center justify-between gap-3 border-b border-line/70 px-5 py-4 sm:px-6">
                <BrandLogo size="sm" href={null} />
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                  Menú
                </p>
              </div>

              <motion.nav
                className="relative flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-6"
                variants={listVariants}
                initial="closed"
                animate="open"
                aria-label="Categorías"
              >
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
                  Colecciones
                </p>
                <ul className="space-y-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li key={link.id} variants={itemVariants}>
                      <a
                        href={`#${link.id}`}
                        onClick={goToSection(link.id)}
                        className="group flex items-baseline justify-between gap-3 border-b border-line/50 py-3 transition"
                      >
                        <span className="display text-[2rem] leading-none tracking-wide text-text transition group-hover:text-accent sm:text-[2.35rem]">
                          {link.navLabel}
                        </span>
                        <span className="text-[10px] tabular-nums text-muted transition group-hover:text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.div variants={itemVariants} className="mt-8 space-y-3">
                  <a
                    href="#tienda-video"
                    onClick={goToSection("tienda-video")}
                    className="cta-chrome display block w-full px-4 py-3.5 text-center text-base leading-tight transition sm:px-5 sm:text-lg"
                  >
                    Visítanos en nuestro local
                  </a>
                  <a
                    href={siteConfig.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="display block w-full border border-chrome/35 px-5 py-3.5 text-center text-lg text-text transition hover:border-accent hover:text-accent"
                  >
                    WhatsApp {siteConfig.phoneDisplay}
                  </a>
                </motion.div>
              </motion.nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4, ease: easeOut }}
                className="relative border-t border-line/70 px-5 py-4 sm:px-6"
              >
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                  Redes
                </p>
                <div className="flex flex-wrap gap-2">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid h-10 w-10 place-items-center border border-line text-chrome transition hover:border-accent hover:text-accent"
                    >
                      <SocialIcon id={social.id} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
