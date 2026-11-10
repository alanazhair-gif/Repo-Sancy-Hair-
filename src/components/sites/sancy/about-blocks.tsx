import type { PhotoBrief } from "@/lib/site";
import { cn } from "@/lib/utils";
import { PhotoSlot } from "./photo-slot";
import { Reveal } from "./reveal";

// Shared building blocks for the About Us pages.

export function SectionIntro({
  eyebrow,
  title,
  accent,
  body,
  dark = false,
  className,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  body?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">{eyebrow}</p>
      <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight max-sm:mt-3 sm:text-5xl">
        {title} <span className="font-accent font-medium text-pink italic">{accent}</span>
      </h2>
      {body && <p className={cn("mt-5 text-lg leading-relaxed max-sm:mt-3 max-sm:text-base", dark ? "text-white/65" : "text-muted-foreground")}>{body}</p>}
    </Reveal>
  );
}

// Photo grid: first photo large, the rest in a tight grid. Captions sit on the photos.
export function PhotoMosaic({ photos, dark = false }: { photos: PhotoBrief[]; dark?: boolean }) {
  const [lead, ...rest] = photos;
  return (
    <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
      <Reveal className="relative overflow-hidden rounded-[1.75rem]">
        <PhotoSlot photo={lead} sizes="(min-width: 1024px) 50vw, 95vw" tone={dark ? "dark" : "light"} className="aspect-[3/2] lg:aspect-auto lg:h-full lg:min-h-[28rem]" />
        <Caption text={lead.alt} />
      </Reveal>
      <div className="grid grid-cols-2 gap-3 max-sm:[&>*:nth-child(n+5)]:hidden sm:gap-4">
        {rest.map((photo, i) => (
          <Reveal key={photo.file} delay={(i + 1) * 60} className="relative overflow-hidden rounded-[1.5rem]">
            <PhotoSlot photo={photo} sizes="(min-width: 1024px) 25vw, 47vw" tone={dark ? "dark" : "light"} className="aspect-[4/3]" />
            <Caption text={photo.alt} small />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function Caption({ text, small = false }: { text: string; small?: boolean }) {
  return (
    <p
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent font-medium text-white",
        small ? "hidden p-3 pt-8 text-[0.7rem] leading-snug sm:block" : "p-5 pt-14 text-sm",
      )}
    >
      {text}
    </p>
  );
}

// Photo on one side, content on the other. `flip` swaps sides on large screens.
export function SplitFeature({
  photo,
  flip = false,
  dark = false,
  children,
}: {
  photo: PhotoBrief;
  flip?: boolean;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-8 max-sm:gap-6 lg:grid-cols-2 lg:gap-14">
      <Reveal className={cn("relative", flip && "lg:order-2")}>
        <PhotoSlot photo={photo} sizes="(min-width: 1024px) 45vw, 95vw" tone={dark ? "dark" : "light"} className="aspect-[3/2] rounded-[2rem] max-sm:aspect-[16/9] max-sm:rounded-3xl" />
      </Reveal>
      <Reveal delay={100}>{children}</Reveal>
    </div>
  );
}
