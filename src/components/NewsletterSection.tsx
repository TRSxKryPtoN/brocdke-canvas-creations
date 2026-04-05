import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setTimeout(() => { setSubmitted(false); setEmail(""); }, 3000); }
  };

  return (
    <section className="section-padding hero-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[hsl(25,60%,42%)]/[0.04] blur-3xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-3xl" />
      </div>

      {/* Floating dots */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/20"
          style={{ left: `${20 + i * 20}%`, top: `${30 + (i % 2) * 40}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-xl mx-auto text-center"
      >
        <span className="text-sm tracking-[0.4em] uppercase text-[hsl(25,60%,55%)] font-medium">Stay Connected</span>
        <h2 className="font-display text-4xl sm:text-5xl text-[hsl(40,30%,92%)] mt-3 mb-4">Join the Club</h2>
        <motion.div initial={{ width: 0 }} whileInView={{ width: "3rem" }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }} className="h-[2px] bg-primary mx-auto mb-4" />
        <p className="text-[hsl(40,30%,60%)] text-sm mb-10">
          Be the first to know about new drops, exclusive designs, and special offers.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-0 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-5 py-4 bg-[hsl(30,10%,18%)] border border-[hsl(30,10%,25%)] text-[hsl(40,30%,85%)] text-sm placeholder:text-[hsl(30,8%,40%)] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all rounded-l-lg"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-7 py-4 bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 rounded-r-lg hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            {submitted ? <Check className="w-5 h-5" /> : <Send className="w-4 h-4" />}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
