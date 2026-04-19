import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import catTshirts from "@/assets/cat-tshirts.jpg";
import catHoodies from "@/assets/cat-hoodies.jpg";
import catJerseys from "@/assets/cat-jerseys.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import catSweatshirts from "@/assets/cat-sweatshirts.jpg";
import catCaps from "@/assets/cat-caps.jpg";

type Category = {
  name: string;
  subtitle: string;
  image: string;
  slug: string;
  to: string;
  highlight?: boolean;
};

const categories: Category[] = [
  { name: "T-Shirts", subtitle: "Streetwear Staples", image: catTshirts, slug: "t-shirts", to: "/collection/t-shirts" },
  { name: "Hoodies", subtitle: "Premium Comfort", image: catHoodies, slug: "hoodies", to: "/collection/hoodies" },
  { name: "Jerseys", subtitle: "Custom Designs", image: catJerseys, slug: "jerseys", to: "/collection/jerseys" },
  { name: "Print on Demand", subtitle: "Design Your Own", image: catTshirts, slug: "print-on-demand", to: "/custom-design", highlight: true },
  { name: "Caps", subtitle: "Top It Off", image: catCaps, slug: "caps", to: "/collection/caps" },
  { name: "Sweatshirts", subtitle: "Everyday Luxury", image: catSweatshirts, slug: "sweatshirts", to: "/collection/sweatshirts" },
  { name: "Crochets", subtitle: "Handmade with Love", image: catAccessories, slug: "crochets", to: "/collection/crochets" },
  { name: "Accessories", subtitle: "Frames · Keys · More", image: catAccessories, slug: "accessories", to: "/collection/accessories" },
];

const CategoriesSection = () => {
  return (
    <section id="collections" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/[0.03] blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-sm uppercase text-primary font-medium inline-block"
          >
            Explore
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mt-3 mb-4">
            Our Collections
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-[2px] bg-primary mx-auto mb-4"
          />
          <p className="text-muted-foreground max-w-md mx-auto">
            From custom print tees to handcrafted accessories — find something that speaks to your style.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={cat.to}
                className="group relative block overflow-hidden rounded-2xl"
              >
                <div className={`relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow duration-700 ${cat.highlight ? "ring-2 ring-primary/60 group-hover:shadow-primary/30" : "group-hover:shadow-primary/15"}`}>
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    width={640}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.highlight ? "from-primary/70 via-[hsl(30,10%,10%)]/50" : "from-[hsl(30,10%,8%)]/85 via-[hsl(30,10%,10%)]/30"} to-transparent group-hover:from-[hsl(30,10%,8%)]/75 transition-all duration-700`} />

                  {/* Glass overlay on hover */}
                  <div className="absolute inset-0 bg-primary/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {cat.highlight && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider shadow-lg">
                      <Sparkles className="w-3 h-3" /> New
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[hsl(40,30%,70%)] mb-1 block">
                      {cat.subtitle}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl text-[hsl(40,30%,92%)] mb-2">
                      {cat.name}
                    </h3>
                    <motion.div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
                      Shop Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: "2rem" }}
                      viewport={{ once: true }}
                      className="block h-[2px] bg-primary mt-3 group-hover:w-16 transition-all duration-500"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
