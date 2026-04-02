import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  const meta = slug ? collectionMeta[slug] : null;

  useEffect(() => {
    if (!meta) return;
    setLoading(true);
    storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 50, query: meta.query })
      .then(data => {
        setProducts(data?.data?.products?.edges || []);
      })
      .catch(console.error)
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
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
          ) : products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="font-display text-2xl text-foreground mb-2">No products found</h2>
              <p className="text-muted-foreground">Products for this collection haven't been added yet.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, i) => {
                const img = product.node.images.edges[0]?.node;
                const price = product.node.priceRange.minVariantPrice;
                return (
                  <motion.div
                    key={product.node.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                  >
                    <Link to={`/product/${product.node.handle}`} className="block">
                      <div className="aspect-square overflow-hidden bg-secondary/20">
                        {img ? (
                          <motion.img
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.5 }}
                            src={img.url}
                            alt={img.altText || product.node.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                        )}
                      </div>
                    </Link>
                    <div className="p-5">
                      <Link to={`/product/${product.node.handle}`}>
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">{product.node.title}</h3>
                      </Link>
                      <p className="text-primary font-semibold mt-1">
                        {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                      </p>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={isLoading}
                        className="w-full mt-4"
                        size="sm"
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add to Cart"}
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
