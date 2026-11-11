import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, Clock, Info } from "lucide-react";
import { PostCard } from "@/components/sites/sancy/blog/post-card";
import { HeroBackdrop } from "@/components/sites/sancy/hero-backdrop";
import { WhatsAppIcon } from "@/components/sites/sancy/icons";
import { InnerPage } from "@/components/sites/sancy/inner-page";
import { PhotoSlot } from "@/components/sites/sancy/photo-slot";
import { Reveal } from "@/components/sites/sancy/reveal";
import { blogPosts, postBySlug, readMinutes, topicById, type BlogBlock } from "@/lib/blog";
import { siteConfig, whatsappHref, whatsappNumbers } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} | Hair Blogs | Sancy Hair Vietnam`, description: post.excerpt };
}

const anchor = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{block.text}</p>;
    case "h2":
      return (
        <h2 id={anchor(block.text)} className="scroll-mt-28 pt-4 text-2xl font-extrabold tracking-tight max-sm:pt-2 max-sm:text-xl sm:text-3xl">
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul className="grid gap-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-blush text-pink">
                <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="grid gap-3">
          {block.items.map((item, i) => (
            <li key={item.title} className="flex gap-4 rounded-2xl border border-border bg-white p-5 max-sm:gap-3 max-sm:p-4">
              <span className="tabular flex size-9 shrink-0 items-center justify-center rounded-full bg-pink text-sm font-extrabold text-white">
                {i + 1}
              </span>
              <span>
                <span className="block font-extrabold">{item.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{item.body}</span>
              </span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <figure>
          <div className="overflow-hidden rounded-2xl border border-border bg-white">
            <table className="w-full text-left text-sm max-sm:text-xs">
              <thead>
                <tr className="border-b border-border bg-blush/60 text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase max-sm:text-[0.6rem]">
                  {block.head.map((h, i) => (
                    <th key={h} scope="col" className={i === 0 ? "px-4 py-3 max-sm:px-3" : "px-4 py-3 text-right max-sm:px-2"}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-border last:border-b-0">
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="px-4 py-3 font-bold max-sm:px-3">
                          {cell}
                        </th>
                      ) : (
                        <td key={i} className="tabular px-4 py-3 text-right font-semibold max-sm:px-2">
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note && <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">{block.note}</figcaption>}
        </figure>
      );
    case "callout":
      return (
        <aside className="flex gap-3 rounded-2xl bg-blush p-5 max-sm:p-4">
          <Info className="mt-0.5 size-5 shrink-0 text-pink" aria-hidden="true" />
          <span>
            <span className="block font-extrabold">{block.title}</span>
            <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{block.text}</span>
          </span>
        </aside>
      );
    case "photo":
      return (
        <figure>
          <PhotoSlot photo={block.photo} sizes="(min-width: 1024px) 45rem, 95vw" className="aspect-[16/9] rounded-[1.5rem]" />
          <figcaption className="mt-2 text-xs text-muted-foreground">{block.photo.alt}</figcaption>
        </figure>
      );
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const topic = topicById(post.topic);
  const headings = post.blocks.filter((b): b is Extract<BlogBlock, { type: "h2" }> => b.type === "h2");
  const more = blogPosts.filter((p) => p.slug !== post.slug).sort((a, b) => Number(b.topic === post.topic) - Number(a.topic === post.topic)).slice(0, 3);

  return (
    <InnerPage current={`/blog/${post.slug}`} hideMoreOnPhone>
      <section id="top" className="grain relative overflow-hidden bg-ink text-white">
        <HeroBackdrop />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pt-32 pb-14 max-sm:gap-7 max-sm:pt-28 max-sm:pb-10 sm:px-6 md:pt-40 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14 lg:px-8 lg:pb-20">
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-white/50">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <Link href="/blog" className="hover:text-white">Hair Blogs</Link>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <Link href={`/blog#${post.topic}`} className="text-white/80 hover:text-white">{topic?.title}</Link>
            </nav>
            <h1 className="mt-6 text-[2.1rem] leading-[1.08] font-extrabold tracking-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 max-sm:mt-4 sm:text-lg">{post.excerpt}</p>
            <p className="mt-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/70 max-sm:mt-4">
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
                <Clock className="size-3.5" aria-hidden="true" /> {readMinutes(post)} min read
              </span>
              <span className="rounded-full border border-dashed border-pink/60 px-3 py-1 text-[0.65rem] font-bold tracking-[0.15em] text-pink uppercase">
                Demo · bài viết mẫu
              </span>
            </p>
          </Reveal>
          <Reveal delay={120}>
            <PhotoSlot
              photo={post.photo}
              sizes="(min-width: 1024px) 40vw, 92vw"
              tone="dark"
              className="aspect-[4/3] rounded-[2rem] ring-1 ring-white/10 max-sm:aspect-[2/1] max-sm:rounded-3xl"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-16 max-sm:py-10 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 max-sm:gap-8 sm:px-6 lg:grid-cols-[1fr_20rem] lg:gap-16 lg:px-8">
          <article className="grid min-w-0 max-w-3xl content-start gap-5">
            {post.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
            <Link
              href={post.related.href}
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-pink"
            >
              {post.related.label} <ArrowRight className="size-4" />
            </Link>
          </article>

          <aside className="grid content-start gap-4 lg:sticky lg:top-28 lg:self-start">
            {headings.length > 0 && (
              <nav aria-label="In this guide" className="rounded-[1.5rem] border border-border bg-white p-5 max-sm:hidden">
                <p className="text-xs font-bold tracking-[0.2em] text-pink uppercase">In this guide</p>
                <ul className="mt-3 grid gap-2 text-sm">
                  {headings.map((h) => (
                    <li key={h.text}>
                      <a href={`#${anchor(h.text)}`} className="text-muted-foreground hover:text-pink">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <div className="rounded-[1.5rem] bg-ink p-5 text-white">
              <p className="font-extrabold">Ask sales for the full price table</p>
              <p className="mt-1 text-sm text-white/60">Replies {siteConfig.salesHours}.</p>
              <ul className="mt-4 grid gap-2">
                {whatsappNumbers.map((n) => (
                  <li key={n.digits}>
                    <a
                      href={whatsappHref("PRICE", n.digits)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl bg-white/[0.06] px-3.5 py-2.5 transition-colors hover:bg-pink"
                    >
                      <WhatsAppIcon className="size-5 shrink-0 text-pink-soft" />
                      <span>
                        <span className="tabular block text-sm font-bold">{n.display}</span>
                        <span className="block text-xs text-white/55">{n.label}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16 max-sm:py-10 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight max-sm:text-2xl">
              More <span className="font-accent font-medium text-pink italic">guides.</span>
            </h2>
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-bold text-pink hover:text-pink-deep">
              All Hair Blogs <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 max-sm:mt-6 max-sm:gap-3 md:grid-cols-3">
            {more.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </InnerPage>
  );
}
