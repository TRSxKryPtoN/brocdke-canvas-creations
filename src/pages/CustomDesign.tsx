import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, MessageCircle, Instagram, ArrowRight, Sparkles, Palette, PenTool, Shirt, Coffee, Phone, Crown, Droplets, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: PenTool, title: "Your Design", desc: "Upload your artwork or idea and we bring it to life" },
  { icon: Palette, title: "Color Freedom", desc: "Choose from unlimited color combinations" },
  { icon: Sparkles, title: "Premium Quality", desc: "High-quality print on demand with lasting finish" },
];

const productTypes = [
  { icon: Shirt, name: "T-Shirts", desc: "Cotton & polyester blends", color: "hsl(var(--primary))" },
  { icon: Phone, name: "Phone Covers", desc: "Hard & soft cases", color: "hsl(280, 70%, 55%)" },
  { icon: Coffee, name: "Mugs", desc: "Ceramic & magic mugs", color: "hsl(25, 80%, 55%)" },
  { icon: Droplets, name: "Bottles", desc: "Steel & sipper bottles", color: "hsl(200, 70%, 50%)" },
  { icon: Crown, name: "Caps", desc: "Snapback & dad caps", color: "hsl(340, 65%, 55%)" },
  { icon: ShoppingBag, name: "Tote Bags", desc: "Canvas & cotton bags", color: "hsl(150, 50%, 45%)" },
];

const WHATSAPP_NUMBER = "919XXXXXXXXX"; // TODO: replace with real number

