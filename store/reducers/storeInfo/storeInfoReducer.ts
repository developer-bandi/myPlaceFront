import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { storeInfoType } from "../../../lib/apitype/search";

export interface storeInfoState {
  content: storeInfoType;
  error: null | string;
}

const initialState: storeInfoState = {
  content: {},
  error: null,
};

const storeInfoSlice = createSlice({
  name: "storeInfo",
  initialState,
  reducers: {
    getStoreInfo(state, action: PayloadAction<number>) {},

    getStoreInfoSuccess(state, action: PayloadAction<storeInfoType>) {
      state.content = action.payload;
    },

    getStoreInfoFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setBookmark(state, action: PayloadAction<boolean>) {
      state.content.bookmark = action.payload;
    },

    initializeStoreInfo(state) {
      state.content = {};
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
  getStoreInfo,
  getStoreInfoSuccess,
  getStoreInfoFailure,
  setBookmark,
  initializeStoreInfo,
} = storeInfoSlice.actions;

export default storeInfoSlice.reducer;
