import { useState } from "react";

type NoteComposerProps = {
  isCreating: boolean;
  onCreate: (title: string, content: string) => void;
};

export default function NoteComposer({
  isCreating,
  onCreate,
}: NoteComposerProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit() {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      setErrorMessage("Both title and content are required.");
      return;
    }

    onCreate(trimmedTitle, trimmedContent);
    setTitle("");
    setContent("");
    setErrorMessage("");
    setIsExpanded(false);
  }

  function handleFocus() {
    setIsExpanded(true);
  }

  function handleCancel() {
    setTitle("");
    setContent("");
    setErrorMessage("");
    setIsExpanded(false);
  }

  return (
    <section className="rounded-3xl border border-black/5 bg-(--color-card) px-6 py-5 shadow-[0_16px_35px_rgba(23,19,15,0.08)]">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg text-(--color-ink)">New note</h2>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-mint)">
          Quick Capture
        </span>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {isExpanded && (
          <input
            aria-label="Note title"
            className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-(--color-ink) shadow-[0_8px_16px_rgba(23,19,15,0.06)] outline-none"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        )}
        <textarea
          aria-label="Note content"
          className="min-h-24 resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-(--color-ink) shadow-[0_8px_16px_rgba(23,19,15,0.06)] outline-none"
          placeholder="Take a note..."
          value={content}
          onChange={(event) => setContent(event.target.value)}
          onFocus={handleFocus}
        />
        {errorMessage && (
          <p className="text-xs font-semibold text-red-600">{errorMessage}</p>
        )}
        {isExpanded && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-(--color-ink)/70"
              type="button"
              onClick={handleCancel}
              disabled={isCreating}
            >
              Cancel
            </button>
            <button
              className="rounded-full bg-(--color-ink) px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-card) transition hover:-translate-y-1"
              type="button"
              onClick={handleSubmit}
              disabled={isCreating}
            >
              {isCreating ? "Saving..." : "Add Note"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
