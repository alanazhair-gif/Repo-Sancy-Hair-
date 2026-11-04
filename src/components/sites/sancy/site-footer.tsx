import { instagramHref, navLinks, photos, products, siteConfig, whatsappHref, whatsappNumbers } from "@/lib/site";
import { siteAsset } from "@/lib/assets";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./logo";

const heading = "text-xs font-bold uppercase tracking-[0.25em] text-white";
const list = "mt-5 space-y-3 text-sm text-white/60";
const link = "transition-colors hover:text-pink";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-12 sm:gap-x-10 sm:gap-y-12 sm:py-16 sm:px-6 lg:grid-cols-[1.5fr_1fr_0.8fr_1.2fr] lg:px-8 lg:py-20">
        <div className="col-span-2 sm:col-span-1">
          <Logo src={siteAsset(photos.logoOnDark.file)} className="h-14 w-fit" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">{siteConfig.positioning}</p>
          <p className="mt-4 text-sm text-white/60">Factory: {siteConfig.address}</p>
        </div>

        <nav aria-label="Products">
          <h3 className={heading}>Products</h3>
          <ul className={list}>
            {products.map((p) => (
              <li key={p.id}>
                <a href="#products" className={link}>
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h3 className={heading}>Company</h3>
          <ul className={list}>
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={link}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 sm:col-span-1">
          <h3 className={heading}>Contact</h3>
          <ul className={list}>
            {whatsappNumbers.map((n) => (
              <li key={n.digits}>
                <a
                  href={whatsappHref("PRICE", n.digits)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-start gap-3 ${link}`}
                >
                  <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-pink" />
                  <span>
                    <span className="tabular block font-semibold text-white group-hover:text-pink">{n.display}</span>
                    <span className="block text-xs text-white/45">{n.label}</span>
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a href={instagramHref} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 ${link}`}>
                <InstagramIcon className="size-4 shrink-0 text-pink" />@{siteConfig.instagram}
              </a>
            </li>
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-white/45">Sales hours: {siteConfig.salesHours}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-sm text-white/45 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
