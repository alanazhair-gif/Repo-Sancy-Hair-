import { aboutPhotos } from "./about";
import {
  jetBlack,
  orderPhotos,
  photos,
  siteConfig,
  whatsappNumbers,
  type PhotoBrief,
} from "./site";

// Hair Blogs. Demo posts written only from 02-SANCY-KNOWLEDGE (prices, MOQ, ordering, checks).
// No dates, author names or numbers that are not in the knowledge file.

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: { title: string; body: string }[] }
  | { type: "table"; head: string[]; rows: string[][]; note?: string }
  | { type: "callout"; title: string; text: string }
  | { type: "photo"; photo: PhotoBrief };

export type BlogTopic = { id: string; title: string; body: string };

export type BlogPost = {
  slug: string;
  topic: string;
  title: string;
  excerpt: string;
  photo: PhotoBrief;
  blocks: BlogBlock[];
  related: { label: string; href: string };
  // Extra words buyers type into the search box (not shown on the page).
  keywords?: string[];
};

export const blogTopics: BlogTopic[] = [
  {
    id: "pricing",
    title: "Prices and margin",
    body: "What a bundle costs you, and what changes the price.",
  },
  {
    id: "hair",
    title: "The hair itself",
    body: "Grades, lines and what wholesale grade means.",
  },
  {
    id: "ordering",
    title: "Ordering",
    body: "MOQ, payment, samples and timing, step by step.",
  },
  {
    id: "checking",
    title: "Checking a supplier",
    body: "What to check before you send money to anyone.",
  },
];

const [hotline, julia] = whatsappNumbers;

