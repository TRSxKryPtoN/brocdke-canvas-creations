import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="section-padding hero-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(25,60%,42%)]/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-xl mx-auto text-center"
      >
        <span className="text-sm tracking-[0.4em] uppercase text-[hsl(25,60%,55%)] font-medium">
          Stay Connected
        </span>
        <h2 className="font-display text-4xl sm:text-5xl text-[hsl(40,30%,92%)] mt-3 mb-4">
          Join the Club
        </h2>
        <p className="text-[hsl(40,30%,60%)] text-sm mb-10">
          Be the first to know about new drops, exclusive designs, and special offers.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex gap-0 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-5 py-3.5 bg-[hsl(30,10%,20%)] border border-[hsl(30,10%,28%)] text-[hsl(40,30%,85%)] text-sm placeholder:text-[hsl(30,8%,40%)] focus:outline-none focus:border-[hsl(25,60%,42%)] transition-colors rounded-l-sm"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-6 py-3.5 bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 rounded-r-sm hover:shadow-lg hover:shadow-primary/20 transition-shadow"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
