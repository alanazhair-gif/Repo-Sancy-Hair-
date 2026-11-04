import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { factorySteps, factoryStepPhotos, middlemanChain, siteConfig } from "@/lib/site";
import { PhotoSlot } from "./photo-slot";
import { Reveal } from "./reveal";

export function Factory() {
  return (
    <section id="factory" className="grain relative scroll-mt-20 overflow-hidden bg-ink py-24 text-white sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink">Factory, no middleman</p>
          <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
            Every hand the hair passes through <span className="font-accent font-medium text-pink italic">adds a price.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/65">
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

        <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="relative aspect-[5/3] overflow-hidden rounded-2xl sm:aspect-[16/9] sm:rounded-3xl lg:aspect-auto lg:min-h-[26rem]">
            <Image
              src="/sites/sancy/factory/workshop-hall.jpg"
              alt="The Sancy factory workshop, rows of staff working on hair at long tables"
              fill
              sizes="(min-width: 1024px) 55vw, 95vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={100} className="relative hidden aspect-square overflow-hidden rounded-3xl sm:block">
            <Image
              src="/sites/sancy/factory/bundles-table.jpg"
              alt="Hair bundles laid out on a table, with Sancy staff working at the tables behind"
              fill
              sizes="(min-width: 1024px) 38vw, 95vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        <Reveal delay={100}>
          <ol className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-4">
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
                  sizes="(min-width: 640px) 22vw, 45vw"
                  tone="dark"
                  className="mb-3 aspect-square rounded-xl sm:mb-4"
                />
                <span className="px-1.5 text-xs font-bold text-pink sm:px-2">0{i + 1}</span>
                <p className="mt-1 px-1.5 text-base font-extrabold uppercase tracking-wide sm:px-2 sm:text-lg">{step}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
