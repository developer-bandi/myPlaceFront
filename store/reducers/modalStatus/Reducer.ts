import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

export interface modalStatusState {
  mypage: boolean;
  notice: boolean;
}

const initialState: modalStatusState = {
  mypage: false,
  notice: false,
};

const mypageModalSlice = createSlice({
  name: "modalStatus",
  initialState,

  reducers: {
    setMypage(state, action: PayloadAction<undefined | boolean>) {
      state.mypage =
        action.payload === undefined ? !state.mypage : action.payload;
    },

    setNotice(state, action: PayloadAction<undefined | boolean>) {
      state.notice =
        action.payload === undefined ? !state.notice : action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state) => {
      return state;
    },
  },
});

export const {setMypage, setNotice} = mypageModalSlice.actions;

export default mypageModalSlice.reducer;
