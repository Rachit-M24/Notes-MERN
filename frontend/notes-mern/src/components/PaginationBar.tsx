type PaginationBarProps = {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
};

export default function PaginationBar({
  page,
  totalPages,
  hasNext,
  hasPrev,
  onPageChange,
}: PaginationBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/5 bg-(--color-card) px-5 py-4 shadow-[0_10px_24px_rgba(23,19,15,0.08)]">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-ink)/60">
        Page {page} of {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <button
          className="rounded-full border border-black/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--color-ink) disabled:opacity-40"
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrev}
        >
          Previous
        </button>
        <button
          className="rounded-full bg-(--color-ink) px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--color-card) disabled:opacity-40"
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