export const blogPosts: BlogPost[] = [
  {
    slug: "cost-per-bundle",
    keywords: ["margin", "profit", "bundle", "100g", "kg", "budget", "price"],
    topic: "pricing",
    title: "1 kg = 10 bundles: how to work out your cost per bundle",
    excerpt:
      "Hair is priced per kg, but you sell it by the bundle. Here is the sum, with our own prices.",
    photo: photos.heroWeighing,
    related: { label: "Work out your margin", href: "/prices" },
    blocks: [
      {
        type: "p",
        text: "Wholesale hair is quoted per kilo. Your customers buy it by the bundle. So the first thing to know is how one turns into the other.",
      },
      { type: "h2", text: "The unit" },
      {
        type: "p",
        text: "At Sancy, 1 bundle is 100g, so 1 kg is 10 bundles. To get the cost of one bundle, divide the price per kg by 10.",
      },
      {
        type: "table",
        head: [
          "Bulk hair, 50cm, Super Quality",
          "Per kg, from",
          "Per 100g bundle, from",
        ],
        rows: [
          [`${jetBlack.code} ${jetBlack.name}`, "$350", "$35"],
          ["Colors (21, one price)", "$520", "$52"],
        ],
        note: '"From" prices. Longer lengths and Super High Quality cost more. Shipping is not included.',
      },
      { type: "h2", text: "What $500 buys" },
      {
        type: "p",
        text: `With $500 in bulk hair at these prices, you get 14 bundles of ${jetBlack.code} ${jetBlack.name}, or 9 bundles in a color such as blonde.`,
      },
      { type: "h2", text: "Then add your price" },
      {
        type: "p",
        text: "Once you know the cost of one bundle, the margin is simply what you sell it for, minus that cost. We give you the cost. What you sell it for is up to you.",
      },
      {
        type: "callout",
        title: "Try it with your own numbers",
        text: "The margin calculator on our Prices page does this sum for every line, color and quantity.",
      },
    ],
  },
  {
    slug: "what-changes-the-price",
    keywords: [
      "price",
      "quote",
      "shipping",
      "sample",
      "shq",
      "super",
      "length",
      "color",
    ],
    topic: "pricing",
    title: "Length, grade, color: what changes the price of your hair",
    excerpt:
      "Four things move the price of a bundle. One more is never in the price.",
    photo: aboutPhotos.linesLaid,
    related: { label: "See every line's price", href: "/shop" },
    blocks: [
      {
        type: "p",
        text: 'Our public prices are "from" prices: 50cm, Super Quality, per kg. The full table goes out on WhatsApp. These are the things that move a quote up from there.',
      },
      { type: "h2", text: "1. Length" },
      {
        type: "p",
        text: 'We stock 50, 55, 60, 65 and 70cm (20" to 28"). The longer the hair, the higher the price per kg.',
      },
      { type: "h2", text: "2. Grade" },
      {
        type: "p",
        text: "There are two grades: Super High Quality (SHQ) and Super Quality (Super). SHQ costs more.",
      },
      { type: "h2", text: "3. Color" },
      {
        type: "p",
        text: `${jetBlack.code} ${jetBlack.name} has its own price. The other 21 colors share one price, which is higher than ${jetBlack.code}.`,
      },
      { type: "h2", text: "4. The line" },
      {
        type: "table",
        head: ["Line", `${jetBlack.code} Jet Black, from`, "Colors, from"],
        rows: [
          ["Bulk", "$350/kg", "$520/kg"],
          ["Straight Weft", "$430/kg", "$580/kg"],
          ["Genius Weft", "$530/kg", "$680/kg"],
          ["Flat Weft", "$540/kg", "$690/kg"],
          ["Keratin Tip", "$505/kg", "$655/kg"],
          ["Tape-in", "$515/kg", "$665/kg"],
          ["Clip-in Normal", "$505/kg", "$655/kg"],
        ],
        note: "50cm, Super Quality. Lace frontals and closures are quoted per order.",
      },
      { type: "h2", text: "Not in the price: shipping" },
      {
        type: "p",
        text: "Shipping is quoted per order, for your country. Samples are paid, come from the same stock as bulk orders, and are not deducted from your first order.",
      },
    ],
  },
  {
    slug: "wholesale-grade",
    keywords: [
      "grade",
      "quality",
      "shq",
      "super",
      "human hair",
      "dye",
      "bleach",
      "heat",
    ],
    topic: "hair",
    title: 'What "wholesale grade" means, and the two grades we sell',
    excerpt:
      "A plain answer to the question we get most about the hair itself.",
    photo: aboutPhotos.washing,
    related: { label: "Visit the factory page", href: "/our-factory" },
    blocks: [
      {
        type: "p",
        text: "Our hair is 100% human hair, wholesale grade. Here is what that means, in plain words.",
      },
      { type: "h2", text: "Wholesale grade" },
      {
        type: "p",
        text: "The hair is sorted and blended from several donors. That keeps volume and price steady from order to order, and we price it that way.",
      },
      { type: "h2", text: "Two grades" },
      {
        type: "list",
        items: ["Super High Quality (SHQ)", "Super Quality (Super)"],
      },
      {
        type: "p",
        text: "SHQ costs more. If you are not sure which suits your customers, ask sales for both prices on the same length and color.",
      },
      { type: "photo", photo: aboutPhotos.checking },
      { type: "h2", text: "Can it be dyed and heat styled?" },
      {
        type: "p",
        text: "Yes. For how far each line and color can be lightened, ask sales on WhatsApp before you order.",
      },
      { type: "h2", text: "Where it is made" },
      {
        type: "p",
        text: `At our factory in ${siteConfig.address}, the hair is washed, dried, straightened and checked.`,
      },
    ],
  },
  {
    slug: "which-line-to-stock",
    keywords: [
      "weft",
      "keratin",
      "tape",
      "clip",
      "bulk",
      "lace",
      "i tip",
      "u tip",
      "v tip",
      "nano",
    ],
    topic: "hair",
    title: "Bulk, weft, keratin, tape-in or clip-in: which line to stock",
    excerpt: "Seven lines, what each one is, and what it costs from.",
    photo: aboutPhotos.weftsLaid,
    related: { label: "Open the shop", href: "/shop" },
    blocks: [
      {
        type: "p",
        text: 'Every Sancy line is sold by the 100g bundle, from one bundle up. Here is the range, with "from" prices per kg (50cm, Super Quality).',
      },
      {
        type: "table",
        head: ["Line", "Types", `${jetBlack.code} Jet Black, from`],
        rows: [
          ["Bulk", "Loose hair", "$350/kg"],
          ["Weft", "Straight, Flat, Genius", "$430/kg"],
          ["Keratin Tip", "I, U, V, Flat, Nano", "$505/kg"],
          ["Tape-in", "", "$515/kg"],
          ["Clip-in", "Normal, Seamless", "$505/kg (Normal)"],
          ["Lace", "Frontal, Closure", "Quoted"],
        ],
        note: "Colors cost more on every line. Seamless clip-ins and lace are quoted on WhatsApp.",
      },
      { type: "h2", text: "Where to start" },
      {
        type: "p",
        text: "Bulk is our lowest price per kg. Weft comes in three types: Straight, Flat and Genius. For other weft types, ask sales.",
      },
      {
        type: "p",
        text: "If you are not sure what sells for you, start with 100g of one line and one color, then reorder what moves.",
      },
    ],
  },
  {
    slug: "how-to-order",
    keywords: [
      "moq",
      "minimum",
      "sample",
      "lead time",
      "delivery",
      "payment",
      "paypal",
      "western union",
      "bank",
    ],
    topic: "ordering",
    title: "How to order from Sancy in four steps",
    excerpt: "From the first WhatsApp message to the parcel at your door.",
    photo: aboutPhotos.officeSales,
    related: { label: "The full ordering guide", href: "/how-to-order" },
    blocks: [
      {
        type: "p",
        text: "Ordering from Sancy happens on WhatsApp, with a real person in our sales team.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Message us on WhatsApp",
            body: `Send "PRICE" to ${hotline.display} (${hotline.label}) or ${julia.display} (${julia.label}).`,
          },
          {
            title: "Tell us what you need",
            body: "Bulk or weft (which line), length, color, grade and the country we ship to.",
          },
          {
            title: "Get your quote",
            body: "We send the price plus shipping to your country.",
          },
          {
            title: "Pay and ship",
            body: "PayPal, bank transfer or Western Union.",
          },
        ],
      },
      { type: "h2", text: "How much do you have to buy?" },
      {
        type: "p",
        text: "The minimum order is 100g, which is one bundle. You do not need to buy a kilo.",
      },
      { type: "h2", text: "How long does it take?" },
      {
        type: "p",
        text: "Sample orders of 100-200g usually ship right away from stock. Larger orders take 7 to 10 days, depending on the product and the weight.",
      },
      {
        type: "callout",
        title: "Sales hours",
        text: `Sales replies ${siteConfig.salesHours}.`,
      },
    ],
  },
  {
    slug: "check-a-supplier",
    keywords: [
      "scam",
      "legit",
      "trust",
      "real",
      "paypal",
      "whatsapp",
      "instagram",
      "fake number",
    ],
    topic: "checking",
    title: "How to check a hair supplier before you pay",
    excerpt:
      "Sending money to someone you found online is the hard part. Four checks make it easier.",
    photo: aboutPhotos.teamWave,
    related: { label: "Contact sales", href: "/contact" },
    blocks: [
      {
        type: "p",
        text: "Before you send money to any supplier you found online, these are the checks we suggest, and how we answer each one.",
      },
      {
        type: "steps",
        items: [
          {
            title: "A real factory address",
            body: `Ours is in ${siteConfig.address}.`,
          },
          {
            title: "A payment method you already trust",
            body: "You can pay your first order by PayPal.",
          },
          {
            title: "A small first order",
            body: "Start with 100g, one bundle, before you commit to a kilo.",
          },
          {
            title: "Photos of real orders",
            body: "Ask for photos of real packed orders, with customer details covered.",
          },
        ],
      },
      { type: "photo", photo: orderPhotos[0] },
      { type: "h2", text: "Our only official numbers" },
      {
        type: "list",
        items: [
          `${hotline.display}, ${hotline.label}`,
          `${julia.display}, ${julia.label}`,
        ],
      },
      {
        type: "p",
        text: `Both numbers are Sancy. Any other number using the Sancy name is not us. If in doubt, message @${siteConfig.instagram} on Instagram to check.`,
      },
    ],
  },
];

