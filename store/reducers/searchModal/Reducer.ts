import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

export interface SearchModalState {
  desktop: {fold: boolean; storeInfoActive: boolean};
  mobile: {fold: boolean};
}

const initialState: SearchModalState = {
  desktop: {fold: false, storeInfoActive: false},
  mobile: {fold: true},
};

const SearchModal = createSlice({
  name: "searchModal",
  initialState,

  reducers: {
    changeDesktopFold(state) {
      state.desktop.fold = !state.desktop.fold;
    },
    changeDesktopStoreInfoActive(state, action: PayloadAction<boolean>) {
      state.desktop.storeInfoActive = action.payload;
    },
    changeMobileFold(state) {
      state.mobile.fold = !state.mobile.fold;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return state;
    },
  },
});

export const {
  changeDesktopFold,
  changeDesktopStoreInfoActive,
  changeMobileFold,
} = SearchModal.actions;

export default SearchModal.reducer;
