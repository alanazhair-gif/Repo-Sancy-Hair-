import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Check, Clock, CreditCard, EyeOff, PackageCheck, Truck } from "lucide-react";
import { SectionIntro, SplitFeature } from "@/components/sites/sancy/about-blocks";
import { FaqList } from "@/components/sites/sancy/faq-list";
import { WhatsAppIcon } from "@/components/sites/sancy/icons";
import { InnerPage } from "@/components/sites/sancy/inner-page";
import { PageHero } from "@/components/sites/sancy/page-hero";
import { PhotoSlot } from "@/components/sites/sancy/photo-slot";
import { Reveal } from "@/components/sites/sancy/reveal";
import { SectionNav } from "@/components/sites/sancy/section-nav";
import { aboutPhotos, paymentMethods, quoteChecklist } from "@/lib/about";
import { faqGroups, orderPhotos, siteConfig, trustChecks, whatsappHref, whatsappNumbers, type PhotoBrief } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "How To Order | MOQ 100g, PayPal, Bank Transfer | Sancy Hair Vietnam",
  description: `Order Sancy hair in four steps on WhatsApp. MOQ 100g. Sales replies ${siteConfig.salesHours}.`,
};

const sections = [
  { id: "steps", label: "4 steps" },
  { id: "payment", label: "Payment" },
  { id: "samples", label: "Samples and stock" },
  { id: "shipping", label: "Shipping" },
  { id: "check", label: "Check us" },
  { id: "questions", label: "Questions" },
];

const exampleMessage = ["PRICE", "Bulk Hair, 60cm", "#1 Jet Black", "Super Quality", "Ship to: Turkey"];

// The four steps (02-SANCY-KNOWLEDGE section 5), each with a photo and the detail behind it.
const steps: { title: string; lead: string; photo: PhotoBrief; points: string[] }[] = [
  {
    title: "Message us on WhatsApp",
    lead: "Send \"PRICE\" to either official number.",
    photo: aboutPhotos.officeSales,
    points: [`Sales replies ${siteConfig.salesHours}.`, "Both numbers are Sancy. Any other number using the Sancy name is not us."],
  },
  {
    title: "Tell us what you need",
    lead: "Five details, and sales can quote you in one reply.",
    photo: aboutPhotos.weftsLaid,
    points: quoteChecklist.map((c) => `${c.label}: ${c.example}`),
  },
  {
    title: "Get your quote",
    lead: "Price plus shipping to your country.",
    photo: aboutPhotos.officeDesks,
    points: [
      "The price for the line, length, color and grade you asked about.",
      "Shipping cost to your country. Shipping is not included in our list prices.",
    ],
  },
  {
    title: "Pay and ship",
    lead: "PayPal, bank transfer or Western Union.",
    photo: orderPhotos[0],
    points: ["100-200g samples usually ship right away from stock.", "Larger orders take 7 to 10 days, depending on product and weight."],
  },
];

const orderingFaqs = [
  ...faqGroups.flatMap((g) => g.items).filter((f) =>
    ["Do I have to buy 1 kg?", "Do samples cost money?", "How do I pay?", "When does my order leave the factory?", "Why are there two WhatsApp numbers?"].includes(f.q),
  ),
];

