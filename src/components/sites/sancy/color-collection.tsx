import { colorCodes, formatUsd, jetBlack, photos, pricedProducts } from "@/lib/site";
import { cn } from "@/lib/utils";
import { PhotoSlot } from "./photo-slot";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

// Lowest "from" price across lines, so each card shows a real starting point.
const fromJetBlack = Math.min(...pricedProducts.map((p) => p.fromJetBlack));
const fromColors = Math.min(...pricedProducts.map((p) => p.fromColors));

function PriceLine({ price, label, tone = "light" }: { price: number; label: string; tone?: "light" | "dark" }) {
  return (
    <p className={cn("text-xs", tone === "dark" ? "text-white/65" : "text-muted-foreground")}>
      From <span className={cn("text-base font-extrabold", tone === "dark" ? "text-white" : "text-ink")}>{formatUsd(price)}</span> / kg,{" "}
      {label}, Super Quality, 50cm
    </p>
  );
}

export function ColorCollection() {
  return (
    <section id="colors" className="scroll-mt-20 bg-paper py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Colors"
          title="22 colors."
          accent="Two prices."
          tags={["#1 Jet Black: own price", "21 colors: one price"]}
          note="Order by color code."
          link={{ label: "Ask about a color on WhatsApp", message: "COLOR" }}
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[0.8fr_1fr]">
          <Reveal>
            <PhotoSlot
              photo={photos.colorChart}
              sizes="(min-width: 1024px) 34rem, 95vw"
              // The chart's own background, so the frame can stretch to the cards' height.
              className="aspect-[4/5] rounded-3xl border border-border bg-[#fbf6f8] sm:aspect-square lg:aspect-auto lg:h-full lg:min-h-80"
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col gap-3">
              <div className="flex items-center gap-4 rounded-3xl p-3 text-white sm:gap-5" style={{ background: jetBlack.swatch }}>
                <PhotoSlot
                  photo={photos.jetBlack}
                  sizes="176px"
                  tone="dark"
                  compact
                  className="aspect-[4/3] w-28 shrink-0 rounded-2xl sm:w-40"
                />
                <div className="min-w-0 flex-1">
                  <p className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold">{jetBlack.code}</span>
                    <span className="font-accent text-lg italic">{jetBlack.name}</span>
                  </p>
                  <PriceLine price={fromJetBlack} label="#1 Jet Black" tone="dark" />
                </div>
                <span className="mr-2 hidden rounded-full bg-pink px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.15em] sm:block">
                  Own price
                </span>
              </div>

              <div className="flex flex-1 flex-col rounded-3xl border border-border bg-white p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold">21 colors</p>
                  <span className="rounded-full bg-blush px-3 py-1 text-xs font-bold text-pink-deep">One price</span>
                </div>
                <ul className="mt-4 grid grid-cols-7 gap-x-2 gap-y-3">
                  {colorCodes.map((c) => (
                    <li key={c.code} className="text-center">
                      <span
                        className="mx-auto block aspect-square w-full max-w-10 rounded-full ring-1 ring-ink/10"
                        style={{ background: c.swatch }}
                      />
                      <span className="mt-1 block text-[0.65rem] font-semibold">{c.code}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4">
                  <PriceLine price={fromColors} label="any of the 21 colors" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Screen colors are approximate. Ask on WhatsApp for a real video of the color you want.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
