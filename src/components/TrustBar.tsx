"use client";

import { motion } from "framer-motion";
import { benefits } from "@/data/catalog";

export function TrustBar() {
  return (
    <section className="border-b border-line bg-bg-elevated">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-5">
        {benefits.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            className="bg-bg-elevated px-4 py-5 transition"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text">
              {item.title}
            </p>
            <p className="mt-1 text-xs text-muted">{item.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
