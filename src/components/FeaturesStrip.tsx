import { motion } from "framer-motion";
import { Truck, Palette, Shield, Sparkles } from "lucide-react";

const features = [
  { icon: Palette, label: "Custom Designs", desc: "Unique art, your way" },
  { icon: Truck, label: "Fast Delivery", desc: "Right to your doorstep" },
  { icon: Shield, label: "Premium Quality", desc: "Built to last" },
  { icon: Sparkles, label: "Handcrafted", desc: "Made with passion" },
];

const FeaturesStrip = () => (
  <section className="py-16 px-6 bg-card/50 backdrop-blur-sm border-y border-border/50 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] via-transparent to-primary/[0.02]" />
    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
      {features.map((f, i) => (
        <motion.div
          key={f.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="text-center group"
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center shadow-lg shadow-primary/5 group-hover:shadow-primary/20 transition-shadow duration-500"
          >
            <f.icon className="w-7 h-7 text-primary" />
          </motion.div>
          <h4 className="text-sm tracking-[0.15em] uppercase text-foreground font-medium mb-1">{f.label}</h4>
          <p className="text-xs text-muted-foreground">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default FeaturesStrip;
