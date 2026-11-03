import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { siteAsset } from "@/lib/assets";
import type { PhotoBrief } from "@/lib/site";
import { cn } from "@/lib/utils";

type PhotoSlotProps = {
  photo: PhotoBrief;
  sizes: string;
  className?: string;
  tone?: "light" | "dark";
  // Small slots: hide the shooting brief so the card stays calm.
  compact?: boolean;
};

export function PhotoSlot({ photo, sizes, className, tone = "light", compact = false }: PhotoSlotProps) {
  const src = siteAsset(photo.file);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {src ? (
        <Image src={src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-[inherit] border-2 border-dashed p-4 text-center",
            tone === "dark" ? "border-white/25 bg-white/5 text-white/75" : "border-pink/40 bg-blush text-pink-deep",
          )}
        >
          <ImageIcon className="size-6" aria-hidden="true" />
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em]">Ảnh chờ</p>
          {!compact && <p className="max-w-60 text-xs leading-snug font-medium">{photo.brief}</p>}
          <p className="mt-1 font-mono text-[0.65rem] opacity-70">
            {photo.file} · {photo.size}
          </p>
        </div>
      )}
    </div>
  );
}
