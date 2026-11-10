import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Clock, MapPin } from "lucide-react";
import { PhotoMosaic, SectionIntro } from "@/components/sites/sancy/about-blocks";
import { FactoryVideo } from "@/components/sites/sancy/factory-video";
import { InstagramIcon } from "@/components/sites/sancy/icons";
import { InnerPage } from "@/components/sites/sancy/inner-page";
import { PageHero } from "@/components/sites/sancy/page-hero";
import { PhotoSlot } from "@/components/sites/sancy/photo-slot";
import { Reveal } from "@/components/sites/sancy/reveal";
import { aboutPhotos } from "@/lib/about";
import { siteAsset } from "@/lib/assets";
import { factorySteps, factoryStepPhotos, factoryVideo, instagramHref, photos, siteConfig, type PhotoBrief } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Factory | Sancy Hair Vietnam, Yen Thuy, Hoa Binh",
  description: `The Sancy Hair factory in ${siteConfig.address}: hair washed, dried, straightened and checked on site.`,
};

const aerial: PhotoBrief = {
  file: "hero/aerial-factory-4.jpg",
  alt: "Aerial view of the Sancy Hair factory in Yen Thuy, Hoa Binh, Vietnam",
  brief: "Ảnh flycam xưởng",
  size: "1600×1200",
};

// The four confirmed steps (gội, sấy, ép, kiểm hàng), each with two of our own photos.
const stepPhotos: [PhotoBrief, PhotoBrief][] = [
  [factoryStepPhotos[0], aboutPhotos.washing],
  [factoryStepPhotos[1], aboutPhotos.drying],
  [factoryStepPhotos[2], aboutPhotos.straightening],
  [factoryStepPhotos[3], aboutPhotos.checking],
];

const facts = [
  { icon: MapPin, label: "Factory", body: siteConfig.address },
  { icon: Building2, label: "Sales", body: "Separate sales office" },
  { icon: Clock, label: "Sales hours", body: "8:30 to 22:00 (GMT+7)" },
];

export default function OurFactoryPage() {
  return (
    <InnerPage current="/our-factory">
      <PageHero
        crumb="Our Factory"
        eyebrow="Our factory"
        title="Yen Thuy, Hoa Binh,"
        accent="Vietnam."
        intro="Our factory, under the SANCY HAIR FACTORY sign. The hair is washed, dried, straightened and checked here, then sold to you without an agent in between."
        photo={aerial}
      />

      {/* The four steps */}
      <section className="bg-white py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="At the factory" title="Washed. Dried. Straightened." accent="Checked." />
          <ol className="mt-14 grid gap-16 max-sm:mt-8 max-sm:gap-10 sm:gap-20">
            {factorySteps.map((step, i) => {
              const [main, second] = stepPhotos[i];
              const flip = i % 2 === 1;
              return (
                <li key={step} className="grid items-center gap-6 max-sm:gap-4 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
                  <Reveal className={cn("grid grid-cols-[1.4fr_1fr] gap-3 sm:gap-4", flip && "lg:order-2")}>
                    <PhotoSlot photo={main} sizes="(min-width: 1024px) 34vw, 56vw" className="aspect-square rounded-[1.75rem]" />
                    <PhotoSlot photo={second} sizes="(min-width: 1024px) 24vw, 40vw" className="aspect-[3/4] self-end rounded-[1.5rem]" />
                  </Reveal>
                  <Reveal delay={100} className={cn(flip && "lg:order-1")}>
                    <span className="font-accent text-6xl font-medium text-pink italic sm:text-7xl">0{i + 1}</span>
                    <h3 className="mt-2 text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">{step}</h3>
                    <ul className="mt-6 grid gap-2 border-l-2 border-pink/40 pl-4 text-sm text-muted-foreground max-sm:mt-4">
                      <li>{main.alt}</li>
                      <li>{second.alt}</li>
                    </ul>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* The workshop */}
      <section className="grain relative overflow-hidden bg-ink py-20 text-white max-sm:py-12 sm:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro dark eyebrow="The workshop" title="Every bundle passes" accent="through these tables." />
          <div className="mt-10 max-sm:mt-7">
            <PhotoMosaic
              dark
              photos={[aboutPhotos.workshopRows, aboutPhotos.workshopTable, aboutPhotos.workshopHands, aboutPhotos.styling, aboutPhotos.workshopWide]}
            />
          </div>
        </div>
      </section>

      {/* Finished hair */}
      <section className="bg-paper py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionIntro eyebrow="Ready stock" title="Finished hair," accent="laid out before it ships." />
            <Link href="/shop" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-pink hover:text-pink-deep">
              Shop all lines <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-3 max-sm:mt-6 max-sm:grid-cols-3 max-sm:gap-2 sm:grid-cols-3 sm:gap-4">
            {[aboutPhotos.bundlesColors, aboutPhotos.bundlesBlonde, aboutPhotos.weftsLaid].map((photo, i) => (
              <Reveal key={photo.file} delay={i * 70} className="overflow-hidden rounded-[1.75rem] border border-border bg-white max-sm:rounded-xl">
                <PhotoSlot photo={photo} sizes="(min-width: 640px) 31vw, 32vw" className="aspect-[4/3] max-sm:aspect-square" />
                <p className="px-5 py-4 text-sm text-muted-foreground max-sm:hidden">{photo.alt}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team, address and video */}
      <section className="bg-white py-20 max-sm:py-12 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="relative overflow-hidden rounded-[2rem]">
            <PhotoSlot photo={photos.factorySign} sizes="95vw" className="aspect-[4/3] max-sm:aspect-[16/10] sm:aspect-[16/9]" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-6 pt-24 text-white sm:p-10">
              <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">A real address</p>
              <p className="mt-2 text-3xl font-extrabold sm:text-5xl">SANCY HAIR FACTORY</p>
              <p className="mt-2 text-white/75">{siteConfig.address}</p>
            </div>
          </Reveal>

          <div className="mt-5 grid overflow-hidden rounded-[2rem] border border-border lg:grid-cols-[1fr_1.25fr]">
            <div className="flex flex-col justify-center bg-ink p-6 text-white sm:p-10">
              <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">Visit or call</p>
              <ul className="mt-6 grid gap-4 max-sm:mt-4 max-sm:gap-3">
                {facts.map(({ icon: Icon, label, body }) => (
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
              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-pink px-5 py-3 text-sm font-bold transition-colors hover:bg-pink-deep"
              >
                <InstagramIcon className="size-4" /> Factory videos on Instagram
              </a>
            </div>
            <div className="relative aspect-[4/3] bg-ink">
              <FactoryVideo
                src={siteAsset(factoryVideo.file)}
                youtubeId={factoryVideo.youtubeId}
                poster={`/sites/sancy/${factoryVideo.poster}`}
                posterAlt={factoryVideo.posterAlt}
                file={`public/sites/sancy/${factoryVideo.file}`}
              />
            </div>
          </div>
        </div>
      </section>
    </InnerPage>
  );
}
