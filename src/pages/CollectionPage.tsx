import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore, dummyToCartItem } from "@/stores/cartStore";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDummyProductsByCategory, type DummyProduct } from "@/data/dummyProducts";

import catTshirts from "@/assets/cat-tshirts.jpg";
import catHoodies from "@/assets/cat-hoodies.jpg";
import catJerseys from "@/assets/cat-jerseys.jpg";
import catSweatshirts from "@/assets/cat-sweatshirts.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import catCaps from "@/assets/cat-caps.jpg";

const collectionMeta: Record<string, { title: string; subtitle: string; image: string; query: string }> = {
  "t-shirts": { title: "T-Shirts", subtitle: "Print on Demand", image: catTshirts, query: "product_type:T-Shirt OR title:*tshirt* OR title:*t-shirt*" },
  "hoodies": { title: "Hoodies", subtitle: "Premium Comfort", image: catHoodies, query: "product_type:Hoodie OR title:*hoodie*" },
  "jerseys": { title: "Jerseys", subtitle: "Custom Designs", image: catJerseys, query: "product_type:Jersey OR title:*jersey*" },
  "sweatshirts": { title: "Sweatshirts", subtitle: "Everyday Luxury", image: catSweatshirts, query: "product_type:Sweatshirt OR title:*sweatshirt*" },
  "accessories": { title: "Accessories", subtitle: "Frames · Keys · Crochet", image: catAccessories, query: "product_type:Accessory OR title:*keychain* OR title:*frame* OR title:*crochet*" },
  "caps": { title: "Caps", subtitle: "Top It Off", image: catCaps, query: "product_type:Cap OR title:*cap* OR title:*hat*" },
};

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [dummyFallback, setDummyFallback] = useState<DummyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  const meta = slug ? collectionMeta[slug] : null;

  useEffect(() => {
    if (!meta || !slug) return;
    setLoading(true);
    storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 50, query: meta.query })
      .then(data => {
        const shopifyProducts = data?.data?.products?.edges || [];
        setProducts(shopifyProducts);
        if (shopifyProducts.length === 0) {
          setDummyFallback(getDummyProductsByCategory(slug));
        }
      })
      .catch(() => {
        setDummyFallback(getDummyProductsByCategory(slug!));
      })
      .finally(() => setLoading(false));
  }, [slug, meta]);

  if (!meta) return <div className="min-h-screen flex items-center justify-center text-foreground">Collection not found</div>;

  const handleAddToCart = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(`${product.node.title} added to cart`);
  };

  const handleDummyAdd = async (product: DummyProduct) => {
    const cartItem = dummyToCartItem(product);
    await addItem(cartItem);
    setAddedIds(prev => new Set(prev).add(product.id));
    toast.success(`${product.title} added to cart!`);
    setTimeout(() => setAddedIds(prev => { const n = new Set(prev); n.delete(product.id); return n; }), 2000);
  };

  const useDummy = products.length === 0 && dummyFallback.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end overflow-hidden">
        <motion.img
          initial={{ scale: 1.15, filter: "blur(6px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5 }}
          src={meta.image}
          alt={meta.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(30,10%,10%)]/90 via-[hsl(30,10%,10%)]/40 to-transparent" />
        <div className="relative z-10 px-6 pb-12 max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-[hsl(40,30%,70%)] hover:text-[hsl(40,30%,90%)] text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <span className="block text-xs tracking-[0.4em] uppercase text-primary mb-2">{meta.subtitle}</span>
            <h1 className="font-display text-5xl sm:text-6xl text-[hsl(40,30%,92%)]">{meta.title}</h1>
            <motion.div initial={{ width: 0 }} animate={{ width: "4rem" }} transition={{ delay: 0.8, duration: 0.6 }} className="h-[2px] bg-primary mt-4" />
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : !useDummy && products.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="font-display text-2xl text-foreground mb-2">No products found</h2>
              <p className="text-muted-foreground">Products for this collection haven't been added yet.</p>
            </motion.div>
          ) : useDummy ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {dummyFallback.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                >
                  <div className="aspect-square overflow-hidden bg-secondary/20 relative">
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {product.sizes.length > 1 && (
                      <div className="absolute bottom-3 left-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        {product.sizes.slice(0, 5).map(s => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-sm text-foreground border border-border/50">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors truncate text-sm sm:text-base">{product.title}</h3>
                    <p className="text-muted-foreground text-xs mt-1 line-clamp-1">{product.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-primary font-bold text-lg">₹{product.price}</p>
                    </div>
                    <Button
                      onClick={() => handleDummyAdd(product)}
                      className="w-full mt-3 group/btn relative overflow-hidden"
                      size="sm"
                      variant={addedIds.has(product.id) ? "secondary" : "default"}
                    >
                      {addedIds.has(product.id) ? (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1">
                          <Check className="w-4 h-4" /> Added!
                        </motion.span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                        </span>
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {products.map((product, i) => {
                const img = product.node.images.edges[0]?.node;
                const price = product.node.priceRange.minVariantPrice;
                return (
                  <motion.div
                    key={product.node.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    whileHover={{ y: -8 }}
                    className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                  >
                    <Link to={`/product/${product.node.handle}`} className="block">
                      <div className="aspect-square overflow-hidden bg-secondary/20">
                        {img ? (
                          <motion.img whileHover={{ scale: 1.08 }} transition={{ duration: 0.6 }} src={img.url} alt={img.altText || product.node.title} className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                        )}
                      </div>
                    </Link>
                    <div className="p-4 sm:p-5">
                      <Link to={`/product/${product.node.handle}`}>
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">{product.node.title}</h3>
                      </Link>
                      <p className="text-primary font-bold mt-1 text-lg">
                        {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                      </p>
                      <Button onClick={() => handleAddToCart(product)} disabled={isLoading} className="w-full mt-3" size="sm">
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span className="flex items-center gap-1"><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</span>}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CollectionPage;
