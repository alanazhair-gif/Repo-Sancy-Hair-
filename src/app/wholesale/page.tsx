import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Boxes, CreditCard, EyeOff, Factory as FactoryIcon, PackageCheck, Palette, Plus, ShieldCheck } from "lucide-react";
import { PhotoMosaic, SectionIntro, SplitFeature } from "@/components/sites/sancy/about-blocks";
import { WhatsAppIcon } from "@/components/sites/sancy/icons";
import { InnerPage } from "@/components/sites/sancy/inner-page";
import { PageHero } from "@/components/sites/sancy/page-hero";
import { PhotoSlot } from "@/components/sites/sancy/photo-slot";
import { Reveal } from "@/components/sites/sancy/reveal";
import { aboutPhotos } from "@/lib/about";
import { lineCollectionSlug } from "@/lib/collections";
import {
  faqGroups,
  formatUsd,
  grades,
  lengths,
  orderPhotos,
  orderSteps,
  photos,
  products,
  siteConfig,
  trustChecks,
  whatsappHref,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "For Wholesale | Vietnamese Human Hair, MOQ 100g | Sancy Hair Vietnam",
  description: `${siteConfig.positioning} MOQ 100g, ready stock, 22 colors, two grades, PayPal on your first order.`,
};

// Every point below comes from 02-SANCY-KNOWLEDGE.md. No volume tiers or testimonials: not confirmed yet.
const bulk = products.find((p) => p.id === "bulk");
const bulkJet = bulk?.fromJetBlack ?? 0;
const bulkColors = bulk?.fromColors ?? 0;

const heroStats = [
  { value: "100g", label: "MOQ, 1 bundle" },
  { value: formatUsd(bulkJet), label: "Bulk from, per kg" },
  { value: "22", label: "Colors" },
  { value: "2", label: "Grades" },
];

const reasons = [
  {
    photo: aboutPhotos.teamWide,
    icon: FactoryIcon,
    title: "Factory direct",
    body: `Our own factory in ${siteConfig.address}. No agent between us and you, so no agent markup.`,
  },
  {
    photo: aboutPhotos.bundlesBlonde,
    icon: PackageCheck,
    title: "Start from 100g",
    body: "MOQ is one 100g bundle. Test the hair before you commit to a kilo.",
  },
  {
    photo: aboutPhotos.bundlesColors,
    icon: Boxes,
    title: "Ready stock",
    body: "100-200g usually ships right away from stock. Larger orders take 7 to 10 days.",
  },
  {
    photo: aboutPhotos.linesLaid,
    icon: Palette,
    title: "22 colors, two prices",
    body: "#1 Jet Black has its own price. The other 21 colors share one price.",
  },
  {
    photo: aboutPhotos.officeSales,
    icon: CreditCard,
    title: "PayPal on your first order",
    body: "Pay through a platform you already use. Bank transfer and Western Union too.",
  },
  {
    photo: aboutPhotos.officeTeam,
    icon: ShieldCheck,
    title: "Two official numbers",
    body: "The hotline and Ms. Julia in sales. Any other number using the Sancy name is not us.",
  },
];

const stepPhotos = [aboutPhotos.officeSales, aboutPhotos.weftsLaid, aboutPhotos.officeDesks, orderPhotos[0]];

const wholesaleFaqIds = [
  "What does wholesale grade mean?",
  "Do I have to buy 1 kg?",
  "What are the two grades?",
  "Do samples cost money?",
  "How do I pay?",
  "How much is shipping, and how long does it take?",
];
const wholesaleFaqs = faqGroups.flatMap((g) => g.items).filter((f) => wholesaleFaqIds.includes(f.q));

