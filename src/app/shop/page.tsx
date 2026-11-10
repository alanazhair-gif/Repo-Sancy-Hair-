import type { Metadata } from "next";
import { QuoteCta } from "@/components/sites/sancy/quote-cta";
import { Reveal } from "@/components/sites/sancy/reveal";
import { ShopHero } from "@/components/sites/sancy/shop/shop-hero";
import { ShopInstallGuide } from "@/components/sites/sancy/shop/shop-install-guide";
import { ShopLineNav } from "@/components/sites/sancy/shop/shop-line-nav";
import { ShopPriceBoard } from "@/components/sites/sancy/shop/shop-price-board";
import { ShopProductRow } from "@/components/sites/sancy/shop/shop-product-row";
import { SiteFooter } from "@/components/sites/sancy/site-footer";
import { SiteHeader } from "@/components/sites/sancy/site-header";
import { siteAsset } from "@/lib/assets";
import { priceNotes, productById, productPoints, shopGroups } from "@/lib/shop";
import { photos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop Hair Extensions | Bulk, Weft, Keratin Tip, Tape-in, Clip-in | Sancy Hair Vietnam",
  description:
    "Wholesale Vietnamese human hair by line: bulk, Straight, Genius and Flat Weft, keratin tips, tape-ins, clip-ins, lace. From prices per kg, MOQ 100g.",
};

const orderedIds = shopGroups.flatMap((g) => g.productIds);

export default function ShopPage() {
  return (
    <>
      <SiteHeader logo={{ onLight: siteAsset(photos.logo.file), onDark: siteAsset(photos.logoOnDark.file) }} />
      <main className="flex-1">
        <ShopHero />
        <ShopLineNav lines={orderedIds.map((id) => ({ id, name: productById(id).name }))} />
        <ShopPriceBoard notes={priceNotes} />

        {shopGroups.map((group, g) => (
          <section
            key={group.id}
            id={group.id}
            className={g % 2 === 0 ? "bg-white py-20 max-sm:py-12 sm:py-24" : "bg-paper py-20 max-sm:py-12 sm:py-24"}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Reveal className="flex flex-col gap-4 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink">{group.label}</p>
                  <h2 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
                    {group.title} <span className="font-accent font-medium text-pink italic">{group.accent}</span>
                  </h2>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{group.intro}</p>
              </Reveal>

              <div className="mt-14 grid gap-20 max-sm:mt-8 max-sm:gap-12 sm:gap-24">
                {group.productIds.map((id) => {
                  const n = orderedIds.indexOf(id) + 1;
                  return (
                    <ShopProductRow
                      key={id}
                      product={productById(id)}
                      index={n}
                      total={orderedIds.length}
                      points={productPoints[id] ?? []}
                      priceNote={priceNotes[id]}
                      flip={n % 2 === 0}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        ))}

        <ShopInstallGuide />
        <div className="bg-paper pt-24 sm:pt-28">
          <QuoteCta />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