export const postBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);
export const topicById = (id: string) => blogTopics.find((t) => t.id === id);

// Rough reading time from the post's words.
export function readMinutes(post: BlogPost) {
  const words = post.blocks
    .map((b) => {
      if (b.type === "p" || b.type === "h2") return b.text;
      if (b.type === "list") return b.items.join(" ");
      if (b.type === "steps")
        return b.items.map((i) => `${i.title} ${i.body}`).join(" ");
      if (b.type === "table") return b.rows.flat().join(" ");
      if (b.type === "callout") return `${b.title} ${b.text}`;
      return "";
    })
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// Short answers from the knowledge file's quick replies.
export const quickAnswers = [
  {
    q: "Do I have to buy 1 kg?",
    a: "No. The minimum is 100g, one bundle. 100-200g usually ships right away from stock.",
  },
  {
    q: "How do I pay?",
    a: "PayPal, bank transfer or Western Union. You can pay your first order by PayPal.",
  },
  {
    q: "Is shipping included?",
    a: "No. Shipping is quoted per order, for your country.",
  },
  {
    q: "Why are there two WhatsApp numbers?",
    a: "Both are Sancy: the hotline and Ms. Julia in sales. Any other number using the Sancy name is not us.",
  },
];

// All the words in a post, for the Hair Blogs search box.
const postText = (post: BlogPost) =>
  [
    post.title,
    post.excerpt,
    ...(post.keywords ?? []),
    topicById(post.topic)?.title ?? "",
    ...post.blocks.map((b) => {
      if (b.type === "p" || b.type === "h2") return b.text;
      if (b.type === "list") return b.items.join(" ");
      if (b.type === "steps")
        return b.items.map((i) => `${i.title} ${i.body}`).join(" ");
      if (b.type === "table")
        return [...b.head, ...b.rows.flat(), b.note ?? ""].join(" ");
      if (b.type === "callout") return `${b.title} ${b.text}`;
      return "";
    }),
  ]
    .join(" ")
    .toLowerCase();

// Every word of the query must appear somewhere in the post.
export function searchPosts(posts: BlogPost[], query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return posts;
  return posts.filter((p) => {
    const text = postText(p);
    return words.every((w) => text.includes(w));
  });
}
