import { Clock, MapPin } from "lucide-react";
import { instagramHref, navLinks, photos, products, siteConfig, whatsappHref, whatsappNumbers } from "@/lib/site";
import { siteAsset } from "@/lib/assets";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./logo";

const heading = "text-xs font-bold uppercase tracking-[0.25em] text-pink";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 font-accent text-[18vw] leading-none font-semibold whitespace-nowrap text-white/[0.03] italic select-none"
      >
        Sancy Hair
      </p>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.1fr] lg:gap-16 lg:px-8">
        <div>
          <Logo src={siteAsset(photos.logo.file)} className="w-fit" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">{siteConfig.positioning}</p>
          <p className="mt-5 flex items-center gap-2 text-sm text-white/60">
            <MapPin className="size-4 shrink-0 text-pink" aria-hidden="true" />
            Factory: {siteConfig.address}
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-pink"
            >
              <WhatsAppIcon className="size-5" />
            </a>
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-pink"
            >
              <InstagramIcon className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className={heading}>Products</h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/70">
            {products.map((p) => (
              <li key={p.id}>
                <a href="#products" className="transition-colors hover:text-white">
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={heading}>Contact</h3>
          <ul className="mt-5 grid gap-2">
            {whatsappNumbers.map((n) => (
              <li key={n.digits}>
                <a
                  href={whatsappHref("PRICE", n.digits)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition-colors hover:border-pink hover:bg-pink/10"
                >
                  <WhatsAppIcon className="size-5 shrink-0 text-pink" />
                  <span className="tabular font-bold">{n.display}</span>
                  <span className="ml-auto text-xs text-white/50">{n.label}</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm transition-colors hover:border-pink hover:bg-pink/10"
              >
                <InstagramIcon className="size-5 shrink-0 text-pink" />@{siteConfig.instagram}
              </a>
            </li>
          </ul>
          <p className="mt-4 flex items-start gap-2 text-sm text-white/60">
            <Clock className="mt-0.5 size-4 shrink-0 text-pink" aria-hidden="true" />
            Sales hours: {siteConfig.salesHours}
          </p>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 py-6 text-sm text-white/45 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
