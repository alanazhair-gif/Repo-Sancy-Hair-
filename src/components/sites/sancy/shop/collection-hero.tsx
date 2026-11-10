import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { collectionFromPrice, collectionItems, collectionPhoto, menuGroups, siblingsOf, type Collection } from "@/lib/collections";
import { formatUsd } from "@/lib/site";
import { cn } from "@/lib/utils";
import { PhotoSlot } from "../photo-slot";
import { Reveal } from "../reveal";
import { HeroBackdrop } from "../hero-backdrop";

export function CollectionHero({ collection }: { collection: Collection }) {
  const group = menuGroups.find((g) => g.id === collection.group);
  const from = collectionFromPrice(collection);
  const count = collectionItems(collection).length;
  const siblings = siblingsOf(collection);
  const specs = [
    { label: "Minimum order", value: "100g" },
    collection.lineId === "lace" ? { label: "Made", value: "By hand" } : { label: "Lengths", value: "50-70cm" },
    { label: collection.lineId === "lace" ? "Styles" : "Products", value: String(count) },
    { label: "From", value: from === null ? "Quoted" : `${formatUsd(from)}/kg` },
  ];

  return (
    <section id="top" className="grain relative overflow-hidden bg-ink text-white">
      <HeroBackdrop />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pt-32 pb-12 max-sm:gap-7 max-sm:pt-28 max-sm:pb-9 sm:px-6 md:pt-40 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-14 lg:px-8 lg:pb-16">
        <Reveal>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-white/50">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <Link href="/shop" className="hover:text-white">Shop</Link>
            {group && group.id !== "need" && (
              <>
                <ChevronRight className="size-3.5" aria-hidden="true" />
                <Link href={group.href} className="hover:text-white">{group.title}</Link>
              </>
            )}
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span className="text-white/80">{collection.name}</span>
          </nav>

          {collection.pending && (
            <p className="mt-5 inline-block rounded-full border border-dashed border-pink/60 px-3 py-1 text-[0.65rem] font-bold tracking-[0.15em] text-pink uppercase">
              Demo · cần sếp xác nhận trước khi đăng
            </p>
          )}
          <h1 className="mt-6 text-[2.4rem] leading-[1.04] font-extrabold tracking-tight sm:text-6xl">
            {collection.title}
            <br />
            <span className="font-accent font-medium text-pink italic">{collection.accent}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">{collection.intro}</p>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
            {specs.map((s) => (
              <div key={s.label} className="flex flex-col-reverse bg-ink px-4 py-3.5">
                <dt className="text-[0.65rem] font-bold tracking-[0.2em] text-white/45 uppercase">{s.label}</dt>
                <dd className="tabular text-xl font-extrabold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <PhotoSlot
            photo={collectionPhoto(collection)}
            sizes="(min-width: 1024px) 38vw, 92vw"
            className="aspect-[4/3] rounded-[2rem] ring-1 ring-white/10 max-sm:aspect-[16/10] max-sm:rounded-3xl"
          />
        </Reveal>
      </div>

      {siblings.length > 1 && (
        <div className="relative border-t border-white/10">
          <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-4 [scrollbar-width:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden">
            {siblings.map((s) => (
              <li key={s.slug} className="shrink-0">
                <Link
                  href={`/shop/${s.slug}`}
                  aria-current={s.slug === collection.slug ? "page" : undefined}
                  className={cn(
                    "block rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
                    s.slug === collection.slug ? "bg-pink text-white" : "bg-white/[0.06] text-white/75 hover:bg-white/15 hover:text-white",
                  )}
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
