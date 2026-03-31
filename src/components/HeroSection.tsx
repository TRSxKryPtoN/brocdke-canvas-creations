import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-fashion.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-dark">
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={heroImage}
          alt="BROCDKE fashion editorial"
          className="w-full h-full object-cover opacity-40"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(30,10%,15%)]/80 via-transparent to-[hsl(30,10%,15%)]/90" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-sm tracking-[0.5em] uppercase text-[hsl(40,30%,65%)] mb-8"
        >
          Print on Demand · Custom Designs · Handcrafted
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-medium tracking-[0.1em] text-[hsl(40,30%,92%)] mb-4 leading-none"
        >
          BROCDKE
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="w-24 h-[1px] bg-[hsl(25,60%,50%)] mx-auto mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="font-display text-xl sm:text-2xl text-[hsl(40,30%,70%)] italic mb-12 max-w-xl mx-auto"
        >
          Where creativity meets craft — wear what speaks to you
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#collections"
            className="inline-block px-12 py-4 bg-primary text-primary-foreground text-sm tracking-[0.25em] uppercase font-medium rounded-sm hover:shadow-lg hover:shadow-primary/20 transition-shadow duration-500"
          >
            Shop Now
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#about"
            className="inline-block px-12 py-4 border border-[hsl(40,30%,40%)] text-[hsl(40,30%,85%)] text-sm tracking-[0.25em] uppercase font-medium rounded-sm hover:border-[hsl(40,30%,65%)] hover:text-[hsl(40,30%,95%)] transition-all duration-500"
          >
            Our Story
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown className="w-5 h-5 text-[hsl(40,30%,55%)]" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
