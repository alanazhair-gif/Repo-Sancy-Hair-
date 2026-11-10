import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Plain accordion list of questions, used on the inner pages.
export function FaqList({ items, className }: { items: { q: string; a: string }[]; className?: string }) {
  return (
    <div className={cn("grid content-start gap-3", className)}>
      {items.map((f) => (
        <details key={f.q} className="group rounded-2xl border border-border bg-white open:border-pink/40 open:shadow-[0_20px_40px_-28px_rgb(233_30_115/0.45)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold sm:text-lg [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blush text-pink transition-all duration-300 group-open:rotate-45 group-open:bg-pink group-open:text-white">
              <Plus className="size-4" />
            </span>
          </summary>
          <p className="px-5 pb-5 leading-relaxed text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
