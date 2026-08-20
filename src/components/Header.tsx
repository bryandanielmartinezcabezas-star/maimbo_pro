"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/data/catalog";
import { BrandLogo } from "@/components/BrandLogo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [cartCount] = useState(2);

  return (
    <header className="safe-top sticky top-0 z-40 border-b border-line/80 bg-bg/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-4 lg:px-6">
        <button
          type="button"
          className="display shrink-0 text-2xl tracking-widest text-chrome lg:hidden"
          aria-label="Abrir menú"
          onClick={() => setOpen(true)}
        >
          ≡
        </button>

        <div className="flex min-w-0 flex-1 justify-center lg:flex-none lg:justify-start">
          <BrandLogo size="sm" className="sm:hidden" priority />
          <span className="hidden sm:inline-flex">
            <BrandLogo size="md" priority />
          </span>
        </div>

        <nav className="hidden items-center gap-4 xl:gap-5 lg:flex" aria-label="Categorías">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`#${cat.toLowerCase()}`}
              className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted transition hover:text-accent xl:text-[11px] xl:tracking-[0.16em]"
            >
              {cat}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-muted transition hover:text-text md:inline"
            aria-label="Buscar"
          >
            Buscar
          </button>
          <button
            type="button"
            className="relative border border-line px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition hover:border-accent hover:text-accent sm:px-3 sm:py-2 sm:text-[11px]"
            aria-label="Carrito"
          >
            Bolsa
            <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-white to-[#b0b0b0] text-[10px] font-bold text-black">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="safe-top h-full w-[min(86vw,22rem)] border-r border-line bg-bg p-5 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8 flex items-center justify-between gap-3">
                <BrandLogo size="sm" href={null} />
                <button type="button" onClick={() => setOpen(false)} className="text-sm text-muted">
                  Cerrar
                </button>
              </div>
              <div className="flex flex-col gap-3 overflow-y-auto pb-10">
                {categories.map((cat) => (
                  <a
                    key={cat}
                    href={`#${cat.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="display text-3xl tracking-wide text-text transition hover:text-accent sm:text-4xl"
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
