"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/data/catalog";
import { siteConfig } from "@/lib/seo";

interface ProductPurchaseProps {
  name: string;
  price: number;
  sizes: string[];
  /** Talla unica: no tiene sentido pedir que elija. */
  singleSize?: boolean;
}

const MAX_QTY = 10;

/**
 * Lo que decide la compra: talla, cantidad y el boton.
 *
 * Vive aparte de la galeria porque cambia por interaccion del usuario, mientras
 * que la galeria solo muestra. Separarlos deja la ficha entera renderizada en
 * el servidor salvo estas dos piezas.
 */
export function ProductPurchase({ name, price, sizes, singleSize = false }: ProductPurchaseProps) {
  const [size, setSize] = useState(singleSize ? sizes[0] : "");
  const [qty, setQty] = useState(1);
  const [warning, setWarning] = useState("");
  const [added, setAdded] = useState(false);

  const total = price * qty;

  const addToCart = () => {
    if (!size) {
      setWarning("Elegí una talla para continuar.");
      return;
    }
    setWarning("");
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2600);
  };

  /* En Bolivia el pedido se cierra por WhatsApp, asi que el mensaje va armado
     con la pieza, la talla y la cantidad: el vendedor no tiene que preguntar. */
  const whatsappHref = `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hola MAIMBO, quiero ${qty} x ${name}${size ? ` talla ${size}` : ""}. ¿Está disponible?`,
  )}`;

  return (
    <div className="flex flex-col gap-6">
      {/* Tallas */}
      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            {singleSize ? "Presentación" : "Talla"}
          </span>
          {!singleSize && !size && (
            <span className="text-[11px] text-muted">Elegí una</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setSize(s);
                setWarning("");
              }}
              aria-pressed={size === s}
              className={`min-w-[3.25rem] border px-4 py-3 text-sm transition ${
                size === s
                  ? "border-accent bg-accent text-black"
                  : "border-line text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {warning && <p className="mt-2 text-xs text-danger">{warning}</p>}
      </div>

      {/* Cantidad */}
      <div>
        <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          Cantidad
        </span>
        <div className="inline-flex items-center border border-line">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty === 1}
            aria-label="Quitar una unidad"
            className="px-4 py-3 text-lg text-muted transition hover:text-accent disabled:opacity-30"
          >
            −
          </button>
          <span className="min-w-[3rem] text-center text-sm font-semibold">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
            disabled={qty === MAX_QTY}
            aria-label="Agregar una unidad"
            className="px-4 py-3 text-lg text-muted transition hover:text-accent disabled:opacity-30"
          >
            +
          </button>
        </div>
        {qty > 1 && (
          <p className="mt-2 text-xs text-muted">
            Total: <span className="text-chrome">{formatPrice(total)}</span>
          </p>
        )}
      </div>

      {/* Acciones */}
      <div className="flex flex-col gap-3">
        <button type="button" onClick={addToCart} className="cta-chrome display py-4 text-xl">
          Añadir al carrito
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="display border border-line py-4 text-center text-xl text-text transition hover:border-accent hover:text-accent"
        >
          Comprar por WhatsApp
        </a>
      </div>

      <AnimatePresence>
        {added && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-text"
          >
            Agregado: {qty} × {name}
            {size ? ` · talla ${size}` : ""}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
