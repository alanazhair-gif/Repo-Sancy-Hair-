import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, CreditCard, EyeOff, Headphones, PackageCheck, Ruler, Truck } from "lucide-react";
import { SectionIntro, SplitFeature } from "@/components/sites/sancy/about-blocks";
import { BuyerTypes } from "@/components/sites/sancy/buyer-types";
import { InnerPage } from "@/components/sites/sancy/inner-page";
import { PageHero } from "@/components/sites/sancy/page-hero";
import { PhotoSlot } from "@/components/sites/sancy/photo-slot";
import { Reveal } from "@/components/sites/sancy/reveal";
import { SectionNav } from "@/components/sites/sancy/section-nav";
import { aboutPhotos } from "@/lib/about";
import { formatUsd, orderPhotos, products, siteConfig, whatsappNumbers, type PhotoBrief } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wholesale Terms | MOQ 100g, Payment, Shipping, Samples | Sancy Hair Vietnam",
  description: "Sancy wholesale terms: MOQ 100g, 1 kg = 10 bundles, lengths 50 to 70cm, two grades, payment, shipping and samples.",
};

const bulk = products.find((p) => p.id === "bulk");

const sections = [
  { id: "summary", label: "At a glance" },
  { id: "terms", label: "Full terms" },
  { id: "start", label: "Start small" },
  { id: "orders", label: "Real orders" },
  { id: "buyers", label: "Who buys" },
];

const summary = [
  { value: "100g", label: "Minimum order" },
  { value: formatUsd(bulk?.fromJetBlack ?? 0), label: "Bulk from, per kg" },
  { value: "7-10", label: "Days for larger orders" },
  { value: "3", label: "Ways to pay" },
];

// Full terms, grouped (02-SANCY-KNOWLEDGE sections 3 to 5).
const termGroups: { id: string; icon: typeof Boxes; title: string; photo: PhotoBrief; rows: { label: string; value: string }[] }[] = [
  {
    id: "order",
    icon: PackageCheck,
    title: "Ordering",
    photo: aboutPhotos.bundlesBlonde,
    rows: [
      { label: "Minimum order", value: "100g, which is 1 bundle" },
      { label: "Unit", value: "1 bundle = 100g. 1 kg = 10 bundles." },
      { label: "How to order", value: "On WhatsApp, with line, length, color, grade and country" },
    ],
  },
  {
    id: "product",
    icon: Ruler,
    title: "The hair",
    photo: aboutPhotos.linesLaid,
    rows: [
      { label: "Hair", value: "100% human hair, Vietnamese human hair, wholesale grade" },
      { label: "Lengths", value: "50, 55, 60, 65 and 70cm (20\" to 28\")" },
      { label: "Grades", value: "Super High Quality (SHQ) and Super Quality (Super)" },
      { label: "Colors", value: "#1 Jet Black with its own price, plus 21 colors that share one price" },
      { label: "Lines", value: "Bulk, Straight / Genius / Flat Weft, Keratin Tip, Tape-in, Clip-in, Lace" },
    ],
  },
  {
    id: "prices",
    icon: Boxes,
    title: "Prices",
    photo: aboutPhotos.bundlesColors,
    rows: [
      { label: "On the website", value: "\"From\" prices: 50cm, Super Quality, USD per kg" },
      { label: "Full table", value: "Every length, color and grade, sent on WhatsApp" },
      { label: "Changes the price", value: "Length, color tier and grade" },
    ],
  },
  {
    id: "payment",
    icon: CreditCard,
    title: "Payment",
    photo: aboutPhotos.officeSales,
    rows: [
      { label: "Methods", value: "PayPal, bank transfer or Western Union" },
      { label: "First order", value: "You can pay by PayPal" },
    ],
  },
  {
    id: "shipping",
    icon: Truck,
    title: "Stock and shipping",
    photo: orderPhotos[1],
    rows: [
      { label: "Ready stock", value: "100-200g usually ships right away" },
      { label: "Larger orders", value: "7 to 10 days, depending on product and weight" },
      { label: "Shipping", value: "Not included in prices. Quoted per order, for your country" },
    ],
  },
  {
    id: "samples",
    icon: Headphones,
    title: "Samples and support",
    photo: aboutPhotos.officeTeam,
    rows: [
      { label: "Samples", value: "Paid, from the same stock as bulk orders" },
      { label: "Sample cost", value: "Not deducted from your first order" },
      { label: "Sales hours", value: siteConfig.salesHours },
      { label: "WhatsApp", value: whatsappNumbers.map((n) => `${n.display} (${n.label})`).join(" · ") },
    ],
  },
];

