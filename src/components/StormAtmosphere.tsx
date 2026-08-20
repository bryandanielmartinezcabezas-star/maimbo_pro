"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  kind: "float" | "burst" | "spark";
};

type BoltSeg = { x: number; y: number };

type Bolt = {
  main: BoltSeg[];
  branches: BoltSeg[][];
  life: number;
  maxLife: number;
  width: number;
};

const SILVER = "210, 210, 210";
const WHITE = "255, 255, 255";
const STEEL = "150, 150, 150";

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pickChrome() {
  const n = Math.random();
  if (n > 0.66) return WHITE;
  if (n > 0.33) return SILVER;
  return STEEL;
}

function buildBolt(w: number, h: number): Bolt {
  const startX = rand(w * 0.1, w * 0.9);
  const endX = startX + rand(-w * 0.15, w * 0.15);
  const startY = rand(-20, h * 0.08);
  const endY = rand(h * 0.45, h * 0.95);
  const segments = Math.floor(rand(10, 18));
  const main: BoltSeg[] = [];
  const branches: BoltSeg[][] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const jagged = Math.sin(t * Math.PI * rand(4, 9)) * rand(8, 28);
    const x = startX + (endX - startX) * t + jagged + rand(-18, 18);
    const y = startY + (endY - startY) * t;
    main.push({ x, y });

    if (i > 2 && i < segments - 1 && Math.random() > 0.62) {
      const branch: BoltSeg[] = [{ x, y }];
      let bx = x;
      let by = y;
      const len = Math.floor(rand(3, 7));
      const dir = Math.random() > 0.5 ? 1 : -1;
      for (let j = 0; j < len; j++) {
        bx += dir * rand(10, 36);
        by += rand(12, 34);
        branch.push({ x: bx, y: by });
      }
      branches.push(branch);
    }
  }

  return {
    main,
    branches,
    life: rand(8, 14),
    maxLife: 14,
    width: rand(1.4, 2.8),
  };
}

