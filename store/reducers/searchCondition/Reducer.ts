import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
export interface hashtagSearchConditionState {
  position: { [index: string]: string | undefined };
  category?: string;
  hashtag?: string[];
  keyword?: string;
}

const initialState: hashtagSearchConditionState = {
  position: {},
  category: "카페",
  hashtag: [],
};

const hashtagSearchConditionSlice = createSlice({
  name: "searchCondition",
  initialState,

  reducers: {
    setPosition(
      state,
      action: PayloadAction<{
        address?: string;
        longitude?: string;
        latitude?: string;
      }>
    ) {
      state.position;
      state.position.address = action.payload.address;
      state.position.longitude = action.payload.longitude;
      state.position.latitude = action.payload.latitude;
    },

    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
      state.hashtag = [];
    },

    addHashTag(state, action: PayloadAction<string>) {
      state.hashtag?.push(action.payload);
    },

    deleteHashTag(state, action: PayloadAction<string>) {
      state.hashtag?.splice(state.hashtag.indexOf(action.payload), 1);
    },

    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },

    initializeHashtag(state) {
      state.category = "카페";
      state.position = {};
      state.hashtag = [];
    },

    initializeKeyword(state) {
      state.position = {};
      state.category = undefined;
      state.hashtag = undefined;
      state.keyword = "";
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return state;
    },
  },
});

export const {
  setPosition,
  setCategory,
  addHashTag,
  deleteHashTag,
  setKeyword,
  initializeHashtag,
  initializeKeyword,
} = hashtagSearchConditionSlice.actions;

export default hashtagSearchConditionSlice.reducer;
