import { Building2, Palette, Scissors, Store, Truck } from "lucide-react";
import { aboutPhotos } from "@/lib/about";
import { buyerTypes, whatsappHref } from "@/lib/site";
import { PhotoSlot } from "./photo-slot";
import { Reveal } from "./reveal";

const icons = [Store, Scissors, Building2, Palette, Truck];
// One of our own photos per buyer type, in buyerTypes order.
const buyerPhotos = [aboutPhotos.bundlesColors, aboutPhotos.styling, aboutPhotos.bundlesBlonde, aboutPhotos.linesLaid, aboutPhotos.weftsLaid];

export function BuyerTypes() {
  return (
    <section id="buyers" className="scroll-mt-20 bg-blush py-24 max-sm:py-12 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink">Who buys from Sancy</p>
          <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
            Built for people who resell hair, <span className="font-accent font-medium text-pink italic">not for one-off buyers.</span>
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-4 max-sm:mt-6 max-sm:gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {buyerTypes.map((buyer, i) => {
            const Icon = icons[i];
            return (
              <li key={buyer.who}>
                <Reveal delay={i * 60} className="h-full">
                  <a
                    href={whatsappHref(`PRICE (${buyer.who})`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgb(233_30_115/0.4)]"
                  >
                    <div className="relative max-sm:hidden">
                      <PhotoSlot photo={buyerPhotos[i]} sizes="(min-width: 1024px) 19vw, (min-width: 640px) 46vw, 95vw" className="aspect-[4/3]" compact />
                      <span className="absolute -bottom-5 left-5 flex size-11 items-center justify-center rounded-xl bg-white text-pink shadow-md transition-colors group-hover:bg-pink group-hover:text-white">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6 pt-8 max-sm:p-4">
                    <h3 className="text-lg font-extrabold max-sm:flex max-sm:items-center max-sm:gap-2.5">
                      <Icon className="size-5 shrink-0 text-pink sm:hidden" aria-hidden="true" />
                      {buyer.who}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-snug text-pink-deep">{buyer.worry}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{buyer.answer}</p>
                    </div>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
