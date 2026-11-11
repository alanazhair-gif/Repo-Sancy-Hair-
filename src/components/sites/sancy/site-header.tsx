"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { instagramHref, navLinks, siteConfig, whatsappHref, whatsappNumbers } from "@/lib/site";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./logo";
import { aboutMegaMenu, megaMenus } from "@/lib/collections";
import { MegaMenu, MobileMegaMenu } from "./shop-mega-menu";

// "Shop" gets its own mega menu; the rest are plain links. About Us sits between them, as on the menu bar.
const pageLinks = navLinks.filter((l) => l.href !== "/shop");
const [wholesaleLink, blogLink, contactLink] = pageLinks;
const aboutMenu = aboutMegaMenu;

type LogoSources = { onLight: string | null; onDark: string | null };

// data-header* hooks let scripts/shopify/sancy-home.js repeat the scroll effect without React.
export function SiteHeader({ logo }: { logo: LogoSources }) {
  // Start solid: the server render (and the Shopify copy, until its script runs) cannot know the
  // scroll position, and a solid header stays readable over the hero too.
  const [scrolled, setScrolled] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Read the hero's position rather than window.scrollY, and listen in the capture phase,
    // so a restored scroll position or another scrolling element still turns the header solid.
    const onScroll = () => {
      const top = document.getElementById("top")?.getBoundingClientRect().top ?? -window.scrollY;
      setScrolled(top < -24);
    };
    onScroll();
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("pageshow", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("pageshow", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const solid = scrolled || open;

  return (
    <header
      data-header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        solid ? "bg-paper/90 text-ink shadow-[0_1px_0_var(--border)] backdrop-blur-md" : "text-white",
      )}
    >
      {/* Info bar: collapses once the page scrolls */}
      <div
        data-header-info
        className={cn(
          "hidden overflow-hidden bg-pink text-white transition-[max-height] duration-500 md:block",
          solid ? "max-h-0" : "max-h-10",
        )}
      >
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between gap-6 px-4 text-xs font-medium sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 whitespace-nowrap">
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
                className="flex items-center gap-1.5 whitespace-nowrap hover:underline"
              >
                <WhatsAppIcon className="size-3.5" />
                <span className="tabular font-bold">{n.display}</span>
                <span className="hidden opacity-75 xl:inline">{n.label}</span>
              </a>
            ))}
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 whitespace-nowrap hover:underline lg:flex"
            >
              <InstagramIcon className="size-3.5" />@{siteConfig.instagram}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${siteConfig.name} home`}
          data-logo-light={logo.onLight ?? undefined}
          data-logo-dark={logo.onDark ?? undefined}
        >
          <Logo src={solid ? logo.onLight : logo.onDark} className="h-14" />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1" aria-label="Main">
          {megaMenus.map((m) => (
            <MegaMenu key={m.label} menu={m} solid={solid} />
          ))}
          {[wholesaleLink, aboutMenu, blogLink, contactLink].map((link) =>
            link === aboutMenu ? (
              <MegaMenu key={link.href} menu={aboutMenu} solid={solid} />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                data-header-link
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors lg:px-2.5 xl:px-4",
                  solid ? "hover:bg-blush hover:text-pink" : "text-white/85 hover:bg-white/10 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            ),
          )}
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
            data-menu-toggle
            className="inline-flex size-10 items-center justify-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <X data-menu-icon="close" className={cn("size-5", !open && "hidden")} />
            <Menu data-menu-icon="open" className={cn("size-5", open && "hidden")} />
          </button>
        </div>
      </div>

      {/* Always rendered so the Shopify script can open it without React. */}
      <nav id="mobile-nav" data-menu hidden={!open} className="border-t border-border px-4 pb-6 lg:hidden" aria-label="Mobile">
        {megaMenus.map((m) => (
          <MobileMegaMenu key={m.label} menu={m} onNavigate={() => setOpen(false)} />
        ))}
        {[wholesaleLink, aboutMenu, blogLink, contactLink].map((link) =>
          link === aboutMenu ? (
            <MobileMegaMenu key={link.href} menu={aboutMenu} onNavigate={() => setOpen(false)} />
          ) : (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-3 text-lg font-semibold"
            >
              {link.label}
            </Link>
          ),
        )}
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center justify-center gap-2 rounded-full bg-pink py-3 text-sm font-semibold text-white"
        >
          <WhatsAppIcon className="size-4" />
          Send &quot;PRICE&quot; on WhatsApp
        </a>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          {whatsappNumbers.map((n) => n.display).join(" · ")}
        </p>
      </nav>
    </header>
  );
}
