// Central content for the homepage. Source: 02-SANCY-KNOWLEDGE.md (02/11/2026).
// Prices are the public "from" prices (50cm, Super Quality, USD/kg) from price
// table S1. Re-check against BANG-GIA-CHUAN.csv before going live.

export const siteConfig = {
  name: "Sancy Hair Vietnam",
  positioning:
    "Wholesale-grade Vietnamese human hair, bulk and weft, priced so resellers keep the margin.",
  address: "Yen Thuy, Hoa Binh, Vietnam",
  salesHours: "13:00 to 22:00 Vietnam time (GMT+7)",
  instagram: "sancyhair_extensions",
};

export const whatsappNumbers = [
  { label: "Hotline", display: "+84 766 629 002", digits: "84766629002" },
  { label: "Ms. Julia, sales", display: "+84 82 337 7352", digits: "84823377352" },
];

export const whatsappHref = (message = "PRICE", digits = whatsappNumbers[0].digits) =>
  `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;

export const instagramHref = `https://instagram.com/${siteConfig.instagram}`;

export const navLinks = [
  { label: "Products", href: "#products" },
  { label: "Prices", href: "#prices" },
  { label: "Colors", href: "#colors" },
  { label: "Factory", href: "#factory" },
  { label: "How to order", href: "#order" },
  { label: "FAQ", href: "#faq" },
];

export const marqueeWords = [
  "100% human hair",
  "Vietnamese human hair",
  "Wholesale grade",
  "Ready stock",
  "MOQ 100g",
  "Can be dyed",
  "Heat styled",
  "Bulk and weft",
];

export type PhotoBrief = {
  // Path under public/sites/sancy. Drop the file there and it replaces the placeholder.
  file: string;
  alt: string;
  // What to shoot, for the team (Vietnamese).
  brief: string;
  size: string;
  // "contain" shows the whole photo (studio shots, the portrait color chart) instead of cropping it.
  fit?: "cover" | "contain";
};

export type Product = {
  id: string;
  name: string;
  types: string[];
  summary: string;
  // USD per kg, 50cm, Super Quality. null = quoted on WhatsApp.
  fromJetBlack: number | null;
  fromColors: number | null;
  photo: PhotoBrief;
};

const productPhoto = (id: string, alt: string, brief: string): PhotoBrief => ({
  file: `products/${id}.jpg`,
  alt,
  brief,
  size: "1200×900",
  fit: "contain",
});

export const products: Product[] = [
  {
    id: "bulk",
    name: "Bulk Hair",
    types: [],
    summary: "Loose hair for strand-by-strand work: keratin, micro and custom bonds.",
    fromJetBlack: 350,
    fromColors: 520,
    photo: productPhoto("bulk", "Bulk hair bundles hanging from a rod", "Bulk #1 Jet Black buộc chun, nền sáng, thấy rõ độ dài"),
  },
  {
    id: "straight-weft",
    name: "Straight Weft",
    types: [],
    summary: "Straight weft, sold in 100g bundles.",
    fromJetBlack: 430,
    fromColors: 580,
    photo: productPhoto("straight-weft", "Straight Weft bundles, #1 Jet Black, laid flat", "Bundle Straight Weft trải thẳng, thấy rõ đường may"),
  },
  {
    id: "genius-weft",
    name: "Genius Weft",
    types: [],
    summary: "Genius weft, sold in 100g bundles.",
    fromJetBlack: 530,
    fromColors: 680,
    photo: productPhoto("genius-weft", "Blonde Genius Weft bundles", "Cận đường weft của Genius Weft"),
  },
  {
    id: "flat-weft",
    name: "Flat Weft",
    types: [],
    summary: "Flat weft, sold in 100g bundles.",
    fromJetBlack: 540,
    fromColors: 690,
    photo: productPhoto("flat-weft", "Close-up of a blonde Flat Weft track", "Cận đường weft của Flat Weft"),
  },
  {
    id: "keratin-tip",
    name: "Keratin Tip",
    types: ["I", "U", "V", "Flat", "Nano"],
    summary: "Pre-bonded tips in five shapes.",
    fromJetBlack: 505,
    fromColors: 655,
    photo: productPhoto("keratin-tip", "Keratin tip bundles in blonde and brown shades", "Keratin tip xếp đủ 5 kiểu I / U / V / Flat / Nano"),
  },
  {
    id: "tape-in",
    name: "Tape-in",
    types: [],
    summary: "Tape extensions for salon installs.",
    fromJetBlack: 515,
    fromColors: 665,
    photo: productPhoto("tape-in", "Tape-in bundles lined up in black, brown and blonde", "Tape-in xếp hàng, thấy rõ băng keo"),
  },
  {
    id: "clip-in",
    name: "Clip-in",
    types: ["Normal", "Seamless"],
    summary: "Clip-ins your clients can put on at home.",
    fromJetBlack: 505,
    fromColors: 655,
    photo: productPhoto("clip-in", "A seven-piece clip-in set, numbered by row", "Clip-in Normal và Seamless, thấy rõ kẹp"),
  },
  {
    id: "lace",
    name: "Lace Frontal / Closure",
    types: ["Frontal", "Closure"],
    summary: "Made by hand in our closure and frontal room.",
    fromJetBlack: null,
    fromColors: null,
    photo: productPhoto("lace", "Close-up of a lace frontal held in hand", "Frontal / closure trên đầu mannequin ở phòng làm closure"),
  },
];

