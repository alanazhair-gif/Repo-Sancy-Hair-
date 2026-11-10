// Shop page content. Facts only from 02-SANCY-KNOWLEDGE.md and the product list in site.ts.
import { products, type Product } from "./site";

export type ShopGroup = {
  id: string;
  label: string;
  title: string;
  accent: string;
  intro: string;
  productIds: string[];
};

export const shopGroups: ShopGroup[] = [
  {
    id: "bulk-group",
    label: "Bulk",
    title: "Bulk hair,",
    accent: "sold by weight.",
    intro: "Loose hair for salons and makers who bond strand by strand. Our lowest price per kg.",
    productIds: ["bulk"],
  },
  {
    id: "weft-group",
    label: "Weft",
    title: "Three weft types,",
    accent: "one bundle size.",
    intro: "Straight, Genius and Flat Weft. Every line is sold in 100g bundles.",
    productIds: ["straight-weft", "genius-weft", "flat-weft"],
  },
  {
    id: "extensions-group",
    label: "Extensions",
    title: "Ready-made extensions",
    accent: "for salons and shops.",
    intro: "Keratin tips, tape-ins and clip-ins, priced per kg like the rest of the range.",
    productIds: ["keratin-tip", "tape-in", "clip-in"],
  },
  {
    id: "lace-group",
    label: "Lace",
    title: "Frontals and closures,",
    accent: "made by hand.",
    intro: "Made in our closure and frontal room. Price quoted on WhatsApp.",
    productIds: ["lace"],
  },
];

// Three short, checkable points per line. Nothing here is a number we have not confirmed.
export const productPoints: Record<string, string[]> = {
  bulk: [
    "Loose hair for keratin, micro and custom bonds",
    "Sold by weight: 100g bundles, 1 kg = 10 bundles",
    "Can be dyed and heat styled",
  ],
  "straight-weft": [
    "The lowest price of our three weft types",
    "Sold in 100g bundles, 1 kg = 10 bundles",
    "Can be dyed and heat styled",
  ],
  "genius-weft": [
    "One of three weft types: Straight, Genius, Flat",
    "Sold in 100g bundles, from 1 bundle",
    "Can be dyed and heat styled",
  ],
  "flat-weft": [
    "One of three weft types: Straight, Genius, Flat",
    "Sold in 100g bundles, from 1 bundle",
    "Can be dyed and heat styled",
  ],
  "keratin-tip": [
    "Five tip shapes: I, U, V, Flat and Nano",
    "Pre-bonded, priced per kg, MOQ 100g",
    "Can be dyed and heat styled",
  ],
  "tape-in": [
    "Tape extensions for salon installs",
    "Priced per kg, MOQ 100g",
    "Can be dyed and heat styled",
  ],
  "clip-in": [
    "Two styles: Normal and Seamless",
    "Clip-ins your clients can put on at home",
    "Priced per kg, MOQ 100g",
  ],
  lace: [
    "Frontal and closure",
    "Made by hand in our closure and frontal room",
    "Price quoted per order on WhatsApp",
  ],
};

// The "from" price for clip-ins is for the Normal style.
export const priceNotes: Record<string, string> = {
  "clip-in": "Clip-in Normal",
};

export const installGuide = [
  {
    how: "Strand by strand",
    detail: "Keratin, micro and custom bonds",
    lines: ["bulk", "keratin-tip"],
  },
  {
    how: "Salon installs",
    detail: "Tape or weft, fitted by a stylist",
    lines: ["tape-in", "straight-weft", "genius-weft", "flat-weft"],
  },
  {
    how: "At home",
    detail: "Clients put them on themselves",
    lines: ["clip-in"],
  },
  {
    how: "Lace work",
    detail: "Frontals and closures",
    lines: ["lace"],
  },
];

export const productById = (id: string): Product => {
  const found = products.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown product id: ${id}`);
  return found;
};
