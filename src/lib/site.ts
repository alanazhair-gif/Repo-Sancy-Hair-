// Central content for the homepage. Source: 02-SANCY-KNOWLEDGE.md (02/11/2026).
// Prices are the public "from" prices (50cm, Super Quality, USD/kg) from price
// table S1. Re-check against BANG-GIA-CHUAN.csv before going live.

export const siteConfig = {
  name: "Sancy Hair Vietnam",
  positioning:
    "Wholesale-grade Vietnamese human hair, bulk and weft, priced so resellers keep the margin.",
  address: "Yen Thuy, Hoa Binh, Vietnam",
  salesHours: "8:30 to 22:00 Vietnam time (GMT+7)",
  instagram: "sancyhair_extensions",
};

export const whatsappNumbers = [
  { label: "Hotline", display: "+84 766 629 002", digits: "84766629002" },
  { label: "Ms. Julia, sales", display: "+84 82 337 7352", digits: "84823377352" },
];

export const whatsappHref = (message = "PRICE", digits = whatsappNumbers[0].digits) =>
  `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;

export const instagramHref = `https://instagram.com/${siteConfig.instagram}`;

// Top-level pages. Shop and Bundles & Lace have mega menus, About Us a small dropdown.
export const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "For Wholesale", href: "/wholesale" },
  { label: "Contact", href: "/contact" },
];

// "About Us" dropdown, also the footer's company column.
export const aboutLinks = [
  { label: "About Sancy", href: "/about" },
  { label: "Our Factory", href: "/our-factory" },
  { label: "How To Order", href: "/how-to-order" },
  { label: "Prices and Margin", href: "/prices" },
  { label: "Wholesale Terms", href: "/wholesale-terms" },
  { label: "Color Chart", href: "/color-chart" },
  { label: "FAQs", href: "/faqs" },
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
    photo: { ...productPhoto("bulk", "A row of straight bulk hair bundles, tied at the top", "Bulk #1 Jet Black buộc chun, nền sáng, thấy rõ độ dài"), file: "products/bulk-2.jpg" },
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
    photo: { ...productPhoto("genius-weft", "Close-up of blonde Genius Weft bundles showing the weft", "Cận đường weft của Genius Weft"), file: "products/genius-weft-2.jpg" },
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
    photo: { ...productPhoto("clip-in", "A layered clip-in set with the clips showing, next to a Sancy Hair card", "Clip-in Normal và Seamless, thấy rõ kẹp"), file: "products/clip-in-1.jpg" },
  },
  {
    id: "lace",
    name: "Lace Frontal / Closure",
    types: ["Frontal", "Closure"],
    summary: "Made by hand in our closure and frontal room.",
    fromJetBlack: null,
    fromColors: null,
    photo: { ...productPhoto("lace", "Lace closures and frontals laid out in rows at the factory, one lifted by hand", "Frontal / closure trên đầu mannequin ở phòng làm closure"), file: "products/lace-3.jpg" },
  },
];

export const pricedProducts = products.filter(
  (p): p is Product & { fromJetBlack: number; fromColors: number } =>
    p.fromJetBlack !== null && p.fromColors !== null,
);

