import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface SearchTypeState {
  type: string;
  hashtag: string;
}

const initialState: SearchTypeState = {
  type: "hashtag",
  hashtag: "search",
};

const SearchTypeSlice = createSlice({
  name: "SearchType",
  initialState,

  reducers: {
    setSearchType(
      state,
      action: PayloadAction<{ type: string; hashtag: string }>
    ) {
      state.type = action.payload.type;
      state.hashtag = action.payload.hashtag;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return state;
    },
  },
});

export const { setSearchType } = SearchTypeSlice.actions;

export default SearchTypeSlice.reducer;
