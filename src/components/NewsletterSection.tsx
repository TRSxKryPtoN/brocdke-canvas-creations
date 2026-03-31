import { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sm tracking-[0.4em] uppercase text-muted-foreground mb-3">
          Stay Connected
        </p>
        <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground tracking-wide mb-4">
          Join the Club
        </h2>
        <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
          Be the first to know about new drops, exclusive designs, and special offers.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-5 py-3 bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground/50 transition-colors"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-foreground text-background text-sm tracking-[0.2em] uppercase font-medium hover:bg-accent hover:text-foreground transition-all duration-500"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
