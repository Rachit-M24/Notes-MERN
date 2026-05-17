import apiClient from "./apiClient";
import type {
  FetchNotesParams,
  NotesResponse,
  NoteModel,
  PaginationMeta,
} from "../features/notes/types";

type NotesPayload = NotesResponse | NoteModel[];

function buildMeta(params: FetchNotesParams, total: number): PaginationMeta {
  const limit = params.limit ?? 12;
  const page = params.page ?? 1;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

function normalizeNotesResponse(
  payload: NotesPayload,
  params: FetchNotesParams,
): NotesResponse {
  if (Array.isArray(payload)) {
    const normalizedItems = payload.map((note) => ({
      ...note,
      id: note.id || note._id,
    }));

    return {
      items: normalizedItems,
      meta: buildMeta(params, normalizedItems.length),
    };
  }

  const normalizedItems = (payload.items ?? []).map((note) => ({
    ...note,
    id: note.id || note._id,
  }));

  return {
    items: normalizedItems,
    meta: payload.meta ?? buildMeta(params, normalizedItems.length),
  };
}

export async function getNotes(
  params: FetchNotesParams,
  signal?: AbortSignal,
): Promise<NotesResponse> {
  const response = await apiClient.get<NotesPayload>("/api/notes", {
    params,
    signal,
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  return normalizeNotesResponse(response.data, params);
}

export async function createNote(
  payload: Pick<NoteModel, "title" | "content">,
): Promise<NoteModel> {
  const response = await apiClient.post<NoteModel>("/api/notes", payload);
  return response.data;
}

export async function updateNote(
  id: string,
  payload: Pick<NoteModel, "title" | "content">,
): Promise<NoteModel> {
  const response = await apiClient.put<NoteModel>(`/api/notes/${id}`, payload);
  return response.data;
}

export async function deleteNote(
  id: string,
): Promise<{ message: string } | void> {
  const response = await apiClient.delete<{ message: string }>(
    `/api/notes/${id}`,
  );
  return response.data;
}
