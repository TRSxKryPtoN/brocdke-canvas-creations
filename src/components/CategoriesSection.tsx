import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import catTshirts from "@/assets/cat-tshirts.jpg";
import catHoodies from "@/assets/cat-hoodies.jpg";
import catJerseys from "@/assets/cat-jerseys.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import catSweatshirts from "@/assets/cat-sweatshirts.jpg";
import catCaps from "@/assets/cat-caps.jpg";

const categories = [
  { name: "T-Shirts", subtitle: "Print on Demand", image: catTshirts, slug: "t-shirts", span: "sm:col-span-2 sm:row-span-2" },
  { name: "Hoodies", subtitle: "Premium Comfort", image: catHoodies, slug: "hoodies", span: "" },
  { name: "Jerseys", subtitle: "Custom Designs", image: catJerseys, slug: "jerseys", span: "" },
  { name: "Caps", subtitle: "Top It Off", image: catCaps, slug: "caps", span: "" },
  { name: "Sweatshirts", subtitle: "Everyday Luxury", image: catSweatshirts, slug: "sweatshirts", span: "" },
  { name: "Accessories", subtitle: "Frames · Keys · Crochet", image: catAccessories, slug: "accessories", span: "sm:col-span-2" },
];

const CategoriesSection = () => {
  return (
    <section id="collections" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.4em] uppercase text-primary font-medium">
            Explore
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mt-3 mb-4">
            Our Collections
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            From custom print tees to handcrafted accessories — find something that speaks to your style.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`${cat.span}`}
            >
              <Link
                to={`/collection/${cat.slug}`}
                className="group relative block overflow-hidden rounded-lg"
              >
                <div className={`relative ${cat.span.includes("row-span-2") ? "aspect-square" : "aspect-[3/4]"} overflow-hidden rounded-lg`}>
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    width={640}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(30,10%,10%)]/80 via-[hsl(30,10%,10%)]/20 to-transparent group-hover:from-[hsl(30,10%,10%)]/70 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[hsl(40,30%,70%)] mb-1 block">
                      {cat.subtitle}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-[hsl(40,30%,92%)] mb-2">
                      {cat.name}
                    </h3>
                    <motion.div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Shop Now <ArrowRight className="w-4 h-4" />
                    </motion.div>
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: "2rem" }}
                      viewport={{ once: true }}
                      className="block h-[2px] bg-primary mt-3 group-hover:w-12 transition-all duration-500"
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
