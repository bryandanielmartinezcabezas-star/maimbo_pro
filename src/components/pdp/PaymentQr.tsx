"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";
import { formatPrice } from "@/data/catalog";
import { siteConfig } from "@/lib/seo";

interface PaymentQrProps {
  open: boolean;
  onClose: () => void;
  productName: string;
  size: string;
  qty: number;
  total: number;
}

/** Bancos bolivianos que leen QR Simple, el estandar del Banco Central. */
const BANCOS = ["Banco Unión", "BNB", "Mercantil Santa Cruz", "BCP", "Ganadero"];

/**
 * Pago por QR, que es como se cobra en Bolivia.
 *
 * El codigo que se muestra lleva el pedido armado a WhatsApp, asi que en la
 * demo se escanea con cualquier celular y funciona de verdad. En la tienda real
 * este lugar lo ocupa el QR Simple del banco de MAINBO, que ya cobra a su
 * cuenta: no hace falta pasarela ni comision de terceros.
 */
export function PaymentQr({ open, onClose, productName, size, qty, total }: PaymentQrProps) {
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  /** Referencia corta para que el vendedor ubique el pago en su extracto. */
  const reference = `MB-${Date.now().toString().slice(-6)}`;

  const orderText = `Hola MAINBO, pagué por QR ${formatPrice(total)} por ${qty} x ${productName}${
    size ? ` talla ${size}` : ""
  }. Referencia ${reference}. Adjunto comprobante.`;

  const whatsappHref = `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(orderText)}`;

  useEffect(() => {
    if (!open) return;
    setConfirmed(false);

    QRCode.toDataURL(whatsappHref, {
      width: 520,
      margin: 1,
      errorCorrectionLevel: "M",
      color: { dark: "#0a0a0a", light: "#ffffff" },
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(""));
    // El QR depende del pedido, y el pedido no cambia mientras el panel esta abierto.
  }, [open, whatsappHref]);

  // Escape cierra, y el fondo no se desplaza mientras el panel esta arriba.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Pago por QR"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-y-auto border border-line bg-bg-elevated"
          >
            <header className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
              <div>
                <h2 className="display text-2xl text-text">Pago por QR</h2>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">
                  Referencia {reference}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="border border-line px-3 py-1.5 text-sm text-muted transition hover:border-accent hover:text-accent"
              >
                ✕
              </button>
            </header>

            <div className="flex flex-col gap-5 px-6 py-6">
              {/* El monto manda: es lo primero que mira quien va a pagar. */}
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Monto a pagar</p>
                <p className="display mt-1 text-4xl text-text">{formatPrice(total)}</p>
              </div>

              <div className="mx-auto w-full max-w-[260px] bg-white p-3">
                {qrDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={qrDataUrl} alt={`Código QR de pago por ${formatPrice(total)}`} className="w-full" />
                ) : (
                  <div className="grid aspect-square place-items-center text-sm text-black/50">
                    Generando código…
                  </div>
                )}
              </div>

              <p className="text-center text-sm text-muted">
                Escaneá con la app de tu banco
              </p>

              <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] text-muted">
                {BANCOS.map((banco) => (
                  <li key={banco}>{banco}</li>
                ))}
              </ul>

              <dl className="divide-y divide-line border-y border-line text-sm">
                <div className="flex justify-between gap-4 py-2.5">
                  <dt className="text-muted">Producto</dt>
                  <dd className="text-right text-text">{productName}</dd>
                </div>
                {size && (
                  <div className="flex justify-between gap-4 py-2.5">
                    <dt className="text-muted">Talla</dt>
                    <dd className="text-text">{size}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-4 py-2.5">
                  <dt className="text-muted">Cantidad</dt>
                  <dd className="text-text">{qty}</dd>
                </div>
              </dl>

              {confirmed ? (
                <div className="border border-accent/40 bg-accent/10 px-4 py-4 text-center text-sm text-text">
                  <p className="font-semibold">Pago registrado</p>
                  <p className="mt-1 text-muted">
                    Mandá el comprobante por WhatsApp y preparamos el pedido.
                  </p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="display mt-3 inline-block border border-line px-5 py-2.5 text-base text-text transition hover:border-accent hover:text-accent"
                  >
                    Enviar comprobante
                  </a>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmed(true)}
                  className="cta-chrome display py-3.5 text-lg"
                >
                  Ya pagué
                </button>
              )}

              <p className="text-center text-[11px] leading-relaxed text-muted">
                Prototipo: el cobro no es real. En la tienda va el QR Simple del banco
                de MAINBO y el dinero entra directo a su cuenta.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
