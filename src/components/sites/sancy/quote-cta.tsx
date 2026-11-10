import { Check } from "lucide-react";
import { siteConfig, whatsappHref, whatsappNumbers } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import { QuoteBuilder } from "./quote-builder";
import { Reveal } from "./reveal";

const youGet = [
  "Price for every length, color and grade you ask about",
  "Shipping cost to your country",
  "What is in stock now and what ships right away",
];

export function QuoteCta() {
  return (
    <section id="contact" className="scroll-mt-20 bg-paper px-4 pb-24 max-sm:pb-12 sm:px-6 sm:pb-28 lg:px-8">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-pink px-5 py-12 text-white sm:rounded-[2.5rem] sm:px-12 sm:py-16 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full border border-white/20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -bottom-40 size-[28rem] rounded-full border border-white/20"
        />

        <div className="relative grid gap-10 max-sm:gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">Request a quote</p>
            <h2 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
              Tell us what you need and where you are.
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/85 sm:mt-5 sm:text-lg">
              Sales replies {siteConfig.salesHours}.
            </p>

            <ul className="mt-8 grid gap-3 max-sm:mt-6">
              {youGet.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-semibold sm:text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-pink">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-white/75 max-sm:hidden">
              Or just send &quot;PRICE&quot;
            </p>
            <div className="mt-3 flex flex-col gap-2.5 max-sm:hidden sm:flex-row sm:flex-wrap sm:gap-3 lg:flex-col lg:items-start">
              {whatsappNumbers.map((n, i) => (
                <a
                  key={n.digits}
                  href={whatsappHref("PRICE", n.digits)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    i === 0
                      ? "inline-flex items-center justify-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
                      : "inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-pink transition-transform hover:-translate-y-0.5"
                  }
                >
                  <WhatsAppIcon className="size-5" />
                  <span className="tabular whitespace-nowrap">{n.display}</span>
                  <span className="font-medium opacity-70">{n.label}</span>
                </a>
              ))}
            </div>
          </div>

          <QuoteBuilder />
        </div>
      </Reveal>
    </section>
  );
}
