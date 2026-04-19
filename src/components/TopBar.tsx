import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Truck, Headphones, Sparkles } from "lucide-react";

const links = [
  { icon: Truck, label: "Free Shipping over ₹999" },
  { icon: Headphones, label: "24/7 Support" },
  { icon: Sparkles, label: "New Arrivals Weekly" },
];

const TopBar = () => {
  return (
    <div className="bg-[hsl(var(--hero-bg))] text-[hsl(var(--hero-fg))] border-b border-[hsl(40,30%,20%)]">
      {/* Marquee strip */}
      <div className="overflow-hidden whitespace-nowrap py-1.5">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-flex gap-12 text-[11px] tracking-widest uppercase"
        >
          {[...links, ...links].map((l, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-[hsl(40,30%,70%)]">
              <l.icon className="w-3 h-3 text-primary" />
              {l.label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Quick nav */}
      <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center justify-between text-[11px] tracking-wider uppercase border-t border-[hsl(40,30%,15%)]">
        <div className="hidden sm:flex items-center gap-6">
          <Link to="/collection/t-shirts" className="text-[hsl(40,30%,60%)] hover:text-primary transition-colors">T-Shirts</Link>
          <Link to="/collection/hoodies" className="text-[hsl(40,30%,60%)] hover:text-primary transition-colors">Hoodies</Link>
          <Link to="/collection/jerseys" className="text-[hsl(40,30%,60%)] hover:text-primary transition-colors">Jerseys</Link>
          <Link to="/collection/caps" className="text-[hsl(40,30%,60%)] hover:text-primary transition-colors">Caps</Link>
          <Link to="/collection/sweatshirts" className="text-[hsl(40,30%,60%)] hover:text-primary transition-colors">Sweatshirts</Link>
          <Link to="/collection/accessories" className="text-[hsl(40,30%,60%)] hover:text-primary transition-colors">Accessories</Link>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <Link to="/custom-design" className="text-primary hover:text-primary/80 transition-colors font-medium">
            Custom Design ✦
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