const startSmall = [
  { big: "100g", body: "The minimum order. One bundle is enough to test the hair." },
  { big: "100-200g", body: "Usually ships right away from ready stock." },
  { big: "1 kg", body: "10 bundles of 100g, when you are ready to stock up." },
];

export default function WholesaleTermsPage() {
  return (
    <InnerPage current="/wholesale-terms">
      <PageHero
        crumb="Wholesale Terms"
        eyebrow="Wholesale terms"
        title="MOQ, price and timing."
        accent="No fine print."
        intro="Everything you need before your first order: minimum order, units, lengths, grades, colors, payment, shipping and samples."
        photo={aboutPhotos.weftsLaid}
      />
      <SectionNav items={sections} />

      {/* At a glance */}
      <section id="summary" className="scroll-mt-32 bg-white py-16 max-sm:py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {summary.map((s, i) => (
              <Reveal key={s.label} delay={i * 50} className={i === 0 ? "rounded-[1.5rem] bg-pink p-6 text-white" : "rounded-[1.5rem] bg-blush p-6"}>
                <dd className="tabular text-4xl font-extrabold sm:text-5xl">{s.value}</dd>
                <dt className={i === 0 ? "mt-2 text-sm text-white/80" : "mt-2 text-sm text-muted-foreground"}>{s.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Full terms */}
      <section id="terms" className="scroll-mt-32 bg-paper py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Full terms" title="Six parts," accent="one page." />
          <ul className="mt-12 grid gap-5 max-sm:mt-7 max-sm:gap-3 lg:grid-cols-2">
            {termGroups.map(({ id, icon: Icon, title, photo, rows }, i) => (
              <li key={id}>
                <Reveal delay={(i % 2) * 70} className="grid h-full overflow-hidden rounded-[1.75rem] border border-border bg-white sm:grid-cols-[11rem_1fr]">
                  <PhotoSlot photo={photo} sizes="(min-width: 640px) 176px, 95vw" className="aspect-[3/1] max-sm:hidden sm:aspect-auto sm:h-full" />
                  <div className="p-6 max-sm:p-4">
                    <h3 className="flex items-center gap-2.5 text-lg font-extrabold">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-pink text-white">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      {title}
                    </h3>
                    <dl className="mt-4 divide-y divide-border max-sm:mt-2">
                      {rows.map((r) => (
                        <div key={r.label} className="grid grid-cols-[7.5rem_1fr] gap-3 py-2.5 text-sm max-sm:grid-cols-[6rem_1fr] max-sm:py-2">
                          <dt className="font-bold">{r.label}</dt>
                          <dd className="text-muted-foreground">{r.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Start small */}
      <section id="start" className="scroll-mt-32 bg-white py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SplitFeature photo={aboutPhotos.bundlesBlonde}>
            <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">Start small</p>
            <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              No 1 kg minimum. <span className="font-accent font-medium text-pink italic">Start with one bundle.</span>
            </h2>
            <ul className="mt-7 grid gap-3">
              {startSmall.map((s) => (
                <li key={s.big} className="flex items-center gap-5 rounded-2xl border border-border bg-paper p-5 max-sm:gap-3 max-sm:p-4">
                  <span className="tabular w-24 shrink-0 text-2xl font-extrabold text-pink">{s.big}</span>
                  <span className="text-sm text-muted-foreground">{s.body}</span>
                </li>
              ))}
            </ul>
            <Link href="/how-to-order" className="mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-pink hover:text-pink-deep">
              How to order <ArrowRight className="size-4" />
            </Link>
          </SplitFeature>
        </div>
      </section>

      {/* Real orders */}
      <section id="orders" className="scroll-mt-32 bg-blush py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Real orders"
            title="Weighed and packed"
            accent="at the factory."
            body="Photos of real customer orders, with customer details covered. Ask sales for more."
          />
          <ul className="mt-10 grid gap-4 max-sm:mt-6 max-sm:grid-cols-3 max-sm:gap-2 sm:grid-cols-3">
            {orderPhotos.map((photo, i) => (
              <li key={photo.file}>
                <Reveal delay={i * 70} className="overflow-hidden rounded-[1.75rem] bg-white max-sm:rounded-xl">
                  <PhotoSlot photo={photo} sizes="(min-width: 640px) 31vw, 32vw" className="aspect-[4/3]" />
                  <p className="flex items-center justify-between px-5 py-4 text-xs max-sm:px-2 max-sm:py-2 max-sm:text-[0.65rem]">
                    <span className="font-bold">Order {String(i + 1).padStart(2, "0")}</span>
                    <span className="flex items-center gap-1.5 text-muted-foreground max-sm:hidden">
                      <EyeOff className="size-3.5 text-pink" aria-hidden="true" /> Customer details covered
                    </span>
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BuyerTypes />
    </InnerPage>
  );
}
