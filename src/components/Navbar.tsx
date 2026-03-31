import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/brocdke-logo.jpeg";

const navLinks = ["Collections", "New Arrivals", "Custom Prints", "About"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-lg shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-3 group">
          <motion.img
            whileHover={{ rotate: 5 }}
            src={logo}
            alt="BROCDKE"
            className="h-10 w-10 rounded-full object-cover shadow-md"
          />
          <span className={`font-display text-xl tracking-[0.25em] font-semibold transition-colors duration-500 ${
            scrolled ? "text-foreground" : "text-[hsl(40,30%,92%)]"
          }`}>
            BROCDKE
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3, duration: 0.4 }}
              className={`relative text-sm tracking-widest uppercase transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:transition-all after:duration-300 hover:after:w-full ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground after:bg-primary"
                  : "text-[hsl(40,30%,80%)] hover:text-[hsl(40,30%,95%)] after:bg-[hsl(40,30%,92%)]"
              }`}
            >
              {link}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`transition-colors ${scrolled ? "text-foreground" : "text-[hsl(40,30%,92%)]"}`}
          >
            <Search className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`relative transition-colors ${scrolled ? "text-foreground" : "text-[hsl(40,30%,92%)]"}`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full font-semibold">
              0
            </span>
          </motion.button>
          <button
            className={`md:hidden transition-colors ${scrolled ? "text-foreground" : "text-[hsl(40,30%,92%)]"}`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="block text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