export default function WholesalePage() {
  return (
    <InnerPage current="/wholesale">
      <PageHero
        crumb="For Wholesale"
        eyebrow="For wholesale"
        title="Buy from the factory,"
        accent="keep the margin."
        intro={siteConfig.positioning}
        photo={aboutPhotos.bundlesColors}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappHref("PRICE full table")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-pink px-7 py-4 text-sm font-bold transition-colors hover:bg-pink-deep"
          >
            <WhatsAppIcon className="size-5" />
            Get the wholesale price list
          </a>
          <a
            href="#range"
            className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 text-sm font-semibold transition-colors hover:border-white"
          >
            See the range
          </a>
        </div>
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse bg-ink px-4 py-3.5">
              <dt className="text-[0.65rem] font-bold tracking-[0.15em] text-white/45 uppercase">{s.label}</dt>
              <dd className="tabular text-2xl font-extrabold">{s.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* 1. Why Sancy: one photo per reason */}
      <section className="bg-white py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Why resellers buy from us"
            title="Six things"
            accent="you can check."
            body="No claims you have to take on trust. Each point is something you can test on your first order."
          />
          <ul className="mt-12 grid gap-5 max-sm:mt-7 max-sm:gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ photo, icon: Icon, title, body }, i) => (
              <li key={title}>
                <Reveal delay={(i % 3) * 70} className="group h-full overflow-hidden rounded-[1.75rem] border border-border bg-paper max-sm:flex max-sm:rounded-2xl">
                  <div className="relative overflow-hidden max-sm:w-28 max-sm:shrink-0">
                    <PhotoSlot
                      photo={photo}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 95vw"
                      className="aspect-[3/2] transition-transform duration-500 group-hover:scale-[1.04] max-sm:absolute max-sm:inset-0 max-sm:aspect-auto"
                    />
                    <span className="absolute top-4 left-4 flex size-11 items-center justify-center rounded-xl bg-pink text-white shadow-lg max-sm:top-2 max-sm:left-2 max-sm:size-8 max-sm:rounded-lg">
                      <Icon className="size-5 max-sm:size-4" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="p-6 max-sm:p-4">
                    <h3 className="text-lg font-extrabold max-sm:text-base max-sm:leading-snug">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. Full range */}
      <section id="range" className="scroll-mt-24 bg-paper py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionIntro
              eyebrow="What we supply"
              title="The full range,"
              accent="with from prices."
              body="From prices: 50cm, Super Quality. Longer lengths and Super High Quality cost more."
            />
            <Link href="/shop" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-pink hover:text-pink-deep">
              Open the shop <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 max-sm:mt-7 sm:gap-5 lg:grid-cols-4">
            {products.map((p, i) => (
              <li key={p.id}>
                <Reveal delay={(i % 4) * 60} className="h-full">
                  <Link
                    href={`/shop/${lineCollectionSlug(p.id)}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-white transition-all hover:-translate-y-1 hover:border-pink/40 hover:shadow-[0_24px_48px_-28px_rgb(233_30_115/0.45)]"
                  >
                    <div className="relative">
                      <PhotoSlot photo={p.photo} sizes="(min-width: 1024px) 22vw, 46vw" className="aspect-square max-sm:aspect-[4/3]" compact />
                      {p.fromJetBlack !== null && (
                        <span className="tabular absolute bottom-3 left-3 rounded-full bg-ink/90 px-3 py-1 text-xs font-bold text-white">
                          from {formatUsd(p.fromJetBlack / 10, 1)}/100g
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-4 max-sm:p-3">
                      <p className="flex items-center justify-between gap-2 font-extrabold sm:text-lg">
                        {p.name}
                        <ArrowRight className="size-4 shrink-0 text-pink transition-transform group-hover:translate-x-1" />
                      </p>
                      {p.types.length > 0 && (
                        <p className="mt-2 flex flex-wrap gap-1">
                          {p.types.map((t) => (
                            <span key={t} className="rounded-full bg-blush px-2 py-0.5 text-[0.65rem] font-bold text-pink-deep">
                              {t}
                            </span>
                          ))}
                        </p>
                      )}
                      <div className="mt-auto pt-4 text-xs text-muted-foreground">
                        {p.fromJetBlack !== null && p.fromColors !== null ? (
                          <p className="tabular grid grid-cols-2 gap-2 border-t border-border pt-3">
                            <span>
                              #1 Jet Black
                              <span className="block text-base font-extrabold text-ink">{formatUsd(p.fromJetBlack)}/kg</span>
                            </span>
                            <span>
                              Colors
                              <span className="block text-base font-extrabold text-ink">{formatUsd(p.fromColors)}/kg</span>
                            </span>
                          </p>
                        ) : (
                          <p className="border-t border-border pt-3 text-sm font-bold text-pink-deep">Price on WhatsApp</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. How pricing works */}
      <section className="grain relative overflow-hidden bg-ink py-20 text-white max-sm:py-12 sm:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SplitFeature photo={photos.heroWeighing} dark>
            <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">How our prices work</p>
            <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              One public price, <span className="font-accent font-medium text-pink italic">the full table on WhatsApp.</span>
            </h2>
            <div className="mt-7 rounded-2xl bg-pink p-5">
              <p className="flex items-baseline gap-2">
                <span className="tabular text-5xl font-extrabold">{Math.floor(500 / (bulkJet / 10))}</span>
                <span className="font-semibold text-white/85">bundles for $500</span>
              </p>
              <p className="mt-1 text-sm text-white/85">
                Bulk #1 Jet Black, or {Math.floor(500 / (bulkColors / 10))} bundles in colors. 50cm, Super Quality.
              </p>
            </div>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 p-4">
                <dt className="font-bold">Changes the price</dt>
                <dd className="mt-1 text-white/65">
                  Length ({lengths[0].cm}-{lengths[lengths.length - 1].cm}cm), color (#1 Jet Black or colors) and grade (
                  {grades.join(" or ")}).
                </dd>
              </div>
              <div className="rounded-2xl border border-white/10 p-4">
                <dt className="font-bold">Not in the price</dt>
                <dd className="mt-1 text-white/65">Shipping, quoted per country. Samples are paid and not deducted later.</dd>
              </div>
            </dl>
            <Link href="/prices" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-pink hover:text-white">
              Work out your margin <ArrowRight className="size-4" />
            </Link>
          </SplitFeature>
        </div>
      </section>

      {/* 4. From message to delivery, one photo per step */}
      <section className="bg-white py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionIntro eyebrow="How it works" title="From first message" accent="to your door." />
            <Link href="/how-to-order" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-pink hover:text-pink-deep">
              The full ordering guide <ArrowRight className="size-4" />
            </Link>
          </div>
          <ol className="mt-12 grid gap-4 max-sm:mt-7 max-sm:gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {orderSteps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 70} className="h-full overflow-hidden rounded-[1.75rem] border border-border bg-paper">
                  <div className="relative">
                    <PhotoSlot photo={stepPhotos[i]} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 95vw" className="aspect-[4/3] max-sm:aspect-[2/1]" />
                    <span className="tabular absolute -bottom-6 left-5 flex size-12 items-center justify-center rounded-full bg-pink text-lg font-extrabold text-white ring-4 ring-paper">
                      {i + 1}
                    </span>
                  </div>
                  <div className="p-5 pt-9 max-sm:p-4 max-sm:pt-8">
                    <h3 className="text-lg font-extrabold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Check us first, with real orders */}
      <section className="bg-blush py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SplitFeature photo={aboutPhotos.showroomDuo}>
            <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">Before you pay</p>
            <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              Worried about a new supplier? <span className="font-accent font-medium text-pink italic">Check us first.</span>
            </h2>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {trustChecks.map((c) => (
                <li key={c.title} className="flex items-start gap-3 rounded-2xl bg-white p-4">
                  <BadgeCheck className="mt-0.5 size-5 shrink-0 text-pink" aria-hidden="true" />
                  <span>
                    <span className="block text-sm font-bold">{c.title}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{c.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </SplitFeature>

          <ul className="mt-14 grid gap-4 max-sm:mt-8 max-sm:grid-cols-3 max-sm:gap-2 sm:grid-cols-3">
            {orderPhotos.map((photo, i) => (
              <li key={photo.file}>
                <Reveal delay={i * 70} className="overflow-hidden rounded-[1.75rem] bg-white max-sm:rounded-xl">
                  <PhotoSlot photo={photo} sizes="(min-width: 640px) 31vw, 32vw" className="aspect-[4/3]" />
                  <p className="flex items-center justify-between px-5 py-3.5 text-xs max-sm:px-2 max-sm:py-2 max-sm:text-[0.65rem]">
                    <span className="font-bold">Real order {String(i + 1).padStart(2, "0")}</span>
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

      {/* 6. Inside the factory */}
      <section className="grain relative overflow-hidden bg-ink py-20 text-white max-sm:py-12 sm:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionIntro dark eyebrow="Where your order is made" title="Our factory in" accent="Yen Thuy, Hoa Binh." />
            <Link href="/our-factory" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-pink hover:text-white">
              Visit the factory page <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 max-sm:mt-7">
            <PhotoMosaic dark photos={[aboutPhotos.workshopRows, aboutPhotos.washing, aboutPhotos.drying, aboutPhotos.straightening, aboutPhotos.checking]} />
          </div>
        </div>
      </section>

      {/* 7. Wholesale FAQ */}
      <section className="bg-paper py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 max-sm:gap-6 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:gap-14 lg:px-8">
          <div>
            <SectionIntro eyebrow="Wholesale FAQ" title="Before your" accent="first order." />
            <Reveal delay={80}>
              <PhotoSlot photo={aboutPhotos.officeLogoWall} sizes="(min-width: 1024px) 36vw, 95vw" className="mt-8 aspect-[3/2] rounded-[1.75rem] max-sm:hidden" />
            </Reveal>
            <Link href="/faqs" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-pink hover:text-pink-deep">
              All FAQs <ArrowRight className="size-4" />
            </Link>
          </div>
          <Reveal delay={100} className="grid content-start gap-3">
            {wholesaleFaqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-white open:border-pink/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold sm:text-lg [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blush text-pink transition-transform group-open:rotate-45">
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="px-5 pb-5 leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>
    </InnerPage>
  );
}
