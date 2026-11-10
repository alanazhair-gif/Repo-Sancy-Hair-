"use client";

import Link from "next/link";
import { useState } from "react";
import { lineCollectionSlug } from "@/lib/collections";
import { cn } from "@/lib/utils";
import { formatUsd, products, whatsappHref } from "@/lib/site";
import { Reveal } from "../reveal";

type Unit = "kg" | "bundle";

// Every line's "from" price side by side. Bundle prices are the kilo price divided by 10.
export function ShopPriceBoard({ notes }: { notes: Record<string, string> }) {
  const [unit, setUnit] = useState<Unit>("kg");
  const show = (perKg: number) => (unit === "kg" ? formatUsd(perKg) : formatUsd(perKg / 10, 1));
  const cheapest = Math.min(...products.flatMap((p) => (p.fromJetBlack === null ? [] : [p.fromJetBlack])));

  return (
    <section id="compare" className="scroll-mt-32 bg-paper py-20 max-sm:py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink">Compare</p>
            <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
              Every line, <span className="font-accent font-medium text-pink italic">one table.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground">
              &quot;From&quot; prices: 50cm, Super Quality. Longer lengths and Super High Quality cost more.
            </p>
          </div>

          <div role="group" aria-label="Price unit" className="inline-flex shrink-0 rounded-full bg-blush p-1">
            {(["kg", "bundle"] as const).map((u) => (
              <button
                key={u}
                type="button"
                aria-pressed={unit === u}
                onClick={() => setUnit(u)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-bold transition-colors",
                  unit === u ? "bg-pink text-white" : "text-pink-deep hover:text-pink",
                )}
              >
                {u === "kg" ? "Per kg" : "Per 100g bundle"}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-10 overflow-hidden rounded-[1.75rem] border border-border bg-white max-sm:mt-7 max-sm:rounded-2xl">
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[34rem] text-left text-sm max-sm:min-w-0">
              <thead>
                <tr className="border-b border-border bg-blush/60 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground max-sm:text-[0.6rem] max-sm:tracking-[0.1em]">
                  <th scope="col" className="px-5 py-4 max-sm:px-3 max-sm:py-3 sm:px-6">Line</th>
                  <th scope="col" className="px-5 py-4 text-right max-sm:px-2 max-sm:py-3 sm:px-6">#1 Jet Black</th>
                  <th scope="col" className="px-5 py-4 text-right max-sm:px-3 max-sm:py-3 sm:px-6">Colors (26)</th>
                  <th scope="col" className="w-12 px-5 py-4 max-sm:hidden sm:px-6"><span className="sr-only">Ask</span></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="group border-b border-border last:border-b-0 hover:bg-blush/40">
                    <th scope="row" className="px-5 py-4 font-bold max-sm:px-3 max-sm:py-3 max-sm:leading-snug sm:px-6">
                      <Link href={`/shop/${lineCollectionSlug(p.id)}`} className="hover:text-pink">
                        {p.name}
                      </Link>
                      {notes[p.id] && <span className="ml-2 text-xs font-medium text-muted-foreground max-sm:ml-0 max-sm:block max-sm:text-[0.7rem]">{notes[p.id]}</span>}
                      {p.fromJetBlack === cheapest && (
                        <span className="ml-2 rounded-full bg-pink px-2 py-0.5 text-[0.65rem] font-bold text-white uppercase max-sm:mt-1 max-sm:ml-0 max-sm:inline-block max-sm:text-[0.55rem]">
                          Lowest
                        </span>
                      )}
                    </th>
                    {p.fromJetBlack !== null && p.fromColors !== null ? (
                      <>
                        <td className="tabular px-5 py-4 text-right text-base font-extrabold max-sm:px-2 max-sm:py-3 max-sm:text-sm sm:px-6">
                          {show(p.fromJetBlack)}
                          <span className="text-xs font-semibold text-muted-foreground">/{unit === "kg" ? "kg" : "100g"}</span>
                        </td>
                        <td className="tabular px-5 py-4 text-right text-base font-extrabold max-sm:px-3 max-sm:py-3 max-sm:text-sm sm:px-6">
                          {show(p.fromColors)}
                          <span className="text-xs font-semibold text-muted-foreground">/{unit === "kg" ? "kg" : "100g"}</span>
                        </td>
                      </>
                    ) : (
                      <td colSpan={2} className="px-5 py-4 text-right text-muted-foreground max-sm:px-3 max-sm:py-3 max-sm:text-xs sm:px-6">
                        Quoted on WhatsApp
                      </td>
                    )}
                    <td className="px-5 py-4 text-right max-sm:hidden sm:px-6">
                      <a
                        href={whatsappHref(`PRICE ${p.name}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold whitespace-nowrap text-pink opacity-70 group-hover:opacity-100 hover:text-pink-deep"
                      >
                        Ask
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