function drawPath(
  ctx: CanvasRenderingContext2D,
  points: BoltSeg[],
  width: number,
  alpha: number,
  glow: boolean,
) {
  if (points.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (glow) {
    ctx.shadowBlur = 22;
    ctx.shadowColor = "rgba(230, 230, 230, 0.9)";
  }
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, alpha + 0.25)})`;
  ctx.lineWidth = width * 0.35;
  ctx.shadowBlur = glow ? 10 : 0;
  ctx.stroke();
  ctx.shadowBlur = 0;
}

export function StormAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let bolts: Bolt[] = [];
    let raf = 0;
    let lastBurst = 0;
    let lastStrike = 0;
    let nextStrikeIn = rand(1800, 4200);
    let running = true;
    let flashValue = 0;

    const isMobile = () => window.innerWidth < 768;
    const floatCap = () => (isMobile() ? 28 : 70);
    const rainCount = () => (isMobile() ? 10 : 28);

    const setFlashDom = (v: number) => {
      if (flashRef.current) flashRef.current.style.opacity = String(v);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnFloat = (count: number) => {
      for (let i = 0; i < count; i++) {
        particles.push({
          x: rand(0, window.innerWidth),
          y: rand(0, window.innerHeight),
          vx: rand(-0.18, 0.18),
          vy: rand(-0.28, -0.04),
          life: rand(180, 420),
          maxLife: 420,
          size: rand(1, 2.6),
          color: pickChrome(),
          kind: "float",
        });
      }
    };

    const explode = (x: number, y: number, count = 22) => {
      for (let i = 0; i < count; i++) {
        const angle = rand(0, Math.PI * 2);
        const speed = rand(0.5, 2.4);
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: rand(30, 80),
          maxLife: 80,
          size: rand(1.1, 3.4),
          color: pickChrome(),
          kind: Math.random() > 0.5 ? "burst" : "spark",
        });
      }
    };

    const strike = (x?: number) => {
      const bolt = buildBolt(window.innerWidth, window.innerHeight);
      if (typeof x === "number") {
        const shift = x - bolt.main[0].x;
        bolt.main = bolt.main.map((p) => ({ x: p.x + shift, y: p.y }));
        bolt.branches = bolt.branches.map((br) =>
          br.map((p) => ({ x: p.x + shift, y: p.y })),
        );
      }
      bolts.push(bolt);
      flashValue = Math.max(flashValue, rand(0.35, 0.7));
      setFlashDom(flashValue);

      const tip = bolt.main[bolt.main.length - 1];
      explode(tip.x, tip.y, Math.floor(rand(18, 34)));

      if (Math.random() > 0.55) {
        window.setTimeout(() => {
          if (!running) return;
          bolts.push({
            ...buildBolt(window.innerWidth, window.innerHeight),
            main: bolt.main.map((p) => ({
              x: p.x + rand(-8, 8),
              y: p.y + rand(-4, 4),
            })),
            life: 6,
            maxLife: 6,
            width: bolt.width * 0.7,
          });
          flashValue = Math.max(flashValue, 0.45);
          setFlashDom(flashValue);
        }, rand(60, 140));
      }
    };

    const tick = (time: number) => {
      if (!running) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      if (time - lastStrike > nextStrikeIn) {
        strike();
        lastStrike = time;
        nextStrikeIn = rand(2200, 5500);
      }

      if (time - lastBurst > rand(2800, 4800)) {
        explode(rand(w * 0.2, w * 0.8), rand(h * 0.2, h * 0.7), 14);
        lastBurst = time;
      }

      if (particles.filter((p) => p.kind === "float").length < floatCap()) {
        spawnFloat(isMobile() ? 1 : 3);
      }

      ctx.strokeStyle = "rgba(200,200,200,0.045)";
      ctx.lineWidth = 1;
      const rains = rainCount();
      for (let i = 0; i < rains; i++) {
        const rx = ((time * 0.25 + i * 97) % (w + 40)) - 20;
        const ry = ((time * 0.9 + i * 53) % (h + 80)) - 40;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 2, ry + 18);
        ctx.stroke();
      }

      bolts = bolts.filter((b) => b.life > 0);
      for (const bolt of bolts) {
        bolt.life -= 1;
        const alpha = Math.max(0, bolt.life / bolt.maxLife);
        drawPath(ctx, bolt.main, bolt.width, alpha, true);
        for (const br of bolt.branches) {
          drawPath(ctx, br, bolt.width * 0.55, alpha * 0.75, true);
        }
      }

      particles = particles.filter((p) => p.life > 0);
      for (const p of particles) {
        p.life -= 1;
        p.x += p.vx;
        p.y += p.vy;

        if (p.kind === "burst" || p.kind === "spark") {
          p.vx *= 0.975;
          p.vy *= 0.975;
          p.vy += 0.015;
        } else {
          p.x += Math.sin((p.y + time * 0.02) * 0.01) * 0.18;
          if (p.y < -10) {
            p.y = h + 10;
            p.x = rand(0, w);
          }
        }

        const alpha =
          p.kind === "float"
            ? 0.12 + 0.32 * Math.max(0, Math.min(1, p.life / 120))
            : Math.max(0, p.life / p.maxLife);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
        ctx.shadowBlur = p.kind === "spark" ? 14 : p.kind === "burst" ? 10 : 5;
        ctx.shadowColor = `rgba(${p.color}, ${alpha * 0.85})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      if (flashValue > 0.01) {
        flashValue *= 0.86;
        setFlashDom(flashValue);
      } else if (flashValue !== 0) {
        flashValue = 0;
        setFlashDom(0);
      }

      raf = window.requestAnimationFrame(tick);
    };

    resize();
    spawnFloat(floatCap());
    if (!isMobile()) strike(window.innerWidth * 0.55);
    else {
      nextStrikeIn = rand(3500, 7000);
    }
    lastStrike = performance.now();
    raf = window.requestAnimationFrame(tick);

    const onResize = () => resize();
    const onClick = (e: MouseEvent) => {
      strike(e.clientX);
      explode(e.clientX, e.clientY, 20);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("click", onClick);

    /* La tormenta solo corre mientras se la ve. Apenas el usuario baja del
       hero se corta el bucle: deja de gastar bateria en un Android de gama
       media y, sobre todo, el resto de la pagina queda quieto para mirar
       producto. Al volver arriba se reanuda. */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          lastStrike = performance.now();
          raf = window.requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && running) {
          running = false;
          window.cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    return () => {
      running = false;
      observer.disconnect();
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
      />
      <div
        ref={flashRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          opacity: 0,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.55), rgba(200,200,200,0.12) 40%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
