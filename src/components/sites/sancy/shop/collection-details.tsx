import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import {
  collectionPhoto,
  collections,
  type Collection,
} from "@/lib/collections";
import { siteConfig } from "@/lib/site";
import { PhotoSlot } from "../photo-slot";
import { Reveal } from "../reveal";

// Lace is priced and sized per order, so only the rows we know apply to it.
const specRows = (c: Collection) =>
  c.accessory
    ? [
        { label: "Type", body: "Accessory, not hair sold by weight" },
        { label: "Price", body: "Quoted per order on WhatsApp" },
        { label: "Minimum order", body: "Ask sales on WhatsApp" },
      ]
    : c.lineId === "lace"
    ? [
        {
          label: "Hair",
          body: "100% human hair, Vietnamese human hair, wholesale grade",
        },
        { label: "Styles", body: "Frontal and closure" },
        { label: "Made", body: "By hand, in our closure and frontal room" },
        { label: "Price", body: "Quoted per order on WhatsApp" },
      ]
    : [
        {
          label: "Hair",
          body: "100% human hair, Vietnamese human hair, wholesale grade",
        },
        { label: "Unit", body: "1 bundle = 100g. 1 kg = 10 bundles." },
        { label: "Lengths", body: '50, 55, 60, 65 and 70cm (20" to 28")' },
        {
          label: "Grades",
          body: "Super High Quality (SHQ) and Super Quality (Super)",
        },
        {
          label: "Colors",
          body:
            c.lineId === "lace" || c.customItems
              ? "Ask sales on WhatsApp"
              : "#1 Jet Black, plus 21 colors that share one price",
        },
        {
          label: "Samples",
          body: "Paid, from the same stock as bulk orders. Not deducted from your first order.",
        },
      ];

const faqs = (c: Collection) => [
  {
    q: "What is the minimum order?",
    a: c.accessory
      ? "Ask sales on WhatsApp for this item."
      : "100g, which is 1 bundle. 100-200g usually ships right away from stock.",
  },
  {
    q: "Are these the final prices?",
    a: c.quoted
      ? "This line is priced per order. Send the style and color code on WhatsApp."
      : 'These are "from" prices: 50cm, Super Quality. Longer lengths and Super High Quality cost more. Send "PRICE" on WhatsApp for the full table.',
  },
  {
    q: "Can it be dyed and heat styled?",
    a: "Yes. For how far each line and color can be lightened, ask sales on WhatsApp before you order.",
  },
  {
    q: "How do I pay?",
    a: "PayPal, bank transfer or Western Union. You can pay your first order by PayPal.",
  },
  {
    q: "How much is shipping?",
    a: "Shipping is not included in our prices. We quote cost and timing per order, for your country.",
  },
];

export function CollectionDetails({ collection }: { collection: Collection }) {
  const related = collections
    .filter(
      (c) => c.group !== collection.group && !c.subtype && c.group !== "need",
    )
    .slice(0, 4);

  return (
    <>
      <section className="bg-white py-20 max-sm:py-12 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 max-sm:gap-8 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">
              Spec sheet
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              What you get{" "}
              <span className="font-accent font-medium text-pink italic">
                in every bundle.
              </span>
            </h2>
            <dl className="mt-8 divide-y divide-border rounded-[1.5rem] border border-border">
              {specRows(collection).map((r) => (
                <div
                  key={r.label}
                  className="grid grid-cols-[7rem_1fr] gap-4 px-5 py-4 text-sm sm:grid-cols-[9rem_1fr]"
                >
                  <dt className="font-bold">{r.label}</dt>
                  <dd className="text-muted-foreground">{r.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">
              Questions buyers ask
            </p>
            <div className="mt-8 grid gap-3">
              {faqs(collection).map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-border bg-paper open:border-pink/40"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blush text-pink transition-transform group-open:rotate-45">
                      <Plus className="size-4" />
                    </span>
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              Sales replies {siteConfig.salesHours}.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-blush py-16 max-sm:py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Also from the{" "}
              <span className="font-accent font-medium text-pink italic">
                factory.
              </span>
            </h2>
            <Link
              href="/shop"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-pink hover:text-pink-deep"
            >
              All lines <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/shop/${c.slug}`}
                  className="group block overflow-hidden rounded-[1.5rem] bg-white"
                >
                  <PhotoSlot
                    photo={collectionPhoto(c)}
                    sizes="(min-width: 1024px) 22vw, 46vw"
                    className="aspect-[4/3]"
                    compact
                  />
                  <p className="flex items-center justify-between px-4 py-3.5 text-sm font-bold">
                    {c.name}
                    <ArrowRight className="size-4 text-pink transition-transform group-hover:translate-x-1" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
