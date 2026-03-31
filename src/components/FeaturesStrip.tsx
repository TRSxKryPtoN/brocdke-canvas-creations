import { motion } from "framer-motion";
import { Truck, Palette, Shield, Sparkles } from "lucide-react";

const features = [
  { icon: Palette, label: "Custom Designs", desc: "Unique art, your way" },
  { icon: Truck, label: "Fast Delivery", desc: "Right to your doorstep" },
  { icon: Shield, label: "Premium Quality", desc: "Built to last" },
  { icon: Sparkles, label: "Handcrafted", desc: "Made with passion" },
];

const FeaturesStrip = () => (
  <section className="py-16 px-6 bg-card border-y border-border">
    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
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
            whileHover={{ scale: 1.15, rotate: 5 }}
            className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <f.icon className="w-6 h-6 text-primary" />
          </motion.div>
          <h4 className="text-sm tracking-[0.15em] uppercase text-foreground font-medium mb-1">
            {f.label}
          </h4>
          <p className="text-xs text-muted-foreground">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default FeaturesStrip;
