"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Line = { id: string; name: string };

// Sticky strip of every line. Highlights the line in view and keeps it scrolled into the strip.
export function ShopLineNav({ lines }: { lines: Line[] }) {
  const [active, setActive] = useState(lines[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const targets = lines
      .map((l) => document.getElementById(`line-${l.id}`))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id.replace("line-", ""));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [lines]);

  useEffect(() => {
    const pill = listRef.current?.querySelector<HTMLElement>(`[data-line="${active}"]`);
    pill?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <div className="sticky top-[72px] z-40 border-b border-border bg-paper/90 backdrop-blur-md">
      <ul
        ref={listRef}
        className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {lines.map((line) => (
          <li key={line.id} className="shrink-0">
            <a
              href={`#line-${line.id}`}
              data-line={line.id}
              aria-current={active === line.id ? "true" : undefined}
              className={cn(
                "block rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
                active === line.id ? "bg-pink text-white" : "bg-blush text-pink-deep hover:bg-pink-soft",
              )}
            >
              {line.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
