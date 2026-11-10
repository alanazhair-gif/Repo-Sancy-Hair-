// Shop collections (category pages) and the products listed on them.
// Facts only from 02-SANCY-KNOWLEDGE.md and site.ts. Colors are named by code only:
// English color names are still waiting for approval.
import { aboutLinks, colorCodes, jetBlack, products, type PhotoBrief, type Product } from "./site";

export type MenuGroupId = "need" | "bulk" | "weft" | "keratin" | "tape" | "clip" | "lace" | "texture" | "set";

export type Collection = {
  slug: string;
  name: string;
  group: MenuGroupId;
  // Product line in site.ts this collection sells. null = mixed (the #1 Jet Black collection).
  lineId: string | null;
  // Shape or style inside a line, e.g. "I Tip". Used in item titles.
  subtype?: string;
  // Prices are public for the line, but not for this style.
  quoted?: boolean;
  title: string;
  accent: string;
  intro: string;
  // Own photo slot (placeholder until the team drops the file in).
  photo?: PhotoBrief;
  // Fixed list of products, all priced on WhatsApp. Used for lines without a public price list.
  customItems?: string[];
  // Not yet confirmed by the owner: shown on the demo, flagged for review before going live.
  pending?: boolean;
};

export type ShopItem = {
  id: string;
  title: string;
  code: string | null;
  swatch: string | null;
  tier: "jet" | "colors" | null;
  perKg: number | null;
  photo: PhotoBrief;
  message: string;
};

