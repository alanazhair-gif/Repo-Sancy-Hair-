import type { Metadata } from "next";
import { siteAsset } from "@/lib/assets";
import { photos } from "@/lib/site";
import { SiteHeader } from "@/components/sites/sancy/site-header";

// Source for the Shopify header section: scripts/export-shopify.mjs reads this page's
// prerendered <header>. Not meant to be visited.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ShopifyHeader() {
  return <SiteHeader standalone logo={{ onLight: siteAsset(photos.logo.file), onDark: siteAsset(photos.logoOnDark.file) }} />;
}