const CustomDesign = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 10MB");
      return;
    }
    setUploadedFile(file);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
    toast.success("Design uploaded! Now pick a product and contact us.");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  // Try Web Share API first (mobile can attach the file straight into WhatsApp).
  // Fallback: download the design + open WhatsApp with a prefilled message asking the
  // user to attach it (one tap). WhatsApp does NOT support pre-attaching files via URL.
  const sendToWhatsApp = async (name: string, message: string) => {
    const productInfo = selectedProduct ? `\nProduct: ${selectedProduct}` : "";
    const designInfo = uploadedFile ? `\nDesign file: ${uploadedFile.name}` : "";
    const text = `Hi BROCDKE! I'm ${name}.\n\n${message}${productInfo}${designInfo}`;

    // 1) Mobile: try native share sheet with file attached
    if (uploadedFile && navigator.canShare?.({ files: [uploadedFile] })) {
      try {
        await navigator.share({
          title: "BROCDKE Custom Design",
          text,
          files: [uploadedFile],
        });
        toast.success("Shared! Pick WhatsApp from the share sheet.");
        return;
      } catch {
        // user cancelled or share failed — fall through to fallback
      }
    }

    // 2) Fallback: auto-download the file, then open WhatsApp Web/App with text
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = uploadedFile.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success("Design downloaded — attach it inside WhatsApp 📎", { duration: 6000 });
    }

    const whatsappMsg = encodeURIComponent(
      `${text}${uploadedFile ? "\n\n(I'll attach the design image in this chat 📎)" : ""}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`, "_blank");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = (form.get("name") as string)?.trim();
    const message = (form.get("message") as string)?.trim();
    if (!name || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    sendToWhatsApp(name, message);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero — taller, bolder */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden hero-dark">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-primary/15" />
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-10 left-[10%] w-80 h-80 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1.1, 0.9, 1.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-10 right-[5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"
          />
        </div>

        <div className="relative z-10 text-center px-6 py-36">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs tracking-[0.4em] uppercase text-primary mb-6 px-5 py-2 border border-primary/30 rounded-full backdrop-blur-md bg-primary/10"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Print on Demand Studio
            </motion.span>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-[hsl(var(--hero-fg))] mt-4 mb-6 leading-[0.95]">
              Your Vision,<br />
              <span className="text-primary">Our Craft</span>
            </h1>
            <p className="text-[hsl(40,30%,70%)] max-w-xl mx-auto text-lg sm:text-xl leading-relaxed">
              Upload your design, pick a product — we'll print it on premium quality items, just for you.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              <Button size="lg" className="text-base px-8 group" onClick={() => document.getElementById('product-picker')?.scrollIntoView({ behavior: 'smooth' })}>
                Start Designing
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a href="https://wa.me/919XXXXXXXXX" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 bg-transparent border-primary/40 text-[hsl(var(--hero-fg))] hover:bg-primary/15 hover:text-[hsl(var(--hero-fg))] hover:border-primary/60"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat With Us
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-secondary/30">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
              >
                <f.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <h3 className="font-display text-xl text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Product Picker */}
      <section id="product-picker" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm tracking-[0.3em] uppercase text-primary font-medium">Step 1</span>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground mt-2 mb-3">
              Pick Your Product
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Select what you'd like your design printed on
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {productTypes.map((product, i) => (
              <motion.button
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSelectedProduct(product.name);
                  toast.success(`${product.name} selected!`);
                }}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-center group ${
                  selectedProduct === product.name
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                    : "border-border hover:border-primary/40 hover:bg-card"
                }`}
              >
                {selectedProduct === product.name && (
                  <motion.div
                    layoutId="product-selected"
                    className="absolute inset-0 rounded-2xl border-2 border-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div
                  className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${product.color}15` }}
                >
                  <product.icon className="w-7 h-7" style={{ color: product.color }} />
                </div>
                <h3 className="font-display text-sm text-foreground mb-1">{product.name}</h3>
                <p className="text-muted-foreground text-[11px]">{product.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Upload + Contact */}
      <section className="section-padding bg-secondary/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm tracking-[0.3em] uppercase text-primary font-medium">Step 2</span>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground mt-2 mb-3">
              Upload & Connect
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Share your design and tell us what you need
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Upload Area */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display text-2xl text-foreground mb-2">Upload Your Design</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                JPG, PNG, or SVG up to 10MB
              </p>

              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
                  dragActive
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />

                <AnimatePresence mode="wait">
                  {preview ? (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="relative"
                    >
                      <img
                        src={preview}
                        alt="Design preview"
                        className="max-h-64 mx-auto rounded-lg shadow-lg"
                      />
                      <p className="text-sm text-muted-foreground mt-3 truncate">{fileName}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreview(null);
                          setFileName("");
                          setUploadedFile(null);
                        }}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Upload className="w-12 h-12 text-primary/60 mx-auto mb-4" />
                      </motion.div>
                      <p className="text-foreground font-medium mb-1">
                        Drag & drop your design here
                      </p>
                      <p className="text-muted-foreground text-sm">
                        or click to browse files
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Contact Form + Socials */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display text-2xl text-foreground mb-2">Let's Talk</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Tell us about your idea — we'll get back within 24 hours
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="name" placeholder="Your Name" className="bg-card" required />
                <Textarea name="message" placeholder="Describe your design idea, colors, quantity..." className="bg-card min-h-[110px]" required />
                {selectedProduct && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-sm text-primary"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Product: {selectedProduct}
                  </motion.div>
                )}
                {uploadedFile && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-muted-foreground px-1"
                  >
                    📎 Your design will be sent with the message (auto-downloaded so you can attach it in WhatsApp).
                  </motion.p>
                )}
                <Button type="submit" className="w-full group" size="lg">
                  Send via WhatsApp
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/919XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 transition-all group flex-1"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <div>
                    <p className="text-foreground font-medium text-sm">WhatsApp</p>
                    <p className="text-muted-foreground text-xs">Chat directly</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="https://www.instagram.com/brocdke.clothing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#E1306C]/10 hover:bg-[#E1306C]/20 border border-[#E1306C]/20 transition-all group flex-1"
                >
                  <Instagram className="w-5 h-5 text-[#E1306C]" />
                  <div>
                    <p className="text-foreground font-medium text-sm">Instagram</p>
                    <p className="text-muted-foreground text-xs">DM us ideas</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomDesign;
