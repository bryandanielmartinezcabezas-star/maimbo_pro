"use client";

import Image from "next/image";
import { useId } from "react";
import { motion } from "framer-motion";

type BrandLogoProps = {
  size?: "sm" | "md" | "lg" | "hero";
  href?: string | null;
  className?: string;
  priority?: boolean;
};

const sizes = {
  sm: { width: 120, height: 44, className: "h-8 w-auto max-w-[42vw] object-contain sm:h-10", pad: "px-2.5 py-1" },
  md: { width: 200, height: 72, className: "h-10 w-auto max-w-[70vw] object-contain sm:h-12", pad: "px-3 py-1.5 sm:px-4 sm:py-2" },
  lg: { width: 320, height: 120, className: "h-14 w-auto max-w-[85vw] object-contain sm:h-20", pad: "px-4 py-2 sm:px-5 sm:py-2.5" },
  hero: { width: 560, height: 200, className: "h-20 w-auto max-w-[90vw] object-contain sm:h-36 md:h-44", pad: "px-4 py-2 sm:px-6 sm:py-3" },
};

const sparks = [
  { x: "8%", y: "28%", delay: 0 },
  { x: "22%", y: "72%", delay: 0.4 },
  { x: "48%", y: "18%", delay: 0.8 },
  { x: "68%", y: "78%", delay: 1.1 },
  { x: "88%", y: "35%", delay: 1.5 },
  { x: "78%", y: "58%", delay: 1.9 },
];

export function BrandLogo({
  size = "md",
  href = "#inicio",
  className = "",
  priority = false,
}: BrandLogoProps) {
  const s = sizes[size];
  const intense = size === "lg" || size === "hero" || size === "md";
  const gid = useId().replace(/:/g, "");
  const arcGrad = `arcGrad-${gid}`;

  const content = (
    <motion.span
      className={`logo-wrap relative inline-flex items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.86, y: 12 }}
      {...(priority
        ? { animate: { opacity: 1, scale: 1, y: 0 } }
        : {
            whileInView: { opacity: 1, scale: 1, y: 0 },
            viewport: { once: true },
          })}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.06,
        rotateX: 6,
        rotateY: -8,
        transition: { type: "spring", stiffness: 260, damping: 18 },
      }}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
    >
      <motion.span
        className={`logo-plate absolute inset-0 rounded-full ${s.pad}`}
        aria-hidden
        animate={{
          boxShadow: [
            "0 0 0 1px rgba(255,255,255,0.08), 0 0 20px rgba(255,255,255,0.05)",
            "0 0 0 1px rgba(255,255,255,0.22), 0 0 40px rgba(255,255,255,0.18)",
            "0 0 0 1px rgba(255,255,255,0.08), 0 0 20px rgba(255,255,255,0.05)",
          ],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.span
        className="logo-aura absolute inset-[-28%] rounded-full"
        aria-hidden
        animate={{
          opacity: [0.2, 0.85, 0.35, 0.9, 0.2],
          scale: [0.88, 1.12, 0.95, 1.18, 0.88],
        }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <span className="logo-ring" aria-hidden />
      <span className="logo-ring" style={{ animationDelay: "0.7s" }} aria-hidden />
      <span className="logo-ring logo-ring-fast" style={{ animationDelay: "1.4s" }} aria-hidden />

      {intense && (
        <svg
          className="logo-arcs pointer-events-none absolute inset-[-18%] h-[136%] w-[136%]"
          viewBox="0 0 200 80"
          aria-hidden
        >
          <motion.path
            d="M10 18 L28 40 L18 40 L42 72"
            fill="none"
            stroke={`url(#${arcGrad})`}
            strokeWidth="1.4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 2.2, ease: "easeOut" }}
          />
          <motion.path
            d="M190 20 L168 38 L178 38 L152 70"
            fill="none"
            stroke={`url(#${arcGrad})`}
            strokeWidth="1.4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: 1.05,
              repeat: Infinity,
              repeatDelay: 2.4,
              delay: 1.1,
              ease: "easeOut",
            }}
          />
          <motion.path
            d="M55 8 L70 28 L62 28 L84 55"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1"
            strokeLinecap="round"
            animate={{ pathLength: [0, 1, 0], opacity: [0, 0.9, 0] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              repeatDelay: 3.1,
              delay: 0.5,
            }}
          />
          <motion.path
            d="M145 10 L128 30 L136 30 L112 58"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1"
            strokeLinecap="round"
            animate={{ pathLength: [0, 1, 0], opacity: [0, 0.9, 0] }}
            transition={{
              duration: 0.75,
              repeat: Infinity,
              repeatDelay: 2.8,
              delay: 1.6,
            }}
          />
          <defs>
            <linearGradient id={arcGrad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#9a9a9a" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {sparks.map((spark, i) => (
        <motion.span
          key={i}
          className="logo-spark absolute h-1 w-1 rounded-full bg-white"
          style={{ left: spark.x, top: spark.y }}
          aria-hidden
          animate={{
            opacity: [0, 1, 0],
            scale: [0.4, 1.8, 0.2],
            y: [0, -8, 4],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 1.8 + i * 0.15,
            delay: spark.delay,
            ease: "easeOut",
          }}
        />
      ))}

      <motion.span
        className={`relative z-10 inline-flex overflow-hidden rounded-full ${s.pad}`}
        animate={{
          y: [0, -5, 0],
          filter: [
            "brightness(1) contrast(1)",
            "brightness(1.25) contrast(1.08)",
            "brightness(1) contrast(1)",
          ],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/logo-maimbo.png"
          alt="MAIMBO"
          width={s.width}
          height={s.height}
          priority={priority}
          className={`${s.className} logo-shine relative z-[1] object-contain`}
        />
        <span className="logo-shimmer" aria-hidden />
        <span className="logo-shimmer logo-shimmer-slow" aria-hidden />
        <span className="logo-beam" aria-hidden />
        <motion.span
          className="logo-flash absolute inset-0 rounded-full"
          aria-hidden
          animate={{ opacity: [0, 0, 0.55, 0, 0.35, 0, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.55, 0.58, 0.62, 0.66, 0.7, 1] }}
        />
      </motion.span>
    </motion.span>
  );

  if (!href) return content;

  return (
    <a href={href} className="inline-flex" aria-label="MAIMBO inicio">
      {content}
    </a>
  );
}
