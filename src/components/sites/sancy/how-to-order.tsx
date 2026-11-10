import { ArrowUpRight, BadgeCheck, EyeOff } from "lucide-react";
import { orderPhotos, orderSteps, photos, siteConfig, trustChecks, whatsappHref, whatsappNumbers } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import { PhotoSlot } from "./photo-slot";
import { Reveal } from "./reveal";
import { SwipeHint } from "./swipe-hint";
import { SectionHeader } from "./section-header";

export function HowToOrder() {
  return (
    <section id="order" className="scroll-mt-20 bg-paper py-16 max-sm:py-12 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How to order"
          title="Four steps."
          accent="Start with one bundle."
          tags={["MOQ 100g", "PayPal", "Bank transfer", "Western Union"]}
          note={`Sales replies ${siteConfig.salesHours}.`}
          link={{ label: "Send \"PRICE\" on WhatsApp", message: "PRICE" }}
        />

        <ol className="mt-8 grid gap-3 max-sm:mt-5 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {orderSteps.map((step, i) => (
            <li key={step.title}>
              <Reveal
                delay={i * 80}
                className="flex h-full items-start gap-4 rounded-2xl border border-border bg-white p-5 max-sm:gap-3 max-sm:p-4 transition-all sm:flex-col sm:items-stretch sm:gap-0 sm:rounded-[1.75rem] sm:p-7 duration-300 hover:-translate-y-1 hover:border-pink/40 hover:shadow-[0_24px_48px_-24px_rgb(233_30_115/0.4)]"
              >
                <span className="tabular w-11 shrink-0 text-3xl leading-none font-extrabold text-pink sm:w-auto sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base leading-snug font-bold sm:mt-8 sm:text-lg lg:min-h-[2lh]">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:mt-2">{step.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-6 rounded-[1.75rem] bg-blush p-5 max-sm:mt-8 max-sm:gap-5 max-sm:grid-cols-1 max-sm:[&>*]:min-w-0 sm:mt-20 sm:gap-8 sm:rounded-[2rem] sm:p-10 lg:grid-cols-2 lg:gap-12">
          <Reveal className="flex flex-col">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink">Before you pay</p>
            <h3 className="mt-4 text-2xl leading-tight font-extrabold text-balance max-sm:mt-3 max-sm:text-xl sm:text-4xl">
              Worried about sending money to a supplier you found online?{" "}
              <span className="font-accent font-medium text-pink italic">Check us first.</span>
            </h3>
            <PhotoSlot
              photo={photos.workshop}
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="mt-6 aspect-[16/9] rounded-2xl max-sm:hidden sm:mt-8 lg:mt-auto"
            />
          </Reveal>

          <Reveal delay={100} className="flex flex-col gap-4">
            <div className="rounded-2xl bg-white p-5">
              <p className="text-sm font-bold">Our only official WhatsApp numbers</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {whatsappNumbers.map((n) => (
                  <li key={n.digits}>
                    <a
                      href={whatsappHref("Hi Sancy, I'd like to check this is your official number.", n.digits)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-border px-3 py-2.5 transition-colors hover:border-pink hover:bg-blush"
                    >
                      <WhatsAppIcon className="size-5 shrink-0 text-pink" />
                      <span>
                        <span className="tabular block font-bold">{n.display}</span>
                        <span className="block text-xs text-muted-foreground">{n.label}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Any other number using the Sancy name is not us.
              </p>
            </div>

            <ul className="grid flex-1 gap-3 max-sm:grid-cols-2 sm:grid-cols-2 sm:gap-4">
              {trustChecks.map((check) => (
                <li key={check.title} className="rounded-2xl bg-white p-4 max-sm:p-3.5 sm:p-5">
                  <h4 className="flex items-start gap-2.5 font-bold max-sm:gap-2 max-sm:text-sm max-sm:leading-snug">
                    <BadgeCheck className="mt-0.5 size-5 shrink-0 text-pink" />
                    {check.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-sm:hidden">{check.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-12 max-sm:mt-8 sm:mt-20">
          <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink">Proof</p>
              <h3 className="mt-3 text-2xl font-extrabold sm:text-4xl">
                Real orders, <span className="font-accent font-medium text-pink italic">weighed and packed.</span>
              </h3>
            </div>
            <a
              href={whatsappHref("Hi Sancy, can you send photos of real packed orders?")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-pink hover:text-pink-deep"
            >
              Ask for more order photos
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </a>
          </div>

          <SwipeHint className="mt-4" />
          <ul className="-mx-4 mt-2 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 sm:scroll-px-0 [scrollbar-width:none] sm:mx-0 sm:mt-8 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0">
            {orderPhotos.map((photo, i) => (
              <li key={photo.file} className="w-[80%] shrink-0 snap-start rounded-[1.75rem] border border-border bg-white p-2 sm:w-auto">
                <PhotoSlot
                  photo={photo}
                  sizes="(min-width: 640px) 30vw, 80vw"
                  className="aspect-[4/3] rounded-[1.25rem]"
                  compact
                />
                <div className="flex items-center justify-between px-3 pt-3 pb-1.5 text-xs">
                  <span className="font-bold">Order {String(i + 1).padStart(2, "0")}</span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <EyeOff className="size-3.5 text-pink" aria-hidden="true" />
                    Customer details covered
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
