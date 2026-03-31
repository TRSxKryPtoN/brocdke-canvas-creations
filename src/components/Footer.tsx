import { Instagram, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-16 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
      <div className="md:col-span-2">
        <h3 className="font-display text-2xl tracking-[0.2em] text-foreground mb-4">BROCDKE</h3>
        <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
          Custom print-on-demand clothing, handcrafted accessories, and unique designs that tell your story.
        </p>
        <div className="flex gap-4 mt-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div>
        <h4 className="text-xs tracking-[0.3em] uppercase text-foreground mb-4 font-medium">Shop</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {["T-Shirts", "Hoodies", "Jerseys", "Sweatshirts", "Accessories"].map((l) => (
            <li key={l}>
              <a href="#" className="hover:text-foreground transition-colors">{l}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-xs tracking-[0.3em] uppercase text-foreground mb-4 font-medium">Info</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {["About Us", "Contact", "Shipping", "Returns", "FAQs"].map((l) => (
            <li key={l}>
              <a href="#" className="hover:text-foreground transition-colors">{l}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground tracking-widest">
      © 2026 BROCDKE. All rights reserved.
    </div>
  </footer>
);

export default Footer;
