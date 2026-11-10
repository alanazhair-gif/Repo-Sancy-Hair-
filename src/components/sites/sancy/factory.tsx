import Link from "next/link";
import { Building2, ChevronRight, Clock, MapPin } from "lucide-react";
import { siteAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import {
  factorySteps,
  factoryStepPhotos,
  factoryVideo,
  instagramHref,
  middlemanChain,
  siteConfig,
} from "@/lib/site";
import { FactoryVideo } from "./factory-video";
import { InstagramIcon } from "./icons";
import { PhotoSlot } from "./photo-slot";
import { Reveal } from "./reveal";

// Factory facts from 02-SANCY-KNOWLEDGE section 1, with an icon each.
const factoryFacts = [
  { icon: MapPin, label: "Factory", body: siteConfig.address },
  { icon: Building2, label: "Sales", body: "Separate sales office" },
  { icon: Clock, label: "Sales hours", body: "8:30 to 22:00 (GMT+7)" },
];

export function Factory() {
  return (
    <section id="factory" className="grain relative scroll-mt-20 overflow-hidden bg-ink py-24 text-white max-sm:py-12 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink">Factory, no middleman</p>
          <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
            Every hand the hair passes through <span className="font-accent font-medium text-pink italic">adds a price.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/65 max-sm:mt-4 max-sm:text-base">
            Buy from the factory in {siteConfig.address} and the margin stays with you, not with an agent.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-8 grid gap-3 sm:mt-12 sm:gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-ink-soft p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">The usual route</p>
            <ol className="mt-5 flex flex-wrap items-center gap-2">
              {middlemanChain.map((step, i) => (
                <li key={step.label} className="flex items-center gap-2">
                  <span className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm font-semibold">
                    {step.label}
                    {step.markup && <span className="ml-1.5 text-pink">+$</span>}
                  </span>
                  {i < middlemanChain.length - 1 && <ChevronRight className="size-4 text-white/30" />}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl bg-pink p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">With Sancy</p>
            <ol className="mt-5 flex flex-wrap items-center gap-2">
              <li className="flex items-center gap-2">
                <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-bold text-pink">Sancy factory</span>
                <ChevronRight className="size-4 text-white/60" />
              </li>
              <li className="rounded-full bg-white px-3.5 py-1.5 text-sm font-bold text-pink">You</li>
            </ol>
          </div>
        </Reveal>

        {/* The four factory steps (02-SANCY-KNOWLEDGE: gội, sấy, ép, kiểm hàng), with large photos. */}
        <Reveal delay={100} className="mt-16 max-sm:mt-10 sm:mt-20">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <h3 className="text-2xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              Washed. Dried. Straightened. <span className="font-accent font-medium text-pink italic">Checked.</span>
            </h3>
            <p className="text-sm text-white/55">At our factory in {siteConfig.address}</p>
          </div>

          <ol className="mt-8 grid grid-cols-2 gap-3 max-sm:mt-5 sm:gap-4 lg:grid-cols-4">
            {factorySteps.map((step, i) => (
              <li
                key={step}
                className={cn(
                  "rounded-2xl border border-white/10 p-2.5 pb-3.5 sm:p-3 sm:pb-4",
                  i === factorySteps.length - 1 && "border-pink bg-pink/10",
                )}
              >
                <PhotoSlot
                  photo={factoryStepPhotos[i]}
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  tone="dark"
                  className="mb-3 aspect-square rounded-xl max-sm:aspect-[4/3] sm:mb-4"
                />
                <span className="px-1.5 text-xs font-bold text-pink sm:px-2">0{i + 1}</span>
                <p className="mt-1 px-1.5 text-base font-extrabold tracking-wide uppercase sm:px-2 sm:text-lg">{step}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Factory facts on the left, the factory video on the right. */}
        <Reveal
          delay={100}
          className="mt-4 grid overflow-hidden rounded-[2rem] border border-white/10 bg-ink-soft max-sm:grid-cols-1 max-sm:[&>*]:min-w-0 sm:mt-6 lg:grid-cols-[1fr_1.25fr] lg:[&>*]:min-w-0"
        >
          <div className="order-2 flex flex-col justify-center p-6 sm:p-10 lg:order-1">
            <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">A real address</p>
            <h3 className="mt-4 text-2xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              Sancy Hair <span className="font-accent font-medium text-pink italic">Factory.</span>
            </h3>

            <ul className="mt-7 grid gap-4 max-sm:mt-5 max-sm:[&>li:not(:first-child)]:hidden">
              {factoryFacts.map(({ icon: Icon, label, body }) => (
                <li key={label} className="flex items-center gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-pink/15 text-pink">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[0.65rem] font-bold tracking-[0.2em] text-white/45 uppercase">{label}</span>
                    <span className="block font-semibold">{body}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-2.5 max-sm:mt-5 sm:flex-row sm:flex-wrap">
              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-pink px-5 py-3 text-sm font-bold whitespace-nowrap text-white transition-colors hover:bg-pink-deep"
              >
                <InstagramIcon className="size-4" />
                Factory videos on Instagram
              </a>
              <Link
                href="/how-to-order"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors hover:border-white"
              >
                How to order
              </Link>
            </div>
          </div>

          {/* Factory video. Poster is the factory gate photo until the video file or YouTube id is set. */}
          <div className="relative order-1 aspect-[4/3] bg-ink max-sm:aspect-video lg:order-2">
            <FactoryVideo
              src={siteAsset(factoryVideo.file)}
              youtubeId={factoryVideo.youtubeId}
              poster={`/sites/sancy/${factoryVideo.poster}`}
              posterAlt={factoryVideo.posterAlt}
              file={`public/sites/sancy/${factoryVideo.file}`}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
