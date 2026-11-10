import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroBackdrop } from "@/components/sites/sancy/hero-backdrop";
import { SiteFooter } from "@/components/sites/sancy/site-footer";
import { SiteHeader } from "@/components/sites/sancy/site-header";
import { siteAsset } from "@/lib/assets";
import { photos, whatsappHref } from "@/lib/site";

const shortcuts = [
  { href: "/shop", label: "Shop extensions" },
  { href: "/prices", label: "Prices" },
  { href: "/how-to-order", label: "How to order" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader logo={{ onLight: siteAsset(photos.logo.file), onDark: siteAsset(photos.logoOnDark.file) }} />
      <main className="flex-1">
        <section id="top" className="grain relative overflow-hidden bg-ink text-white">
          <HeroBackdrop />
          <div className="relative mx-auto max-w-3xl px-4 pt-36 pb-24 text-center sm:px-6 md:pt-44 md:pb-32">
            <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">Error 404</p>
            <h1 className="mt-4 text-[2.4rem] leading-[1.04] font-extrabold tracking-tight sm:text-6xl">
              This page is not here.
              <br />
              <span className="font-accent font-medium text-pink italic">The hair still is.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              The link may be old or mistyped. Pick a page below, or send &quot;PRICE&quot; on WhatsApp and our sales team will
              answer.
            </p>
            <ul className="mt-10 flex flex-wrap justify-center gap-3">
              {shortcuts.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-sm font-bold transition-colors hover:border-pink hover:text-pink"
                  >
                    {s.label} <ArrowRight className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-ink hover:bg-blush">
                Back to home
              </Link>
              <a
                href={whatsappHref("PRICE")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-pink px-6 py-3 text-sm font-bold text-white hover:bg-pink-deep"
              >
                Send &quot;PRICE&quot; on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
