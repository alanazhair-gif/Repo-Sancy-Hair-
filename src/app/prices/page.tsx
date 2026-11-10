import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionIntro } from "@/components/sites/sancy/about-blocks";
import { FaqList } from "@/components/sites/sancy/faq-list";
import { WhatsAppIcon } from "@/components/sites/sancy/icons";
import { InnerPage } from "@/components/sites/sancy/inner-page";
import { MarginCalculator } from "@/components/sites/sancy/margin-calculator";
import { PageHero } from "@/components/sites/sancy/page-hero";
import { PhotoSlot } from "@/components/sites/sancy/photo-slot";
import { Reveal } from "@/components/sites/sancy/reveal";
import { SectionNav } from "@/components/sites/sancy/section-nav";
import { ShopPriceBoard } from "@/components/sites/sancy/shop/shop-price-board";
import { aboutPhotos } from "@/lib/about";
import { priceNotes } from "@/lib/shop";
import { formatUsd, grades, jetBlack, lengths, photos, products, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prices and Margin | From Prices per kg | Sancy Hair Vietnam",
  description: "From prices per kg for every Sancy line, 50cm, Super Quality. Work out your cost per bundle and your margin.",
};

const sections = [
  { id: "compare", label: "Price table" },
  { id: "maths", label: "Bundle maths" },
  { id: "factors", label: "What changes the price" },
  { id: "prices", label: "Margin calculator" },
  { id: "questions", label: "Questions" },
];

// Worked from the public "from" prices only: Bulk, 50cm, Super Quality.
const bulk = products.find((p) => p.id === "bulk");
const jetKg = bulk?.fromJetBlack ?? 0;
const colorsKg = bulk?.fromColors ?? 0;
const budget = 500;

const examples = [
  { big: formatUsd(jetKg / 10), unit: "per bundle", body: `Bulk #1 Jet Black: ${formatUsd(jetKg)}/kg divided by 10 bundles.` },
  { big: formatUsd(colorsKg / 10), unit: "per bundle", body: `Bulk colors: ${formatUsd(colorsKg)}/kg divided by 10 bundles.` },
  { big: String(Math.floor(budget / (jetKg / 10))), unit: "bundles", body: `What ${formatUsd(budget)} buys in Bulk #1 Jet Black.` },
  { big: String(Math.floor(budget / (colorsKg / 10))), unit: "bundles", body: `What ${formatUsd(budget)} buys in Bulk colors.` },
];

const factors = [
  {
    title: "Length",
    photo: aboutPhotos.linesLaid,
    body: "Prices on this site are for 50cm. Longer lengths cost more.",
    chips: lengths.map((l) => `${l.cm}cm / ${l.inch}"`),
  },
  {
    title: "Color",
    photo: aboutPhotos.bundlesColors,
    body: `${jetBlack.code} ${jetBlack.name} has its own price. The other 21 colors share one price.`,
    chips: [`Bulk #1 Jet Black from ${formatUsd(jetKg)}/kg`, `Bulk colors from ${formatUsd(colorsKg)}/kg`],
  },
  {
    title: "Grade",
    photo: aboutPhotos.weftsLaid,
    body: "Prices on this site are for Super Quality. Super High Quality costs more. Ask which grade fits the price you sell at.",
    chips: grades,
  },
];

const priceFaqs = [
  {
    q: "Where is the full price table?",
    a: "The website shows \"from\" prices only. Send \"PRICE\" on WhatsApp and sales sends every length, color and grade.",
  },
  { q: "Are the prices in USD?", a: "Yes. Prices are in USD, per kg. Divide by 10 for the price of one 100g bundle." },
  { q: "Is shipping included?", a: "No. Shipping is quoted per order, for your country." },
  {
    q: "Do samples cost money?",
    a: "Yes. Samples are paid and come from the same stock as bulk orders. The sample cost is not deducted from your first order.",
  },
  { q: "What should I sell it for?", a: "We give you the cost. What you sell it for is up to you. Use the margin calculator above." },
];

