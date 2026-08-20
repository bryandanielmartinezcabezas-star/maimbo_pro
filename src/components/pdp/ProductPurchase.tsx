"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/data/catalog";
import { siteConfig } from "@/lib/seo";
import { PaymentQr } from "@/components/pdp/PaymentQr";

/** Marca de QR dibujada a mano: son cuatro rectangulos, no hace falta libreria. */
function QrGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zM13 3h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zM13 13h3v3h-3v-3zm5 0h3v3h-3v-3zm-5 5h3v3h-3v-3zm5 0h3v3h-3v-3z" />
    </svg>
  );
}

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
  const [qrOpen, setQrOpen] = useState(false);

  const total = price * qty;

  /** Sin talla no se puede despachar, asi que se avisa antes de seguir. */
  const requireSize = () => {
    if (size) return true;
    setWarning("Elegí una talla para continuar.");
    return false;
  };

  const addToCart = () => {
    if (!requireSize()) return;
    setWarning("");
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2600);
  };

  const payWithQr = () => {
    if (!requireSize()) return;
    setWarning("");
    setQrOpen(true);
  };

  /* En Bolivia el pedido se cierra por WhatsApp, asi que el mensaje va armado
     con la pieza, la talla y la cantidad: el vendedor no tiene que preguntar. */
  const whatsappHref = `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hola MAINBO, quiero ${qty} x ${name}${size ? ` talla ${size}` : ""}. ¿Está disponible?`,
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

        {/* El QR es la forma en que se cobra en Bolivia, asi que va arriba del
            resto y no escondido como una alternativa. */}
        <button
          type="button"
          onClick={payWithQr}
          className="display flex items-center justify-center gap-3 border border-accent/50 py-4 text-xl text-accent transition hover:bg-accent hover:text-black"
        >
          <QrGlyph />
          Pago por QR
        </button>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="display border border-line py-4 text-center text-xl text-text transition hover:border-accent hover:text-accent"
        >
          Consultar por WhatsApp
        </a>
      </div>

      <PaymentQr
        open={qrOpen}
        onClose={() => setQrOpen(false)}
        productName={name}
        size={size}
        qty={qty}
        total={total}
      />

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
