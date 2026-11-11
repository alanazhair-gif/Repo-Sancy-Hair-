import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Search, X } from "lucide-react";
import { PostCard } from "@/components/sites/sancy/blog/post-card";
import { InstagramIcon } from "@/components/sites/sancy/icons";
import { InnerPage } from "@/components/sites/sancy/inner-page";
import { PageHero } from "@/components/sites/sancy/page-hero";
import { Reveal } from "@/components/sites/sancy/reveal";
import { aboutPhotos } from "@/lib/about";
import { blogPosts, blogTopics, quickAnswers, searchPosts } from "@/lib/blog";
import { instagramHref, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Hair Blogs | Guides for Hair Resellers | Sancy Hair Vietnam",
  description:
    "Guides from the Sancy factory for hair resellers: cost per bundle, what changes the price, grades, which line to stock, how to order and how to check a supplier.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; q?: string }>;
}) {
  const { topic, q } = await searchParams;
  const query = (q ?? "").trim().slice(0, 80);
  const active = blogTopics.some((t) => t.id === topic) ? topic : undefined;
  const shown = searchPosts(
    active ? blogPosts.filter((p) => p.topic === active) : blogPosts,
    query,
  );
  // Keep the search when switching topic, and the topic when searching.
  const href = (t?: string) => {
    const params = new URLSearchParams();
    if (t) params.set("topic", t);
    if (query) params.set("q", query);
    const qs = params.toString();
    return `/blog${qs ? `?${qs}` : ""}#guides`;
  };

  const chips = [
    { id: undefined, title: "All guides", count: blogPosts.length },
    ...blogTopics.map((t) => ({
      id: t.id,
      title: t.title,
      count: blogPosts.filter((p) => p.topic === t.id).length,
    })),
  ];

  return (
    <InnerPage current="/blog" hideMoreOnPhone>
      <PageHero
        crumb="Hair Blogs"
        eyebrow="Hair Blogs"
        title="Guides from our factory,"
        accent="for hair resellers."
        intro="What a bundle costs you, what changes the price, which line to stock, and how to order and check us before you pay."
        photo={aboutPhotos.officeSales}
        hidePhotoOnPhone
      >
        <form
          action="/blog#guides"
          method="get"
          role="search"
          className="mt-7 flex max-w-xl items-center gap-2 rounded-full bg-white p-1.5 pl-5 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.6)] max-sm:mt-6"
        >
          <Search
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <label htmlFor="blog-search" className="sr-only">
            Search the guides
          </label>
          <input
            id="blog-search"
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search: MOQ, price per bundle, PayPal..."
            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-ink outline-none placeholder:text-muted-foreground"
          />
          {active && <input type="hidden" name="topic" value={active} />}
          <button
            type="submit"
            className="shrink-0 rounded-full bg-pink px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-pink-deep max-sm:px-4"
          >
            Search
          </button>
        </form>
        <p className="mt-5 inline-block rounded-full border border-dashed border-pink/60 px-3 py-1 text-[0.65rem] font-bold tracking-[0.15em] text-pink uppercase">
          Demo · bài viết mẫu
        </p>
      </PageHero>

      {/* All guides, filterable by topic */}
      <section
        id="guides"
        className="scroll-mt-24 bg-paper py-16 max-sm:pt-8 max-sm:pb-10 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 border-b border-border pb-6 max-sm:gap-3 max-sm:pb-4 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight max-sm:text-2xl sm:text-4xl">
              All{" "}
              <span className="font-accent font-medium text-pink italic">
                guides.
              </span>
            </h2>
            <nav aria-label="Topics">
              <ul className="flex flex-wrap gap-2">
                {chips.map((c) => {
                  const on = c.id === active;
                  return (
                    <li key={c.title} className="shrink-0">
                      <Link
                        href={href(c.id)}
                        scroll={false}
                        aria-current={on ? "page" : undefined}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors max-sm:px-3 max-sm:py-1.5 max-sm:text-xs",
                          on
                            ? "border-pink bg-pink text-white"
                            : "border-border bg-white hover:border-pink hover:text-pink",
                        )}
                      >
                        {c.title}
                        <span
                          className={cn(
                            "tabular text-xs",
                            on ? "text-white/75" : "text-muted-foreground",
                          )}
                        >
                          {c.count}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {query && (
            <p className="mt-6 flex flex-wrap items-center gap-2 text-sm max-sm:mt-4">
              <span className="text-muted-foreground">
                {shown.length} {shown.length === 1 ? "guide" : "guides"} for
              </span>
              <span className="rounded-full bg-blush px-3 py-1 font-bold text-pink-deep">
                &ldquo;{query}&rdquo;
              </span>
              <Link
                href={active ? `/blog?topic=${active}#guides` : "/blog#guides"}
                scroll={false}
                className="inline-flex items-center gap-1 font-bold text-pink hover:text-pink-deep"
              >
                <X className="size-3.5" aria-hidden="true" /> Clear search
              </Link>
            </p>
          )}

          {shown.length === 0 ? (
            <div className="mt-8 rounded-[1.75rem] border border-dashed border-border bg-white p-10 text-center max-sm:mt-5 max-sm:p-6">
              <p className="font-extrabold">No guide matches that yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try another word, like MOQ, PayPal, grade or keratin, or ask
                sales on WhatsApp.
              </p>
            </div>
          ) : (
            <ul className="mt-8 grid gap-5 max-sm:mt-5 max-sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((post, i) => (
                <li key={post.slug}>
                  <Reveal delay={(i % 3) * 70} className="h-full">
                    <PostCard post={post} />
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Quick answers */}
      <section className="bg-white py-16 max-sm:py-10 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 max-sm:gap-6 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-14 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.3em] text-pink uppercase">
              Quick answers
            </p>
            <h2 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight max-sm:text-2xl sm:text-4xl">
              What buyers ask us{" "}
              <span className="font-accent font-medium text-pink italic">
                most on WhatsApp.
              </span>
            </h2>
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-pink px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-pink-deep max-sm:mt-5"
            >
              <InstagramIcon className="size-4" /> More on @
              {siteConfig.instagram}
            </a>
          </Reveal>
          <ul className="grid gap-3 max-sm:gap-2">
            {quickAnswers.map((qa, i) => (
              <li key={qa.q}>
                <Reveal
                  delay={i * 60}
                  className="flex gap-4 rounded-2xl border border-border bg-paper p-5 max-sm:gap-3 max-sm:p-3.5"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blush text-pink max-sm:size-6">
                    <Plus className="size-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-extrabold max-sm:text-sm">
                      {qa.q}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground max-sm:text-xs">
                      {qa.a}
                    </span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </InnerPage>
  );
}
