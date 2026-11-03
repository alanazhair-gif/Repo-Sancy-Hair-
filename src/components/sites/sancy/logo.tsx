import Image from "next/image";
import { cn } from "@/lib/utils";
import { photos } from "@/lib/site";

// `src` comes from siteAsset(...) on the server: photos.logo on light backgrounds,
// photos.logoOnDark on dark ones. A dashed wordmark marks the slot if the file is missing.
export function Logo({ src, className }: { src: string | null; className?: string }) {
  if (src) {
    return <Image src={src} alt={photos.logo.alt} width={1000} height={331} priority className={cn("h-11 w-auto", className)} />;
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
