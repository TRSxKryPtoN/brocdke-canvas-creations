import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "@/assets/brocdke-logo.jpeg";
import { CartDrawer } from "@/components/CartDrawer";
import TopBar from "@/components/TopBar";
import SearchOverlay from "@/components/SearchOverlay";

const navLinks = [
  { label: "Collections", href: "/#collections" },
  { label: "Custom Design", href: "/custom-design", isRoute: true },
  { label: "About", href: "/#about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <TopBar />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/70 backdrop-blur-2xl shadow-xl shadow-background/30 border-b border-border/40"
            : "bg-background/50 backdrop-blur-xl"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              src={logo}
              alt="BROCDKE"
              className="h-10 w-10 rounded-full object-cover shadow-lg ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all"
            />
            <span className="font-display text-xl tracking-[0.25em] font-semibold text-foreground">
              BROCDKE
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) =>
              link.isRoute ? (
                <motion.div key={link.label} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.3, duration: 0.4 }}>
                  <Link
                    to={link.href}
                    className="relative text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3, duration: 0.4 }}
                  className="relative text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </motion.a>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(true)}
              className="relative text-foreground p-2 rounded-full hover:bg-secondary/50 transition-colors"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline-flex absolute -bottom-1 -right-1 text-[8px] bg-secondary text-muted-foreground px-1 rounded font-mono">
                ⌘K
              </span>
            </motion.button>
            <CartDrawer />
            <button
              className="md:hidden text-foreground"
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
              className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4">
                {navLinks.map((link, i) =>
                  link.isRoute ? (
                    <motion.div key={link.label} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                      <Link to={link.href} className="block text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors" onClick={() => setOpen(false)}>
                        {link.label}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.a key={link.label} href={link.href} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }} className="block text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors" onClick={() => setOpen(false)}>
                      {link.label}
                    </motion.a>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
