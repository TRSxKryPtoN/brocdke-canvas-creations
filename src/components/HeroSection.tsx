import heroImage from "@/assets/hero-fashion.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="BROCDKE fashion editorial"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-sm tracking-[0.4em] uppercase text-muted-foreground mb-6 animate-fade-in">
          Print on Demand · Custom Designs · Handcrafted
        </p>
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.15em] text-foreground mb-6">
          BROCDKE
        </h1>
        <p className="font-display text-xl sm:text-2xl text-muted-foreground italic mb-10 max-w-xl mx-auto">
          Where creativity meets craft — wear what speaks to you
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#collections"
            className="inline-block px-10 py-4 bg-foreground text-background text-sm tracking-[0.25em] uppercase font-medium hover:bg-accent hover:text-foreground transition-all duration-500"
          >
            Shop Now
          </a>
          <a
            href="#about"
            className="inline-block px-10 py-4 border border-foreground/30 text-foreground text-sm tracking-[0.25em] uppercase font-medium hover:border-foreground transition-all duration-500"
          >
            Our Story
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-foreground/40" />
      </div>
    </section>
  );
};

export default HeroSection;