const line = (id: string): Product => {
  const found = products.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown product line: ${id}`);
  return found;
};

export const collections: Collection[] = [
  {
    slug: "jet-black",
    name: "#1 Jet Black, every line",
    group: "need",
    lineId: null,
    title: "#1 Jet Black,",
    accent: "every line.",
    intro: "Our only black. One price tier of its own, and the lowest price on every line.",
  },
  {
    slug: "bulk",
    name: "Bulk Hair",
    group: "bulk",
    lineId: "bulk",
    title: "Bulk hair,",
    accent: "sold by weight.",
    intro: "Loose hair for strand-by-strand work: keratin, micro and custom bonds. Our lowest price per kg.",
  },
  {
    slug: "straight-weft",
    name: "Straight Weft",
    group: "weft",
    lineId: "straight-weft",
    title: "Straight Weft,",
    accent: "in 100g bundles.",
    intro: "The lowest price of our three weft types. Sold in 100g bundles, 1 kg = 10 bundles.",
  },
  {
    slug: "genius-weft",
    name: "Genius Weft",
    group: "weft",
    lineId: "genius-weft",
    title: "Genius Weft,",
    accent: "in 100g bundles.",
    intro: "One of three weft types: Straight, Genius and Flat. Sold in 100g bundles.",
  },
  {
    slug: "flat-weft",
    name: "Flat Weft",
    group: "weft",
    lineId: "flat-weft",
    title: "Flat Weft,",
    accent: "in 100g bundles.",
    intro: "One of three weft types: Straight, Genius and Flat. Sold in 100g bundles.",
  },
  {
    slug: "keratin-tip",
    name: "All Keratin Tips",
    group: "keratin",
    lineId: "keratin-tip",
    title: "Keratin tips,",
    accent: "five shapes.",
    intro: "Pre-bonded tips in I, U, V, Flat and Nano. Every shape has the same price per kg.",
  },
  ...["I", "U", "V", "Flat", "Nano"].map(
    (shape): Collection => ({
      slug: `keratin-${shape.toLowerCase()}-tip`,
      name: `${shape} Tip`,
      group: "keratin",
      lineId: "keratin-tip",
      subtype: `${shape} Tip`,
      title: `${shape} Tip,`,
      accent: "pre-bonded.",
      intro: `Keratin ${shape} Tip, priced per kg like every keratin shape. MOQ 100g.`,
    }),
  ),
  {
    slug: "tape-in",
    name: "Tape-in",
    group: "tape",
    lineId: "tape-in",
    title: "Tape-in,",
    accent: "for salon installs.",
    intro: "Tape extensions for salon installs. Priced per kg, MOQ 100g.",
  },
  {
    slug: "clip-in",
    name: "All Clip-ins",
    group: "clip",
    lineId: "clip-in",
    title: "Clip-ins,",
    accent: "worn at home.",
    intro: "Clip-ins your clients can put on at home, in Normal and Seamless. Prices shown are for Normal.",
  },
  {
    slug: "clip-in-normal",
    name: "Normal Clip-in",
    group: "clip",
    lineId: "clip-in",
    subtype: "Normal",
    title: "Normal Clip-in,",
    accent: "on and off at home.",
    intro: "Clip-ins your clients can put on at home. Priced per kg, MOQ 100g.",
  },
  {
    slug: "clip-in-seamless",
    name: "Seamless Clip-in",
    group: "clip",
    lineId: "clip-in",
    subtype: "Seamless",
    quoted: true,
    title: "Seamless Clip-in,",
    accent: "priced on request.",
    intro: "The Seamless style of our clip-ins. Send the color code on WhatsApp for the price.",
  },
  {
    slug: "lace",
    name: "All Lace",
    group: "lace",
    lineId: "lace",
    title: "Frontals and closures,",
    accent: "made by hand.",
    intro: "Made by hand in our closure and frontal room. Price quoted per order on WhatsApp.",
  },
  ...["Frontal", "Closure"].map(
    (type): Collection => ({
      slug: `lace-${type.toLowerCase()}`,
      name: `Lace ${type}`,
      group: "lace",
      lineId: "lace",
      subtype: type,
      quoted: true,
      title: `Lace ${type.toLowerCase()},`,
      accent: "made by hand.",
      intro: `Lace ${type.toLowerCase()}, made by hand in our closure and frontal room. Price quoted per order on WhatsApp.`,
    }),
  ),
  // [cần sếp xác nhận] Textures, lace sizes and bundle sets below are on the demo only.
  ...[
    ["bone-straight", "Bone Straight"],
    ["curly", "Curly"],
    ["body-wave", "Body Wave"],
    ["loose-wave", "Loose Wave"],
    ["deep-wave", "Deep Wave"],
  ].map(
    ([id, label]): Collection => ({
      slug: `${id}-bundles`,
      name: `${label} Bundles`,
      group: "texture",
      lineId: "straight-weft",
      quoted: true,
      pending: true,
      title: `${label},`,
      accent: "in 100g bundles.",
      intro: `${label} bundles, sold by the 100g bundle. Send the length and color on WhatsApp for the price.`,
      photo: { file: `products/${id}-bundles.jpg`, alt: `${label} bundles`, brief: `Bundle ${label} trải trên nền sáng`, size: "1200×900" },
      customItems: [50, 55, 60, 65, 70].map((cm) => `${label} Bundle, ${cm}cm / ${Math.round(cm / 2.5)}"`),
    }),
  ),
  ...[
    ["closure-2x4-2x6", "2x4, 2x6 Closure", ["Lace Closure 2x4", "Lace Closure 2x6"]],
    ["closure-4x4-5x5", "4x4, 5x5 Closure", ["Lace Closure 4x4", "Lace Closure 5x5"]],
    ["closure-6x6-7x7", "6x6, 7x7 Closure", ["Lace Closure 6x6", "Lace Closure 7x7"]],
    ["frontal-13x4-13x6", "13x4, 13x6 Frontal", ["Lace Frontal 13x4", "Lace Frontal 13x6"]],
  ].map(
    ([id, label, items]): Collection => ({
      slug: `lace-${id as string}`,
      name: label as string,
      group: "lace",
      lineId: "lace",
      quoted: true,
      pending: true,
      title: `${label as string},`,
      accent: "made by hand.",
      intro: "Made by hand in our closure and frontal room. Price quoted per order on WhatsApp.",
      customItems: items as string[],
    }),
  ),
  ...[
    ["3-bundles", "3 Bundles", "3 bundles of the same length and color, in one order.", ["3 Bundles, 300g"]],
    ["4-bundles", "4 Bundles Set", "4 bundles packed as one set.", ["4 Bundles Set, 400g"]],
    [
      "bundles-lace",
      "Bundles + Closure or Frontal",
      "Bundles with a matching closure or frontal, quoted as one order.",
      ["3 Bundles + Lace Closure", "3 Bundles + Lace Frontal"],
    ],
  ].map(
    ([id, label, intro, items]): Collection => ({
      slug: `set-${id as string}`,
      name: label as string,
      group: "set",
      lineId: "straight-weft",
      quoted: true,
      pending: true,
      title: `${label as string},`,
      accent: "one quote.",
      intro: `${intro as string} Price on WhatsApp.`,
      customItems: items as string[],
    }),
  ),
];

