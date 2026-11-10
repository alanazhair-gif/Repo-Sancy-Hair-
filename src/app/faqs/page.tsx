import type { Metadata } from "next";
import { CreditCard, Scissors, ShieldCheck, ShoppingBag } from "lucide-react";
import { SplitFeature } from "@/components/sites/sancy/about-blocks";
import { FaqList } from "@/components/sites/sancy/faq-list";
import { InstagramIcon, WhatsAppIcon } from "@/components/sites/sancy/icons";
import { InnerPage } from "@/components/sites/sancy/inner-page";
import { PageHero } from "@/components/sites/sancy/page-hero";
import { PhotoSlot } from "@/components/sites/sancy/photo-slot";
import { Reveal } from "@/components/sites/sancy/reveal";
import { aboutPhotos, extraFaqs } from "@/lib/about";
import { faqGroups, instagramHref, orderPhotos, siteConfig, whatsappHref, whatsappNumbers } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQs | Sancy Hair Vietnam",
  description: "Answers on wholesale grade, MOQ, grades, samples, payment, shipping and the official WhatsApp numbers.",
};

// The short answers buyers ask most (02-SANCY-KNOWLEDGE section 7).
const quick = [
  { q: "MOQ?", a: "100g, 1 bundle" },
  { q: "1 kg?", a: "10 bundles" },
  { q: "Grades?", a: "Super High Quality · Super Quality" },
  { q: "Colors?", a: "27, order by code" },
  { q: "First payment?", a: "PayPal works" },
  { q: "Shipping?", a: "Quoted per country" },
];

const groupMeta: Record<string, { id: string; icon: typeof ShoppingBag; photo: (typeof aboutPhotos)[keyof typeof aboutPhotos] }> = {
  "The hair": { id: "hair", icon: Scissors, photo: aboutPhotos.linesLaid },
  "Ordering and price": { id: "ordering", icon: ShoppingBag, photo: aboutPhotos.bundlesColors },
  "Payment and shipping": { id: "payment", icon: CreditCard, photo: orderPhotos[2] },
  "Checking us": { id: "checking", icon: ShieldCheck, photo: aboutPhotos.teamWide },
};

const groups = faqGroups.map((g) => ({
  ...g,
  ...groupMeta[g.title],
  items: [...g.items, ...(extraFaqs[g.title] ?? [])],
}));
const total = groups.reduce((n, g) => n + g.items.length, 0);

export default function FaqsPage() {
  return (
    <InnerPage current="/faqs">
      <PageHero
        crumb="FAQs"
        eyebrow="FAQs"
        title="Straight answers"
        accent="to what buyers ask."
        intro={`${total} answers on the hair, ordering, payment and shipping, and how to check us. Still stuck? Sales replies ${siteConfig.salesHours}.`}
        photo={aboutPhotos.officeDesks}
      />

      {/* Quick answers */}
      <section className="bg-white py-14 max-sm:py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">In one line</p>
          <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {quick.map((item, i) => (
              <li key={item.q}>
                <Reveal delay={i * 40} className="h-full rounded-2xl bg-blush p-5 max-sm:p-4">
                  <p className="text-xs font-bold text-pink-deep">{item.q}</p>
                  <p className="mt-1.5 leading-snug font-extrabold">{item.a}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* All questions, by topic */}
      <section className="bg-paper py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 max-sm:gap-6 sm:px-6 lg:grid-cols-[17rem_1fr] lg:gap-14 lg:px-8">
          <nav aria-label="FAQ topics" className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">Topics</p>
            <ul className="mt-4 flex gap-2 overflow-x-auto [scrollbar-width:none] lg:grid lg:overflow-visible [&::-webkit-scrollbar]:hidden">
              {groups.map(({ id, icon: Icon, title, items }) => (
                <li key={id} className="shrink-0">
                  <a
                    href={`#${id}`}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 text-sm font-bold transition-colors hover:border-pink hover:text-pink"
                  >
                    <Icon className="size-4 text-pink" aria-hidden="true" />
                    <span className="flex-1 whitespace-nowrap">{title}</span>
                    <span className="tabular rounded-full bg-blush px-2 py-0.5 text-xs text-pink-deep">{items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid min-w-0 gap-16 max-sm:gap-10">
            {groups.map(({ id, icon: Icon, title, items, photo }) => (
              <section key={id} id={id} className="scroll-mt-28">
                <Reveal className="relative overflow-hidden rounded-[1.75rem]">
                  <PhotoSlot photo={photo} sizes="(min-width: 1024px) 60vw, 95vw" className="aspect-[3/1] max-sm:aspect-[4/1]" />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-6">
                    <h2 className="flex items-center gap-3 text-2xl font-extrabold text-white sm:text-3xl">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-pink">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      {title}
                    </h2>
                  </div>
                </Reveal>
                <FaqList items={items} className="mt-5" />
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* Still have a question */}
      <section className="bg-blush py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SplitFeature photo={aboutPhotos.officeLogoWall} flip>
            <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">Still have a question?</p>
            <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              Ask the people <span className="font-accent font-medium text-pink italic">who answer every day.</span>
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">Our sales office replies on WhatsApp, {siteConfig.salesHours}.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {whatsappNumbers.map((n) => (
                <li key={n.digits}>
                  <a
                    href={whatsappHref("Hi Sancy, I have a question.", n.digits)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl bg-white p-4 transition-colors hover:bg-pink hover:text-white"
                  >
                    <WhatsAppIcon className="size-5 shrink-0 text-pink" />
                    <span>
                      <span className="tabular block font-bold">{n.display}</span>
                      <span className="block text-xs opacity-70">{n.label}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a href={instagramHref} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-pink hover:text-pink-deep">
              <InstagramIcon className="size-4" /> Or DM @{siteConfig.instagram}
            </a>
          </SplitFeature>
        </div>
      </section>
    </InnerPage>
  );
}
