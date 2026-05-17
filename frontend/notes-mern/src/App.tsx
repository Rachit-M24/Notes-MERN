import { useEffect, useRef } from "react";
import TopBar from "./components/TopBar";
import NoteComposer from "./components/NoteComposer";
import NotesGrid from "./components/NotesGrid";
import PaginationBar from "./components/PaginationBar";
import EmptyState from "./components/EmptyState";
import StatusBanner from "./components/StatusBanner";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  createNote,
  deleteNote,
  fetchNotes,
  notesSelectors,
  selectLoadingFlags,
  selectPagination,
  setPage,
  updateNote,
} from "./features/notes/notesSlice";
import { setSearchQuery } from "./store/uiSlice";
import { useDebouncedValue } from "./hooks/useDebouncedValue";

function App() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(notesSelectors.selectAll);
  const { searchQuery, sort } = useAppSelector((state) => state.ui);
  const errorMessage = useAppSelector((state) => state.notes.error);
  const pagination = useAppSelector(selectPagination);
  const loadingFlags = useAppSelector(selectLoadingFlags);
  const debouncedSearch = useDebouncedValue(searchQuery, 400);
  const lastRequestRef = useRef<{ abort?: () => void } | null>(null);

  useEffect(() => {
    lastRequestRef.current?.abort?.();
    const promise = dispatch(
      fetchNotes({
        page: pagination.page,
        limit: pagination.limit,
        q: debouncedSearch || undefined,
        sort,
      }),
    );
    lastRequestRef.current = promise as { abort?: () => void };

    return () => {
      promise.abort();
    };
  }, [dispatch, pagination.page, pagination.limit, debouncedSearch, sort]);

  const showEmptyState = !loadingFlags.isFetching && notes.length === 0;

  return (
    <div className="min-h-screen bg-(--color-sand) text-(--color-ink)">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-20 h-72 w-72 rounded-full bg-(--color-accent)/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-30 -top-20 h-80 w-80 rounded-full bg-(--color-mint)/20 blur-3xl" />
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
          <TopBar
            searchValue={searchQuery}
            onSearchChange={(value) => {
              dispatch(setSearchQuery(value));
              dispatch(setPage(1));
            }}
          />
          {errorMessage && <StatusBanner message={errorMessage} />}
          <div className="grid gap-6 lg:grid-cols-[1.05fr_2fr]">
            <NoteComposer
              isCreating={loadingFlags.isCreating}
              onCreate={(title, content) =>
                dispatch(createNote({ title, content }))
              }
            />
            <div className="flex flex-col gap-6">
              {showEmptyState ? (
                <EmptyState />
              ) : (
                <NotesGrid
                  notes={notes}
                  isLoading={loadingFlags.isFetching}
                  isUpdating={loadingFlags.isUpdating}
                  isDeleting={loadingFlags.isDeleting}
                  onUpdate={(id, title, content) =>
                    dispatch(updateNote({ id, title, content }))
                  }
                  onDelete={(id) => dispatch(deleteNote(id))}
                />
              )}
              {pagination.totalPages > 1 && (
                <PaginationBar
                  page={pagination.page}
                  totalPages={pagination.totalPages}
                  hasNext={pagination.hasNext}
                  hasPrev={pagination.hasPrev}
                  onPageChange={(page) => dispatch(setPage(page))}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
