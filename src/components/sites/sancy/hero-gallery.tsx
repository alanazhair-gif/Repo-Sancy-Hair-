"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronRight, ImageIcon, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type HeroShot = {
  // Resolved on the server: null means the file is not in public/sites/sancy yet.
  src: string | null;
  file: string;
  alt: string;
  brief: string;
};

type HeroGalleryProps = {
  shots: HeroShot[];
  video: { src: string | null; file: string };
};

export function HeroGallery({ shots, video }: HeroGalleryProps) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const stripRef = useRef<HTMLUListElement>(null);
  const shot = shots[active];

  const scrollStrip = () => {
    const strip = stripRef.current;
    if (!strip) return;
    const atEnd = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4;
    strip.scrollBy({ left: atEnd ? -strip.scrollWidth : strip.clientWidth * 0.75, behavior: "smooth" });
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm">
      <div className="relative aspect-[16/11] overflow-hidden rounded-[1.5rem] bg-ink-soft">
        {playing && video.src ? (
          <>
            <video src={video.src} controls autoPlay playsInline className="absolute inset-0 size-full object-cover" />
            <button
              type="button"
              onClick={() => setPlaying(false)}
              aria-label="Close video"
              className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-ink/70 backdrop-blur transition-colors hover:bg-ink"
            >
              <X className="size-4" />
            </button>
          </>
        ) : (
          <>
            {shot.src ? (
              <Image
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                fill
                priority={active === 0}
                sizes="(min-width: 1024px) 45vw, 95vw"
                className="animate-ken-burns object-cover"
              />
            ) : (
              <Placeholder shot={shot} large />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/30" />

            <p className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-ink/60 px-3.5 py-1.5 text-xs font-semibold backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-pink" />
              </span>
              Inside our factory
            </p>

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => video.src && setPlaying(true)}
                disabled={!video.src}
                aria-label="Play factory video"
                className="group flex size-20 items-center justify-center rounded-full bg-white text-pink shadow-[0_0_0_10px_rgb(255_255_255/0.15)] transition-transform hover:scale-105 disabled:cursor-default disabled:hover:scale-100"
              >
                <Play className="ml-1 size-8 fill-current" />
              </button>
              {!video.src && (
                <span className="rounded-full bg-ink/70 px-3 py-1 font-mono text-[0.65rem] text-white/80 backdrop-blur">
                  Video chờ · {video.file}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="relative mt-3">
        <ul ref={stripRef} className="flex snap-x gap-3 overflow-x-auto pr-12 [scrollbar-width:none]">
          {shots.map((s, i) => (
            <li key={s.file} className="w-[28%] shrink-0 snap-start sm:w-[23%]">
              <button
                type="button"
                onClick={() => {
                  setActive(i);
                  setPlaying(false);
                }}
                aria-label={`Show photo: ${s.alt}`}
                aria-pressed={i === active}
                className={cn(
                  "relative block aspect-[4/3] w-full overflow-hidden rounded-xl ring-2 transition",
                  i === active ? "ring-pink" : "ring-transparent opacity-70 hover:opacity-100",
                )}
              >
                {s.src ? (
                  <Image src={s.src} alt="" fill sizes="160px" className="object-cover" />
                ) : (
                  <Placeholder shot={s} />
                )}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={scrollStrip}
          aria-label="More photos"
          className="absolute top-1/2 right-1 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg transition-colors hover:bg-pink hover:text-white"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

function Placeholder({ shot, large = false }: { shot: HeroShot; large?: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-[inherit] border-2 border-dashed border-white/25 bg-white/5 p-2 text-center text-white/75">
      <ImageIcon className={large ? "size-6" : "size-4"} aria-hidden="true" />
      <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em]">Ảnh chờ</p>
      {large && <p className="max-w-60 text-xs leading-snug font-medium">{shot.brief}</p>}
      <p className={cn("font-mono opacity-70", large ? "text-[0.65rem]" : "line-clamp-1 text-[0.55rem]")}>{shot.file}</p>
    </div>
  );
}
