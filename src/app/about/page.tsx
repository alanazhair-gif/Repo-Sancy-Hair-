import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, ChevronRight, Clock, Factory as FactoryIcon, MapPin } from "lucide-react";
import { PhotoMosaic, SectionIntro, SplitFeature } from "@/components/sites/sancy/about-blocks";
import { InstagramIcon, WhatsAppIcon } from "@/components/sites/sancy/icons";
import { InnerPage } from "@/components/sites/sancy/inner-page";
import { PageHero } from "@/components/sites/sancy/page-hero";
import { PhotoSlot } from "@/components/sites/sancy/photo-slot";
import { Reveal } from "@/components/sites/sancy/reveal";
import { aboutPhotos, instagramPillars } from "@/lib/about";
import { lineCollectionSlug } from "@/lib/collections";
import { instagramHref, middlemanChain, products, siteConfig, whatsappNumbers } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Sancy Hair Vietnam | Vietnamese Human Hair Factory",
  description: `${siteConfig.positioning} Factory in ${siteConfig.address}, with a separate sales office.`,
};

// Facts from 02-SANCY-KNOWLEDGE sections 1 to 3 only.
const atAGlance = [
  {
    title: "What we make",
    body: "100% human hair, Vietnamese human hair, wholesale grade. Bulk and weft first, plus keratin tips, tape-ins, clip-ins and lace.",
  },
  {
    title: "Who we sell to",
    body: "Resellers, salons, new shops, small extension brands and distributors. Orders start from 100g, one bundle.",
  },
  {
    title: "How we price",
    body: "Two grades, Super High Quality and Super Quality. #1 Jet Black has its own price, the other 26 colors share one.",
  },
  {
    title: "When to reach us",
    body: `Sales replies ${siteConfig.salesHours}, the hours that overlap with our customers abroad.`,
  },
];

