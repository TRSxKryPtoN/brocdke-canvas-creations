import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * Pointed, animated copper cursor with smooth spring trailing dots,
 * hover-grow on interactive elements, and ink-splash burst on click.
 * Hidden automatically on touch devices.
 */
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [splashes, setSplashes] = useState<{ id: number; x: number; y: number }[]>([]);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Main pointer — tight spring
  const sx = useSpring(x, { stiffness: 700, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 700, damping: 40, mass: 0.4 });

  // Trailing ring — looser spring
  const rx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  // Three trailing dots, progressively softer
  const t1x = useSpring(x, { stiffness: 280, damping: 26 });
  const t1y = useSpring(y, { stiffness: 280, damping: 26 });
  const t2x = useSpring(x, { stiffness: 180, damping: 22 });
  const t2y = useSpring(y, { stiffness: 180, damping: 22 });
  const t3x = useSpring(x, { stiffness: 110, damping: 20 });
  const t3y = useSpring(y, { stiffness: 110, damping: 20 });

  const lastIdRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      setHovering(!!t.closest('a, button, [role="button"], input, textarea, select, label, .cursor-pointer'));
    };
    const onDown = (e: MouseEvent) => {
      setClicking(true);
      const id = ++lastIdRef.current;
      setSplashes((s) => [...s, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setSplashes((s) => s.filter((p) => p.id !== id)), 700);
    };
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing dots */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-1.5 h-1.5 rounded-full"
        style={{ x: t3x, y: t3y, translateX: "-50%", translateY: "-50%", background: "hsl(var(--primary) / 0.25)" }}
      />
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-1.5 h-1.5 rounded-full"
        style={{ x: t2x, y: t2y, translateX: "-50%", translateY: "-50%", background: "hsl(var(--primary) / 0.4)" }}
      />
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-1.5 h-1.5 rounded-full"
        style={{ x: t1x, y: t1y, translateX: "-50%", translateY: "-50%", background: "hsl(var(--primary) / 0.6)" }}
      />

      {/* Soft trailing ring */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          borderColor: "hsl(var(--primary) / 0.45)",
          background: hovering ? "hsl(var(--primary) / 0.08)" : "transparent",
          transition: "width 220ms ease, height 220ms ease, background 220ms ease",
          boxShadow: hovering ? "0 0 24px hsl(var(--primary) / 0.25)" : "0 0 0 hsl(var(--primary) / 0)",
        }}
      />

      {/* Pointed arrow tip */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: sx, y: sy }}
        animate={{ scale: clicking ? 0.8 : hovering ? 1.15 : 1, rotate: hovering ? -8 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" style={{ filter: "drop-shadow(0 1px 2px hsl(var(--primary) / 0.45))" }}>
          <defs>
            <linearGradient id="cursorGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="#8b6f4e" />
            </linearGradient>
          </defs>
          {/* arrow */}
          <path
            d="M2 2 L2 17 L6.5 13 L9.2 19.5 L12 18.4 L9.3 11.9 L15 11.4 Z"
            fill="url(#cursorGrad)"
            stroke="#f5e6d3"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Click splash bursts */}
      <AnimatePresence>
        {splashes.map((s) => (
          <div key={s.id} className="fixed top-0 left-0 pointer-events-none z-[9997]" style={{ left: s.x, top: s.y }}>
            <motion.span
              initial={{ scale: 0, opacity: 0.55 }}
              animate={{ scale: 2.4, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute rounded-full border"
              style={{
                width: 26,
                height: 26,
                marginLeft: -13,
                marginTop: -13,
                borderColor: "hsl(var(--primary) / 0.7)",
              }}
            />
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (i / 6) * Math.PI * 2;
              const dist = 22 + Math.random() * 8;
              return (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: 0.3 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="absolute w-1 h-1 rounded-full"
                  style={{ background: i % 2 ? "hsl(var(--primary))" : "#d4a574", marginLeft: -2, marginTop: -2 }}
                />
              );
            })}
          </div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
