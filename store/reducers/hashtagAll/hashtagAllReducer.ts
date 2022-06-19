import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { HashTagType } from "../../../lib/apitype/hashtag";

export interface HashtagAllState {
  content: {
    [index: string]: { [index: string]: [string, number, number][] };
  };
  error: string | null;
}

const initialState: HashtagAllState = {
  content: { 카페: {}, 식당: {}, 주점: {} },
  error: null,
};

const HashtagAllSlice = createSlice({
  name: "hashtag",
  initialState,

  reducers: {
    getHashtagAll() {},

    getHashtagAllSuccess(state, action: PayloadAction<HashTagType[]>) {
      for (let i = 0; i < action.payload.length; i++) {
        const { id, category, subject, name, viewCount } = action.payload[i];
        if (state.content[category][subject] === undefined) {
          state.content[category][subject] = [];
        }
        state.content[category][subject].push([name, viewCount, id]);
      }
    },

    getHashtagAllFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      const usersState = action.payload.hashtagAll;
      if (!Object.keys(usersState.content.카페).length && !usersState.error)
        return state;
      return usersState;
    },
  },
});

export const { getHashtagAll, getHashtagAllSuccess, getHashtagAllFailure } =
  HashtagAllSlice.actions;

export default HashtagAllSlice.reducer;
