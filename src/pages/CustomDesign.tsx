import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, MessageCircle, Instagram, ArrowRight, Sparkles, Palette, PenTool } from "lucide-react";
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

const CustomDesign = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);
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
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
    toast.success("Design uploaded! Now contact us to proceed.");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const message = form.get("message") as string;
    if (!name.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    const whatsappMsg = encodeURIComponent(
      `Hi BROCDKE! I'm ${name}. ${message}${fileName ? ` [Design: ${fileName}]` : ""}`
    );
    window.open(`https://wa.me/919XXXXXXXXX?text=${whatsappMsg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden hero-dark">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
          {/* Animated blurred shapes */}
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-[15%] w-64 h-64 bg-primary/15 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1.1, 0.9, 1.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-[10%] w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[80px]"
          />
        </div>

        <div className="relative z-10 text-center px-6 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-xs tracking-[0.5em] uppercase text-primary mb-4 px-4 py-1.5 border border-primary/30 rounded-full backdrop-blur-sm bg-primary/5">
              Custom Studio
            </span>
            <h1 className="font-display text-5xl sm:text-7xl text-[hsl(var(--hero-fg))] mt-4 mb-6">
              Your Vision,<br />
              <span className="text-primary">Our Craft</span>
            </h1>
            <p className="text-[hsl(40,30%,70%)] max-w-lg mx-auto text-lg">
              Upload your design or share your idea — we'll print it on premium apparel just for you.
            </p>
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

      {/* Upload + Contact */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-2">Upload Your Design</h2>
            <p className="text-muted-foreground mb-8">
              Share your artwork — JPG, PNG, or SVG up to 10MB
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
            <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-2">Let's Talk</h2>
            <p className="text-muted-foreground mb-8">
              Tell us about your idea — we'll get back to you within 24 hours
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input name="name" placeholder="Your Name" className="bg-card" required />
              <Textarea name="message" placeholder="Describe your design idea, preferred garment, colors, quantity..." className="bg-card min-h-[120px]" required />
              <Button type="submit" className="w-full group">
                Send via WhatsApp
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/919XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 transition-all group"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <div>
                  <p className="text-foreground font-medium text-sm">WhatsApp</p>
                  <p className="text-muted-foreground text-xs">Chat with us directly</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://instagram.com/brocdke"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#E1306C]/10 hover:bg-[#E1306C]/20 border border-[#E1306C]/20 transition-all group"
              >
                <Instagram className="w-5 h-5 text-[#E1306C]" />
                <div>
                  <p className="text-foreground font-medium text-sm">Instagram</p>
                  <p className="text-muted-foreground text-xs">DM us your ideas</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomDesign;
