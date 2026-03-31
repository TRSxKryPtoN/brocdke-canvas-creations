import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import logo from "@/assets/brocdke-logo.jpeg";

const navLinks = ["Collections", "New Arrivals", "Custom Prints", "About"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="BROCDKE" className="h-10 w-10 rounded-sm object-cover" />
          <span className="font-display text-xl tracking-[0.3em] text-foreground font-semibold">
            BROCDKE
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="relative text-foreground hover:text-accent transition-colors">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-primary-foreground text-[10px] flex items-center justify-center rounded-full font-semibold">
              0
            </span>
          </button>
          <button
            className="md:hidden text-foreground"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="block text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
