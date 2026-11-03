import { ArrowUpRight } from "lucide-react";
import { formatUsd, products, whatsappHref } from "@/lib/site";
import { PhotoSlot } from "./photo-slot";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

const priceTags = ["\"From\" prices", "USD per kg", "50cm", "Super Quality"];

export function ProductCategories() {
  return (
    <section id="products" className="scroll-mt-20 bg-paper py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Products"
          title="Bulk, weft and extensions."
          accent="Ready stock."
          tags={priceTags}
          note="Longer lengths and Super High Quality cost more."
          link={{ label: "Full price table on WhatsApp", message: "PRICE full table" }}
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <li key={product.id}>
              <Reveal delay={(i % 4) * 70} className="h-full">
                <a
                  href={whatsappHref(`PRICE ${product.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-[1.75rem] border border-border bg-white p-2 transition-all duration-300 hover:-translate-y-1 hover:border-pink/40 hover:shadow-[0_24px_48px_-24px_rgb(233_30_115/0.4)]"
                >
                  <PhotoSlot
                    photo={product.photo}
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                    className="aspect-[4/3] rounded-[1.25rem]"
                    compact
                  />

                  <div className="flex flex-1 flex-col px-4 pt-5 pb-4">
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <p className="mt-1.5 min-h-[2lh] text-sm leading-relaxed text-muted-foreground">
                      {product.summary}
                    </p>

                    {/* Fixed-height row so every card's price line sits at the same height. */}
                    <ul className="mt-3 mb-5 flex h-6 flex-wrap gap-1.5 overflow-hidden">
                      {product.types.map((type) => (
                        <li key={type} className="rounded-full bg-blush px-2.5 py-0.5 text-xs font-semibold text-pink-deep">
                          {type}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-end justify-between gap-3 border-t border-border pt-4">
                      {product.fromJetBlack !== null && product.fromColors !== null ? (
                        <div>
                          <p className="text-xs text-muted-foreground">From, #1 Jet Black, Super Quality</p>
                          <p className="tabular mt-0.5 text-2xl font-extrabold">
                            {formatUsd(product.fromJetBlack)}
                            <span className="text-sm font-semibold text-muted-foreground">/kg</span>
                          </p>
                          <p className="tabular text-xs text-muted-foreground">
                            Colors from {formatUsd(product.fromColors)}/kg
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs text-muted-foreground">Price</p>
                          <p className="mt-0.5 text-2xl font-extrabold">Quoted</p>
                          <p className="text-xs text-muted-foreground">Ask on WhatsApp</p>
                        </div>
                      )}
                      <span
                        aria-hidden="true"
                        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blush text-pink transition-all duration-300 group-hover:rotate-45 group-hover:bg-pink group-hover:text-white"
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