export default function PricesPage() {
  return (
    <InnerPage current="/prices">
      <PageHero
        crumb="Prices and Margin"
        eyebrow="Prices and margin"
        title="1 kg = 10 bundles."
        accent="What would you sell one for?"
        intro={'"From" prices for every line: 50cm, Super Quality, USD per kg. Longer lengths and Super High Quality cost more. The full table comes on WhatsApp.'}
        photo={photos.heroWeighing}
      />
      <SectionNav items={sections} />

      <ShopPriceBoard notes={priceNotes} />

      {/* Bundle maths */}
      <section id="maths" className="grain relative scroll-mt-32 overflow-hidden bg-ink py-20 text-white max-sm:py-12 sm:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro dark eyebrow="Bundle maths" title="Your cost per bundle," accent="in plain numbers." />

          {/* 1 kg = 10 bundles, drawn */}
          <Reveal className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 max-sm:mt-7 max-sm:p-4">
            <div className="flex flex-wrap items-center gap-4">
              <span className="tabular text-3xl font-extrabold">1 kg</span>
              <span className="text-2xl text-white/40">=</span>
              <ul className="flex flex-wrap gap-1.5" aria-label="10 bundles of 100g">
                {Array.from({ length: 10 }, (_, i) => (
                  <li key={i} className="flex h-10 w-7 items-end justify-center rounded-md bg-gradient-to-t from-pink-deep to-pink pb-1 text-[0.55rem] font-bold">
                    100g
                  </li>
                ))}
              </ul>
              <span className="text-sm text-white/60">10 bundles of 100g</span>
            </div>
          </Reveal>

          <ul className="mt-4 grid gap-4 max-sm:mt-3 max-sm:grid-cols-2 max-sm:gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {examples.map((ex, i) => (
              <li key={ex.body}>
                <Reveal delay={i * 60} className={i === 0 ? "h-full rounded-[1.75rem] bg-pink p-6 max-sm:rounded-2xl max-sm:p-4" : "h-full rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 max-sm:rounded-2xl max-sm:p-4"}>
                  <p className="flex items-baseline gap-2">
                    <span className="tabular text-5xl font-extrabold max-sm:text-3xl">{ex.big}</span>
                    <span className="font-semibold text-white/70">{ex.unit}</span>
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/80 max-sm:mt-2 max-sm:text-xs">{ex.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-white/50">All examples: 50cm, Super Quality. We give you the cost. What you sell it for is up to you.</p>
        </div>
      </section>

      {/* What changes the price */}
      <section id="factors" className="scroll-mt-32 bg-white py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="What changes the price" title="Length, color" accent="and grade." />
          <ul className="mt-12 grid gap-5 max-sm:mt-7 max-sm:gap-3 lg:grid-cols-3">
            {factors.map((f, i) => (
              <li key={f.title}>
                <Reveal delay={i * 70} className="h-full overflow-hidden rounded-[1.75rem] border border-border bg-paper">
                  <PhotoSlot photo={f.photo} sizes="(min-width: 1024px) 30vw, 95vw" className="aspect-[3/2] max-sm:aspect-[5/2]" />
                  <div className="p-6 max-sm:p-4">
                    <p className="font-accent text-3xl font-medium text-pink italic">0{i + 1}</p>
                    <h3 className="mt-2 text-xl font-extrabold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {f.chips.map((c) => (
                        <li key={c} className="tabular rounded-full bg-white px-3 py-1 text-xs font-bold">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <a
            href={whatsappHref("PRICE full table")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-pink px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-pink-deep"
          >
            <WhatsAppIcon className="size-4" /> Get the full price table
          </a>
        </div>
      </section>

      <MarginCalculator
        media={<PhotoSlot photo={aboutPhotos.bundlesColors} sizes="(min-width: 1024px) 30vw, 90vw" className="mt-7 aspect-[4/3] rounded-3xl max-sm:hidden" />}
      />

      {/* Questions */}
      <section id="questions" className="scroll-mt-32 bg-paper py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 max-sm:gap-6 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:gap-14 lg:px-8">
          <div>
            <SectionIntro eyebrow="Price questions" title="Before you" accent="compare suppliers." />
            <Link href="/wholesale-terms" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-pink hover:text-pink-deep">
              Wholesale terms <ArrowRight className="size-4" />
            </Link>
          </div>
          <FaqList items={priceFaqs} />
        </div>
      </section>
    </InnerPage>
  );
}
