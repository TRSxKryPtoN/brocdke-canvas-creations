import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Instagram, MessageCircle, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";

type Section = { heading: string; body: string[] };
type InfoContent = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Section[];
};

const CONTENT: Record<string, InfoContent> = {
  "about-us": {
    eyebrow: "Our Story",
    title: "About BROCDKE",
    intro:
      "BROCDKE is an independent label crafting custom print-on-demand clothing, handcrafted accessories, and limited drops that let you wear your story.",
    sections: [
      {
        heading: "Who We Are",
        body: [
          "We started BROCDKE with a simple idea — that everyday wear can carry meaning. Every piece we make is either printed on demand or hand-crafted in small batches, so nothing is mass-produced and nothing goes to waste.",
        ],
      },
      {
        heading: "What We Stand For",
        body: [
          "Quality fabrics, honest pricing, and designs that don't follow trends — they start them. From custom tees and hoodies to crochet pieces, we put care into every stitch and every print.",
        ],
      },
    ],
  },
  contact: {
    eyebrow: "Get in Touch",
    title: "Contact Us",
    intro:
      "Questions about an order, a custom design, or a wholesale enquiry? We're easy to reach.",
    sections: [
      {
        heading: "WhatsApp",
        body: ["Fastest way to reach us — message us on WhatsApp for orders, custom designs, and quick replies."],
      },
      {
        heading: "Instagram",
        body: ["DM us @brocdke.clothing for design enquiries, drop updates, or just to say hi."],
      },
      {
        heading: "Hours",
        body: ["Monday – Saturday, 10:00 AM – 7:00 PM IST. We reply to every message, usually within a few hours."],
      },
    ],
  },
  shipping: {
    eyebrow: "Delivery",
    title: "Shipping Information",
    intro:
      "We ship pan-India and accept select international orders on request. Here's what to expect.",
    sections: [
      {
        heading: "Processing Time",
        body: [
          "Ready-to-ship items dispatch within 1–2 business days. Print-on-demand and crochet pieces are made-to-order and take 4–7 business days to craft before dispatch.",
        ],
      },
      {
        heading: "Delivery Time",
        body: [
          "Metro cities: 3–5 business days after dispatch.",
          "Rest of India: 5–8 business days after dispatch.",
          "International: 10–18 business days, calculated at checkout.",
        ],
      },
      {
        heading: "Shipping Charges",
        body: [
          "Free shipping on all prepaid orders above ₹999. Standard rates apply on orders below this and on Cash on Delivery.",
        ],
      },
    ],
  },
  returns: {
    eyebrow: "Policy",
    title: "Returns & Exchanges",
    intro:
      "We want you to love what you wear. Here's how returns and exchanges work at BROCDKE.",
    sections: [
      {
        heading: "Eligibility",
        body: [
          "Standard items can be returned or exchanged within 7 days of delivery, provided they're unworn, unwashed, and have all original tags.",
        ],
      },
      {
        heading: "Custom & Print-on-Demand",
        body: [
          "Custom-printed and crochet pieces are made-to-order and are not eligible for return or exchange unless the item is damaged or defective on arrival. Please share unboxing photos within 48 hours of delivery if there's an issue — we'll make it right.",
        ],
      },
      {
        heading: "How to Initiate",
        body: [
          "Message us on WhatsApp or Instagram with your order ID and reason for return. We'll arrange a pickup and process your refund or exchange within 5–7 business days of receiving the item.",
        ],
      },
    ],
  },
  faqs: {
    eyebrow: "Help Center",
    title: "Frequently Asked Questions",
    intro: "Quick answers to the things people ask us most.",
    sections: [
      {
        heading: "How does Print on Demand work?",
        body: [
          "Pick a product, upload your artwork on the Custom Design page, and confirm the order over WhatsApp. We print, quality-check, and ship — usually within 7 business days.",
        ],
      },
      {
        heading: "Do you offer Cash on Delivery?",
        body: ["Yes, COD is available across India on most orders. A small handling fee may apply."],
      },
      {
        heading: "Can I cancel or modify my order?",
        body: [
          "Standard orders can be modified within 12 hours of placing them. Custom and crochet orders can't be cancelled once production has begun.",
        ],
      },
      {
        heading: "Do you do bulk or wholesale orders?",
        body: [
          "Absolutely. Reach out on WhatsApp with your requirement and we'll send you a custom quote.",
        ],
      },
    ],
  },
  "privacy-policy": {
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro:
      "Your privacy matters. Here's a plain-language summary of how we handle your information.",
    sections: [
      {
        heading: "What We Collect",
        body: [
          "Name, contact details, shipping address, and order history — only what's needed to fulfil your order and stay in touch about it.",
        ],
      },
      {
        heading: "How We Use It",
        body: [
          "To process orders, ship products, respond to enquiries, and occasionally share updates about new drops if you've opted in.",
        ],
      },
      {
        heading: "Sharing",
        body: [
          "We never sell your data. We share only what's necessary with shipping partners and payment processors to deliver your order.",
        ],
      },
      {
        heading: "Your Rights",
        body: [
          "You can ask us to update or delete your data at any time by reaching out on WhatsApp or Instagram.",
        ],
      },
    ],
  },
  "terms-of-service": {
    eyebrow: "Legal",
    title: "Terms of Service",
    intro: "By using brocdke.com you agree to the terms below.",
    sections: [
      {
        heading: "Orders",
        body: [
          "Placing an order is an offer to buy. We reserve the right to accept or decline any order at our discretion (e.g. stock issues, suspected fraud).",
        ],
      },
      {
        heading: "Pricing",
        body: [
          "All prices are in INR and inclusive of applicable taxes unless stated otherwise. We may update prices without notice; the price you pay is the one shown at checkout.",
        ],
      },
      {
        heading: "Intellectual Property",
        body: [
          "All BROCDKE branding, designs, and content are owned by us. For Print on Demand orders, you confirm you own the rights to any artwork you upload.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "Our liability is limited to the value of the order. We're not responsible for indirect losses or for delays caused by shipping carriers or events outside our control.",
        ],
      },
    ],
  },
};

const InfoPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const content = slug ? CONTENT[slug] : undefined;

  if (!content) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs tracking-[0.4em] uppercase text-primary mb-4">
              {content.eyebrow}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-5 leading-tight">
              {content.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              {content.intro}
            </p>

            <div className="space-y-10">
              {content.sections.map((section, i) => (
                <motion.section
                  key={section.heading}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                >
                  <h2 className="font-display text-2xl text-foreground mb-3">
                    {section.heading}
                  </h2>
                  {section.body.map((p, j) => (
                    <p
                      key={j}
                      className="text-muted-foreground leading-relaxed mb-3 last:mb-0"
                    >
                      {p}
                    </p>
                  ))}
                </motion.section>
              ))}
            </div>

            {slug === "contact" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-12 flex flex-wrap gap-3"
              >
                <a
                  href="https://wa.me/919XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-medium hover:scale-105 transition-transform"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Us
                </a>
                <a
                  href="https://www.instagram.com/brocdke.clothing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground hover:bg-secondary transition-colors"
                >
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
                <a
                  href="mailto:hello@brocdke.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground hover:bg-secondary transition-colors"
                >
                  <Mail className="w-4 h-4" /> Email
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InfoPage;