export const collectionBySlug = (slug: string) => collections.find((c) => c.slug === slug);

const colorItems = (c: Collection, p: Product): ShopItem[] => {
  const label = c.subtype && p.id !== "clip-in" ? `Keratin ${c.subtype}` : c.subtype ? `${c.subtype} ${p.name}` : p.name;
  const all = [{ code: jetBlack.code, swatch: jetBlack.swatch, tier: "jet" as const }, ...colorCodes.map((x) => ({ ...x, tier: "colors" as const }))];
  return all.map(({ code, swatch, tier }) => {
    const price = tier === "jet" ? p.fromJetBlack : p.fromColors;
    const title = `${code}${code === jetBlack.code ? " Jet Black" : ""} ${label}`;
    return {
      id: `${c.slug}-${code}`,
      title,
      code,
      swatch,
      tier,
      perKg: c.quoted ? null : price,
      photo: p.photo,
      message: `PRICE ${title}`,
    };
  });
};

export function collectionItems(c: Collection): ShopItem[] {
  if (c.lineId === null) {
    return products
      .filter((p) => p.fromJetBlack !== null)
      .map((p) => ({
        id: `jet-${p.id}`,
        title: `#1 Jet Black ${p.name}`,
        code: jetBlack.code,
        swatch: jetBlack.swatch,
        tier: "jet",
        perKg: p.fromJetBlack,
        photo: p.photo,
        message: `PRICE #1 Jet Black ${p.name}`,
      }));
  }
  const p = line(c.lineId);
  if (c.customItems) {
    return c.customItems.map((title, i) => ({
      id: `${c.slug}-${i}`,
      title,
      code: null,
      swatch: null,
      tier: null,
      perKg: null,
      photo: c.photo ?? p.photo,
      message: `PRICE ${title}`,
    }));
  }
  if (p.id === "lace") {
    return ["Frontal", "Closure"].filter((type) => !c.subtype || c.subtype === type).map((type) => ({
      id: `lace-${type.toLowerCase()}`,
      title: `Lace ${type}`,
      code: null,
      swatch: null,
      tier: null,
      perKg: null,
      photo: p.photo,
      message: `PRICE Lace ${type}`,
    }));
  }
  return colorItems(c, p);
}

export const collectionPhoto = (c: Collection): PhotoBrief => c.photo ?? line(c.lineId ?? "bulk").photo;

export const collectionFromPrice = (c: Collection): number | null =>
  c.quoted ? null : c.lineId === null ? Math.min(...collectionItems(c).map((i) => i.perKg ?? Infinity)) : line(c.lineId).fromJetBlack;

export type MenuLink = { label: string; href: string };
export type MenuGroup = { id: string; title: string; href: string; links: MenuLink[] };

const toLink = (c: Collection): MenuLink => ({ label: c.name, href: `/shop/${c.slug}` });
const groupLinks = (g: MenuGroupId) => collections.filter((c) => c.group === g).map(toLink);