export default function HowToOrderPage() {
  return (
    <InnerPage current="/how-to-order">
      <PageHero
        crumb="How To Order"
        eyebrow="How to order"
        title="Four steps,"
        accent="all on WhatsApp."
        intro="Message us, tell us what you need, get your quote with shipping, then pay by PayPal, bank transfer or Western Union. Start with one 100g bundle."
        photo={orderPhotos[0]}
      >
        <ol className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs font-semibold text-white/80">
              <span className="tabular mr-1.5 font-extrabold text-pink">{i + 1}</span>
              {s.title}
            </li>
          ))}
        </ol>
      </PageHero>
      <SectionNav items={sections} />

      {/* 4 steps */}
      <section id="steps" className="scroll-mt-32 bg-white py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Step by step" title="From your first message" accent="to a packed order." />
          <ol className="mt-14 grid gap-16 max-sm:mt-8 max-sm:gap-10 sm:gap-20">
            {steps.map((step, i) => (
              <li key={step.title} className="grid items-center gap-8 max-sm:gap-5 lg:grid-cols-2 lg:gap-14">
                <Reveal className={cn("relative", i % 2 === 1 && "lg:order-2")}>
                  <PhotoSlot photo={step.photo} sizes="(min-width: 1024px) 45vw, 95vw" className="aspect-[3/2] rounded-[2rem] max-sm:aspect-[16/9] max-sm:rounded-3xl" />
                  <span className="tabular absolute -top-5 left-6 flex size-14 items-center justify-center rounded-full bg-pink text-2xl max-sm:-top-4 max-sm:left-4 max-sm:size-11 max-sm:text-xl max-sm:ring-4 font-extrabold text-white ring-8 ring-white">
                    {i + 1}
                  </span>
                </Reveal>
                <Reveal delay={100}>
                  <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">Step {i + 1}</p>
                  <h3 className="mt-3 text-3xl font-extrabold tracking-tight max-sm:mt-2 max-sm:text-2xl sm:text-4xl">{step.title}</h3>
                  <p className="mt-3 text-lg text-muted-foreground max-sm:mt-2 max-sm:text-base">{step.lead}</p>
                  <ul className="mt-6 grid gap-2.5 max-sm:mt-4 max-sm:gap-2">
                    {step.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blush text-pink">
                          <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>

                  {i === 0 && (
                    <div className="mt-6 grid gap-2 sm:grid-cols-2">
                      {whatsappNumbers.map((n) => (
                        <a
                          key={n.digits}
                          href={whatsappHref("PRICE", n.digits)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 rounded-2xl border border-border bg-paper p-3.5 transition-colors hover:border-pink hover:bg-blush"
                        >
                          <WhatsAppIcon className="size-5 shrink-0 text-pink" />
                          <span>
                            <span className="tabular block text-sm font-bold">{n.display}</span>
                            <span className="block text-xs text-muted-foreground">{n.label}</span>
                          </span>
                        </a>
                      ))}
                    </div>
                  )}

                  {i === 1 && (
                    <div className="mt-6 max-w-sm rounded-2xl bg-[#efe7de] p-4">
                      <p className="text-center text-[0.6rem] font-bold tracking-[0.2em] text-ink/40 uppercase">Example message</p>
                      <div className="mt-2 ml-auto w-fit rounded-2xl rounded-tr-sm bg-[#d9fdd3] px-4 py-3 text-sm leading-relaxed shadow-sm">
                        {exampleMessage.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </div>
                      <a
                        href={whatsappHref(exampleMessage.join("\n"))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center justify-center gap-2 rounded-full bg-pink py-3 text-sm font-bold text-white transition-colors hover:bg-pink-deep"
                      >
                        <WhatsAppIcon className="size-4" /> Send a message like this
                      </a>
                    </div>
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Payment */}
      <section id="payment" className="grain relative scroll-mt-32 overflow-hidden bg-ink py-20 text-white max-sm:py-12 sm:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro dark eyebrow="Payment" title="Three ways to pay," accent="PayPal for your first order." />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {paymentMethods.map((m, i) => (
              <li key={m.name}>
                <Reveal delay={i * 70} className={i === 0 ? "h-full rounded-[1.75rem] bg-pink p-7" : "h-full rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7"}>
                  <CreditCard className="size-6" aria-hidden="true" />
                  <h3 className="mt-5 text-2xl font-extrabold">{m.name}</h3>
                  <p className={cn("mt-2 text-sm leading-relaxed", i === 0 ? "text-white/90" : "text-white/60")}>{m.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Samples and stock */}
      <section id="samples" className="scroll-mt-32 bg-paper py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SplitFeature photo={aboutPhotos.bundlesBlonde}>
            <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">Samples and stock</p>
            <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              Test with one bundle <span className="font-accent font-medium text-pink italic">before you buy a kilo.</span>
            </h2>
            <dl className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { icon: PackageCheck, t: "MOQ", d: "100g, which is 1 bundle." },
                { icon: Clock, t: "From stock", d: "100-200g usually ships right away." },
                { icon: BadgeCheck, t: "Same stock", d: "Samples come from the same stock as bulk orders." },
                { icon: CreditCard, t: "Paid samples", d: "The sample cost is not deducted from your first order." },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="rounded-2xl bg-white p-4">
                  <dt className="flex items-center gap-2 font-bold">
                    <Icon className="size-4 text-pink" aria-hidden="true" /> {t}
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{d}</dd>
                </div>
              ))}
            </dl>
          </SplitFeature>
        </div>
      </section>

      {/* Shipping */}
      <section id="shipping" className="scroll-mt-32 bg-white py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SplitFeature photo={orderPhotos[1]} flip>
            <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">Shipping</p>
            <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              Quoted for your country, <span className="font-accent font-medium text-pink italic">with every order.</span>
            </h2>
            <ul className="mt-7 grid gap-3">
              {[
                "Shipping is not included in our list prices.",
                "Send your country with your request. We quote shipping cost and timing per order.",
                "Larger orders take 7 to 10 days to prepare, depending on product and weight.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 rounded-2xl border border-border bg-paper p-4 text-sm">
                  <Truck className="mt-0.5 size-4 shrink-0 text-pink" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </SplitFeature>
        </div>
      </section>

      {/* Check us */}
      <section id="check" className="scroll-mt-32 bg-blush py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Before you pay" title="Worried about a new supplier?" accent="Check us first." />
          <ul className="mt-10 grid gap-4 max-sm:mt-6 max-sm:grid-cols-2 max-sm:gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trustChecks.map((c, i) => (
              <li key={c.title}>
                <Reveal delay={i * 60} className="h-full rounded-[1.5rem] bg-white p-6 max-sm:rounded-2xl max-sm:p-3.5">
                  <BadgeCheck className="size-6 text-pink max-sm:size-5" aria-hidden="true" />
                  <h3 className="mt-4 font-extrabold max-sm:mt-2 max-sm:text-sm max-sm:leading-snug">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-sm:hidden">{c.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <ul className="mt-6 grid gap-4 max-sm:mt-3 max-sm:grid-cols-3 max-sm:gap-2 sm:grid-cols-3">
            {orderPhotos.map((photo, i) => (
              <li key={photo.file}>
                <Reveal delay={i * 70} className="overflow-hidden rounded-[1.5rem] bg-white max-sm:rounded-xl">
                  <PhotoSlot photo={photo} sizes="(min-width: 640px) 31vw, 32vw" className="aspect-[4/3]" />
                  <p className="flex items-center justify-between px-5 py-3.5 text-xs max-sm:px-2 max-sm:py-2 max-sm:text-[0.65rem]">
                    <span className="font-bold">Real order {String(i + 1).padStart(2, "0")}</span>
                    <span className="flex items-center gap-1.5 text-muted-foreground max-sm:hidden">
                      <EyeOff className="size-3.5 text-pink" aria-hidden="true" /> Customer details covered
                    </span>
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Questions */}
      <section id="questions" className="scroll-mt-32 bg-paper py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:gap-14 lg:px-8">
          <div>
            <SectionIntro eyebrow="Ordering questions" title="Asked before" accent="every first order." />
            <Link href="/faqs" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-pink hover:text-pink-deep">
              All FAQs <ArrowRight className="size-4" />
            </Link>
          </div>
          <FaqList items={orderingFaqs} />
        </div>
      </section>
    </InnerPage>
  );
}
