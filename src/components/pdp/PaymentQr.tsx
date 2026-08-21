"use client";

import { useCallback, useEffect, useState } from "react";
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

const whatsappLink = (text: string) =>
  `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

/**
 * Pago por QR, que es como se cobra en Bolivia.
 *
 * El codigo lleva el pedido armado a WhatsApp, asi que en la demo se escanea
 * con cualquier celular y funciona. En la tienda real este lugar lo ocupa el QR
 * Simple del banco de MAINBO, que cobra directo a su cuenta.
 */
export function PaymentQr({ open, onClose, productName, size, qty, total }: PaymentQrProps) {
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  /* La referencia se fija al abrir el panel y no se vuelve a calcular.
     Derivarla de la hora en cada render hacia que cambiara sola, y como el
     codigo depende de ella el efecto se disparaba sin fin: cada vuelta generaba
     un QR nuevo hasta trabar la pestana. */
  const [reference, setReference] = useState("");

  useEffect(() => {
    if (!open) return;

    setConfirmed(false);
    const nextReference = `MB-${Date.now().toString().slice(-6)}`;
    setReference(nextReference);

    const text = `Hola MAINBO, pagué por QR ${formatPrice(total)} por ${qty} x ${productName}${
      size ? ` talla ${size}` : ""
    }. Referencia ${nextReference}. Adjunto comprobante.`;

    let cancelled = false;
    QRCode.toDataURL(whatsappLink(text), {
      width: 560,
      margin: 2,
      errorCorrectionLevel: "M",
      color: { dark: "#0a0a0a", light: "#ffffff" },
    })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl("");
      });

    return () => {
      cancelled = true;
    };
    // Solo valores simples: el efecto corre al abrir o si cambia el pedido.
  }, [open, productName, size, qty, total]);

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

  /** Guardar el codigo sirve para pagar desde otro telefono o mandarlo por chat. */
  const downloadQr = useCallback(() => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `qr-mainbo-${reference || "pago"}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, [qrDataUrl, reference]);

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
                  Referencia {reference || "—"}
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
                  <img
                    src={qrDataUrl}
                    alt={`Código QR de pago por ${formatPrice(total)}`}
                    className="w-full"
                  />
                ) : (
                  <div className="grid aspect-square place-items-center text-sm text-black/50">
                    Generando código…
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-muted">Escaneá con la app de tu banco</p>
                <button
                  type="button"
                  onClick={downloadQr}
                  disabled={!qrDataUrl}
                  className="border border-line px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-muted transition hover:border-accent hover:text-accent disabled:opacity-40"
                >
                  Descargar QR
                </button>
              </div>

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
                /* No se le pide comprobante a quien ya pago: el QR lleva la
                   referencia del pedido, asi que el banco avisa cual se cobro
                   y la tienda lo identifica sola. Pedirle al cliente que mande
                   una captura es trasladarle a el un problema nuestro. */
                <div className="border border-accent/40 bg-accent/10 px-4 py-5 text-center text-sm">
                  <p className="display text-xl text-accent">Pago recibido</p>
                  <p className="mt-2 text-text">
                    Tu pedido {reference} quedó registrado.
                  </p>
                  <p className="mt-1 text-muted">
                    MAINBO ya fue avisado y prepara el envío. No hace falta que mandes nada.
                  </p>
                  <a
                    href={whatsappLink(
                      `Hola MAINBO, consulto por mi pedido ${reference}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-[11px] uppercase tracking-[0.16em] text-muted underline underline-offset-4 transition hover:text-accent"
                  >
                    ¿Algún problema? Escribinos
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
                Prototipo: el cobro no es real. En la tienda va el QR del banco de
                MAINBO, el dinero entra directo a su cuenta y el aviso del pago
                llega solo con esta misma referencia.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
