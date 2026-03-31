import { Truck, Palette, Shield, Sparkles } from "lucide-react";

const features = [
  { icon: Palette, label: "Custom Designs", desc: "Your vision, our craft" },
  { icon: Truck, label: "Fast Shipping", desc: "Delivered to your door" },
  { icon: Shield, label: "Quality Assured", desc: "Premium materials only" },
  { icon: Sparkles, label: "Handcrafted", desc: "Made with love" },
];

const FeaturesStrip = () => (
  <section className="border-y border-border py-12 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
      {features.map((f) => (
        <div key={f.label} className="text-center">
          <f.icon className="w-6 h-6 mx-auto mb-3 text-accent" />
          <h4 className="text-sm tracking-[0.2em] uppercase text-foreground font-medium mb-1">
            {f.label}
          </h4>
          <p className="text-xs text-muted-foreground">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesStrip;
