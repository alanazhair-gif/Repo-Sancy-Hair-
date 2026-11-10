// The homepage hero's background (pink glows, hair strands, faint "Sancy Hair" word), shared by
// the inner page heroes so every dark top band looks the same. Place inside a
// "grain relative overflow-hidden bg-ink" section, before the content.
export function HeroBackdrop() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] size-[46rem] rounded-full bg-pink/30 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] size-[32rem] rounded-full bg-pink-deep/20 blur-[140px]"
      />
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full text-pink opacity-[0.16]"
      >
        {Array.from({ length: 22 }, (_, i) => {
          const x = 760 + i * 34;
          return (
            <path
              key={i}
              d={`M${x},-40 C${x - 120 + i * 6},220 ${x + 140 - i * 4},460 ${x - 60 + i * 8},860`}
              fill="none"
              stroke="currentColor"
              strokeWidth={i % 4 === 0 ? 1.6 : 0.7}
            />
          );
        })}
      </svg>
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 font-accent text-[22vw] leading-none font-semibold whitespace-nowrap text-white/[0.03] italic select-none"
      >
        Sancy Hair
      </p>
    </>
  );
}
