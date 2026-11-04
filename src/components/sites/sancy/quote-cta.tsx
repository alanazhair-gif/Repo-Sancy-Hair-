import { siteConfig, whatsappHref, whatsappNumbers } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import { Reveal } from "./reveal";

export function QuoteCta() {
  return (
    <section id="contact" className="scroll-mt-20 bg-paper px-4 pb-24 sm:px-6 sm:pb-28 lg:px-8">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-pink px-5 py-12 text-center text-white sm:rounded-[2.5rem] sm:px-12 sm:py-16 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full border border-white/20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -bottom-40 size-[28rem] rounded-full border border-white/20"
        />

        <p className="relative text-xs font-bold uppercase tracking-[0.3em] text-white/80">Full price table</p>
        <h2 className="relative mx-auto mt-5 max-w-3xl text-3xl leading-tight font-extrabold tracking-tight sm:text-6xl">
          Send &quot;PRICE&quot; on WhatsApp.
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-base text-white/85 sm:mt-5 sm:text-lg">
          Get every length, color and grade, plus shipping to your country. Sales replies {siteConfig.salesHours}.
        </p>

        <div className="relative mt-8 flex flex-col justify-center gap-2.5 sm:mt-10 sm:flex-row sm:gap-3">
          {whatsappNumbers.map((n, i) => (
            <a
              key={n.digits}
              href={whatsappHref("PRICE", n.digits)}
              target="_blank"
              rel="noopener noreferrer"
              className={
                i === 0
                  ? "inline-flex items-center justify-center gap-3 rounded-full bg-ink px-5 py-3.5 text-sm sm:px-7 sm:py-4 font-bold transition-transform hover:-translate-y-0.5"
                  : "inline-flex items-center justify-center gap-3 rounded-full bg-white px-5 py-3.5 text-sm text-pink sm:px-7 sm:py-4 font-bold transition-transform hover:-translate-y-0.5"
              }
            >
              <WhatsAppIcon className="size-5" />
              <span className="tabular whitespace-nowrap">{n.display}</span>
              <span className="font-medium opacity-70">{n.label}</span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