export default function AboutPage() {
  return (
    <InnerPage current="/about">
      <PageHero
        crumb="About Sancy"
        eyebrow="About Sancy"
        title="Sancy Hair Vietnam,"
        accent="a factory, not an agent."
        intro={`${siteConfig.positioning} Our factory is in ${siteConfig.address}.`}
        photo={aboutPhotos.teamWave}
      />

      {/* Two places, one team */}
      <section className="bg-white py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Two places, one team"
            title="The factory makes the hair."
            accent="The office answers you."
            body="The hair is washed, dried, straightened and checked at our factory. Sales work from a separate office, so there is always someone on WhatsApp during sales hours."
          />

          <div className="mt-12 grid gap-5 max-sm:mt-7 max-sm:gap-3 lg:grid-cols-2">
            <Reveal className="overflow-hidden rounded-[2rem] border border-border bg-paper">
              <PhotoSlot photo={aboutPhotos.teamWide} sizes="(min-width: 1024px) 45vw, 95vw" className="aspect-[3/2] max-sm:aspect-[16/9]" />
              <div className="p-6 sm:p-8">
                <p className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-pink uppercase">
                  <FactoryIcon className="size-4" aria-hidden="true" /> The factory
                </p>
                <h3 className="mt-3 text-2xl font-extrabold">SANCY HAIR FACTORY</h3>
                <ul className="mt-5 grid gap-3 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-pink" aria-hidden="true" />
                    {siteConfig.address}
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="mt-0.5 size-4 shrink-0 text-pink" aria-hidden="true" />
                    Washed, dried, straightened and checked on site
                  </li>
                </ul>
                <Link href="/our-factory" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-pink hover:text-pink-deep">
                  See the factory <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={100} className="overflow-hidden rounded-[2rem] border border-border bg-paper">
              <PhotoSlot photo={aboutPhotos.officeTeam} sizes="(min-width: 1024px) 45vw, 95vw" className="aspect-[3/2] max-sm:aspect-[16/9]" />
              <div className="p-6 sm:p-8">
                <p className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-pink uppercase">
                  <Building2 className="size-4" aria-hidden="true" /> The sales office
                </p>
                <h3 className="mt-3 text-2xl font-extrabold">The pink logo wall</h3>
                <ul className="mt-5 grid gap-3 text-sm">
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-4 shrink-0 text-pink" aria-hidden="true" />
                    Sales hours {siteConfig.salesHours}
                  </li>
                  {whatsappNumbers.map((n) => (
                    <li key={n.digits} className="flex items-start gap-3">
                      <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-pink" />
                      <span>
                        <span className="tabular font-bold">{n.display}</span> · {n.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-pink hover:text-pink-deep">
                  Contact sales <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          <ul className="mt-5 grid gap-4 max-sm:grid-cols-2 max-sm:gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {atAGlance.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={i * 60} className="h-full rounded-[1.75rem] bg-blush p-6 max-sm:rounded-2xl max-sm:p-4">
                  <span className="font-accent text-3xl font-medium text-pink italic max-sm:text-2xl">0{i + 1}</span>
                  <h3 className="mt-4 text-lg font-extrabold max-sm:mt-1 max-sm:text-base max-sm:leading-snug">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-sm:mt-1 max-sm:text-xs">{item.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Inside Sancy */}
      <section className="grain relative overflow-hidden bg-ink py-20 text-white max-sm:py-12 sm:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionIntro dark eyebrow="Inside Sancy" title="Real people," accent="real hair, real workshop." />
            <Link href="/our-factory" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-pink hover:text-white">
              More factory photos <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 max-sm:mt-7">
            <PhotoMosaic
              dark
              photos={[aboutPhotos.workshopWide, aboutPhotos.washing, aboutPhotos.drying, aboutPhotos.straightening, aboutPhotos.checking]}
            />
          </div>
        </div>
      </section>

      {/* Factory, no middleman */}
      <section className="bg-paper py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SplitFeature photo={aboutPhotos.bundlesColors}>
            <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">Factory, no middleman</p>
            <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              Every hand the hair passes through <span className="font-accent font-medium text-pink italic">adds a price.</span>
            </h2>
            <div className="mt-8 rounded-2xl border border-border bg-white p-5">
              <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">The usual route</p>
              <ol className="mt-3 flex flex-wrap items-center gap-2">
                {middlemanChain.map((step, i) => (
                  <li key={step.label} className="flex items-center gap-2">
                    <span className="rounded-full border border-border px-3 py-1.5 text-sm font-semibold">
                      {step.label}
                      {step.markup && <span className="ml-1.5 text-pink">+$</span>}
                    </span>
                    {i < middlemanChain.length - 1 && <ChevronRight className="size-4 text-muted-foreground" />}
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-xs font-bold tracking-[0.2em] text-pink uppercase">With Sancy</p>
              <ol className="mt-3 flex items-center gap-2">
                <li className="rounded-full bg-pink px-3 py-1.5 text-sm font-bold text-white">Sancy factory</li>
                <ChevronRight className="size-4 text-pink" />
                <li className="rounded-full bg-pink px-3 py-1.5 text-sm font-bold text-white">You</li>
              </ol>
            </div>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Buy from the factory in {siteConfig.address} and the margin stays with you, not with an agent.
            </p>
          </SplitFeature>
        </div>
      </section>

      {/* What we make */}
      <section className="bg-white py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionIntro eyebrow="What we make" title="Bulk, weft" accent="and extensions." />
            <Link href="/shop" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-pink hover:text-pink-deep">
              Shop all lines <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 max-sm:mt-7 sm:gap-4 lg:grid-cols-4">
            {products.map((p, i) => (
              <li key={p.id}>
                <Reveal delay={(i % 4) * 60} className="h-full">
                  <Link href={`/shop/${lineCollectionSlug(p.id)}`} className="group block h-full overflow-hidden rounded-[1.5rem] border border-border bg-paper">
                    <PhotoSlot photo={p.photo} sizes="(min-width: 1024px) 22vw, 46vw" className="aspect-[4/3]" compact />
                    <p className="flex items-center justify-between gap-2 px-4 py-3.5 text-sm font-bold">
                      {p.name}
                      <ArrowRight className="size-4 shrink-0 text-pink transition-transform group-hover:translate-x-1" />
                    </p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What you'll see on Instagram */}
      <section className="bg-blush py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SplitFeature photo={aboutPhotos.officeSales} flip>
            <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">@{siteConfig.instagram}</p>
            <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              What we post, <span className="font-accent font-medium text-pink italic">every week.</span>
            </h2>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {instagramPillars.map((pillar) => (
                <li key={pillar.title} className="rounded-2xl bg-white p-5">
                  <p className="font-bold">{pillar.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
                </li>
              ))}
            </ul>
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-pink px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-pink-deep"
            >
              <InstagramIcon className="size-4" /> Follow @{siteConfig.instagram}
            </a>
          </SplitFeature>
        </div>
      </section>
    </InnerPage>
  );
}
