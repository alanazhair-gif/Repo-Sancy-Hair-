import { colorCodes, jetBlack, photos } from "@/lib/site";
import { PhotoSlot } from "./photo-slot";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

export function ColorCollection() {
  return (
    <section id="colors" className="scroll-mt-20 bg-paper py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Colors"
          title="27 colors."
          accent="Two prices."
          tags={["#1 Jet Black: own price", "26 colors: one price"]}
          note="Order by color code."
          link={{ label: "Ask about a color on WhatsApp", message: "COLOR" }}
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[0.9fr_2.1fr]">
          <Reveal>
            <div className="flex h-full flex-col justify-end rounded-3xl p-7 text-white" style={{ background: jetBlack.swatch }}>
              <PhotoSlot
                photo={photos.jetBlack}
                sizes="(min-width: 1024px) 28vw, 90vw"
                tone="dark"
                className="mb-6 aspect-[4/3] rounded-2xl"
              />
              <span className="w-fit rounded-full bg-pink px-3 py-1 text-xs font-bold uppercase tracking-[0.15em]">
                Own price
              </span>
              <p className="mt-4 text-5xl font-extrabold">{jetBlack.code}</p>
              <p className="font-accent text-2xl italic">{jetBlack.name}</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl border border-border bg-white p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <p className="font-bold">Colors</p>
                <span className="rounded-full bg-blush px-3 py-1 text-xs font-bold text-pink-deep">26 codes, one price</span>
              </div>
              <ul className="mt-5 grid grid-cols-4 gap-x-3 gap-y-4 sm:grid-cols-7 lg:grid-cols-9">
                {colorCodes.map((c) => (
                  <li key={c.code} className="text-center">
                    <span
                      className="mx-auto block aspect-square w-full max-w-14 rounded-full ring-1 ring-ink/10"
                      style={{ background: c.swatch }}
                    />
                    <span className="mt-1.5 block text-xs font-semibold">{c.code}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-muted-foreground">
                Screen colors are approximate. Ask on WhatsApp for a real video of the color you want.
              </p>
              <PhotoSlot
                photo={photos.colorChart}
                sizes="(min-width: 1024px) 60vw, 90vw"
                className="mt-6 aspect-[16/9] rounded-2xl"
              />

            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
