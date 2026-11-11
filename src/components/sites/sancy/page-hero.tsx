import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { PhotoBrief } from "@/lib/site";
import { PhotoSlot } from "./photo-slot";
import { Reveal } from "./reveal";
import { HeroBackdrop } from "./hero-backdrop";

type PageHeroProps = {
  crumb: string;
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  photo?: PhotoBrief;
  // Phones only: drop the photo so the page content starts on the first screen.
  hidePhotoOnPhone?: boolean;
  children?: React.ReactNode;
};

// Dark top band for inner pages. id="top" lets the header switch to solid on scroll.
export function PageHero({ crumb, eyebrow, title, accent, intro, photo, hidePhotoOnPhone = false, children }: PageHeroProps) {
  return (
    <section id="top" className="grain relative overflow-hidden bg-ink text-white">
      <HeroBackdrop />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pt-32 pb-14 max-sm:gap-7 max-sm:pt-28 max-sm:pb-10 sm:px-6 md:pt-40 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14 lg:px-8 lg:pb-20">
        <Reveal>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span className="text-white/80">{crumb}</span>
          </nav>
          <p className="mt-6 text-xs font-bold tracking-[0.3em] text-pink uppercase">{eyebrow}</p>
          <h1 className="mt-4 text-[2.4rem] leading-[1.04] font-extrabold tracking-tight sm:text-6xl">
            {title}
            <br />
            <span className="font-accent font-medium text-pink italic">{accent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 max-sm:mt-4 sm:text-lg">{intro}</p>
          {children}
        </Reveal>
        {photo && (
          <Reveal delay={120} className={hidePhotoOnPhone ? "max-sm:hidden" : undefined}>
            <PhotoSlot
              photo={photo}
              sizes="(min-width: 1024px) 40vw, 92vw"
              tone="dark"
              className="aspect-[4/3] rounded-[2rem] ring-1 ring-white/10 max-sm:aspect-[16/10] max-sm:rounded-3xl"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
