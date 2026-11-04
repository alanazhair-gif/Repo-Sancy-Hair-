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
    <p className={cn("mt-4 border-t pt-4 text-sm", tone === "dark" ? "border-white/15 text-white/70" : "border-border text-muted-foreground")}>
      From <span className={cn("text-lg font-extrabold", tone === "dark" ? "text-white" : "text-ink")}>{formatUsd(price)}</span> / kg, {label}, 50cm
    </p>
  );
}

export function ColorCollection() {
  return (
    <section id="colors" className="scroll-mt-20 bg-paper py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Colors"
          title="27 colors."
          accent="Two prices."
          tags={["#1 Jet Black: own price", "26 colors: one price"]}
          note="Order by color code."
          link={{ label: "Ask about a color on WhatsApp", message: "COLOR" }}
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[0.9fr_2.1fr]">
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl p-5 text-white sm:p-6" style={{ background: jetBlack.swatch }}>
              <PhotoSlot
                photo={photos.jetBlack}
                sizes="(min-width: 1024px) 28vw, 90vw"
                tone="dark"
                className="aspect-[4/3] rounded-2xl lg:aspect-auto lg:min-h-44 lg:flex-1"
              />
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-5xl leading-none font-extrabold">{jetBlack.code}</p>
                  <p className="mt-1 font-accent text-2xl italic">{jetBlack.name}</p>
                </div>
                <span className="mb-1 rounded-full bg-pink px-3 py-1 text-xs font-bold uppercase tracking-[0.15em]">
                  Own price
                </span>
              </div>
              <PriceLine price={fromJetBlack} label="#1 Jet Black, Super Quality" tone="dark" />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col rounded-3xl border border-border bg-white p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <p className="font-bold">Colors</p>
                <span className="rounded-full bg-blush px-3 py-1 text-xs font-bold text-pink-deep">26 codes, one price</span>
              </div>
              <ul className="mt-5 grid grid-cols-4 gap-x-3 gap-y-4 sm:grid-cols-7 lg:grid-cols-9">
                {colorCodes.map((c) => (
                  <li key={c.code} className="text-center">
                    <span
                      className="mx-auto block aspect-square w-full max-w-14 rounded-full ring-1 ring-ink/10"
                      style={{ background: c.swatch }}
                    />
                    <span className="mt-1.5 block text-xs font-semibold">{c.code}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <PriceLine price={fromColors} label="any of the 26 colors, Super Quality" />
                <p className="mt-3 text-xs text-muted-foreground">
                  Screen colors are approximate. Ask on WhatsApp for a real video of the color you want.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <PhotoSlot
            photo={photos.colorChart}
            sizes="(min-width: 1280px) 80rem, 95vw"
            className="mt-4 aspect-[16/9] rounded-3xl border border-border"
          />
        </Reveal>
      </div>
    </section>
  );
}
