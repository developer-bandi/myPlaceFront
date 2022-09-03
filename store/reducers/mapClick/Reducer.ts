import {createSlice} from "@reduxjs/toolkit";
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
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return state;
    },
  },
});

export const {setActive} = mapClickSlice.actions;

export default mapClickSlice.reducer;
