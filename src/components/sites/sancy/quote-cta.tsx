import { siteConfig, whatsappHref, whatsappNumbers } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import { Reveal } from "./reveal";

export function QuoteCta() {
  return (
    <section id="contact" className="scroll-mt-20 bg-paper px-4 pb-24 sm:px-6 sm:pb-28 lg:px-8">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-pink px-6 py-16 text-center text-white sm:px-12 lg:py-24">
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
        <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/85">
          Get every length, color and grade, plus shipping to your country. Sales replies {siteConfig.salesHours}.
        </p>

        <div className="relative mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          {whatsappNumbers.map((n, i) => (
            <a
              key={n.digits}
              href={whatsappHref("PRICE", n.digits)}
              target="_blank"
              rel="noopener noreferrer"
              className={
                i === 0
                  ? "inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-bold transition-transform hover:-translate-y-0.5"
                  : "inline-flex items-center justify-center gap-3 rounded-full border border-white/50 px-7 py-4 text-sm font-bold transition-colors hover:bg-white hover:text-pink"
              }
            >
              <WhatsAppIcon className="size-5" />
              <span className="tabular">{n.display}</span>
              <span className="font-medium opacity-70">{n.label}</span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
