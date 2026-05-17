export type NoteModel = {
  _id: string;
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type NotesResponse = {
  items: NoteModel[];
  meta: PaginationMeta;
};

export type FetchNotesParams = {
  page?: number;
  limit?: number;
  q?: string;
  sort?: string;
};
