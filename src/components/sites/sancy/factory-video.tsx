"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

type FactoryVideoProps = {
  // Resolved on the server: public URL of the mp4, or null when the file is not there yet.
  src: string | null;
  youtubeId: string;
  poster: string;
  posterAlt: string;
  file: string;
};

// Plays a self-hosted mp4, or a YouTube video loaded only after the click.
// With neither, shows the poster and a note for the team.
export function FactoryVideo({ src, youtubeId, poster, posterAlt, file }: FactoryVideoProps) {
  const [playing, setPlaying] = useState(false);

  if (src) {
    return (
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        className="absolute inset-0 size-full bg-ink object-cover"
      />
    );
  }

  if (youtubeId && playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title="Sancy Hair factory video"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 size-full"
      />
    );
  }

  // No video yet: a "video chờ" slot for the team, same style as the "ảnh chờ" photo slots.
  if (!youtubeId) {
    return (
      <div
        data-video-file={file}
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/25 bg-white/5 p-6 text-center text-white/75"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-pink/20 text-pink">
          <Play className="ml-0.5 size-6" aria-hidden="true" />
        </span>
        <p className="text-[0.7rem] font-bold tracking-[0.2em] uppercase">Video chờ</p>
        <p className="max-w-64 text-xs leading-snug font-medium">Video quay xưởng Sancy: gội, sấy, ép, kiểm hàng</p>
        <p className="mt-1 font-mono text-[0.65rem] opacity-70">{file} hoặc YouTube ID</p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Play the factory video"
      className="group absolute inset-0 size-full cursor-pointer"
    >
      <Image src={poster} alt={posterAlt} fill sizes="(min-width: 1024px) 55vw, 95vw" className="object-cover" />
      <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      <span className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-pink text-white shadow-[0_20px_40px_-10px_rgb(233_30_115/0.7)] transition-transform group-hover:scale-110 sm:size-20">
        <Play className="ml-1 size-6 fill-current sm:size-8" aria-hidden="true" />
      </span>
      <span className="absolute bottom-4 left-5 text-[0.65rem] font-bold tracking-[0.25em] text-white uppercase">
        Factory tour
      </span>
    </button>
  );
}
