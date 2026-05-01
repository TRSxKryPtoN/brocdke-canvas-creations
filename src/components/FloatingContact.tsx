import { motion, AnimatePresence } from "framer-motion";
import { Instagram, MessageCircle, Plus, X } from "lucide-react";
import { useState } from "react";

const FloatingContact = () => {
  const [open, setOpen] = useState(false);

  const items = [
    {
      Icon: MessageCircle,
      href: "https://wa.me/919999999999",
      label: "WhatsApp",
      color: "bg-[#25D366] text-white",
    },
    {
      Icon: Instagram,
      href: "https://www.instagram.com/brocdke.clothing/",
      label: "Instagram",
      color: "bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open &&
          items.map(({ Icon, href, label, color }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              initial={{ opacity: 0, y: 16, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.6 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 320, damping: 22 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative w-12 h-12 rounded-full ${color} shadow-lg shadow-black/20 flex items-center justify-center`}
            >
              <Icon className="w-5 h-5" />
              <span className="absolute right-full mr-3 px-2.5 py-1 rounded bg-foreground text-background text-[11px] tracking-widest uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {label}
              </span>
            </motion.a>
          ))}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 flex items-center justify-center"
      >
        {open ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        {!open && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{ scale: [1, 1.4, 1.4], opacity: [0.6, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </div>
  );
};

export default FloatingContact;
