import { Clock, Plus } from "lucide-react";
import { faqs, siteConfig, whatsappHref, whatsappNumbers } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import { Reveal } from "./reveal";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-paper pb-24 sm:pb-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[5fr_7fr] lg:gap-14 lg:px-8">
        {/* Left column sticks while the questions scroll, so it never sits empty. */}
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink">FAQ</p>
          <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-balance sm:text-5xl">
            Straight answers <span className="font-accent font-medium text-pink italic">to what buyers ask.</span>
          </h2>

          <div className="mt-8 rounded-[1.75rem] bg-blush p-6">
            <p className="font-bold">Still have a question?</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4 text-pink" aria-hidden="true" />
              Sales replies {siteConfig.salesHours}
            </p>
            <ul className="mt-4 grid gap-2">
              {whatsappNumbers.map((n) => (
                <li key={n.digits}>
                  <a
                    href={whatsappHref("Hi Sancy, I have a question.", n.digits)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 transition-colors hover:bg-pink hover:text-white"
                  >
                    <WhatsAppIcon className="size-5 shrink-0" />
                    <span className="tabular font-bold">{n.display}</span>
                    <span className="ml-auto text-xs opacity-70">{n.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid gap-3">
            {faqs.map((item, i) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-border bg-white transition-colors open:border-pink/40 open:shadow-[0_20px_40px_-28px_rgb(233_30_115/0.45)]"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                  <span className="tabular w-6 shrink-0 text-sm font-extrabold text-pink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-bold sm:text-lg">{item.q}</span>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blush text-pink transition-all duration-300 group-open:rotate-45 group-open:bg-pink group-open:text-white">
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="px-5 pb-5 pl-[3.75rem] leading-relaxed text-muted-foreground sm:px-6 sm:pb-6 sm:pl-[4.25rem]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
