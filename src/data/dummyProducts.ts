export interface DummyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: string;
  currency: string;
  image: string;
  category: string;
  sizes: string[];
}

const placeholder = (text: string) =>
  `https://placehold.co/600x600/1a1a1a/d4a574?text=${encodeURIComponent(text)}`;

export const dummyProducts: DummyProduct[] = [
  // T-Shirts
  { id: "ts-1", title: "BROCDKE Classic Tee", handle: "brocdke-classic-tee", description: "Premium cotton oversized tee with embossed logo", price: "599", currency: "INR", image: placeholder("Classic+Tee"), category: "t-shirts", sizes: ["S","M","L","XL","XXL"] },
  { id: "ts-2", title: "Midnight Skull Print", handle: "midnight-skull-print", description: "Dark aesthetic skull graphic tee", price: "699", currency: "INR", image: placeholder("Skull+Tee"), category: "t-shirts", sizes: ["S","M","L","XL"] },
  { id: "ts-3", title: "Urban Street Tee", handle: "urban-street-tee", description: "Street-style oversized fit with abstract print", price: "749", currency: "INR", image: placeholder("Urban+Tee"), category: "t-shirts", sizes: ["M","L","XL","XXL"] },
  { id: "ts-4", title: "Retro Wave Tee", handle: "retro-wave-tee", description: "Vintage retro wave design on soft cotton", price: "649", currency: "INR", image: placeholder("Retro+Tee"), category: "t-shirts", sizes: ["S","M","L","XL"] },
  { id: "ts-5", title: "Minimalist Logo Tee", handle: "minimalist-logo-tee", description: "Clean minimal BROCDKE logo placement", price: "549", currency: "INR", image: placeholder("Minimal+Tee"), category: "t-shirts", sizes: ["S","M","L","XL","XXL"] },
  { id: "ts-6", title: "Graffiti Art Tee", handle: "graffiti-art-tee", description: "Bold graffiti artwork on premium fabric", price: "799", currency: "INR", image: placeholder("Graffiti+Tee"), category: "t-shirts", sizes: ["M","L","XL"] },

  // Hoodies
  { id: "hd-1", title: "BROCDKE Signature Hoodie", handle: "brocdke-signature-hoodie", description: "Premium fleece hoodie with embroidered logo", price: "1499", currency: "INR", image: placeholder("Signature+Hoodie"), category: "hoodies", sizes: ["S","M","L","XL","XXL"] },
  { id: "hd-2", title: "Stealth Black Hoodie", handle: "stealth-black-hoodie", description: "All-black pullover with subtle branding", price: "1399", currency: "INR", image: placeholder("Stealth+Hoodie"), category: "hoodies", sizes: ["M","L","XL"] },
  { id: "hd-3", title: "Tie-Dye Oversized Hoodie", handle: "tie-dye-hoodie", description: "Unique tie-dye pattern on oversized fit", price: "1699", currency: "INR", image: placeholder("TieDye+Hoodie"), category: "hoodies", sizes: ["S","M","L","XL"] },
  { id: "hd-4", title: "Winter Fleece Hoodie", handle: "winter-fleece-hoodie", description: "Extra warm fleece-lined hoodie for winter", price: "1799", currency: "INR", image: placeholder("Fleece+Hoodie"), category: "hoodies", sizes: ["M","L","XL","XXL"] },

  // Jerseys
  { id: "jr-1", title: "BROCDKE Sports Jersey", handle: "brocdke-sports-jersey", description: "Breathable mesh sports jersey", price: "899", currency: "INR", image: placeholder("Sports+Jersey"), category: "jerseys", sizes: ["S","M","L","XL","XXL"] },
  { id: "jr-2", title: "Retro Basketball Jersey", handle: "retro-basketball-jersey", description: "90s inspired basketball jersey design", price: "999", currency: "INR", image: placeholder("Basket+Jersey"), category: "jerseys", sizes: ["M","L","XL"] },
  { id: "jr-3", title: "Custom Name Jersey", handle: "custom-name-jersey", description: "Personalized jersey with your name & number", price: "1199", currency: "INR", image: placeholder("Custom+Jersey"), category: "jerseys", sizes: ["S","M","L","XL","XXL"] },
  { id: "jr-4", title: "Streetball Jersey", handle: "streetball-jersey", description: "Urban streetball inspired design", price: "949", currency: "INR", image: placeholder("Street+Jersey"), category: "jerseys", sizes: ["M","L","XL"] },

  // Sweatshirts
  { id: "sw-1", title: "BROCDKE Crew Sweatshirt", handle: "brocdke-crew-sweatshirt", description: "Classic crew neck with chest logo", price: "1099", currency: "INR", image: placeholder("Crew+Sweat"), category: "sweatshirts", sizes: ["S","M","L","XL"] },
  { id: "sw-2", title: "Acid Wash Sweatshirt", handle: "acid-wash-sweatshirt", description: "Trendy acid wash finish", price: "1299", currency: "INR", image: placeholder("AcidWash+Sweat"), category: "sweatshirts", sizes: ["M","L","XL"] },
  { id: "sw-3", title: "Oversized Drop Shoulder", handle: "oversized-drop-shoulder", description: "Relaxed drop-shoulder silhouette", price: "1199", currency: "INR", image: placeholder("Drop+Sweat"), category: "sweatshirts", sizes: ["S","M","L","XL","XXL"] },
  { id: "sw-4", title: "Embroidered Crewneck", handle: "embroidered-crewneck", description: "Premium embroidered artwork crewneck", price: "1399", currency: "INR", image: placeholder("Emb+Sweat"), category: "sweatshirts", sizes: ["M","L","XL"] },

  // Caps
  { id: "cp-1", title: "BROCDKE Snapback", handle: "brocdke-snapback", description: "Classic snapback with 3D embroidered logo", price: "499", currency: "INR", image: placeholder("Snapback"), category: "caps", sizes: ["One Size"] },
  { id: "cp-2", title: "Dad Cap Vintage", handle: "dad-cap-vintage", description: "Washed cotton vintage dad cap", price: "449", currency: "INR", image: placeholder("Dad+Cap"), category: "caps", sizes: ["One Size"] },
  { id: "cp-3", title: "Trucker Mesh Cap", handle: "trucker-mesh-cap", description: "Breathable mesh trucker style", price: "399", currency: "INR", image: placeholder("Trucker+Cap"), category: "caps", sizes: ["One Size"] },
  { id: "cp-4", title: "Beanie Knit Cap", handle: "beanie-knit-cap", description: "Warm knitted beanie with BROCDKE tag", price: "349", currency: "INR", image: placeholder("Beanie"), category: "caps", sizes: ["One Size"] },

  // Accessories
  { id: "ac-1", title: "BROCDKE Keychain", handle: "brocdke-keychain", description: "Metal logo keychain with leather strap", price: "199", currency: "INR", image: placeholder("Keychain"), category: "accessories", sizes: ["One Size"] },
  { id: "ac-2", title: "Photo Frame Classic", handle: "photo-frame-classic", description: "Wooden photo frame with brand engraving", price: "599", currency: "INR", image: placeholder("Photo+Frame"), category: "accessories", sizes: ["One Size"] },
  { id: "ac-3", title: "Crochet Bag", handle: "crochet-bag", description: "Handmade crochet tote bag", price: "799", currency: "INR", image: placeholder("Crochet+Bag"), category: "accessories", sizes: ["One Size"] },
  { id: "ac-4", title: "Wrist Band Set", handle: "wrist-band-set", description: "Pack of 3 branded silicone wristbands", price: "149", currency: "INR", image: placeholder("Wrist+Band"), category: "accessories", sizes: ["One Size"] },
  { id: "ac-5", title: "Crochet Phone Case", handle: "crochet-phone-case", description: "Custom crochet phone case cover", price: "349", currency: "INR", image: placeholder("Crochet+Case"), category: "accessories", sizes: ["One Size"] },

  // Crochets — handmade
  { id: "cr-1", title: "Crochet Tote Bag", handle: "crochet-tote-bag", description: "Spacious handmade crochet tote in earthy tones", price: "899", currency: "INR", image: placeholder("Crochet+Tote"), category: "crochets", sizes: ["One Size"] },
  { id: "cr-2", title: "Crochet Bucket Hat", handle: "crochet-bucket-hat", description: "Trendy handmade crochet bucket hat", price: "549", currency: "INR", image: placeholder("Crochet+Hat"), category: "crochets", sizes: ["One Size"] },
  { id: "cr-3", title: "Crochet Flower Bouquet", handle: "crochet-flower-bouquet", description: "Everlasting handcrafted crochet flower bouquet", price: "1199", currency: "INR", image: placeholder("Crochet+Flowers"), category: "crochets", sizes: ["One Size"] },
  { id: "cr-4", title: "Crochet Phone Sling", handle: "crochet-phone-sling", description: "Cute crossbody phone sling in soft yarn", price: "499", currency: "INR", image: placeholder("Crochet+Sling"), category: "crochets", sizes: ["One Size"] },
  { id: "cr-5", title: "Crochet Coaster Set", handle: "crochet-coaster-set", description: "Set of 4 boho crochet coasters", price: "299", currency: "INR", image: placeholder("Crochet+Coasters"), category: "crochets", sizes: ["Set of 4"] },
  { id: "cr-6", title: "Crochet Keychain Charm", handle: "crochet-keychain-charm", description: "Adorable mini crochet animal keychain", price: "199", currency: "INR", image: placeholder("Crochet+Charm"), category: "crochets", sizes: ["One Size"] },
  { id: "cr-7", title: "Crochet Headband", handle: "crochet-headband", description: "Soft crochet headband with bow detail", price: "349", currency: "INR", image: placeholder("Crochet+Band"), category: "crochets", sizes: ["One Size"] },
  { id: "cr-8", title: "Crochet Plushie", handle: "crochet-plushie", description: "Handmade amigurumi crochet plushie", price: "799", currency: "INR", image: placeholder("Crochet+Plush"), category: "crochets", sizes: ["One Size"] },
];

export function getDummyProductsByCategory(slug: string): DummyProduct[] {
  return dummyProducts.filter(p => p.category === slug);
}
