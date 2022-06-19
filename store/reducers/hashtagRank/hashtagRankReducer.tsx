import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { hashtagRankType } from "../../../lib/apitype/hashtag";

export interface hashtagRankState {
  content: {
    [index: string]: { subject: string; name: string; viewCount: number }[];
  };
  error?: string | null;
}

const initialState: hashtagRankState = {
  content: { 카페: [], 식당: [], 주점: [] },
  error: null,
};

const HashtagRankSlice = createSlice({
  name: "hashtagRank",
  initialState,

  reducers: {
    getHashtagRank() {},

    getHashtagRankSuccess(state, action: PayloadAction<hashtagRankType>) {
      state.content.카페 = action.payload.cafe;
      state.content.식당 = action.payload.restaurant;
      state.content.주점 = action.payload.pub;
    },

    getHashtagRankFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return state;
    },
  },
});

export const { getHashtagRank, getHashtagRankSuccess, getHashtagRankFailure } =
  HashtagRankSlice.actions;

export default HashtagRankSlice.reducer;
