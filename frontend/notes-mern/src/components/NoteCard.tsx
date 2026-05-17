import { useEffect, useState } from "react";
import type { Note } from "../features/notes/types";

type NoteCardProps = {
  note: Note;
  isUpdating: boolean;
  isDeleting: boolean;
  onUpdate: (id: string, title: string, content: string) => void;
  onDelete: (id: string) => void;
};

function formatDate(value: string) {
  const date = new Date(value);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function NoteCard({
  note,
  isUpdating,
  isDeleting,
  onUpdate,
  onDelete,
}: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isEditing) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [isEditing, note.title, note.content]);

  function handleSave() {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      setErrorMessage("Title and content are required.");
      return;
    }

    onUpdate(note._id, trimmedTitle, trimmedContent);
    setIsEditing(false);
    setErrorMessage("");
  }

  function handleCancel() {
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
    setErrorMessage("");
  }

  return (
    <article className="group flex h-full flex-col justify-between rounded-3xl border border-black/5 bg-(--color-card) p-5 shadow-[0_14px_30px_rgba(23,19,15,0.08)] transition hover:-translate-y-1">
      <div className="space-y-3">
        {isEditing ? (
          <input
            aria-label="Edit note title"
            className="w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-(--color-ink) outline-none"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        ) : (
          <h3 className="font-display text-lg text-(--color-ink)">
            {note.title}
          </h3>
        )}
        {isEditing ? (
          <textarea
            aria-label="Edit note content"
            className="min-h-24 w-full resize-none rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm text-(--color-ink) outline-none"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        ) : (
          <p className="text-sm text-(--color-ink)/70">{note.content}</p>
        )}
        {errorMessage && (
          <p className="text-xs font-semibold text-red-600">{errorMessage}</p>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-(--color-ink)/55">
        <span>Updated {formatDate(note.updatedAt)}</span>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                className="rounded-full border border-black/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
                type="button"
                onClick={handleCancel}
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                className="rounded-full bg-(--color-ink) px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
                type="button"
                onClick={handleSave}
                disabled={isUpdating}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <button
                className="rounded-full border border-black/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
                type="button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className="rounded-full bg-(--color-accent)/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--color-ink)"
                type="button"
                onClick={() => onDelete(note._id)}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
