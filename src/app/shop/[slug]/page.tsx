import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuoteCta } from "@/components/sites/sancy/quote-cta";
import { CollectionDetails } from "@/components/sites/sancy/shop/collection-details";
import { CollectionGrid } from "@/components/sites/sancy/shop/collection-grid";
import { CollectionHero } from "@/components/sites/sancy/shop/collection-hero";
import { SiteFooter } from "@/components/sites/sancy/site-footer";
import { SiteHeader } from "@/components/sites/sancy/site-header";
import { siteAsset } from "@/lib/assets";
import { collectionBySlug, collectionItems, collections } from "@/lib/collections";
import { photos } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = collectionBySlug((await params).slug);
  if (!c) return {};
  return {
    title: `${c.name} | Wholesale Vietnamese Human Hair | Sancy Hair Vietnam`,
    description: `${c.intro} MOQ 100g, 22 colors, from our factory in Vietnam.`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const collection = collectionBySlug((await params).slug);
  if (!collection) notFound();

  const items = collectionItems(collection).map((i) => ({ ...i, src: siteAsset(i.photo.file) }));
  const unitNote = collection.customItems
    ? "Quoted per order"
    : collection.lineId === "lace"
      ? "Made by hand"
      : "100g bundle · 50cm · Super Quality";

  return (
    <>
      <SiteHeader logo={{ onLight: siteAsset(photos.logo.file), onDark: siteAsset(photos.logoOnDark.file) }} />
      <main className="flex-1">
        <CollectionHero collection={collection} />
        <CollectionGrid items={items} unitNote={unitNote} />
        <CollectionDetails collection={collection} />
        <div className="bg-paper pt-20 sm:pt-24">
          <QuoteCta />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
