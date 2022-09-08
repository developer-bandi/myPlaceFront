import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

export interface SideBarFoldState {
  desktop: {search: boolean; storeInfo: boolean};
  mobile: {searchStoreInfo: boolean};
}

const initialState: SideBarFoldState = {
  desktop: {search: false, storeInfo: false},
  mobile: {searchStoreInfo: true},
};

const sideBarFoldSlice = createSlice({
  name: "sideBarFold",
  initialState,

  reducers: {
    setDesktopSearch(state) {
      state.desktop.search = !state.desktop.search;
    },
    setDesktopStoreInfo(state, action: PayloadAction<boolean>) {
      state.desktop.storeInfo = action.payload;
    },
    setMobileSearchStoreInfo(state) {
      state.mobile.searchStoreInfo = !state.mobile.searchStoreInfo;
    },
  },

  extraReducers: {
    [HYDRATE]: (state) => {
      return state;
    },
  },
});

export const {setDesktopSearch, setDesktopStoreInfo, setMobileSearchStoreInfo} =
  sideBarFoldSlice.actions;

export default sideBarFoldSlice.reducer;
