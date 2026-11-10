import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { PhotoMosaic, SectionIntro, SplitFeature } from "@/components/sites/sancy/about-blocks";
import { WhatsAppIcon } from "@/components/sites/sancy/icons";
import { InnerPage } from "@/components/sites/sancy/inner-page";
import { PageHero } from "@/components/sites/sancy/page-hero";
import { PhotoSlot } from "@/components/sites/sancy/photo-slot";
import { Reveal } from "@/components/sites/sancy/reveal";
import { SectionNav } from "@/components/sites/sancy/section-nav";
import { aboutPhotos } from "@/lib/about";
import { lineCollectionSlug } from "@/lib/collections";
import { colorCodes, formatUsd, jetBlack, photos, pricedProducts, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Color Chart | 22 Colors, #1 Jet Black and 21 Colors | Sancy Hair Vietnam",
  description: "22 colors: #1 Jet Black with its own price, and 21 colors that share one price. Order by color code.",
};

const sections = [
  { id: "chart", label: "The chart" },
  { id: "codes", label: "All 22 codes" },
  { id: "color-prices", label: "Prices by color" },
  { id: "real-hair", label: "On real hair" },
  { id: "order-color", label: "Order a color" },
];

const orderByCode = [
  { title: "Pick the code", body: "Every color has a code, from #1 Jet Black to #613 and #AZ13. Use the code, not a name." },
  { title: "Send it with the line", body: "Code, line, length and grade in one WhatsApp message." },
  { title: "Ask for a real video", body: "Screen colors are approximate. Ask sales for a video of the color on real hair before you order." },
];

