export function PageHero({ title, lede }: { title: string; lede: string }) {
  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-14 sm:px-8 sm:py-16">
        <h1 className="max-w-3xl font-display text-5xl leading-[1.05] font-medium text-balance text-ink sm:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-pretty text-muted">{lede}</p>
      </div>
    </header>
  );
}
