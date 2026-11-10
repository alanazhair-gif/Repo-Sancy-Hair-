"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import type { MegaMenu as MegaMenuConfig, MenuGroup } from "@/lib/collections";
import { cn } from "@/lib/utils";
import { whatsappHref } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

// Desktop grid: the group columns plus a wider promo card.
const gridCols: Record<number, string> = {
  2: "grid-cols-[1fr_1fr_1.6fr]",
  3: "grid-cols-[repeat(3,1fr)_1.15fr]",
  4: "grid-cols-[repeat(4,1fr)_1.15fr]",
};

function GroupBlock({ group, onPick }: { group: MenuGroup; onPick: () => void }) {
  return (
    <div>
      <Link
        href={group.href}
        onClick={onPick}
        className="group/title flex items-center justify-between border-b border-border pb-2.5 text-[0.7rem] font-extrabold tracking-[0.22em] text-pink uppercase"
      >
        {group.title}
        <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover/title:opacity-100" />
      </Link>
      <ul className="mt-3 grid gap-0.5">
        {group.links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              onClick={onPick}
              className="group/link -mx-2 flex items-center justify-between rounded-lg px-2 py-1.5 text-sm font-medium text-ink/80 transition-colors hover:bg-blush hover:text-pink-deep"
            >
              {l.label}
              <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover/link:translate-x-0 group-hover/link:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Desktop: a top link with a full-width panel on hover or keyboard focus. Pure CSS, so it also
// works in the Shopify copy before React loads.
export function MegaMenu({ menu, solid }: { menu: MegaMenuConfig; solid: boolean }) {
  // After a pick the pointer is still over the panel; keep it shut until the pointer leaves.
  const [picked, setPicked] = useState(false);
  const onPick = () => {
    setPicked(true);
    (document.activeElement as HTMLElement | null)?.blur();
  };

  return (
    <div className="group/mega flex h-18 items-center" onMouseLeave={() => setPicked(false)}>
      <Link
        href={menu.href}
        data-header-link
        aria-haspopup="true"
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors xl:px-4",
          solid
            ? "group-hover/mega:bg-blush group-hover/mega:text-pink"
            : "text-white/85 group-hover/mega:bg-white/10 group-hover/mega:text-white",
        )}
      >
        {menu.label}
        <ChevronDown className="size-3.5 transition-transform group-hover/mega:rotate-180" aria-hidden="true" />
      </Link>

      <div
        className={cn(
          "invisible absolute inset-x-0 top-full -translate-y-1 opacity-0 transition-all duration-200",
          "group-focus-within/mega:visible group-focus-within/mega:translate-y-0 group-focus-within/mega:opacity-100",
          "group-hover/mega:visible group-hover/mega:translate-y-0 group-hover/mega:opacity-100",
          picked && "!invisible !opacity-0",
        )}
      >
        <div className="border-t border-border bg-white text-ink shadow-[0_30px_60px_-30px_rgb(20_16_19/0.35)]">
          <div className={cn("mx-auto grid max-w-7xl gap-8 px-8 py-9", gridCols[menu.columns.length])}>
            {menu.columns.map((col, i) => (
              <div key={i} className="grid content-start gap-7">
                {col.map((g) => (
                  <GroupBlock key={g.id} group={g} onPick={onPick} />
                ))}
              </div>
            ))}

            <div className="grain relative flex min-h-56 flex-col overflow-hidden rounded-[1.5rem] bg-ink p-6 text-white">
              {menu.promo.image ? (
                <>
                  <Image src={menu.promo.image.src} alt={menu.promo.image.alt} fill sizes="30vw" className="object-cover" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
                </>
              ) : (
                <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-pink/40 blur-3xl" />
              )}
              <p className="relative text-[0.65rem] font-bold tracking-[0.25em] text-pink uppercase">{menu.promo.eyebrow}</p>
              <p className="relative mt-3 text-xl leading-snug font-extrabold">
                {menu.promo.title} <span className="font-accent font-medium text-pink italic">{menu.promo.accent}</span>
              </p>
              <Link
                href={menu.promo.link.href}
                onClick={onPick}
                className="relative mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-bold text-white hover:text-pink"
              >
                {menu.promo.link.label} <ArrowRight className="size-4" />
              </Link>
              <a
                href={whatsappHref(menu.promo.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-pink px-4 py-3 text-sm font-bold transition-colors hover:bg-pink-deep"
              >
                <WhatsAppIcon className="size-4" />
                {menu.promo.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile: an expandable row per menu, with its groups listed.
export function MobileMegaMenu({
  menu,
  onNavigate,
}: {
  menu: Pick<MegaMenuConfig, "label" | "href" | "columns">;
  onNavigate: () => void;
}) {
  return (
    <details className="group/m border-b border-border">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-xl font-semibold [&::-webkit-details-marker]:hidden">
        {menu.label}
        <ChevronDown className="size-5 text-pink transition-transform group-open/m:rotate-180" aria-hidden="true" />
      </summary>
      <div className="grid gap-5 pb-5">
        <Link href={menu.href} onClick={onNavigate} className="text-sm font-bold text-pink">
          See all
        </Link>
        {menu.columns.flat().map((g) => (
          <div key={g.id}>
            <p className="text-[0.7rem] font-extrabold tracking-[0.22em] text-pink uppercase">{g.title}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={onNavigate}
                    className="block rounded-full bg-blush px-3 py-1.5 text-sm font-medium text-pink-deep"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </details>
  );
}
