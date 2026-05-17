type EmptyStateProps = {
  title?: string;
  description?: string;
};

export default function EmptyState({
  title = "No notes yet",
  description = "Capture your first idea and it will live here.",
}: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-black/15 bg-white/60 px-8 py-10 text-center shadow-[0_16px_30px_rgba(23,19,15,0.06)]">
      <p className="text-sm uppercase tracking-[0.3em] text-(--color-mint)">
        Blank canvas
      </p>
      <h3 className="mt-3 font-display text-2xl text-(--color-ink)">{title}</h3>
      <p className="mt-3 text-sm text-(--color-ink)/70">{description}</p>
    </div>
  );
}
