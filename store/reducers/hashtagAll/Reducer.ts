import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { HashTagType } from "../../../lib/apitype/hashtag";

export interface HashtagAllState {
  content?: {
    [index: string]: { [index: string]: [string, number, number][] };
  };
  loading: boolean;
  error: boolean;
}

const initialState: HashtagAllState = {
  loading: false,
  error: false,
};

const HashtagAllSlice = createSlice({
  name: "hashtagAll",
  initialState,

  reducers: {
    getHashtagAll(state) {
      state.loading = true;
    },

    getHashtagAllSuccess(state, action: PayloadAction<HashTagType[]>) {
      state.content = { 카페: {}, 식당: {}, 주점: {} };
      for (let i = 0; i < action.payload.length; i++) {
        const { id, category, subject, name, viewCount } = action.payload[i];
        if (state.content[category][subject] === undefined) {
          state.content[category][subject] = [];
        }
        state.content[category][subject].push([name, viewCount, id]);
      }
      state.loading = false;
    },

    getHashtagAllFailure(state) {
      state.error = true;
      state.loading = false;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      const serverData = action.payload.hashtagAll;
      if (serverData.error || serverData.content === undefined) {
        return state;
      } else {
        return serverData;
      }
    },
  },
});

export const { getHashtagAll, getHashtagAllSuccess, getHashtagAllFailure } =
  HashtagAllSlice.actions;

export default HashtagAllSlice.reducer;
