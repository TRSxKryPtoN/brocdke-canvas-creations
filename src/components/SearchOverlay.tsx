import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { dummyProducts, type DummyProduct } from "@/data/dummyProducts";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return dummyProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [query]);

  const categoryMap: Record<string, DummyProduct[]> = {};
  results.forEach((p) => {
    if (!categoryMap[p.category]) categoryMap[p.category] = [];
    categoryMap[p.category].push(p);
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-2xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="max-w-2xl mx-auto px-6 pt-24"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="w-full pl-14 pr-14 py-5 bg-card border border-border rounded-2xl text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-2xl shadow-background/50"
              />
              <button
                onClick={onClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {query.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 max-h-[60vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-xl"
              >
                {results.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No products found for "{query}"</p>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {Object.entries(categoryMap).map(([cat, products]) => (
                      <div key={cat}>
                        <div className="flex items-center justify-between mb-2 px-2">
                          <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">
                            {cat}
                          </span>
                          <Link
                            to={`/collection/${cat}`}
                            onClick={onClose}
                            className="text-[10px] tracking-wider uppercase text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                          >
                            View All <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                        {products.slice(0, 3).map((p, i) => (
                          <motion.div
                            key={p.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Link
                              to={`/collection/${p.category}`}
                              onClick={onClose}
                              className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors group"
                            >
                              <div className="w-14 h-14 rounded-lg overflow-hidden bg-secondary/30 flex-shrink-0">
                                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                                  {p.title}
                                </h4>
                                <p className="text-xs text-muted-foreground truncate">{p.description}</p>
                              </div>
                              <span className="text-sm font-semibold text-primary flex-shrink-0">₹{p.price}</span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {!query.trim() && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <p className="text-sm text-muted-foreground mb-4">Popular searches</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["T-Shirts", "Hoodies", "Jerseys", "Caps", "Accessories"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