// Every menu group. Also used for breadcrumbs on collection pages.
export const menuGroups: MenuGroup[] = [
  {
    id: "need",
    title: "Shop by need",
    href: "/shop",
    links: [
      ...groupLinks("need"),
      { label: "21 colors, one price", href: "/color-chart" },
      { label: "Start with 100g", href: "/wholesale-terms" },
    ],
  },
  { id: "bulk", title: "Bulk Hair", href: "/shop/bulk", links: groupLinks("bulk") },
  { id: "weft", title: "Weft Hair", href: "/shop#weft-group", links: groupLinks("weft") },
  { id: "keratin", title: "Keratin Tip", href: "/shop/keratin-tip", links: groupLinks("keratin") },
  { id: "tape", title: "Tape-in", href: "/shop/tape-in", links: groupLinks("tape") },
  { id: "clip", title: "Clip-in", href: "/shop/clip-in", links: groupLinks("clip") },
  {
    id: "lace",
    title: "Lace Closure / Frontal",
    href: "/shop/lace",
    links: collections.filter((c) => c.group === "lace" && c.customItems).map(toLink),
  },
  { id: "texture", title: "By texture", href: "/shop/bone-straight-bundles", links: groupLinks("texture") },
  { id: "set", title: "Bundle sets", href: "/shop/set-3-bundles", links: groupLinks("set") },
  {
    id: "bundles",
    title: "Bundles, 100g each",
    href: "/shop#weft-group",
    links: groupLinks("weft").map((l) => ({ ...l, label: `${l.label} bundles` })),
  },
  {
    id: "bundle-need",
    title: "Shop by need",
    href: "/shop",
    links: [
      { label: "#1 Jet Black bundles", href: "/shop/jet-black" },
      { label: "21 colors, one price", href: "/color-chart" },
      { label: "Start with 1 bundle", href: "/wholesale-terms" },
    ],
  },
];

const group = (id: string) => menuGroups.find((g) => g.id === id) as MenuGroup;

export type MegaMenu = {
  label: string;
  href: string;
  // Desktop columns; each column stacks one or more groups.
  columns: MenuGroup[][];
  promo: {
    eyebrow: string;
    title: string;
    accent: string;
    link: MenuLink;
    message: string;
    cta: string;
    // Optional photo behind the promo card.
    image?: { src: string; alt: string };
  };
};

export const shopMenu: MegaMenu = {
  label: "Shop",
  href: "/shop",
  columns: [[group("need"), group("weft")], [group("bulk"), group("clip")], [group("keratin")], [group("tape")]],
  promo: {
    eyebrow: "Not sure which line?",
    title: "Every line and price,",
    accent: "on one page.",
    link: { label: "Compare all lines", href: "/shop#compare" },
    message: "PRICE",
    cta: "Send \"PRICE\"",
  },
};

export const bundlesLaceMenu: MegaMenu = {
  label: "Bundles & Lace",
  href: "/shop/lace",
  columns: [[group("bundle-need"), group("bundles")], [group("texture")], [group("lace")], [group("set")]],
  promo: {
    eyebrow: "Bundles and lace",
    title: "Need both?",
    accent: "Ask in one message.",
    link: { label: "See all lace", href: "/shop/lace" },
    message: "PRICE bundles + lace",
    cta: "Ask for bundles + lace",
  },
};

export const megaMenus = [shopMenu, bundlesLaceMenu];

// About Us, split into two groups (our story / buying from us). Links come from aboutLinks.
const about = (href: string): MenuLink => {
  const found = aboutLinks.find((l) => l.href === href);
  if (!found) throw new Error(`Unknown about link: ${href}`);
  return found;
};

export const aboutMegaMenu: MegaMenu = {
  label: "About Us",
  href: "/about",
  columns: [
    [
      {
        id: "story",
        title: "Our Story",
        href: "/about",
        links: [about("/about"), about("/our-factory"), { label: "Contact", href: "/contact" }],
      },
    ],
    [
      {
        id: "buying",
        title: "Buying From Us",
        href: "/how-to-order",
        links: [about("/how-to-order"), about("/prices"), about("/wholesale-terms"), about("/color-chart"), about("/faqs")],
      },
    ],
  ],
  promo: {
    eyebrow: "Sancy Hair Factory",
    title: "Yen Thuy, Hoa Binh,",
    accent: "Vietnam.",
    link: { label: "See the factory", href: "/our-factory" },
    message: "Hi Sancy, I'd like to know more about your factory.",
    cta: "Ask sales",
    image: { src: "/sites/sancy/about/team-wave.jpg", alt: "The Sancy team in front of the SANCY HAIR FACTORY sign" },
  },
};

// Collection pages for one product line, e.g. weft -> the three weft types.
export const siblingsOf = (c: Collection) => collections.filter((x) => x.group === c.group && x.group !== "need");

export const lineCollectionSlug = (lineId: string) => collections.find((c) => c.lineId === lineId && !c.subtype)?.slug ?? lineId;
