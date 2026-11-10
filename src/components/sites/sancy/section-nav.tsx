"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Sticky "on this page" bar for long inner pages. Highlights the section in view.
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const targets = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-[72px] z-30 border-b border-border bg-paper/90 backdrop-blur-md">
      <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden">
        <li className="hidden shrink-0 items-center pr-2 text-[0.65rem] font-bold tracking-[0.2em] text-muted-foreground uppercase md:flex">
          On this page
        </li>
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "block rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
                active === item.id ? "bg-pink text-white" : "bg-blush text-pink-deep hover:bg-pink-soft",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
