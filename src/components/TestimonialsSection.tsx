import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    text: "The quality of the custom prints is insane! My jersey design came out even better than I imagined.",
    rating: 5,
  },
  {
    name: "David K.",
    text: "Love the handcrafted accessories. The crochet pieces are beautiful and the keychains are super unique.",
    rating: 5,
  },
  {
    name: "Priya R.",
    text: "Fast shipping, amazing quality, and the designs are so creative. BROCDKE is my go-to brand now!",
    rating: 5,
  },
];

const TestimonialsSection = () => (
  <section className="section-padding relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-3xl" />

    <div className="max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-sm tracking-[0.4em] uppercase text-primary font-medium">Reviews</span>
        <h2 className="font-display text-4xl sm:text-5xl text-foreground mt-3">What Our Customers Say</h2>
        <motion.div initial={{ width: 0 }} whileInView={{ width: "3rem" }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }} className="h-[2px] bg-primary mx-auto mt-4" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            whileHover={{ y: -6, boxShadow: "0 25px 50px -12px hsl(25 60% 42% / 0.1)" }}
            className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-8 relative transition-all duration-500"
          >
            <Quote className="w-10 h-10 text-primary/10 absolute top-6 right-6" />
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + j * 0.05 + 0.3 }}
                >
                  <Star className="w-4 h-4 fill-primary text-primary" />
                </motion.div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-display text-sm font-semibold">
                {t.name[0]}
              </div>
              <span className="text-sm font-medium text-foreground">{t.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
