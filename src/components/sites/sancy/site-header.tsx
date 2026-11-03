"use client";

import { useEffect, useState } from "react";
import { Clock, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { instagramHref, navLinks, siteConfig, whatsappHref, whatsappNumbers } from "@/lib/site";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./logo";

export function SiteHeader({ logoSrc }: { logoSrc: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        solid ? "bg-paper/90 text-ink shadow-[0_1px_0_var(--border)] backdrop-blur-md" : "text-white",
      )}
    >
      {/* Info bar: collapses once the page scrolls */}
      <div
        className={cn(
          "hidden overflow-hidden bg-pink text-white transition-[max-height] duration-500 md:block",
          solid ? "max-h-0" : "max-h-10",
        )}
      >
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between gap-6 px-4 text-xs font-medium sm:px-6 lg:px-8">
          <p className="flex items-center gap-2">
            <Clock className="size-3.5" />
            Sales online {siteConfig.salesHours}
          </p>
          <div className="flex items-center gap-5">
            {whatsappNumbers.map((n) => (
              <a
                key={n.digits}
                href={whatsappHref("PRICE", n.digits)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:underline"
              >
                <WhatsAppIcon className="size-3.5" />
                <span className="tabular font-bold">{n.display}</span>
                <span className="opacity-75">{n.label}</span>
              </a>
            ))}
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:underline"
            >
              <InstagramIcon className="size-3.5" />@{siteConfig.instagram}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" aria-label={`${siteConfig.name} home`}>
          <Logo src={logoSrc} />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                solid ? "hover:bg-blush hover:text-pink" : "text-white/85 hover:bg-white/10 hover:text-white",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-pink px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_30px_-10px_rgb(233_30_115/0.8)] transition-colors hover:bg-pink-deep sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Send &quot;PRICE&quot;
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-border px-4 pb-6 lg:hidden" aria-label="Mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-4 text-xl font-semibold"
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-pink py-3 text-sm font-semibold text-white"
          >
            <WhatsAppIcon className="size-4" />
            Send &quot;PRICE&quot; on WhatsApp
          </a>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            {whatsappNumbers.map((n) => n.display).join(" · ")}
          </p>
        </nav>
      )}
    </header>
  );
}
