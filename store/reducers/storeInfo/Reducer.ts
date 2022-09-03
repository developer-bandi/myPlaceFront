import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {storeInfoType} from "../../../lib/apitype/search";

export interface storeInfoState {
  content?: storeInfoType;
  loading: boolean;
  error: boolean;
}

const initialState: storeInfoState = {
  loading: false,
  error: false,
};

const storeInfoSlice = createSlice({
  name: "storeInfo",
  initialState,
  reducers: {
    getStoreInfo(state, action: PayloadAction<number>) {
      state.loading = true;
    },

    getStoreInfoSuccess(state, action: PayloadAction<storeInfoType>) {
      state.content = action.payload;
      state.loading = false;
    },

    getStoreInfoFailure(state) {
      state.error = true;
    },
    setBookmark(state, action: PayloadAction<boolean>) {
      if (state.content !== undefined) {
        state.content.bookmark = action.payload;
      }
    },

    initializeStoreInfo(state) {
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
  getStoreInfo,
  getStoreInfoSuccess,
  getStoreInfoFailure,
  setBookmark,
  initializeStoreInfo,
} = storeInfoSlice.actions;

export default storeInfoSlice.reducer;
