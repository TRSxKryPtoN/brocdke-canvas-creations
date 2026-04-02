import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { storefrontApiRequest, STOREFRONT_PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    storefrontApiRequest(STOREFRONT_PRODUCT_BY_HANDLE_QUERY, { handle })
      .then(data => {
        const p = data?.data?.productByHandle;
        if (p) {
          setProduct(p);
          // Set default options
          const defaults: Record<string, string> = {};
          p.options?.forEach((opt: any) => { defaults[opt.name] = opt.values[0]; });
          setSelectedOptions(defaults);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [handle]);

  const getSelectedVariant = () => {
    if (!product) return null;
    return product.variants.edges.find((v: any) =>
      v.node.selectedOptions.every((so: any) => selectedOptions[so.name] === so.value)
    )?.node || product.variants.edges[0]?.node;
  };

  const handleAddToCart = async () => {
    const variant = getSelectedVariant();
    if (!variant || !product) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(`${product.title} added to cart`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center pt-32"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="text-center pt-32 text-foreground">Product not found</div>
      </div>
    );
  }

  const images = product.images.edges;
  const variant = getSelectedVariant();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Images */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="aspect-square rounded-lg overflow-hidden bg-card border border-border mb-4">
                {images[selectedImage]?.node ? (
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto">
                  {images.map((img: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-colors flex-shrink-0 ${
                        i === selectedImage ? 'border-primary' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <h1 className="font-display text-3xl sm:text-4xl text-foreground mb-2">{product.title}</h1>
              {variant && (
                <p className="text-2xl font-semibold text-primary mb-6">
                  {variant.price.currencyCode} {parseFloat(variant.price.amount).toFixed(2)}
                </p>
              )}

              {product.description && (
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">{product.description}</p>
              )}

              {/* Options */}
              {product.options?.filter((opt: any) => opt.name !== 'Title' || opt.values.length > 1).map((option: any) => (
                <div key={option.name} className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-2 block">{option.name}</label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((val: string) => (
                      <button
                        key={val}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [option.name]: val }))}
                        className={`px-4 py-2 text-sm rounded-md border transition-all ${
                          selectedOptions[option.name] === val
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity */}
              <div className="mb-8">
                <label className="text-sm font-medium text-foreground mb-2 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="w-4 h-4" /></Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}><Plus className="w-4 h-4" /></Button>
                </div>
              </div>

              <Button onClick={handleAddToCart} disabled={isLoading || !variant?.availableForSale} size="lg" className="w-full text-base">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : variant?.availableForSale ? "Add to Cart" : "Sold Out"}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductDetail;
