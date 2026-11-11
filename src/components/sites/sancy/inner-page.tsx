import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteAsset } from "@/lib/assets";
import { aboutLinks, photos } from "@/lib/site";
import { QuoteCta } from "./quote-cta";
import { Reveal } from "./reveal";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

// Shell for the inner pages: header, page content, "more about Sancy" links, quote form, footer.
// hideMoreOnPhone: skip the "More about buying from us" links on phones (short pages like the blog).
export function InnerPage({
  current,
  hideMoreOnPhone = false,
  children,
}: {
  current: string;
  hideMoreOnPhone?: boolean;
  children: React.ReactNode;
}) {
  const more = aboutLinks.filter((l) => l.href !== current);

  return (
    <>
      <SiteHeader logo={{ onLight: siteAsset(photos.logo.file), onDark: siteAsset(photos.logoOnDark.file) }} />
      <main className="flex-1">
        {children}

        <section className={cn("bg-paper py-20 max-sm:py-12 sm:py-24", hideMoreOnPhone && "max-sm:hidden")}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">About Sancy</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
                More about <span className="font-accent font-medium text-pink italic">buying from us.</span>
              </h2>
            </Reveal>
            <ul className="mt-8 grid grid-cols-2 gap-3 max-sm:mt-6 sm:grid-cols-3 lg:grid-cols-6">
              {more.map((l, i) => (
                <li key={l.href}>
                  <Reveal delay={i * 50} className="h-full">
                    <Link
                      href={l.href}
                      className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-border bg-white p-5 max-sm:gap-3 max-sm:p-4 transition-all hover:-translate-y-0.5 hover:border-pink/40 hover:shadow-[0_20px_40px_-28px_rgb(233_30_115/0.5)]"
                    >
                      <span className="text-sm font-bold">{l.label}</span>
                      <ArrowRight className="size-4 text-pink transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <QuoteCta />
      </main>
      <SiteFooter />
    </>
  );
}
