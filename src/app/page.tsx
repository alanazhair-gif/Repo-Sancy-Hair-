import { ColorCollection } from "@/components/sites/sancy/color-collection";
import { Factory } from "@/components/sites/sancy/factory";
import { Faq } from "@/components/sites/sancy/faq";
import { Hero } from "@/components/sites/sancy/hero";
import { HowToOrder } from "@/components/sites/sancy/how-to-order";
import { MarginCalculator } from "@/components/sites/sancy/margin-calculator";
import { PhotoSlot } from "@/components/sites/sancy/photo-slot";
import { ProductCategories } from "@/components/sites/sancy/product-categories";
import { QuoteCta } from "@/components/sites/sancy/quote-cta";
import { SiteFooter } from "@/components/sites/sancy/site-footer";
import { SiteHeader } from "@/components/sites/sancy/site-header";
import { siteAsset } from "@/lib/assets";
import { photos } from "@/lib/site";

export default function Home() {
  return (
    <>
      <SiteHeader logo={{ onLight: siteAsset(photos.logo.file), onDark: siteAsset(photos.logoOnDark.file) }} />
      <main className="flex-1">
        <Hero />
        <ProductCategories />
        <MarginCalculator
          media={
            <PhotoSlot
              photo={photos.heroWeighing}
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="mt-7 aspect-[16/9] rounded-3xl"
            />
          }
        />
        <ColorCollection />
        <Factory />
        <HowToOrder />
        <Faq />
        <QuoteCta />
      </main>
      <SiteFooter />
    </>
  );
}
