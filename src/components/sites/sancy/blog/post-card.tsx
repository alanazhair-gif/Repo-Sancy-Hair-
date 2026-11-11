import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { readMinutes, topicById, type BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";
import { PhotoSlot } from "../photo-slot";

// One guide in a list: cover photo on top, the same on phones and desktop.
export function PostCard({ post, className }: { post: BlogPost; className?: string }) {
  const topic = topicById(post.topic);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-pink/40 hover:shadow-[0_24px_48px_-24px_rgb(233_30_115/0.4)] max-sm:rounded-3xl",
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <PhotoSlot
          photo={post.photo}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 95vw"
          className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.04]"
          compact
        />
      </div>
      <div className="flex flex-1 flex-col p-6 max-sm:p-5">
        <p className="flex items-center gap-3 text-[0.65rem] font-bold tracking-[0.15em] uppercase">
          <span className="text-pink">{topic?.title}</span>
          <span className="flex shrink-0 items-center gap-1 whitespace-nowrap text-muted-foreground">
            <Clock className="size-3" aria-hidden="true" />
            {readMinutes(post)} min read
          </span>
        </p>
        <h3 className="mt-3 text-lg leading-snug font-extrabold tracking-tight transition-colors group-hover:text-pink max-sm:mt-2">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-pink max-sm:pt-4">
          Read the guide
          <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
