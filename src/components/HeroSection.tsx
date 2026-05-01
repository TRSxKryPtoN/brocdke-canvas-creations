import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { useRef } from "react";
import heroImage from "@/assets/hero-fashion.jpg";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden hero-dark">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <motion.img
          initial={{ scale: 1.15, filter: "blur(10px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={heroImage}
          alt="BROCDKE fashion editorial"
          className="w-full h-full object-cover opacity-40"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(30,10%,15%)]/80 via-transparent to-[hsl(30,10%,15%)]/90" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div className="relative z-10 text-center px-6 max-w-5xl mx-auto" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[hsl(40,30%,25%)] bg-[hsl(30,10%,15%)]/50 backdrop-blur-sm mb-8"
        >
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-[hsl(40,30%,65%)]">New Collection Available</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-sm tracking-[0.5em] uppercase text-[hsl(40,30%,65%)] mb-6"
        >
          Print on Demand · Custom Designs · Handcrafted
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-medium tracking-[0.1em] text-[hsl(40,30%,92%)] mb-4 leading-none flex justify-center"
          aria-label="BROCDKE"
        >
          {"BROCDKE".split("").map((ch, i) => (
            <motion.span
              key={i}
              whileHover={{ y: -14, color: "hsl(25, 70%, 60%)", scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className="inline-block cursor-default"
            >
              {ch}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="font-display text-xl sm:text-2xl text-[hsl(40,30%,70%)] italic mb-12 max-w-xl mx-auto"
        >
          Where creativity meets craft — wear what speaks to you
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px hsl(25 60% 42% / 0.4)" }}
            whileTap={{ scale: 0.97 }}
            href="#collections"
            className="inline-block px-12 py-4 bg-primary text-primary-foreground text-sm tracking-[0.25em] uppercase font-medium rounded-sm transition-all duration-500"
          >
            Shop Now
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05, borderColor: "hsl(40,30%,65%)" }}
            whileTap={{ scale: 0.97 }}
            href="#about"
            className="inline-block px-12 py-4 border border-[hsl(40,30%,30%)] text-[hsl(40,30%,85%)] text-sm tracking-[0.25em] uppercase font-medium rounded-sm hover:text-[hsl(40,30%,95%)] transition-all duration-500"
          >
            Our Story
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[hsl(40,30%,45%)]">Scroll</span>
            <ArrowDown className="w-4 h-4 text-[hsl(40,30%,45%)]" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
