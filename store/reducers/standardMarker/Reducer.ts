import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

export interface standardMarkerState {
  clickPossible: boolean;
  clicked: boolean;
}

const initialState: standardMarkerState = {
  clickPossible: true,
  clicked: false,
};

const mapClickSlice = createSlice({
  name: "standardMarker",
  initialState,

  reducers: {
    setClickPossible(state, action: PayloadAction<boolean>) {
      state.clickPossible = action.payload;
    },
    setClicked(state, action: PayloadAction<boolean>) {
      state.clicked = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return state;
    },
  },
});

export const {setClickPossible, setClicked} = mapClickSlice.actions;

export default mapClickSlice.reducer;
