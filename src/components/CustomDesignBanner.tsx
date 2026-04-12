import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shirt, Phone, Coffee, Droplets, Crown, ShoppingBag, PenTool } from "lucide-react";

const products = [
  { icon: Shirt, name: "T-Shirts" },
  { icon: Phone, name: "Phone Covers" },
  { icon: Coffee, name: "Mugs" },
  { icon: Droplets, name: "Bottles" },
  { icon: Crown, name: "Caps" },
  { icon: ShoppingBag, name: "Tote Bags" },
];

const CustomDesignBanner = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Full-width dark banner */}
      <div className="hero-dark relative py-24 sm:py-32 px-6">
        {/* Animated background blobs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-[10%] w-72 h-72 bg-primary/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 right-[10%] w-80 h-80 bg-primary/10 rounded-full blur-[100px]"
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-primary mb-5 px-4 py-1.5 border border-primary/25 rounded-full backdrop-blur-sm bg-primary/5"
              >
                <Sparkles className="w-3 h-3" />
                Print on Demand
              </motion.span>

              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[hsl(var(--hero-fg))] mb-5 leading-[1.05]">
                Design It.{" "}
                <span className="text-primary italic">We Print It.</span>
              </h2>

              <p className="text-[hsl(40,30%,65%)] text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
                Upload your artwork, pick your product, and we'll craft a premium custom piece — just for you. From phone cases to tees, bring your ideas to life.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/custom-design">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: "0 20px 40px -10px hsl(25 60% 42% / 0.35)" }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground text-sm tracking-[0.2em] uppercase font-medium rounded-sm transition-all duration-300 group"
                  >
                    <PenTool className="w-4 h-4" />
                    Start Creating
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <a href="https://wa.me/919XXXXXXXXX" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.04, borderColor: "hsl(40,30%,50%)" }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 border border-[hsl(40,30%,25%)] text-[hsl(40,30%,80%)] text-sm tracking-[0.2em] uppercase font-medium rounded-sm hover:text-[hsl(40,30%,95%)] transition-all duration-300"
                  >
                    Chat With Us
                  </motion.button>
                </a>
              </div>
            </motion.div>

            {/* Right — Product grid */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {products.map((product, i) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.5 }}
                    whileHover={{ y: -4, scale: 1.03 }}
                    className="group relative p-5 sm:p-6 rounded-2xl border border-[hsl(40,30%,20%)] bg-[hsl(30,10%,12%)]/60 backdrop-blur-sm hover:border-primary/40 hover:bg-[hsl(30,10%,14%)]/80 transition-all duration-400 text-center cursor-pointer"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ rotate: 8 }}
                        className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300"
                      >
                        <product.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </motion.div>
                      <p className="text-[hsl(40,30%,80%)] text-xs sm:text-sm font-medium tracking-wide">
                        {product.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomDesignBanner;