export const formatUsd = (value: number, digits = 0) =>
  `$${value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;

// Swatch values are sampled from colors/color-collection.jpg, in the same order.
export const jetBlack = { code: "#1", name: "Jet Black", swatch: "#141418" };

export const colorCodes: { code: string; swatch: string }[] = [
  { code: "#2C", swatch: "#221e1f" },
  { code: "#6C", swatch: "#2b1e1d" },
  { code: "#3", swatch: "#45271e" },
  { code: "#2ash", swatch: "#553423" },
  { code: "#4ash", swatch: "#724b33" },
  { code: "#4", swatch: "#946744" },
  { code: "#7C", swatch: "#604737" },
  { code: "#10", swatch: "#8d6242" },
  { code: "#7", swatch: "#d8b177" },
  { code: "#14", swatch: "#e4bc7e" },
  { code: "#5C", swatch: "#bb9b68" },
  { code: "#8ash", swatch: "#d4b780" },
  { code: "#24", swatch: "#d6b381" },
  { code: "#22C", swatch: "#d4b076" },
  { code: "#22ash", swatch: "#d4b580" },
  { code: "#613", swatch: "#cba979" },
  { code: "#60", swatch: "#e8dab4" },
  { code: "#Silver", swatch: "#d2b27f" },
  { code: "#17ash", swatch: "#a9937b" },
  { code: "#18B", swatch: "#a79d88" },
  { code: "#33", swatch: "#f0bf8f" },
  { code: "#16C", swatch: "#aa7d5f" },
  { code: "#14C", swatch: "#98664f" },
  { code: "#30", swatch: "#de9f5a" },
  { code: "#17", swatch: "#6f2816" },
  { code: "#AZ13", swatch: "#741226" },
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
    body: "Send \"PRICE\" to either official number. Sales replies from 8:30 to 22:00 Vietnam time.",
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

export type Faq = { q: string; a: string };

// Grouped like a B2B FAQ so buyers can jump to the part they care about.
export const faqGroups: { title: string; items: Faq[] }[] = [
  {
    title: "The hair",
    items: [
      {
        q: "What does wholesale grade mean?",
        a: "It is 100% human hair, wholesale grade. That means the hair is sorted and blended from several donors to keep volume and price steady. It is not single donor hair, and we price it that way.",
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
        q: "Which lengths, colors and weft types do you have?",
        a: "Lengths are 50, 55, 60, 65 and 70cm (20\" to 28\"). There are 27 colors: #1 Jet Black, plus 26 colors that share one price. Weft comes as Straight, Flat or Genius.",
      },
    ],
  },
  {
    title: "Ordering and price",
    items: [
      {
        q: "Do I have to buy 1 kg?",
        a: "No. The minimum is 100g, which is 1 bundle. 100-200g usually ships right away from stock.",
      },
      {
        q: "How many bundles are in 1 kg?",
        a: "10. Every bundle is 100g, so the price per kg divided by 10 is your cost per bundle.",
      },
      {
        q: "Where do I get the full price table?",
        a: "The website shows \"from\" prices only. Send \"PRICE\" on WhatsApp and sales sends every length, color and grade.",
      },
      {
        q: "Do samples cost money?",
        a: "Yes. Samples are paid and come from the same stock as bulk orders. The sample cost is not deducted from your first order.",
      },
    ],
  },
  {
    title: "Payment and shipping",
    items: [
      {
        q: "How do I pay?",
        a: "PayPal, bank transfer or Western Union. You can pay your first order by PayPal.",
      },
      {
        q: "How much is shipping, and how long does it take?",
        a: "Shipping is not included in our prices. We quote cost and timing per order, for your country.",
      },
      {
        q: "When does my order leave the factory?",
        a: "100-200g samples usually ship right away from stock. Larger orders take 7 to 10 days, depending on product and weight.",
      },
    ],
  },
  {
    title: "Checking us",
    items: [
      {
        q: "How do I know you are a real factory?",
        a: "Our factory is in Yen Thuy, Hoa Binh, Vietnam. Pay your first order by PayPal, start with 100g, and ask us for photos of real packed orders.",
      },
      {
        q: "Why are there two WhatsApp numbers?",
        a: "Both are Sancy: the hotline and Ms. Julia in sales. Any other number using the Sancy name is not us. If in doubt, DM @sancyhair_extensions on Instagram to check.",
      },
    ],
  },
];

export const lengths = [
  { cm: 50, inch: 20 },
  { cm: 55, inch: 22 },
  { cm: 60, inch: 24 },
  { cm: 65, inch: 26 },
  { cm: 70, inch: 28 },
];

export const grades = ["Super High Quality", "Super Quality"];

// Wholesale terms. Every line comes from 02-SANCY-KNOWLEDGE.md sections 3 to 5.
export const termHighlights = [
  { label: "Minimum order", value: "100g", unit: "1 bundle", body: "Test the hair before you commit to a kilo." },
  {
    label: "Bulk from",
    value: "$350",
    unit: "/kg",
    body: "#1 Jet Black, 50cm, Super Quality. That is $35 per 100g bundle.",
  },
  {
    label: "Larger orders ship in",
    value: "7-10",
    unit: "days",
    body: "Depending on product and weight. 100-200g usually ships right away from stock.",
  },
];

export const termRows = [
  { label: "Unit", body: "1 bundle = 100g. 1 kg = 10 bundles." },
  { label: "Lengths", body: "50, 55, 60, 65 and 70cm (20\" to 28\")." },
  { label: "Grades", body: "Super High Quality (SHQ) and Super Quality (Super)." },
  { label: "Colors", body: "#1 Jet Black has its own price. The other 26 colors share one price." },
  { label: "Payment", body: "PayPal, bank transfer or Western Union." },
  { label: "Shipping", body: "Not included in our prices. Quoted per order, for your country." },
  { label: "Samples", body: "Paid, from the same stock as bulk orders. Not deducted from your first order." },
  { label: "Sales hours", body: "8:30 to 22:00 Vietnam time (GMT+7), on WhatsApp." },
];

export const buyerTypes = [
  {
    who: "Resellers",
    worry: "Worried the hair will not match the photos?",
    answer: "Start with 100-200g from ready stock and ask for photos of real packed orders before you buy more.",
  },
  {
    who: "Salons",
    worry: "Do not want cash tied up in stock?",
    answer: "Order from 100g, one bundle at a time. Bulk works for keratin, micro and custom bonds.",
  },
  {
    who: "New shops",
    worry: "Starting with a small budget?",
    answer: "$500 in bulk is 14 bundles of #1 Jet Black or 9 bundles in colors (50cm, Super Quality).",
  },
  {
    who: "Extension brands",
    worry: "Your clients color their hair?",
    answer: "It can be dyed and heat styled. Ask sales how far each line lightens before you order.",
  },
  {
    who: "Distributors",
    worry: "Buying by the kilo?",
    answer: "Ask for the full table by length, color and grade, with shipping quoted to your country.",
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
    file: "colors/color-chart.jpg",
    alt: "Sancy color chart with all 27 color codes",
    brief: "Ảnh bảng màu 27 màu (San pham/Color Collections), không có #1B",
    size: "1112×1164",
    fit: "contain",
  },
  factorySign: {
    file: "factory/sign-team.jpg",
    alt: "The Sancy team under the SANCY HAIR FACTORY sign in Yen Thuy, Hoa Binh",
    brief: "Đội ngũ trước biển SANCY HAIR FACTORY ở xưởng Yên Thủy",
    size: "1200×900",
  },
  workshop: {
    file: "factory/workshop-hall.jpg",
    alt: "The Sancy factory workshop, rows of staff working on hair at long tables",
    brief: "Toàn cảnh phòng làm việc ở xưởng",
    size: "1200×900",
  },
} satisfies Record<string, PhotoBrief>;

export const factoryStepPhotos: PhotoBrief[] = [
  { file: "factory/wash.jpg", alt: "Two Sancy workers washing hair in a basin at the factory", brief: "Gội tóc trong chậu ở xưởng", size: "900×900" },
  { file: "factory/dry.jpg", alt: "A Sancy worker lifting washed hair onto the drying racks", brief: "Tóc phơi / sấy trên giá", size: "900×900" },
  { file: "factory/straighten.jpg", alt: "Hair being straightened at the Sancy factory", brief: "Ép thẳng tóc bằng máy ép", size: "900×900" },
  { file: "factory/check-hair.jpg", alt: "A Sancy staff member checking hair bundles laid out on the workshop table", brief: "Kiểm hàng tại xưởng", size: "900×900" },
];

// Factory video. Put the file at public/sites/sancy/videos/factory-tour.mp4, or set a YouTube id.
// Until one exists, the section shows the poster with a "video chờ" note.
export const factoryVideo = {
  file: "videos/factory-tour.mp4",
  youtubeId: "",
  poster: "factory/sign-team.jpg",
  posterAlt: "The Sancy team under the SANCY HAIR FACTORY sign in Yen Thuy, Hoa Binh",
};

export const orderPhotos: PhotoBrief[] = [1, 2, 3].map((n) => ({
  file: `orders/order-${n}.jpg`,
  alt: "A real customer order, weighed and packed at the Sancy factory",
  brief: "Đơn thật đã cân và đóng gói. Che tên, số điện thoại, địa chỉ trên tem vận đơn",
  size: "1200×900",
}));
