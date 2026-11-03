import { ArrowUpRight } from "lucide-react";
import { whatsappHref } from "@/lib/site";
import { Reveal } from "./reveal";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  accent: string;
  tags: string[];
  note: string;
  link: { label: string; message: string };
};

// Heading on one line, then a thin strip: tags and a note on the left, a WhatsApp link on the right.
export function SectionHeader({ eyebrow, title, accent, tags, note, link }: SectionHeaderProps) {
  return (
    <Reveal>
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink">{eyebrow}</p>
      <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
        {title} <span className="font-accent font-medium whitespace-nowrap text-pink italic">{accent}</span>
      </h2>

      <div className="mt-8 flex flex-col gap-4 border-y border-border py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <ul className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li key={tag} className="rounded-full bg-blush px-3 py-1 text-xs font-semibold text-pink-deep">
                {tag}
              </li>
            ))}
          </ul>
          <span className="text-muted-foreground">{note}</span>
        </div>
        <a
          href={whatsappHref(link.message)}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-pink hover:text-pink-deep"
        >
          {link.label}
          <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
        </a>
      </div>
    </Reveal>
  );
}
