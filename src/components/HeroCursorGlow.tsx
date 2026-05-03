import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Soft copper glow that smoothly trails the cursor inside its parent section.
 * Hidden on touch / mobile devices where pointer-tracking feels broken.
 */
const HeroCursorGlow = ({ targetRef }: { targetRef: React.RefObject<HTMLElement> }) => {
  const isMobile = useIsMobile();
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const opacity = useMotionValue(0);

  // Smooth spring trailing
  const x = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const y = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });
  const o = useSpring(opacity, { stiffness: 80, damping: 20 });

  const bg = useTransform(
    [x, y],
    ([cx, cy]: number[]) =>
      `radial-gradient(420px circle at ${cx}px ${cy}px, hsl(25 70% 55% / 0.22), hsl(25 70% 55% / 0.08) 35%, transparent 65%)`
  );

  useEffect(() => {
    if (isMobile) return;
    const el = targetRef.current;
    if (!el) return;

    // Touch / coarse pointer guard (covers tablets in desktop UA mode)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      mx.set(e.clientX - rect.left);
      my.set(e.clientY - rect.top);
      opacity.set(1);
    };
    const onLeave = () => opacity.set(0);
    const onEnter = () => opacity.set(1);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerenter", onEnter);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerenter", onEnter);
    };
  }, [targetRef, isMobile, mx, my, opacity]);

  if (isMobile) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] mix-blend-screen"
      style={{ background: bg, opacity: o }}
    />
  );
};

export default HeroCursorGlow;
