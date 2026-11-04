import { ArrowUpRight } from "lucide-react";
import { formatUsd, products, whatsappHref } from "@/lib/site";
import { PhotoSlot } from "./photo-slot";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

const priceTags = ["\"From\" prices", "USD per kg", "50cm", "Super Quality"];

export function ProductCategories() {
  return (
    <section id="products" className="scroll-mt-20 bg-paper py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Products"
          title="Bulk, weft and extensions."
          accent="Ready stock."
          tags={priceTags}
          note="Longer lengths and Super High Quality cost more."
          link={{ label: "Full price table on WhatsApp", message: "PRICE full table" }}
        />

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 lg:grid-cols-4">
          {products.map((product, i) => (
            <li key={product.id}>
              <Reveal delay={(i % 4) * 70} className="h-full">
                <a
                  href={whatsappHref(`PRICE ${product.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-[1.25rem] border border-border bg-white p-1.5 transition-all sm:rounded-[1.75rem] sm:p-2 duration-300 hover:-translate-y-1 hover:border-pink/40 hover:shadow-[0_24px_48px_-24px_rgb(233_30_115/0.4)]"
                >
                  <PhotoSlot
                    photo={product.photo}
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="aspect-[4/3] rounded-[0.9rem] sm:rounded-[1.25rem]"
                    compact
                  />

                  <div className="flex flex-1 flex-col px-2 pt-3 pb-2.5 sm:px-4 sm:pt-5 sm:pb-4">
                    <h3 className="text-[0.95rem] leading-snug font-bold sm:text-lg sm:leading-normal">{product.name}</h3>
                    <p className="mt-1 mb-3 line-clamp-3 text-xs leading-snug text-muted-foreground sm:mt-1.5 sm:mb-0 sm:line-clamp-none sm:min-h-[2lh] sm:text-sm sm:leading-relaxed">
                      {product.summary}
                    </p>

                    {/* Fixed-height row so every card's price line sits at the same height. */}
                    <ul className="mt-2.5 mb-3 flex h-5 flex-wrap gap-1 overflow-hidden empty:hidden sm:mt-3 sm:empty:flex sm:mb-5 sm:h-6 sm:gap-1.5">
                      {product.types.map((type) => (
                        <li key={type} className="rounded-full bg-blush px-2 py-0.5 text-[0.65rem] font-semibold text-pink-deep sm:px-2.5 sm:text-xs">
                          {type}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-end justify-between gap-3 border-t border-border pt-3 sm:pt-4">
                      {product.fromJetBlack !== null && product.fromColors !== null ? (
                        <div>
                          <p className="text-[0.65rem] leading-tight text-muted-foreground sm:text-xs sm:leading-normal">From, #1 Jet Black, Super Quality</p>
                          <p className="tabular mt-0.5 text-xl font-extrabold sm:text-2xl">
                            {formatUsd(product.fromJetBlack)}
                            <span className="text-sm font-semibold text-muted-foreground">/kg</span>
                          </p>
                          <p className="tabular text-[0.65rem] text-muted-foreground sm:text-xs">
                            Colors from {formatUsd(product.fromColors)}/kg
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-[0.65rem] text-muted-foreground sm:text-xs">Price</p>
                          <p className="mt-0.5 text-xl font-extrabold sm:text-2xl">Quoted</p>
                          <p className="text-[0.65rem] text-muted-foreground sm:text-xs">Ask on WhatsApp</p>
                        </div>
                      )}
                      <span
                        aria-hidden="true"
                        className="hidden size-10 shrink-0 items-center sm:flex justify-center rounded-full bg-blush text-pink transition-all duration-300 group-hover:rotate-45 group-hover:bg-pink group-hover:text-white"
                      >
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
