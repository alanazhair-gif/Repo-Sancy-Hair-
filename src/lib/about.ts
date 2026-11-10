// Photos and copy for the About Us pages.
// Photos: Sancy's own shoot (D:/az/Thương hiệu SANSY/Anh xưởng sancy: Canon and OFFICE), resized
// into public/sites/sancy/about. Copy: 02-SANCY-KNOWLEDGE.md only; captions describe what is in the photo.
// Old posts in that folder mention "10 years" and "200 workers": not confirmed, not used.
import type { PhotoBrief } from "./site";

const p = (name: string, alt: string): PhotoBrief => ({ file: `about/${name}.jpg`, alt, brief: alt, size: "1600×1067" });

export const aboutPhotos = {
  workshopWide: p("workshop-wide", "Sancy staff working on hair at long tables in the factory workshop"),
  workshopRows: p("workshop-rows", "Rows of Sancy staff at work in the factory workshop"),
  workshopTable: p("workshop-table", "Sancy staff working through hair on a workshop table"),
  workshopHands: p("workshop-hands", "Sancy staff at a long wooden table in the workshop"),
  washing: p("washing", "A Sancy worker in gloves washing hair at the factory"),
  drying: p("drying", "Sancy workers hanging washed hair on the drying racks"),
  straightening: p("straightening", "Hair being straightened with a flat iron at the Sancy factory"),
  styling: p("styling", "A Sancy staff member straightening hair on a mannequin head"),
  checking: p("checking", "A Sancy staff member with a clipboard checking bundles laid out on a table"),
  bundlesColors: p("bundles-colors", "Finished bundles in black, brown and blonde laid out on a factory table"),
  bundlesBlonde: p("bundles-blonde", "Blonde and brown bundles on a factory table"),
  linesLaid: p("lines-laid", "Black, brown and blonde hair laid out side by side"),
  weftsLaid: p("wefts-laid", "Black wefts, brown and blonde hair laid out on a table"),
  showroomDuo: p("showroom-duo", "Two Sancy staff holding Sancy Hair cards under the Sancy Hair Vietnam sign"),
  teamWide: p("team-wide", "The Sancy factory team in front of the SANCY HAIR FACTORY sign"),
  teamWave: p("team-wave", "The Sancy team waving in front of the SANCY HAIR FACTORY sign"),
  officeWide: p("office-wide", "The Sancy sales office, staff working at laptops"),
  officeDesks: p("office-desks", "Sancy sales staff at their desks in the office"),
  officeLogoWall: p("office-logo-wall", "Sancy sales staff working in front of the Sancy Hair logo wall"),
  officeSales: p("office-sales", "A Sancy sales staff member answering customers on a laptop"),
  officeTeam: p("office-team", "The Sancy sales team in front of the Sancy Hair logo wall"),
  // Color ring photos without code labels (the labelled ring shows #1B and colors we do not sell).
  colorRing1: p("color-ring-1", "A Sancy color ring with brown and blonde hair samples"),
  colorRing2: p("color-ring-2", "Close-up of a Sancy color ring with blonde and brown samples"),
  colorRing3: p("color-ring-3", "A Sancy color ring laid out on white paper"),
} satisfies Record<string, PhotoBrief>;

// Extra questions for the FAQ page only (02-SANCY-KNOWLEDGE section 7).
export const extraFaqs: Record<string, { q: string; a: string }[]> = {
  "Ordering and price": [
    {
      q: "Do you have ready stock?",
      a: "Yes. 100-200g usually ships right away from stock. Larger orders take 7 to 10 days, depending on product and weight.",
    },
  ],
  "Payment and shipping": [
    {
      q: "Do you ship to my country?",
      a: "Send your country on WhatsApp. We quote shipping cost and timing per order, for your country.",
    },
  ],
  "Checking us": [
    {
      q: "Is Sancy legit?",
      a: "Check us before you pay: our factory is in Yen Thuy, Hoa Binh, Vietnam, you can pay your first order by PayPal, you can start with 100g, and you can ask us for photos of real packed orders.",
    },
    {
      q: "Can I see real orders before I buy?",
      a: "Yes. Ask sales on WhatsApp for photos of real packed orders. Customer details are covered.",
    },
  ],
};

// Instagram content pillars (02-SANCY-KNOWLEDGE section 8).
export const instagramPillars = [
  { title: "Prices and margin", body: "How much you buy, how many bundles it makes, and the cost per bundle." },
  { title: "The hair itself", body: "Close-ups, washing, combing, heat and weighing, on real hair." },
  { title: "Real orders", body: "Orders weighed and packed, with customer details covered." },
  { title: "How to order", body: "MOQ, payment, shipping and samples, explained in plain words." },
];

// Ordering step 2 (02-SANCY-KNOWLEDGE section 5): what to tell us.
export const quoteChecklist = [
  { label: "Line", example: "Bulk, or which weft: Straight, Genius, Flat" },
  { label: "Length", example: "50, 55, 60, 65 or 70cm" },
  { label: "Color", example: "#1 Jet Black, or a color code like #613" },
  { label: "Grade", example: "Super High Quality or Super Quality" },
  { label: "Country", example: "Where we ship to" },
];

export const paymentMethods = [
  { name: "PayPal", body: "You can pay your first order by PayPal, a platform you already use." },
  { name: "Bank transfer", body: "Details are sent with your quote on WhatsApp." },
  { name: "Western Union", body: "Details are sent with your quote on WhatsApp." },
];