export const pricedProducts = products.filter(
  (p): p is Product & { fromJetBlack: number; fromColors: number } =>
    p.fromJetBlack !== null && p.fromColors !== null,
);

export const formatUsd = (value: number, digits = 0) =>
  `$${value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;

// Swatch values are screen approximations for browsing only.
export const jetBlack = { code: "#1", name: "Jet Black", swatch: "#0d0c0d" };

export const colorCodes: { code: string; swatch: string }[] = [
  { code: "#2C", swatch: "#2a1c17" },
  { code: "#2ash", swatch: "#2d2a28" },
  { code: "#3", swatch: "#3b2a22" },
  { code: "#4", swatch: "#4a3326" },
  { code: "#4ash", swatch: "#4b443f" },
  { code: "#5C", swatch: "#5e3c2a" },
  { code: "#6C", swatch: "#6e4630" },
  { code: "#7", swatch: "#7a5638" },
  { code: "#7C", swatch: "#8a5a35" },
  { code: "#8ash", swatch: "#8f7f6e" },
  { code: "#10", swatch: "#9b7652" },
  { code: "#14", swatch: "#b8956a" },
  { code: "#14C", swatch: "#c09060" },
  { code: "#16C", swatch: "#c9a070" },
  { code: "#17", swatch: "#c7a77c" },
  { code: "#17ash", swatch: "#b9a891" },
  { code: "#18B", swatch: "#d8bf98" },
  { code: "#22ash", swatch: "#d9cdb6" },
  { code: "#22C", swatch: "#e2c79a" },
  { code: "#24", swatch: "#e8d3a6" },
  { code: "#30", swatch: "#9c4a22" },
  { code: "#33", swatch: "#6b2a1e" },
  { code: "#60", swatch: "#efe3c8" },
  { code: "#613", swatch: "#f1dfa8" },
  { code: "#Silver", swatch: "#c8c8cc" },
  { code: "#AZ13", swatch: "linear-gradient(135deg, #3b2a22 0%, #8f7f6e 50%, #e2c79a 100%)" },
];

export const middlemanChain = [
  { label: "Factory", markup: false },
  { label: "Agent", markup: true },
  { label: "Reseller", markup: true },
  { label: "You", markup: false },
];

export const factorySteps = ["Washed", "Dried", "Straightened", "Checked"];

export const orderSteps = [
  {
    title: "Message us on WhatsApp",
    body: "Send \"PRICE\" to either official number. Sales replies from 13:00 to 22:00 Vietnam time.",
  },
  {
    title: "Tell us what you need",
    body: "Bulk or weft (which line), length, color, grade and the country we ship to.",
  },
  {
    title: "Get your quote",
    body: "We send the price plus shipping to your country. Shipping is not included in our list prices.",
  },
  {
    title: "Pay and ship",
    body: "PayPal, bank transfer or Western Union. 100-200g samples usually ship right away from stock. Larger orders take 7 to 10 days, depending on product and weight.",
  },
];

export const trustChecks = [
  {
    title: "A real factory address",
    body: "Our factory is in Yen Thuy, Hoa Binh, Vietnam. Hair is washed, dried, straightened and checked there.",
  },
  {
    title: "Pay your first order by PayPal",
    body: "We accept PayPal, so your first payment goes through a platform you already use.",
  },
  {
    title: "Start with 100g",
    body: "One bundle is enough to test the hair before you commit to a kilo.",
  },
  {
    title: "Ask for photos of real orders",
    body: "We send photos of real packed orders, with customer details covered.",
  },
];

export const faqs = [
  {
    q: "What does wholesale grade mean?",
    a: "It is 100% human hair, wholesale grade. That means the hair is sorted and blended from several donors to keep volume and price steady. It is not single donor hair, and we price it that way.",
  },
  {
    q: "Do I have to buy 1 kg?",
    a: "No. The minimum is 100g, which is 1 bundle. 100-200g usually ships right away from stock.",
  },
  {
    q: "What are the two grades?",
    a: "Super High Quality (SHQ) and Super Quality (Super). Ask on WhatsApp which grade fits the price you sell at.",
  },
  {
    q: "Can it be dyed and heat styled?",
    a: "Yes. For how far each line and color can be lightened, ask sales on WhatsApp before you order.",
  },
  {
    q: "How much is shipping, and how long does it take?",
    a: "Shipping is not included in our prices. We quote cost and timing per order, for your country.",
  },
  {
    q: "Do samples cost money?",
    a: "Yes. Samples are paid and come from the same stock as bulk orders. The sample cost is not deducted from your first order.",
  },
  {
    q: "Why are there two WhatsApp numbers?",
    a: "Both are Sancy: the hotline and Ms. Julia in sales. Any other number using the Sancy name is not us. If in doubt, DM @sancyhair_extensions on Instagram to check.",
  },
];

export const photos = {
  // Same logo twice: dark "LUXURIOUS" line for light backgrounds, white line for dark ones.
  logo: {
    file: "logo.png",
    alt: "Sancy Hair Luxurious logo",
    brief: "Logo Sancy HAIR Luxurious, nền trong suốt, chữ LUXURIOUS màu đen",
    size: "PNG 1000×331",
  },
  logoOnDark: {
    file: "logo-light.png",
    alt: "Sancy Hair Luxurious logo",
    brief: "Logo Sancy HAIR Luxurious, nền trong suốt, chữ LUXURIOUS màu trắng",
    size: "PNG 1000×331",
  },
  heroWeighing: {
    file: "prices/weighing.jpg",
    alt: "A Sancy weft bundle on a digital scale, reading 0.105 kg",
    brief: "Cân bundle tóc trên cân điện tử, thấy rõ số cân",
    size: "1200×900",
  },
  jetBlack: {
    file: "colors/jet-black-1.jpg",
    alt: "Close-up of #1 Jet Black hair",
    brief: "Cận tóc #1 Jet Black, ánh sáng tự nhiên, thấy độ bóng",
    size: "1200×900",
  },
  colorChart: {
    file: "colors/color-collection.png",
    alt: "Sancy color chart with all 27 color codes",
    brief: "Ảnh bảng màu thật 27 màu (color-collection.png trong folder Instagram), không có #1B",
    size: "1600×900",
    fit: "contain",
  },
  factorySign: {
    file: "factory/sign.jpg",
    alt: "The SANCY HAIR FACTORY sign at the factory in Yen Thuy, Hoa Binh",
    brief: "Biển SANCY HAIR FACTORY trước xưởng Yên Thủy",
    size: "1200×900",
  },
} satisfies Record<string, PhotoBrief>;

export const factoryStepPhotos: PhotoBrief[] = [
  { file: "factory/washed.jpg", alt: "Hair being washed at the Sancy factory", brief: "Gội tóc trong chậu ở xưởng", size: "900×900" },
  { file: "factory/dried.jpg", alt: "Hair drying on racks at the Sancy factory", brief: "Tóc phơi / sấy trên giá", size: "900×900" },
  { file: "factory/straightened.jpg", alt: "Hair being straightened at the Sancy factory", brief: "Ép thẳng tóc bằng máy ép", size: "900×900" },
  { file: "factory/checked.jpg", alt: "Hair being checked and weighed at the Sancy factory", brief: "Kiểm hàng: chải, đo dài, cân", size: "900×900" },
];

export const orderPhotos: PhotoBrief[] = [1, 2, 3].map((n) => ({
  file: `orders/order-${n}.jpg`,
  alt: "A real customer order, weighed and packed at the Sancy factory",
  brief: "Đơn thật đã cân và đóng gói. Che tên, số điện thoại, địa chỉ trên tem vận đơn",
  size: "1200×900",
}));
