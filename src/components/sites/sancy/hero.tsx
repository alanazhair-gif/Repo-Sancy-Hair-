import { ArrowDownRight, Award, CreditCard, MapPin, Palette, PackageCheck, Ruler } from "lucide-react";
import { siteAsset } from "@/lib/assets";
import { factoryStepPhotos, formatUsd, marqueeWords, products, siteConfig, whatsappHref } from "@/lib/site";
import { HeroGallery, type HeroShot } from "./hero-gallery";
import { WhatsAppIcon } from "./icons";
import { Reveal } from "./reveal";

const bulk = products[0];

const facts = [
  { icon: PackageCheck, value: "100g", label: "Minimum order, 1 bundle" },
  { icon: Palette, value: "27", label: "Colors in stock" },
  { icon: Ruler, value: "50-70cm", label: "Lengths, 20\" to 28\"" },
  { icon: Award, value: "2 grades", label: "Super High Quality · Super Quality" },
];

const factoryVideo = "hero/factory.mp4";

const heroPhotos = [
  {
    file: "hero.jpg",
    alt: "A Sancy worker sorting wavy hair on the drying racks at the factory",
    brief: "Công nhân phân loại tóc trên giá phơi",
  },
  {
    file: "factory-main.jpg",
    alt: "The closure and frontal room at the Sancy factory, staff working at long tables",
    brief: "Phòng làm closure và frontal",
  },
  {
    file: "factory-detail.jpg",
    alt: "Hair being straightened and laid out on a workbench at the Sancy factory",
    brief: "Tóc ép thẳng, xếp trên bàn",
  },
  ...factoryStepPhotos,
];

const trustChips = [
  { icon: MapPin, label: "Factory in Yen Thuy, Hoa Binh" },
  { icon: CreditCard, label: "PayPal · Bank transfer · Western Union" },
];

// Loose hair strands drawn across the background.
function Strands() {
  return (
    <svg
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full text-pink opacity-[0.16]"
    >
      {Array.from({ length: 22 }, (_, i) => {
        const x = 760 + i * 34;
        return (
          <path
            key={i}
            d={`M${x},-40 C${x - 120 + i * 6},220 ${x + 140 - i * 4},460 ${x - 60 + i * 8},860`}
            fill="none"
            stroke="currentColor"
            strokeWidth={i % 4 === 0 ? 1.6 : 0.7}
          />
        );
      })}
    </svg>
  );
}

export function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] size-[46rem] rounded-full bg-pink/30 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] size-[32rem] rounded-full bg-pink-deep/20 blur-[140px]"
      />
      <Strands />
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 font-accent text-[22vw] leading-none font-semibold whitespace-nowrap text-white/[0.03] italic select-none"
      >
        Sancy Hair
      </p>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-32 pb-16 sm:px-6 md:pt-40 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:px-8 lg:pt-44 lg:pb-20">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink">Factory direct · MOQ 100g</p>
          <h1 className="mt-6 text-[2.6rem] leading-[1.02] font-extrabold tracking-tight sm:text-6xl xl:text-7xl">
            Vietnamese human hair,
            <br />
            <span className="font-accent font-medium text-pink italic">priced for resellers.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">{siteConfig.positioning}</p>

          <p className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-sm text-white/55">Bulk from</span>
            <span className="tabular text-4xl font-extrabold">
              {formatUsd(bulk.fromJetBlack ?? 0)}
              <span className="text-lg font-semibold text-white/55">/kg</span>
            </span>
            <span className="text-sm text-white/55">#1 Jet Black · 50cm · Super Quality</span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-pink px-7 py-4 text-sm font-bold transition-colors hover:bg-pink-deep"
            >
              <WhatsAppIcon className="size-5" />
              Send &quot;PRICE&quot; on WhatsApp
            </a>
            <a
              href="#prices"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold transition-colors hover:border-white hover:bg-white/5"
            >
              Work out your margin
              <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/55">
            {trustChips.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-pink" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <HeroGallery
            shots={heroPhotos.map((p): HeroShot => ({ ...p, src: siteAsset(p.file) }))}
            video={{ src: siteAsset(factoryVideo), file: factoryVideo }}
          />
        </Reveal>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {facts.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-pink/15 text-pink">
                <Icon className="size-5" />
              </span>
              <div className="flex min-w-0 flex-col-reverse">
                <dt className="text-xs leading-snug text-white/55">{label}</dt>
                <dd className="text-xl font-extrabold sm:text-2xl">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative overflow-hidden bg-pink py-3.5" aria-hidden="true">
        <div className="flex w-max animate-marquee">
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span key={i} className="flex items-center text-lg font-bold uppercase tracking-wide whitespace-nowrap">
              <span className="px-7">{word}</span>
              <span className="text-xs">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