export default function ColorChartPage() {
  return (
    <InnerPage current="/color-chart">
      <PageHero
        crumb="Color Chart"
        eyebrow="Color chart"
        title="22 colors,"
        accent="two prices."
        intro="#1 Jet Black has its own price. The other 21 colors share one price. Order by color code."
        photo={aboutPhotos.colorRing1}
      />
      <SectionNav items={sections} />

      {/* The official chart */}
      <section id="chart" className="scroll-mt-32 bg-white py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SplitFeature photo={{ ...photos.colorChart, fit: "contain" }}>
            <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">The Sancy color chart</p>
            <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              One chart, <span className="font-accent font-medium text-pink italic">22 shades.</span>
            </h2>
            <ul className="mt-7 grid gap-3">
              <li className="rounded-2xl border border-border bg-paper p-5">
                <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">Own price</p>
                <p className="mt-1 text-lg font-extrabold">
                  {jetBlack.code} {jetBlack.name}
                </p>
                <p className="text-sm text-muted-foreground">Our only black.</p>
              </li>
              <li className="rounded-2xl border border-border bg-paper p-5">
                <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">One shared price</p>
                <p className="mt-1 text-lg font-extrabold">21 colors</p>
                <p className="text-sm text-muted-foreground">Browns, blondes, ash tones, #30, #33, #Silver and #AZ13.</p>
              </li>
            </ul>
            <a
              href={whatsappHref("Hi Sancy, can you send me the color chart?")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-pink px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-pink-deep"
            >
              <WhatsAppIcon className="size-4" /> Get the chart on WhatsApp
            </a>
          </SplitFeature>
        </div>
      </section>

      {/* All codes */}
      <section id="codes" className="scroll-mt-32 bg-paper py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="All 22 codes" title="Pick by code," accent="in chart order." />
          <div className="mt-12 grid gap-4 max-sm:mt-7 max-sm:gap-3 lg:grid-cols-[1fr_3fr]">
            <Reveal className="flex flex-col rounded-[1.75rem] border-2 border-pink bg-white p-5 max-sm:grid max-sm:grid-cols-[3.5rem_1fr_auto] max-sm:items-center max-sm:gap-x-4 max-sm:rounded-2xl max-sm:p-3">
              <span className="aspect-square w-full rounded-2xl max-sm:row-span-2 max-sm:rounded-xl" style={{ background: jetBlack.swatch }} aria-hidden="true" />
              <p className="mt-4 text-2xl font-extrabold max-sm:col-start-2 max-sm:row-start-1 max-sm:mt-0 max-sm:self-end max-sm:text-xl max-sm:leading-tight">{jetBlack.code}</p>
              <p className="text-muted-foreground max-sm:col-start-2 max-sm:row-start-2 max-sm:self-start max-sm:text-sm">{jetBlack.name}</p>
              <p className="mt-auto pt-4 text-xs font-bold tracking-[0.2em] text-pink uppercase max-sm:col-start-3 max-sm:row-span-2 max-sm:row-start-1 max-sm:mt-0 max-sm:rounded-full max-sm:bg-blush max-sm:px-3 max-sm:py-1.5 max-sm:pt-1.5 max-sm:text-[0.65rem]">Own price</p>
            </Reveal>
            <Reveal delay={100}>
              <ul className="grid grid-cols-3 gap-3 max-sm:grid-cols-4 max-sm:gap-2 sm:grid-cols-5 lg:grid-cols-7">
                {colorCodes.map((c) => (
                  <li key={c.code} className="rounded-2xl border border-border bg-white p-2 max-sm:rounded-xl max-sm:p-1.5">
                    <span className="block aspect-[3/4] w-full rounded-xl ring-1 ring-black/5 max-sm:aspect-square max-sm:rounded-lg" style={{ background: c.swatch }} aria-hidden="true" />
                    <p className="mt-2 px-1 text-sm font-extrabold max-sm:mt-1 max-sm:text-xs">{c.code}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                <Info className="mt-0.5 size-3.5 shrink-0 text-pink" aria-hidden="true" />
                Screen colors are approximate. English names for each color are not final yet, so please order by code.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Prices by color */}
      <section id="color-prices" className="grain relative scroll-mt-32 overflow-hidden bg-ink py-20 text-white max-sm:py-12 sm:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro dark eyebrow="Prices by color" title="Jet Black or colors," accent="on every line." body="From prices per kg: 50cm, Super Quality." />
          <Reveal className="mt-10 overflow-hidden rounded-[1.75rem] border border-white/10 max-sm:mt-7">
            <div className="relative overflow-x-auto">
              <table className="w-full min-w-[32rem] text-left text-sm max-sm:min-w-0">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.04] text-xs font-bold tracking-[0.15em] text-white/50 uppercase max-sm:text-[0.6rem] max-sm:tracking-[0.1em]">
                    <th scope="col" className="px-5 py-4 max-sm:px-3 max-sm:py-3">Line</th>
                    <th scope="col" className="px-5 py-4 text-right max-sm:px-2 max-sm:py-3">#1 Jet Black</th>
                    <th scope="col" className="px-5 py-4 text-right max-sm:px-3 max-sm:py-3">21 colors</th>
                    <th scope="col" className="px-5 py-4 text-right max-sm:hidden">
                      <span className="sr-only">Shop</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pricedProducts.map((p) => (
                    <tr key={p.id} className="border-b border-white/10 last:border-b-0">
                      <th scope="row" className="px-5 py-4 font-bold max-sm:px-3 max-sm:py-3 max-sm:leading-snug">{p.name}</th>
                      <td className="tabular px-5 py-4 text-right font-extrabold max-sm:px-2 max-sm:py-3">{formatUsd(p.fromJetBlack)}/kg</td>
                      <td className="tabular px-5 py-4 text-right font-extrabold text-pink max-sm:px-3 max-sm:py-3">{formatUsd(p.fromColors)}/kg</td>
                      <td className="px-5 py-4 text-right max-sm:hidden">
                        <Link href={`/shop/${lineCollectionSlug(p.id)}`} className="text-xs font-bold text-white/60 hover:text-pink">
                          Shop
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* On real hair */}
      <section id="real-hair" className="scroll-mt-32 bg-white py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="On real hair" title="Rings, bundles and wefts," accent="shot at Sancy." />
          <div className="mt-10 max-sm:mt-7">
            <PhotoMosaic photos={[aboutPhotos.colorRing2, aboutPhotos.colorRing3, aboutPhotos.bundlesBlonde, aboutPhotos.bundlesColors, photos.jetBlack]} />
          </div>
        </div>
      </section>

      {/* Order a color */}
      <section id="order-color" className="scroll-mt-32 bg-blush py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Order a color" title="Use the code," accent="not the name." />
          <ol className="mt-10 grid gap-4 max-sm:mt-7 max-sm:gap-3 md:grid-cols-3">
            {orderByCode.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 70} className="h-full rounded-[1.75rem] bg-white p-7 max-sm:p-5">
                  <span className="font-accent text-4xl font-medium text-pink italic">0{i + 1}</span>
                  <h3 className="mt-4 text-lg font-extrabold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref("Hi Sancy, can you send a real video of color #")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-pink px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-pink-deep"
            >
              <WhatsAppIcon className="size-4" /> Ask for a color video
            </a>
            <Link
              href="/shop/jet-black"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3.5 text-sm font-semibold transition-colors hover:border-pink hover:text-pink"
            >
              Shop #1 Jet Black <ArrowRight className="size-4" />
            </Link>
          </div>
          <PhotoSlot photo={aboutPhotos.colorRing1} sizes="95vw" className="mt-12 aspect-[21/9] rounded-[2rem] max-sm:mt-7 max-sm:rounded-3xl" />
        </div>
      </section>
    </InnerPage>
  );
}
