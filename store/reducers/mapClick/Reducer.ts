import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

export interface mapClickState {
  active: boolean;
}

const initialState: mapClickState = {
  active: true,
};

const mapClickSlice = createSlice({
  name: "mapClick",
  initialState,

  reducers: {
    setActive(state) {
      state.active = !state.active;
    },
    setTrue(state) {
      state.active = true;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return state;
    },
  },
});

export const {setActive, setTrue} = mapClickSlice.actions;

export default mapClickSlice.reducer;
