import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { collections, lineCollectionSlug } from "@/lib/collections";
import { formatUsd, grades, lengths, whatsappHref, type Product } from "@/lib/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "../icons";
import { PhotoSlot } from "../photo-slot";
import { Reveal } from "../reveal";

type ShopProductRowProps = {
  product: Product;
  index: number;
  total: number;
  points: string[];
  priceNote?: string;
  flip: boolean;
};

const lengthRange = `${lengths[0].cm}-${lengths[lengths.length - 1].cm}cm`;

export function ShopProductRow({ product, index, total, points, priceNote, flip }: ShopProductRowProps) {
  const priced = product.fromJetBlack !== null && product.fromColors !== null;
  const subCollections = collections.filter((c) => c.lineId === product.id && c.subtype);

  return (
    <article id={`line-${product.id}`} className="scroll-mt-36">
      <div className="grid items-center gap-8 max-sm:gap-5 lg:grid-cols-2 lg:gap-16">
        <Reveal className={cn("relative", flip && "lg:order-2")}>
          <PhotoSlot
            photo={product.photo}
            sizes="(min-width: 1024px) 45vw, 92vw"
            className="aspect-[4/3] rounded-[2rem] border border-border max-sm:aspect-[16/10] max-sm:rounded-3xl"
          />
          {priced && (
            <div className="absolute bottom-4 left-4 rounded-2xl bg-ink/90 px-4 py-3 text-white max-sm:bottom-3 max-sm:left-3 max-sm:px-3 max-sm:py-2 shadow-lg backdrop-blur-sm">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/60">Per 100g bundle from</p>
              <p className="tabular text-xl font-extrabold">{formatUsd((product.fromJetBlack ?? 0) / 10, 1)}</p>
            </div>
          )}
        </Reveal>

        <Reveal delay={100}>
          <p className="tabular text-xs font-bold tracking-[0.3em] text-pink">
            {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-3xl font-extrabold tracking-tight max-sm:mt-2 max-sm:text-2xl sm:text-4xl">{product.name}</h3>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground max-sm:mt-2 max-sm:text-sm">{product.summary}</p>

          {product.types.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-1.5 max-sm:mt-3">
              {product.types.map((t) => {
                const sub = subCollections.find((c) => c.subtype?.startsWith(t) || c.name.endsWith(t));
                const chip = "rounded-full border border-pink/30 px-3 py-1 text-xs font-bold text-pink-deep";
                return (
                  <li key={t}>
                    {sub ? (
                      <Link href={`/shop/${sub.slug}`} className={`${chip} block transition-colors hover:border-pink hover:bg-pink hover:text-white`}>
                        {t}
                      </Link>
                    ) : (
                      <span className={`${chip} block`}>{t}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          <ul className="mt-6 grid gap-2.5 max-sm:mt-4 max-sm:gap-2">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm font-medium">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blush text-pink">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-7 grid gap-3 rounded-2xl bg-blush p-5 max-sm:mt-5 max-sm:grid-cols-2 max-sm:p-4 sm:grid-cols-2">
            {priced ? (
              <>
                <div>
                  <p className="text-xs text-muted-foreground">#1 Jet Black, from</p>
                  <p className="tabular text-2xl font-extrabold">
                    {formatUsd(product.fromJetBlack ?? 0)}
                    <span className="text-sm font-semibold text-muted-foreground">/kg</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Colors, from</p>
                  <p className="tabular text-2xl font-extrabold">
                    {formatUsd(product.fromColors ?? 0)}
                    <span className="text-sm font-semibold text-muted-foreground">/kg</span>
                  </p>
                </div>
              </>
            ) : (
              <div className="max-sm:col-span-2 sm:col-span-2">
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="text-2xl font-extrabold">Quoted on WhatsApp</p>
              </div>
            )}
            <p className="text-xs leading-relaxed text-muted-foreground max-sm:col-span-2 sm:col-span-2">
              {priced ? `${priceNote ? `${priceNote}. ` : ""}50cm, Super Quality. ` : ""}
              Lengths {lengthRange}. Grades: {grades.join(" and ")}.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 max-sm:mt-5 max-sm:gap-2 sm:flex-row">
            <Link
              href={`/shop/${lineCollectionSlug(product.id)}`}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-pink"
            >
              Shop {product.name}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={whatsappHref(`PRICE ${product.name}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:border-pink hover:text-pink"
            >
              <WhatsAppIcon className="size-5 text-pink" />
              Ask the price
            </a>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
