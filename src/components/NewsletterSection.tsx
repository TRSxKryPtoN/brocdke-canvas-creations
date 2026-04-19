import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Bell } from "lucide-react";

const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/brocdke"; // TODO: replace with real channel invite link

const NewsletterSection = () => {
  return (
    <section className="section-padding hero-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#25D366]/[0.05] blur-3xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-3xl" />
      </div>

      {/* Floating dots */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#25D366]/30"
          style={{ left: `${20 + i * 20}%`, top: `${30 + (i % 2) * 40}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.5, 0.1] }}
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
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-xs tracking-[0.4em] uppercase text-[#25D366] font-medium px-4 py-1.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 backdrop-blur-sm"
        >
          <Bell className="w-3 h-3" /> Stay in the loop
        </motion.span>
        <h2 className="font-display text-4xl sm:text-5xl text-[hsl(40,30%,92%)] mt-5 mb-4">
          Join Our WhatsApp Channel
        </h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "3rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="h-[2px] bg-[#25D366] mx-auto mb-5"
        />
        <p className="text-[hsl(40,30%,65%)] text-sm sm:text-base mb-10 max-w-md mx-auto leading-relaxed">
          Get instant updates on new drops, exclusive designs, and special offers — straight to your WhatsApp.
        </p>

        <motion.a
          href={WHATSAPP_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white font-medium text-base shadow-lg shadow-[#25D366]/30 hover:shadow-2xl hover:shadow-[#25D366]/40 transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          Join WhatsApp Channel
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.a>

        <p className="text-[hsl(40,30%,45%)] text-xs mt-6">
          Free • No spam • Leave anytime
        </p>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
