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
  <section className="section-padding">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-sm tracking-[0.4em] uppercase text-primary font-medium">
          Reviews
        </span>
        <h2 className="font-display text-4xl sm:text-5xl text-foreground mt-3">
          What Our Customers Say
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="bg-card border border-border rounded-lg p-8 relative"
          >
            <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              "{t.text}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display text-sm font-semibold">
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
