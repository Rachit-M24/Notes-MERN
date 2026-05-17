type TopBarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export default function TopBar({ searchValue, onSearchChange }: TopBarProps) {
  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-black/5 bg-(--color-card)/90 px-6 py-5 shadow-[0_10px_30px_rgba(23,19,15,0.08)] backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-(--color-mint)">
            Notes workspace
          </p>
          <h1 className="font-display text-2xl text-(--color-ink) sm:text-3xl">
            ThinkBoard Notes
          </h1>
        </div>
        <div className="rounded-full bg-(--color-accent)/15 px-4 py-2 text-xs font-semibold text-(--color-ink)">
          Keep it light. Keep it sharp.
        </div>
      </div>
      <label className="relative flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-[0_12px_20px_rgba(23,19,15,0.06)]">
        <span className="text-lg">🔍</span>
        <input
          aria-label="Search notes"
          className="w-full bg-transparent text-sm font-medium text-(--color-ink) outline-none placeholder:text-(--color-ink)/45"
          placeholder="Search notes, ideas, or tags..."
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>
    </header>
  );
}
