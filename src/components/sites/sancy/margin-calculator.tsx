"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { formatUsd, pricedProducts, whatsappHref } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import { Reveal } from "./reveal";

const quantities = [100, 200, 300, 500, 1000, 5000, 10000];
const legend = "text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground";
const formatQty = (grams: number) => (grams >= 1000 ? `${grams / 1000} kg` : `${grams}g`);

// `media` is rendered on the server (photo slot), since this component runs on the client.
export function MarginCalculator({ media }: { media?: React.ReactNode }) {
  const [productId, setProductId] = useState(pricedProducts[0].id);
  const [tier, setTier] = useState<"jet" | "colors">("jet");
  const [grams, setGrams] = useState(1000);
  const [resale, setResale] = useState("");
  const resaleId = useId();

  const product = pricedProducts.find((p) => p.id === productId) ?? pricedProducts[0];
  const perKg = tier === "jet" ? product.fromJetBlack : product.fromColors;
  const bundles = grams / 100;
  const perBundle = perKg / 10;
  const total = (perKg * grams) / 1000;
  const resaleValue = Number.parseFloat(resale);
  const hasResale = Number.isFinite(resaleValue) && resaleValue > 0;
  const marginPerBundle = hasResale ? resaleValue - perBundle : 0;

  const message = `PRICE ${product.name}, ${tier === "jet" ? "#1 Jet Black" : "Colors"}, ${formatQty(grams)}`;

  return (
    <section id="prices" className="scroll-mt-20 bg-blush py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-14 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink">Your margin</p>
          <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-balance sm:text-4xl xl:text-[2.75rem]">
            1 KG = 10 bundles. <span className="font-accent font-medium text-pink italic">What would you sell one for?</span>
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Pick a line and a quantity to see your cost per 100g bundle. Type the price you sell at and see what you
            keep.
          </p>
          {media}
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            Uses &quot;from&quot; prices: 50cm, Super Quality, USD. Shipping not included. Exact quote for your length,
            color, grade and country on WhatsApp.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_30px_60px_-30px_rgb(233_30_115/0.35)] sm:p-8">
            <fieldset>
              <legend className={legend}>1. Product</legend>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {pricedProducts.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={p.id === productId}
                    onClick={() => setProductId(p.id)}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors",
                      p.id === productId ? "border-pink bg-pink text-white" : "border-border hover:border-pink",
                    )}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className={legend}>2. Color</legend>
              <div className="mt-3 grid grid-cols-2 rounded-xl bg-blush p-1">
                {(
                  [
                    ["jet", "#1 Jet Black"],
                    ["colors", "Colors"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={tier === value}
                    onClick={() => setTier(value)}
                    className={cn(
                      "rounded-lg py-2.5 text-sm font-semibold transition-colors",
                      tier === value ? "bg-ink text-white" : "text-ink/70 hover:text-ink",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className={legend}>3. Quantity</legend>
              <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
                {quantities.map((q) => (
                  <button
                    key={q}
                    type="button"
                    aria-pressed={grams === q}
                    onClick={() => setGrams(q)}
                    className={cn(
                      "rounded-xl border py-2.5 text-sm font-semibold transition-colors",
                      grams === q ? "border-ink bg-ink text-white" : "border-border hover:border-ink",
                    )}
                  >
                    {formatQty(q)}
                  </button>
                ))}
              </div>
            </fieldset>

            <dl className="mt-7 grid grid-cols-3 divide-x divide-border rounded-2xl bg-paper py-5 text-center">
              <div>
                <dt className="text-xs text-muted-foreground">Bundles</dt>
                <dd className="tabular mt-1 text-2xl font-extrabold">{bundles}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Cost / bundle</dt>
                <dd className="tabular mt-1 text-2xl font-extrabold">{formatUsd(perBundle, 2)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Total</dt>
                <dd className="tabular mt-1 text-2xl font-extrabold text-pink">{formatUsd(total)}</dd>
              </div>
            </dl>

            <label htmlFor={resaleId} className={cn(legend, "mt-7 block")}>
              4. Your price for one bundle (USD)
            </label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <input
                id={resaleId}
                type="number"
                inputMode="decimal"
                min={0}
                step="0.5"
                placeholder="Your price"
                value={resale}
                onChange={(e) => setResale(e.target.value)}
                className="tabular h-16 w-full rounded-xl border border-input bg-white px-4 text-lg font-semibold outline-none focus:border-pink focus:ring-2 focus:ring-pink/25"
              />
              <div className="flex h-16 flex-col justify-center rounded-xl bg-ink px-4 text-white" aria-live="polite">
                <p className="flex items-baseline justify-between gap-2 text-xs text-white/60">
                  You keep
                  {hasResale && <span className="tabular hidden sm:inline">{formatUsd(marginPerBundle, 2)} / bundle</span>}
                </p>
                <p className={cn("tabular text-xl font-extrabold", hasResale && marginPerBundle < 0 && "text-pink-soft")}>
                  {hasResale ? formatUsd(marginPerBundle * bundles) : "-"}
                </p>
              </div>
            </div>

            <a
              href={whatsappHref(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-pink py-4 text-sm font-bold text-white transition-colors hover:bg-pink-deep"
            >
              <WhatsAppIcon className="size-5" />
              Get the exact quote on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
