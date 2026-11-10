import { ArrowRight } from "lucide-react";
import { installGuide, productById } from "@/lib/shop";
import { Reveal } from "../reveal";

// "Not sure which line?" Pick by how the hair goes in, then jump to the line.
export function ShopInstallGuide() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-20 text-white max-sm:py-12 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink">Not sure which line?</p>
          <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
            Start from how <span className="font-accent font-medium text-pink italic">your clients wear it.</span>
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {installGuide.map((g, i) => (
            <li key={g.how}>
              <Reveal delay={i * 70} className="flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                <span className="tabular text-xs font-bold text-pink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-xl font-extrabold">{g.how}</h3>
                <p className="mt-1 text-sm text-white/55">{g.detail}</p>
                <ul className="mt-6 grid gap-2 border-t border-white/10 pt-5">
                  {g.lines.map((id) => (
                    <li key={id}>
                      <a
                        href={`#line-${id}`}
                        className="group flex items-center justify-between gap-3 text-sm font-semibold text-white/85 hover:text-pink"
                      >
                        {productById(id).name}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
