import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import logo from "@/assets/brocdke-logo.jpeg";

const stats = [
  { value: "500+", label: "Designs" },
  { value: "10K+", label: "Happy Customers" },
  { value: "100%", label: "Satisfaction" },
];

const AboutSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" ref={ref} className="section-padding bg-card/50 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/[0.03] rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="aspect-square [perspective:1200px] group">
            <motion.div
              style={{ y: imgY }}
              className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
            >
              {/* Front */}
              <div className="absolute inset-0 bg-secondary rounded-2xl flex items-center justify-center p-16 sm:p-20 overflow-hidden shadow-2xl shadow-primary/5 [backface-visibility:hidden]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                <img
                  src={logo}
                  alt="BROCDKE Logo"
                  className="w-3/5 h-3/5 object-contain relative z-10"
                  loading="lazy"
                />
              </div>
              {/* Back */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary to-primary/5 rounded-2xl flex flex-col items-center justify-center p-10 text-center overflow-hidden shadow-2xl shadow-primary/10 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <span className="text-xs tracking-[0.4em] uppercase text-primary font-medium mb-4">Est. 2024</span>
                <h3 className="font-display text-3xl text-foreground mb-3">Wear Your Story</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  Crafted with intention. Designed for those who refuse to blend in.
                </p>
              </div>
            </motion.div>
          </div>
          {/* Decorative ring */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border-2 border-primary/10" />
          <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full border border-primary/10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-sm tracking-[0.4em] uppercase text-primary font-medium">Our Story</span>
          <h2 className="font-display text-4xl sm:text-5xl text-foreground mt-3 mb-6">About BROCDKE</h2>
          <motion.div initial={{ width: 0 }} whileInView={{ width: "3rem" }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }} className="h-[2px] bg-primary mb-6" />
          <div className="space-y-4 text-muted-foreground text-[15px] leading-relaxed">
            <p>BROCDKE was born from a passion for self-expression through wearable art. We believe that what you wear tells your story — and every story deserves to be unique.</p>
            <p>From custom print-on-demand t-shirts and jerseys to handcrafted crochet pieces, photo frames, and keychains, every item in our collection is designed with intention and crafted with care.</p>
            <p>We bridge the gap between streetwear culture and artisan craftsmanship, creating pieces that are as meaningful as they are beautiful.</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-border">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 + 0.3, duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.4, type: "spring", stiffness: 200 }}
                  className="font-display text-3xl text-primary font-semibold"
                >
                  {s.value}
                </motion.div>
                <div className="text-xs text-muted-foreground mt-1 tracking-wide">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
