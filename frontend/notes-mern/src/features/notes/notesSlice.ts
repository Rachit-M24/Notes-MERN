import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type {
  FetchNotesParams,
  NoteModel,
  NotesResponse,
  PaginationMeta,
} from "./types";
import * as notesApi from "../../services/notesApi";

type LoadingState = {
  isFetching: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
};

type NotesState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  pagination: PaginationMeta;
  loading: LoadingState;
};

const notesAdapter = createEntityAdapter<NoteModel>({
  sortComparer: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

const initialState = notesAdapter.getInitialState<NotesState>({
  status: "idle",
  error: null,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  },
  loading: {
    isFetching: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
  },
});

export const fetchNotes = createAsyncThunk<
  NotesResponse,
  FetchNotesParams | undefined
>("notes/fetchNotes", async (params, thunkApi) => {
  try {
    const response = await notesApi.getNotes(params ?? {}, thunkApi.signal);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createNote = createAsyncThunk<
  NoteModel,
  Pick<NoteModel, "title" | "content">
>("notes/createNote", async (payload, thunkApi) => {
  try {
    return await notesApi.createNote(payload);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateNote = createAsyncThunk<
  NoteModel,
  { id: string; title: string; content: string }
>("notes/updateNote", async ({ id, title, content }, thunkApi) => {
  try {
    return await notesApi.updateNote(id, { title, content });
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteNote = createAsyncThunk<string, string>(
  "notes/deleteNote",
  async (id, thunkApi) => {
    try {
      await notesApi.deleteNote(id);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

function mergePagination(state: NotesState, meta: PaginationMeta) {
  state.pagination = {
    ...state.pagination,
    ...meta,
  };
}

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.pagination.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.pagination.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
        state.loading.isFetching = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading.isFetching = false;
        notesAdapter.setAll(state, action.payload.items);
        mergePagination(state, action.payload.meta);
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        if (action.meta.aborted) {
          state.loading.isFetching = false;
          return;
        }
        state.status = "failed";
        state.loading.isFetching = false;
        state.error =
          typeof action.payload === "object" && action.payload
            ? (action.payload as { message?: string }).message ||
              "Failed to load notes"
            : "Failed to load notes";
      })
      .addCase(createNote.pending, (state) => {
        state.loading.isCreating = true;
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading.isCreating = false;
        notesAdapter.addOne(state, action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading.isCreating = false;
        state.error =
          typeof action.payload === "object" && action.payload
            ? (action.payload as { message?: string }).message ||
              "Failed to create note"
            : "Failed to create note";
      })
      .addCase(updateNote.pending, (state) => {
        state.loading.isUpdating = true;
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading.isUpdating = false;
        notesAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading.isUpdating = false;
        state.error =
          typeof action.payload === "object" && action.payload
            ? (action.payload as { message?: string }).message ||
              "Failed to update note"
            : "Failed to update note";
      })
      .addCase(deleteNote.pending, (state) => {
        state.loading.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading.isDeleting = false;
        notesAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading.isDeleting = false;
        state.error =
          typeof action.payload === "object" && action.payload
            ? (action.payload as { message?: string }).message ||
              "Failed to delete note"
            : "Failed to delete note";
      });
  },
});

export const { setPage, setLimit } = notesSlice.actions;

export const notesSelectors = notesAdapter.getSelectors<RootState>(
  (state) => state.notes,
);

export const selectPagination = (state: RootState) => state.notes.pagination;
export const selectLoadingFlags = (state: RootState) => state.notes.loading;

export default notesSlice.reducer;
