import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aboutPhotos } from "@/lib/about";
import type { PhotoBrief } from "@/lib/site";
import { cn } from "@/lib/utils";
import { PhotoSlot } from "./photo-slot";
import { Reveal } from "./reveal";

// "Inside Sancy": a fixed photo grid (one large photo, the rest around it) with short labels.
const tiles: { photo: PhotoBrief; label: string; className: string }[] = [
  { photo: aboutPhotos.teamWave, label: "The factory team", className: "col-span-2 row-span-2" },
  { photo: aboutPhotos.washing, label: "Washed", className: "" },
  { photo: aboutPhotos.drying, label: "Dried", className: "" },
  { photo: aboutPhotos.straightening, label: "Straightened", className: "" },
  { photo: aboutPhotos.checking, label: "Checked", className: "" },
  { photo: aboutPhotos.bundlesColors, label: "Finished bundles", className: "col-span-2 max-sm:hidden" },
  { photo: aboutPhotos.officeLogoWall, label: "The sales office", className: "col-span-2 max-sm:hidden" },
];

export function PhotoStrip() {
  return (
    <section aria-label="Photos from the Sancy factory and office" className="bg-white py-20 max-sm:py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">Inside Sancy</p>
            <h2 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
              Real factory, real office, <span className="font-accent font-medium text-pink italic">real hair.</span>
            </h2>
          </div>
          <Link href="/our-factory" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-pink hover:text-pink-deep">
            See our factory <ArrowRight className="size-4" />
          </Link>
        </Reveal>

        <ul className="mt-10 grid auto-rows-[9rem] grid-cols-2 max-sm:mt-6 max-sm:auto-rows-[7.5rem] gap-3 sm:auto-rows-[11rem] sm:gap-4 lg:auto-rows-[13rem] lg:grid-cols-4">
          {tiles.map(({ photo, label, className }, i) => (
            <li key={photo.file} className={cn("group relative overflow-hidden rounded-[1.5rem]", className)}>
              <Reveal delay={(i % 4) * 50} className="absolute inset-0">
                <PhotoSlot
                  photo={photo}
                  sizes={className.includes("col-span-2") ? "(min-width: 1024px) 50vw, 95vw" : "(min-width: 1024px) 25vw, 47vw"}
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  compact
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-ink shadow-sm sm:bottom-4 sm:left-4">
                  {label}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
