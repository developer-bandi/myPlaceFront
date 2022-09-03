import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

export interface mypageModalState {
  active: boolean;
}

const initialState: mypageModalState = {
  active: false,
};

const mypageModalSlice = createSlice({
  name: "mypageModal",
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

export const {setActive} = mypageModalSlice.actions;

export default mypageModalSlice.reducer;
