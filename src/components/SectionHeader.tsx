"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  /** Controles propios del layout, como las flechas del carrusel. */
  actions?: ReactNode;
}

/**
 * El encabezado de cualquier seccion de la portada.
 *
 * Existe para que el carrusel y la grilla no tengan cada uno su version del
 * mismo titulo: si el ritmo tipografico se define en un solo lugar, las
 * secciones se leen como una misma pagina y no como bloques pegados.
 */
export function SectionHeader({ title, subtitle, actions }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="display text-5xl text-text sm:text-6xl"
        >
          {title}
        </motion.h2>
        <p className="mt-2 max-w-md text-sm text-muted">{subtitle}</p>
      </div>
      {actions}
    </div>
  );
}
