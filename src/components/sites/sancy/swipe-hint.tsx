import { ArrowRight, Hand } from "lucide-react";
import { cn } from "@/lib/utils";

// Phones only: tells people the row below scrolls sideways. Hidden from 640px up, where the row is a grid.
export function SwipeHint({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center justify-end gap-1.5 text-xs font-semibold sm:hidden",
        tone === "dark" ? "text-white/60" : "text-muted-foreground",
        className,
      )}
    >
      <Hand className="size-3.5 text-pink" aria-hidden="true" />
      Swipe to see more
      <ArrowRight className="size-3.5 animate-nudge text-pink" aria-hidden="true" />
    </p>
  );
}
