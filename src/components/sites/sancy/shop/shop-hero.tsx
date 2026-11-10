import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { productById } from "@/lib/shop";
import { PhotoSlot } from "../photo-slot";
import { Reveal } from "../reveal";
import { HeroBackdrop } from "../hero-backdrop";

const specs = [
  { value: "100g", label: "Minimum order" },
  { value: "50-70", label: "cm, 20\" to 28\"" },
  { value: "22", label: "Colors" },
  { value: "2", label: "Grades" },
];

const collage = ["bulk", "genius-weft", "keratin-tip"].map(productById);

export function ShopHero() {
  return (
    <section id="top" className="grain relative overflow-hidden bg-ink text-white">
      <HeroBackdrop />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-32 pb-14 max-sm:gap-8 max-sm:pt-28 max-sm:pb-10 sm:px-6 md:pt-40 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-20">
        <Reveal>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span className="text-white/80">Shop extensions</span>
          </nav>
          <h1 className="mt-6 text-[2.4rem] leading-[1.04] font-extrabold tracking-tight sm:text-6xl">
            Shop by line.
            <br />
            <span className="font-accent font-medium text-pink italic">Stock what sells.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">
            100% human hair, wholesale grade, from our factory in Vietnam. Bulk, weft and extensions with &quot;from&quot;
            prices on every line. Start with one 100g bundle.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-px max-sm:mt-7 overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
            {specs.map((s) => (
              <div key={s.label} className="flex flex-col-reverse bg-ink px-4 py-4">
                <dt className="text-xs text-white/50">{s.label}</dt>
                <dd className="tabular text-2xl font-extrabold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={150} className="grid grid-cols-[1.3fr_1fr] gap-3">
          <PhotoSlot
            photo={collage[0].photo}
            sizes="(min-width: 1024px) 28vw, 55vw"
            className="row-span-2 aspect-[3/4] rounded-[1.75rem] max-sm:aspect-auto sm:aspect-auto"
            compact
          />
          {collage.slice(1).map((p) => (
            <PhotoSlot
              key={p.id}
              photo={p.photo}
              sizes="(min-width: 1024px) 20vw, 40vw"
              className="aspect-square rounded-[1.5rem]"
              compact
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
