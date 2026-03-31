import catTshirts from "@/assets/cat-tshirts.jpg";
import catHoodies from "@/assets/cat-hoodies.jpg";
import catJerseys from "@/assets/cat-jerseys.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import catSweatshirts from "@/assets/cat-sweatshirts.jpg";

const categories = [
  { name: "T-Shirts", subtitle: "Print on Demand", image: catTshirts },
  { name: "Hoodies", subtitle: "Premium Comfort", image: catHoodies },
  { name: "Jerseys", subtitle: "Custom Designs", image: catJerseys },
  { name: "Sweatshirts", subtitle: "Everyday Luxury", image: catSweatshirts },
  { name: "Accessories", subtitle: "Frames · Keys · Crochet", image: catAccessories },
];

const CategoriesSection = () => {
  return (
    <section id="collections" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.4em] uppercase text-muted-foreground mb-3">
            Explore
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-foreground tracking-wide">
            Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <a
              key={cat.name}
              href="#"
              className={`group relative overflow-hidden ${
                i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div className={`relative ${i === 0 ? "aspect-square" : "aspect-[4/5]"} overflow-hidden`}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  width={640}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
                    {cat.subtitle}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl font-light text-foreground tracking-wide">
                    {cat.name}
                  </h3>
                  <span className="mt-4 text-xs tracking-[0.3em] uppercase text-foreground/60 group-hover:text-foreground transition-colors border-b border-foreground/30 pb-1">
                    View Collection
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
