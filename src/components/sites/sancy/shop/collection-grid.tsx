"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Check, Minus, Plus, Search, X } from "lucide-react";
import type { ShopItem } from "@/lib/collections";
import { formatUsd, whatsappHref, whatsappNumbers } from "@/lib/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "../icons";

type Tier = "all" | "jet" | "colors";
type Sort = "code" | "price-asc" | "price-desc";
const PAGE = 12;

// Items arrive with their photo URL already resolved on the server (null = no photo yet).
export type GridItem = ShopItem & { src: string | null };

export function CollectionGrid({ items, unitNote }: { items: GridItem[]; unitNote: string }) {
  const [tier, setTier] = useState<Tier>("all");
  const [sort, setSort] = useState<Sort>("code");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);
  // Quote list: item id -> number of 100g bundles.
  const [quote, setQuote] = useState<Record<string, number>>({});

  const hasTiers = items.some((i) => i.tier !== null);
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^#/, "");
    const list = items.filter(
      (i) => (tier === "all" || i.tier === tier) && (!q || i.title.toLowerCase().replace(/#/g, "").includes(q)),
    );
    if (sort === "code") return list;
    const dir = sort === "price-asc" ? 1 : -1;
    return [...list].sort((a, b) => ((a.perKg ?? Infinity) - (b.perKg ?? Infinity)) * dir);
  }, [items, tier, sort, query]);

  const quoted = items.filter((i) => quote[i.id]);
  const bundles = quoted.reduce((sum, i) => sum + quote[i.id], 0);
  const add = (id: string, delta: number) =>
    setQuote((prev) => {
      const next = { ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) };
      if (!next[id]) delete next[id];
      return next;
    });
  const message = ["PRICE", ...quoted.map((i) => `- ${i.title}: ${quote[i.id] * 100}g`), "Length: ", "Ship to: "].join("\n");

  const tierCount = (t: Tier) => items.filter((i) => t === "all" || i.tier === t).length;

  return (
    <section id="products-list" className="scroll-mt-24 bg-paper pt-10 pb-24 max-sm:pt-6 max-sm:pb-14 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Toolbar: filters on top rather than in a sidebar, so the grid keeps its full width. */}
        <div className="sticky top-[72px] z-30 -mx-4 flex flex-col gap-3 border-b border-border bg-paper/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:-mx-8 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {hasTiers &&
              (["all", "jet", "colors"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={tier === t}
                  onClick={() => {
                    setTier(t);
                    setShown(PAGE);
                  }}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    tier === t ? "bg-ink text-white" : "bg-blush text-pink-deep hover:bg-pink-soft",
                  )}
                >
                  {t === "all" ? "All" : t === "jet" ? "#1 Jet Black" : "Colors"}
                  <span className="tabular ml-1.5 opacity-60">{tierCount(t)}</span>
                </button>
              ))}
            <p className="tabular text-sm text-muted-foreground md:ml-2">{visible.length} products</p>
          </div>

          <div className="flex items-center gap-2">
            {hasTiers && (
              <label className="relative flex-1 md:w-44 md:flex-none">
                <span className="sr-only">Find a color code</span>
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShown(PAGE);
                  }}
                  placeholder="Color code, e.g. 613"
                  className="w-full rounded-full border border-border bg-white py-2 pr-3 pl-9 text-sm outline-none focus:border-pink"
                />
              </label>
            )}
            <label className="shrink-0">
              <span className="sr-only">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-full border border-border bg-white px-3 py-2 text-sm font-medium outline-none focus:border-pink"
              >
                <option value="code">Sort: color chart</option>
                <option value="price-asc">Price, low to high</option>
                <option value="price-desc">Price, high to low</option>
              </select>
            </label>
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">No color matches &quot;{query}&quot;. Try a code like 613 or 4ash.</p>
        ) : (
          <ul className="mt-8 grid grid-cols-2 gap-3 max-sm:mt-5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {visible.slice(0, shown).map((item) => {
              const n = quote[item.id] ?? 0;
              return (
                <li key={item.id} className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-border bg-white transition-shadow hover:shadow-[0_24px_48px_-28px_rgb(233_30_115/0.45)]">
                  <div className="relative aspect-square overflow-hidden bg-white max-sm:aspect-[4/3]">
                    {item.src ? (
                      <Image
                        src={item.src}
                        alt={item.photo.alt}
                        fill
                        sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw"
                        className={cn(
                          "transition-transform duration-500 group-hover:scale-105",
                          item.photo.fit === "contain" ? "object-contain" : "object-cover",
                        )}
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 border-2 border-dashed border-pink/30 bg-blush p-3 text-center text-pink-deep">
                        <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase">Ảnh chờ</span>
                        <span className="font-mono text-[0.6rem] opacity-70">{item.photo.file}</span>
                      </div>
                    )}
                    {item.swatch && (
                      // Swatch chip: the one thing that changes between cards of the same line.
                      <span className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-white/95 py-1 pr-3 pl-1 text-xs font-bold shadow-sm">
                        <span className="size-5 rounded-full ring-1 ring-black/10" style={{ background: item.swatch }} aria-hidden="true" />
                        {item.code}
                      </span>
                    )}
                    {n > 0 && (
                      <span className="tabular absolute top-3 right-3 rounded-full bg-pink px-2.5 py-1 text-xs font-bold text-white">
                        {n * 100}g
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-3.5 max-sm:p-3 sm:p-4">
                    <h3 className="text-sm leading-snug font-bold sm:text-base">{item.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground max-sm:hidden">{unitNote}</p>
                    <div className="mt-3 flex-1 max-sm:mt-2">
                      {item.perKg !== null ? (
                        <p className="tabular">
                          <span className="text-xs text-muted-foreground">From </span>
                          <span className="text-lg font-extrabold">{formatUsd(item.perKg / 10, 1)}</span>
                          <span className="text-xs text-muted-foreground">/100g</span>
                          <span className="block text-xs text-muted-foreground">{formatUsd(item.perKg)}/kg</span>
                        </p>
                      ) : (
                        <p className="text-sm font-bold text-pink-deep">Price on WhatsApp</p>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      {item.code === null ? (
                        <a
                          href={whatsappHref(item.message)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 rounded-full bg-ink px-3 py-2 text-center text-xs font-bold text-white transition-colors hover:bg-pink sm:text-sm"
                        >
                          Ask the price
                        </a>
                      ) : n === 0 ? (
                        <button
                          type="button"
                          onClick={() => add(item.id, 1)}
                          className="flex-1 rounded-full bg-ink px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-pink sm:text-sm"
                        >
                          Add to quote
                        </button>
                      ) : (
                        <div className="flex flex-1 items-center justify-between rounded-full bg-blush p-1">
                          <button type="button" onClick={() => add(item.id, -1)} aria-label={`Remove 100g of ${item.title}`} className="flex size-7 items-center justify-center rounded-full bg-white text-pink">
                            <Minus className="size-3.5" />
                          </button>
                          <span className="tabular text-xs font-bold text-pink-deep">{n} × 100g</span>
                          <button type="button" onClick={() => add(item.id, 1)} aria-label={`Add 100g of ${item.title}`} className="flex size-7 items-center justify-center rounded-full bg-pink text-white">
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                      )}
                      <a
                        href={whatsappHref(item.message)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ask the price of ${item.title} on WhatsApp`}
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-pink transition-colors hover:border-pink hover:bg-pink hover:text-white"
                      >
                        <WhatsAppIcon className="size-4" />
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {shown < visible.length && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <p className="tabular text-sm text-muted-foreground">
              Showing {shown} of {visible.length}
            </p>
            <button
              type="button"
              onClick={() => setShown((s) => s + PAGE)}
              className="rounded-full border border-ink px-8 py-3 text-sm font-bold transition-colors hover:bg-ink hover:text-white"
            >
              Show more
            </button>
          </div>
        )}
      </div>

      {/* Quote tray: everything picked on this page goes out as one WhatsApp message. */}
      {quoted.length > 0 && (
        <div className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-3xl rounded-[1.5rem] bg-ink p-3 text-white shadow-[0_30px_60px_-20px_rgb(20_16_19/0.6)] sm:inset-x-6 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-pink">
                <Check className="size-5" strokeWidth={3} />
              </span>
              <div className="min-w-0">
                <p className="tabular text-sm font-bold">
                  {quoted.length} {quoted.length === 1 ? "item" : "items"} · {bundles * 100 >= 1000 ? `${(bundles * 100) / 1000} kg` : `${bundles * 100}g`}
                </p>
                <p className="truncate text-xs text-white/55">{quoted.map((i) => i.code ?? i.title).join(", ")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuote({})}
                aria-label="Clear quote list"
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white"
              >
                <X className="size-4" />
              </button>
              <a
                href={whatsappHref(message, whatsappNumbers[0].digits)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-pink px-5 py-3 text-sm font-bold whitespace-nowrap transition-colors hover:bg-pink-deep"
              >
                <WhatsAppIcon className="size-4" />
                Send list on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
