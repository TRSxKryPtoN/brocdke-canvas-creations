import { motion } from "framer-motion";
import logo from "@/assets/brocdke-logo.jpeg";

const stats = [
  { value: "500+", label: "Designs" },
  { value: "10K+", label: "Happy Customers" },
  { value: "100%", label: "Satisfaction" },
];

const AboutSection = () => (
  <section id="about" className="section-padding bg-card">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            src={logo}
            alt="BROCDKE Logo"
            className="w-full h-full object-contain relative z-10"
            loading="lazy"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <span className="text-sm tracking-[0.4em] uppercase text-primary font-medium">
          Our Story
        </span>
        <h2 className="font-display text-4xl sm:text-5xl text-foreground mt-3 mb-6">
          About BROCDKE
        </h2>
        <div className="space-y-4 text-muted-foreground text-[15px] leading-relaxed">
          <p>
            BROCDKE was born from a passion for self-expression through wearable art. We believe that what you wear tells your story — and every story deserves to be unique.
          </p>
          <p>
            From custom print-on-demand t-shirts and jerseys to handcrafted crochet pieces, photo frames, and keychains, every item in our collection is designed with intention and crafted with care.
          </p>
          <p>
            We bridge the gap between streetwear culture and artisan craftsmanship, creating pieces that are as meaningful as they are beautiful.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-border">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
            >
              <div className="font-display text-3xl text-primary font-semibold">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1 tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
