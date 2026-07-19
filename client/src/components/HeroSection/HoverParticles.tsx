import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  heat: number;
  seed: number;
  shape: "dot" | "dash" | "star";
};

type Rect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

const HOVER_IDLE_TIMEOUT_MS = 300;
const HOVER_RADIUS = 205;
const HOVER_FADE_OUT_DURATION_MS = 1000;
const HOVER_FADE_IN_EASING = 0.16;
const CONTENT_PARTICLE_GAP = 40;

export default function HoverParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    if (!parent || !ctx) return;

    const canvasEl = canvas;
    const parentEl = parent;
    const context = ctx;
    const contentEls = Array.from(
      parentEl.querySelectorAll<HTMLElement>("[data-particle-safe-zone]"),
    );

    let width = 0;
    let height = 0;
    let frameId = 0;
    let idleTimeoutId = 0;
    let lastFrameTime = 0;

    const mouse = { x: -9999, y: -9999, active: false };
    const hoverPoint = { x: -9999, y: -9999 };
    const particles: Particle[] = [];

    const colors = [
      "#ff671f",
      "#f3c72d",
      "#2bb673",
      "#159bd3",
      "#6172f3",
      "#9b6df3",
      "#e84d9a",
      "#ed3b43",
    ];

    function random(min: number, max: number) {
      return min + Math.random() * (max - min);
    }

    function getContentExclusionRects(): Rect[] {
      const parentRect = parentEl.getBoundingClientRect();

      return contentEls.map((contentEl) => {
        const contentRect = contentEl.getBoundingClientRect();

        return {
          left: contentRect.left - parentRect.left - CONTENT_PARTICLE_GAP,
          right: contentRect.right - parentRect.left + CONTENT_PARTICLE_GAP,
          top: contentRect.top - parentRect.top - CONTENT_PARTICLE_GAP,
          bottom: contentRect.bottom - parentRect.top + CONTENT_PARTICLE_GAP,
        };
      });
    }

    function isInsideRect(x: number, y: number, rect: Rect) {
      return (
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
      );
    }

    function buildParticles() {
      particles.length = 0;

      const gap = width < 700 ? 28 : 34;
      const margin = 24;
      const contentExclusionRects = getContentExclusionRects();

      for (let y = margin; y < height - margin; y += gap) {
        for (let x = margin; x < width - margin; x += gap) {
          const shapes: Particle["shape"][] = ["dot", "dash", "star"];
          const particleX = x + random(-4, 4);
          const particleY = y + random(-4, 4);

          if (
            contentExclusionRects.some((rect) =>
              isInsideRect(particleX, particleY, rect),
            )
          ) {
            continue;
          }

          particles.push({
            x: particleX,
            y: particleY,
            size: random(1.2, 3.4),
            color: colors[Math.floor(Math.random() * colors.length)],
            angle: random(0, Math.PI * 2),
            heat: 0,
            seed: Math.random() * 1000,
            shape: shapes[Math.floor(Math.random() * shapes.length)],
          });
        }
      }
    }

    function resize() {
      const rect = parentEl.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvasEl.width = Math.floor(width * dpr);
      canvasEl.height = Math.floor(height * dpr);
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    }

    function drawStar(size: number) {
      context.beginPath();

      for (let i = 0; i < 10; i++) {
        const radius = i % 2 === 0 ? size : size * 0.25;
        const angle = -Math.PI / 2 + (i * Math.PI) / 5;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;

        if (i === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      }

      context.closePath();
      context.fill();
    }

    function animate(time: number) {
      const deltaTime = lastFrameTime ? time - lastFrameTime : 16.67;
      lastFrameTime = time;

      context.clearRect(0, 0, width, height);
      const fadeOutEasing =
        1 - Math.pow(0.05, deltaTime / HOVER_FADE_OUT_DURATION_MS);

      for (const particle of particles) {
        const hoverDistance = Math.hypot(
          hoverPoint.x - particle.x,
          hoverPoint.y - particle.y,
        );
        const influence = mouse.active
          ? Math.max(0, 1 - hoverDistance / HOVER_RADIUS) ** 2
          : 0;
        const isInsideHoverZone = hoverDistance <= HOVER_RADIUS;
        const shouldFadeSlowly = !mouse.active && isInsideHoverZone;
        const heatEasing =
          influence > particle.heat || !shouldFadeSlowly
            ? HOVER_FADE_IN_EASING
            : fadeOutEasing;

        particle.heat += (influence - particle.heat) * heatEasing;

        const size = particle.size * (1 + particle.heat * 5);
        const shimmerX =
          Math.cos(time * 0.002 + particle.seed) * particle.heat * 3;
        const shimmerY =
          Math.sin(time * 0.0025 + particle.seed) * particle.heat * 3;

        context.save();
        context.translate(particle.x + shimmerX, particle.y + shimmerY);
        context.rotate(particle.angle + particle.heat * 1.2);
        context.globalAlpha = 0.35 + particle.heat * 0.65;
        context.fillStyle =
          particle.heat > 0.08
            ? particle.color
            : "rgba(130, 126, 118, 0.55)";
        context.strokeStyle = context.fillStyle;
        context.lineWidth = Math.max(1.4, size * 0.22);
        context.lineCap = "round";

        if (particle.shape === "dot") {
          context.beginPath();
          context.arc(0, 0, size * 0.55, 0, Math.PI * 2);
          context.fill();
        }

        if (particle.shape === "dash") {
          context.beginPath();
          context.moveTo(-size, 0);
          context.lineTo(size, 0);
          context.stroke();
        }

        if (particle.shape === "star") {
          drawStar(size);
        }

        context.restore();
      }

      frameId = requestAnimationFrame(animate);
    }

    function stopHoverEffect() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
      window.clearTimeout(idleTimeoutId);
    }

    function onPointerMove(event: PointerEvent) {
      const rect = parentEl.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      hoverPoint.x = mouse.x;
      hoverPoint.y = mouse.y;
      mouse.active = true;

      window.clearTimeout(idleTimeoutId);
      idleTimeoutId = window.setTimeout(stopHoverEffect, HOVER_IDLE_TIMEOUT_MS);
    }

    function onPointerLeave() {
      stopHoverEffect();
    }

    resize();
    frameId = requestAnimationFrame(animate);

    parentEl.addEventListener("pointermove", onPointerMove);
    parentEl.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", resize);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parentEl);
    for (const contentEl of contentEls) {
      resizeObserver.observe(contentEl);
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(idleTimeoutId);
      resizeObserver.disconnect();
      parentEl.removeEventListener("pointermove", onPointerMove);
      parentEl.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
