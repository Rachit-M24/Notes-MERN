import NoteCard from "./NoteCard";
import type { Note } from "../features/notes/types";

type NotesGridProps = {
  notes: Note[];
  isLoading: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  onUpdate: (id: string, title: string, content: string) => void;
  onDelete: (id: string) => void;
};

function LoadingSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="h-36 animate-pulse rounded-3xl border border-black/5 bg-white/70 shadow-[0_10px_20px_rgba(23,19,15,0.06)]"
        />
      ))}
    </div>
  );
}

export default function NotesGrid({
  notes,
  isLoading,
  isUpdating,
  isDeleting,
  onUpdate,
  onDelete,
}: NotesGridProps) {
  if (isLoading && notes.length === 0) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
