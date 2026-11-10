import type { Metadata } from "next";
import { Clock, MapPin, ShieldCheck } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/sites/sancy/icons";
import { PageHero } from "@/components/sites/sancy/page-hero";
import { QuoteCta } from "@/components/sites/sancy/quote-cta";
import { Reveal } from "@/components/sites/sancy/reveal";
import { SiteFooter } from "@/components/sites/sancy/site-footer";
import { SiteHeader } from "@/components/sites/sancy/site-header";
import { siteAsset } from "@/lib/assets";
import { instagramHref, photos, siteConfig, whatsappHref, whatsappNumbers } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Sancy Hair Vietnam | WhatsApp +84 766 629 002 and +84 82 337 7352",
  description: `Message Sancy sales on WhatsApp. Sales replies ${siteConfig.salesHours}.`,
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader logo={{ onLight: siteAsset(photos.logo.file), onDark: siteAsset(photos.logoOnDark.file) }} />
      <main className="flex-1">
        <PageHero
          crumb="Contact"
          eyebrow="Contact"
          title="Talk to sales"
          accent="on WhatsApp."
          intro={`Send "PRICE" to either official number. Sales replies ${siteConfig.salesHours}.`}
        />

        <section className="bg-paper py-20 max-sm:py-12 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
            <Reveal className="rounded-[2rem] border border-border bg-white p-6 max-sm:p-5 sm:p-8">
              <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">Official WhatsApp numbers</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {whatsappNumbers.map((n) => (
                  <li key={n.digits}>
                    <a
                      href={whatsappHref("PRICE", n.digits)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col gap-4 rounded-2xl bg-blush p-5 transition-colors hover:bg-pink hover:text-white"
                    >
                      <span className="flex size-11 items-center justify-center rounded-full bg-white text-pink">
                        <WhatsAppIcon className="size-5" />
                      </span>
                      <span>
                        <span className="tabular block text-xl font-extrabold">{n.display}</span>
                        <span className="block text-sm opacity-70">{n.label}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex items-start gap-2.5 text-sm text-muted-foreground">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-pink" aria-hidden="true" />
                Both numbers are Sancy. Any other number using the Sancy name is not us. If in doubt, DM @
                {siteConfig.instagram} on Instagram to check.
              </p>
            </Reveal>

            <Reveal delay={100} className="grid gap-4">
              {[
                { icon: MapPin, label: "Factory", body: siteConfig.address },
                { icon: Clock, label: "Sales hours", body: siteConfig.salesHours },
              ].map(({ icon: Icon, label, body }) => (
                <div key={label} className="flex items-start gap-4 rounded-[1.5rem] border border-border bg-white p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blush text-pink">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">{label}</span>
                    <span className="mt-1 block font-semibold">{body}</span>
                  </span>
                </div>
              ))}
              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-[1.5rem] bg-ink p-5 text-white transition-colors hover:bg-pink"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <InstagramIcon className="size-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold tracking-[0.2em] text-white/60 uppercase">Instagram</span>
                  <span className="mt-1 block font-semibold">@{siteConfig.instagram}</span>
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        <QuoteCta />
      </main>
      <SiteFooter />
    </>
  );
}
