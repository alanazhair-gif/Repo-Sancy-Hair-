import Image from "next/image";
import { cn } from "@/lib/utils";
import { photos } from "@/lib/site";

// `src` comes from siteAsset(photos.logo.file) on the server. Until the approved
// logo (without "RAW VIETNAMESE HAIR") is supplied, a dashed wordmark marks the slot.
export function Logo({ src, className }: { src: string | null; className?: string }) {
  if (src) {
    return <Image src={src} alt={photos.logo.alt} width={160} height={48} className={cn("h-9 w-auto", className)} />;
  }

  return (
    <span
      title={`Ảnh chờ: ${photos.logo.file} · ${photos.logo.brief}`}
      className={cn(
        "flex items-baseline gap-1.5 rounded-md px-2 py-1 leading-none outline-1 outline-offset-2 outline-pink/70 outline-dashed",
        className,
      )}
    >
      <span className="font-accent text-[1.7rem] font-semibold italic tracking-tight">Sancy</span>
      <span className="text-[0.62rem] font-bold uppercase tracking-[0.35em] text-pink">Hair</span>
    </span>
  );
}
