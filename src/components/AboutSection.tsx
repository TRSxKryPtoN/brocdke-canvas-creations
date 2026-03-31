import logo from "@/assets/brocdke-logo.jpeg";

const AboutSection = () => (
  <section id="about" className="py-24 px-6">
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <div className="relative">
        <div className="aspect-square bg-card border border-border flex items-center justify-center p-12">
          <img src={logo} alt="BROCDKE Logo" className="w-full h-full object-contain" loading="lazy" />
        </div>
      </div>
      <div>
        <p className="text-sm tracking-[0.4em] uppercase text-muted-foreground mb-3">
          Our Story
        </p>
        <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground tracking-wide mb-6">
          About BROCDKE
        </h2>
        <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
          <p>
            BROCDKE was born from a passion for self-expression through wearable art. We believe that what you wear tells your story — and every story deserves to be unique.
          </p>
          <p>
            From custom print-on-demand t-shirts and jerseys to handcrafted crochet pieces, photo frames, and keychains, every item in our collection is designed with intention and made with care.
          </p>
          <p>
            We bridge the gap between streetwear culture and artisan craftsmanship, creating pieces that are as meaningful as they are beautiful.
          </p>
        </div>
        <a
          href="#collections"
          className="inline-block mt-8 px-8 py-3 border border-foreground/30 text-foreground text-sm tracking-[0.25em] uppercase hover:border-foreground transition-all duration-500"
        >
          Explore
        </a>
      </div>
    </div>
  </section>
);

export default AboutSection;
