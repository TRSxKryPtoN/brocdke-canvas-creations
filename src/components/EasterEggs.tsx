import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

// Word -> reward
const SECRET_WORDS: Record<string, { code: string; msg: string }> = {
  brocdke: { code: "STORY15", msg: "You whispered our name ✨" },
  love:    { code: "LOVE10",  msg: "Love received — sending some back 💌" },
  craft:   { code: "CRAFT12", msg: "A maker recognises a maker 🧵" },
  vibe:    { code: "VIBE08",  msg: "Vibe unlocked 🎧" },
  copper:  { code: "COPPER7", msg: "Copper soul detected 🔶" },
  story:   { code: "TALE11",  msg: "Every thread tells a story 📖" },
  india:   { code: "DESI20",  msg: "Made with love in India 🇮🇳" },
};

const EasterEggs = () => {
  const [confetti, setConfetti] = useState(false);
  const [disco, setDisco] = useState(false);
  const [konamiBuf, setKonamiBuf] = useState<string[]>([]);
  const typedRef = useRef("");
  const lastActivity = useRef(Date.now());
  const idleNoticeShown = useRef(false);
  const unlockedRef = useRef<Set<string>>(new Set());

  // Console signature
  useEffect(() => {
    const style = "color:#b87333;font-family:Playfair Display,serif;font-size:28px;font-weight:600;letter-spacing:6px;";
    const sub = "color:#8b6f4e;font-size:11px;letter-spacing:3px;";
     
    console.log("%cBROCDKE", style);
     
    console.log("%cWEAR · YOUR · STORY", sub);
     
    console.log(
      "%c✨ Curious mind detected.\n• Try the Konami code\n• Type our name (or: love, craft, vibe, disco)\n• Press ? for a hint • triple-click anywhere",
      "color:#8b6f4e;font-style:italic;font-size:12px;line-height:1.6"
    );
  }, []);

  // Keyboard secrets
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      lastActivity.current = Date.now();
      idleNoticeShown.current = false;

      // Konami
      setKonamiBuf((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.length === KONAMI.length && next.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())) {
          unlock("konami", "KONAMI10", "Konami legend — 10% off awaits 🎮");
          return [];
        }
        return next;
      });

      // ? key → hint
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        toast("🪄 Hidden things live here", {
          description: "Try typing: brocdke · love · craft · vibe · disco — or the Konami code.",
          duration: 5000,
        });
      }

      // Typed words
      if (e.key.length === 1) {
        typedRef.current = (typedRef.current + e.key.toLowerCase()).slice(-20);
        for (const word of Object.keys(SECRET_WORDS)) {
          if (typedRef.current.endsWith(word) && !unlockedRef.current.has(word)) {
            const { code, msg } = SECRET_WORDS[word];
            unlock(word, code, msg);
          }
        }
        if (typedRef.current.endsWith("disco") && !disco) {
          setDisco(true);
          toast("🕺 Disco mode engaged", { description: "Press Esc to calm down.", duration: 4000 });
          setTimeout(() => setDisco(false), 8000);
        }
      }

      if (e.key === "Escape" && disco) setDisco(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [disco]);

  // Triple-click anywhere → mini sparkle
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      lastActivity.current = Date.now();
      idleNoticeShown.current = false;
      if (e.detail === 3) {
        burstAt(e.clientX, e.clientY);
      }
    };
    window.addEventListener("click", onClick);
    window.addEventListener("mousemove", () => { lastActivity.current = Date.now(); idleNoticeShown.current = false; });
    return () => window.removeEventListener("click", onClick);
  }, []);

  // Idle whisper after 45s
  useEffect(() => {
    const t = setInterval(() => {
      if (!idleNoticeShown.current && Date.now() - lastActivity.current > 45000) {
        idleNoticeShown.current = true;
        toast("Still here? 🤍", {
          description: "Press ? for a little secret.",
          duration: 4000,
        });
      }
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const unlock = (key: string, code: string, msg: string) => {
    if (unlockedRef.current.has(key)) return;
    unlockedRef.current.add(key);
    setConfetti(true);
    toast.success(msg, {
      description: `Use code ${code} on WhatsApp at checkout.`,
      duration: 6000,
    });
    setTimeout(() => setConfetti(false), 2400);
  };

  // Localized burst at coordinates
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const burstAt = (x: number, y: number) => {
    const id = Date.now();
    setBursts((b) => [...b, { id, x, y }]);
    setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 1400);
  };

  return (
    <>
      {/* Disco overlay */}
      <AnimatePresence>
        {disco && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[90] mix-blend-overlay"
            style={{
              background:
                "conic-gradient(from 0deg, #b87333, #d4a574, #f5e6d3, #8b6f4e, #b87333)",
              animation: "spin 3s linear infinite",
            }}
          />
        )}
      </AnimatePresence>

      {/* Full-screen confetti */}
      <AnimatePresence>
        {confetti && (
          <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            {Array.from({ length: 60 }).map((_, i) => {
              const colors = ["#b87333", "#d4a574", "#8b6f4e", "#f5e6d3", "#a8763e"];
              const color = colors[i % colors.length];
              const left = Math.random() * 100;
              const delay = Math.random() * 0.4;
              const duration = 1.6 + Math.random() * 1.2;
              const rotate = Math.random() * 720 - 360;
              const size = 6 + Math.random() * 8;
              return (
                <motion.span
                  key={i}
                  initial={{ y: -40, x: 0, opacity: 1, rotate: 0 }}
                  animate={{ y: window.innerHeight + 60, rotate, opacity: 0 }}
                  transition={{ duration, delay, ease: "easeIn" }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: `${left}%`,
                    width: size,
                    height: size * 0.4,
                    background: color,
                    borderRadius: 2,
                  }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Click bursts */}
      <AnimatePresence>
        {bursts.map((b) => (
          <div key={b.id} className="fixed pointer-events-none z-[100]" style={{ left: b.x, top: b.y }}>
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const dist = 60 + Math.random() * 30;
              return (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: 0.4 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{ background: i % 2 ? "#b87333" : "#d4a574" }}
                />
              );
            })}
          </div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default EasterEggs;
