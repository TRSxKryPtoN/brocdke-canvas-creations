import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Click splash burst only — native system cursor is used for pointing.
 * Hidden on touch devices.
 */
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [splashes, setSplashes] = useState<{ id: number; x: number; y: number }[]>([]);
  const lastIdRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const onDown = (e: MouseEvent) => {
      const id = ++lastIdRef.current;
      setSplashes((s) => [...s, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setSplashes((s) => s.filter((p) => p.id !== id)), 700);
    };

    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  if (!enabled) return null;

  return (
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
  );
};

export default CustomCursor;
