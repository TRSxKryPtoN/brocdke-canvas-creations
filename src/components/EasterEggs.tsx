import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const SECRET_WORD = "brocdke";

const EasterEggs = () => {
  const [confetti, setConfetti] = useState(false);
  const [konamiBuf, setKonamiBuf] = useState<string[]>([]);
  const [typedBuf, setTypedBuf] = useState("");

  // Console signature — for the curious devs who open inspector
  useEffect(() => {
    const style = "color:#b87333;font-family:Playfair Display,serif;font-size:28px;font-weight:600;letter-spacing:6px;";
    const sub = "color:#8b6f4e;font-size:11px;letter-spacing:3px;";
    // eslint-disable-next-line no-console
    console.log("%cBROCDKE", style);
    // eslint-disable-next-line no-console
    console.log("%cWEAR · YOUR · STORY", sub);
    // eslint-disable-next-line no-console
    console.log(
      "%c✨ Curious mind detected. Try the Konami code on the homepage — or type our name.",
      "color:#8b6f4e;font-style:italic;font-size:12px;"
    );
  }, []);

  // Konami + secret word listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Konami
      setKonamiBuf((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.length === KONAMI.length && next.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())) {
          triggerCelebration("KONAMI10");
          return [];
        }
        return next;
      });

      // Typed secret word
      if (e.key.length === 1) {
        setTypedBuf((prev) => {
          const next = (prev + e.key.toLowerCase()).slice(-SECRET_WORD.length);
          if (next === SECRET_WORD) {
            triggerCelebration("STORY15");
            return "";
          }
          return next;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const triggerCelebration = (code: string) => {
    setConfetti(true);
    toast.success(`✨ Secret unlocked — use code ${code} for a surprise discount`, {
      description: "Mention it on WhatsApp at checkout.",
      duration: 6000,
    });
    setTimeout(() => setConfetti(false), 2400);
  };

  return (
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
  );
};

export default EasterEggs;
