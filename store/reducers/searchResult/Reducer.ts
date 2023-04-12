import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { store } from "../../../type/search";

export interface SearchResultState {
  content?: store[];
  loading: boolean;
  error: boolean;
}

const initialState: SearchResultState = {
  loading: false,
  error: false,
};

const SearchResultSlice = createSlice({
  name: "searchResult",
  initialState,

  reducers: {
    searchStore(
      state,
      action: PayloadAction<{
        latitude: string;
        longitude: string;
        selectedHashtag?: string[];
        searchKeyword?: string;
      }>
    ) {
      state.loading = true;
      state.content = undefined;
    },

    searchStoreSuccess(state, action: PayloadAction<store[]>) {
      state.content = action.payload;
      state.loading = false;
    },

    searchStoreFailure(state) {
      state.error = true;
      state.loading = false;
    },

    initializeSearchResult(state) {
      state.content = undefined;
      state.loading = false;
      state.error = false;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return state;
    },
  },
});

export const {
  searchStore,
  searchStoreSuccess,
  searchStoreFailure,
  initializeSearchResult,
} = SearchResultSlice.actions;

export default SearchResultSlice.reducer;
