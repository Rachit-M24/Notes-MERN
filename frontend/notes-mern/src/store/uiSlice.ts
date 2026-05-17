import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  searchQuery: string;
  sort: string;
};

const initialState: UiState = {
  searchQuery: "",
  sort: "createdAt:desc",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
  },
});

export const { setSearchQuery, setSort } = uiSlice.actions;
export default uiSlice.reducer;
