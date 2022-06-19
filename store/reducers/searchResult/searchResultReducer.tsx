import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { SearchResultType, storeInfoType } from "../../../lib/apitype/search";

export interface SearchResultState {
  content: SearchResultType[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchResultState = {
  content: [],
  loading: false,
  error: null,
};

const SearchResultSlice = createSlice({
  name: "SearchResult",
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
    },

    searchStoreSuccess(state, action: PayloadAction<SearchResultType[]>) {
      state.content = action.payload;
      state.loading = false;
    },

    searchStoreFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    initializeSearchResult(state) {
      state.content = [];
      state.error = null;
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
