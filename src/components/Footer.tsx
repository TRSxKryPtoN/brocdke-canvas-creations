import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook } from "lucide-react";

const shopLinks = [
  { label: "T-Shirts", to: "/collection/t-shirts" },
  { label: "Hoodies", to: "/collection/hoodies" },
  { label: "Jerseys", to: "/collection/jerseys" },
  { label: "Caps", to: "/collection/caps" },
  { label: "Sweatshirts", to: "/collection/sweatshirts" },
  { label: "Accessories", to: "/collection/accessories" },
];

const Footer = () => (
  <footer className="border-t border-border py-16 px-6 bg-card">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
      <div className="md:col-span-2">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-2xl tracking-[0.15em] text-foreground mb-4"
        >
          BROCDKE
        </motion.h3>
        <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
          Custom print-on-demand clothing, handcrafted accessories, and unique designs that tell your story.
        </p>
        <div className="flex gap-3 mt-6">
          {[Instagram, Twitter, Facebook].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ scale: 1.15, y: -2 }}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs tracking-[0.25em] uppercase text-foreground mb-5 font-semibold">Shop</h4>
        <ul className="space-y-3 text-sm text-muted-foreground">
          {shopLinks.map((l) => (
            <li key={l.label}>
              <Link to={l.to} className="hover:text-primary transition-colors duration-300">{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-xs tracking-[0.25em] uppercase text-foreground mb-5 font-semibold">Info</h4>
        <ul className="space-y-3 text-sm text-muted-foreground">
          {["About Us", "Contact", "Shipping", "Returns", "FAQs"].map((l) => (
            <li key={l}>
              <a href="#" className="hover:text-primary transition-colors duration-300">{l}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
      <span className="text-xs text-muted-foreground tracking-widest">
        © 2026 BROCDKE. All rights reserved.
      </span>
      <div className="flex gap-6 text-xs text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default Footer;
