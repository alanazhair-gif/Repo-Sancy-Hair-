import { ArrowUpRight } from "lucide-react";
import { lengths, termHighlights, termRows, whatsappHref } from "@/lib/site";
import { aboutPhotos } from "@/lib/about";
import { PhotoSlot } from "./photo-slot";
import { Reveal } from "./reveal";

// Wholesale terms on one screen: the three numbers buyers ask first, then the rest as a spec sheet.
export function WholesaleTerms() {
  return (
    <section id="terms" className="grain relative scroll-mt-20 overflow-hidden bg-ink py-24 text-white max-sm:py-12 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-[-10%] size-[36rem] rounded-full bg-pink/20 blur-[150px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink">Wholesale terms</p>
            <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
              MOQ, price and timing. <span className="font-accent font-medium text-pink italic">No fine print.</span>
            </h2>
          </div>
          <a
            href={whatsappHref("PRICE full table")}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-pink hover:text-pink-soft"
          >
            Full price table on WhatsApp
            <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
          </a>
        </Reveal>

        <ul className="mt-12 grid gap-4 max-sm:mt-6 max-sm:gap-3 md:grid-cols-3">
          {termHighlights.map((term, i) => (
            <li key={term.label}>
              <Reveal
                delay={i * 80}
                className={
                  i === 0
                    ? "flex h-full flex-col rounded-[1.75rem] bg-pink p-7 max-sm:p-5"
                    : "flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 max-sm:p-5"
                }
              >
                <span className="tabular text-xs font-bold text-white/60">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-white/70 max-sm:mt-2">{term.label}</p>
                <p className="mt-2 flex items-baseline gap-2">
                  <span className="tabular text-5xl font-extrabold max-sm:text-4xl sm:text-6xl">{term.value}</span>
                  <span className="text-lg font-semibold text-white/70">{term.unit}</span>
                </p>
                <p className={i === 0 ? "mt-4 text-sm leading-relaxed text-white/85 max-sm:mt-2" : "mt-4 text-sm leading-relaxed text-white/60 max-sm:mt-2"}>
                  {term.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-4 grid gap-4 max-sm:grid-cols-1 max-sm:[&>*]:min-w-0 lg:grid-cols-[1fr_1.6fr]">
          <Reveal className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 max-sm:p-5">
            <PhotoSlot photo={aboutPhotos.linesLaid} sizes="(min-width: 1024px) 30vw, 90vw" tone="dark" className="-mx-1 mb-6 aspect-[2/1] rounded-2xl max-sm:hidden" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Lengths in stock</p>
            {/* Bars grow with length so the jump from 50 to 70cm reads at a glance. */}
            <ul className="mt-6 grid gap-3 max-sm:mt-4 max-sm:gap-2.5">
              {lengths.map((l, i) => (
                <li key={l.cm} className="flex items-center gap-4">
                  <span className="tabular w-20 shrink-0 text-sm font-bold">
                    {l.cm}cm <span className="font-medium text-white/45">{l.inch}&quot;</span>
                  </span>
                  <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-pink-deep to-pink"
                      style={{ width: `${60 + i * 10}%` }}
                    />
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-white/50 max-sm:mt-4">
              Longer lengths and Super High Quality cost more. Ask for the price of each length.
            </p>
          </Reveal>

          <Reveal delay={100} className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-3 sm:p-4">
            <dl className="grid max-sm:grid-cols-2 sm:grid-cols-2">
              {termRows.map((row) => (
                <div key={row.label} className="border-b border-white/10 px-4 py-4 last:border-b-0 max-sm:px-3 max-sm:py-3.5 max-sm:[&:nth-last-child(2)]:border-b-0 sm:[&:nth-last-child(2)]:border-b-0">
                  <dt className="text-xs font-bold uppercase tracking-[0.2em] text-pink">{row.label}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-white/80">{row.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
