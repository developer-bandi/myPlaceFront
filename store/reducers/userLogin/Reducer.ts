import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { LoginCheckType } from "../../../lib/apitype/auth";

export interface userLoginContent {
  id: number;
  nickname: string;
}

export interface signupState {
  content?: { id: number; nickname: string };
  loading: boolean;
  error: boolean;
}

const initialState: signupState = {
  loading: true,
  error: false,
};

const UserLoginSlice = createSlice({
  name: "userLogin",
  initialState,

  reducers: {
    checkSignin() {},

    checkSigninSuccess(
      state,
      action: PayloadAction<{ data: LoginCheckType; status: number }>
    ) {
      state.loading = false;
      if (action.payload.status === 200) {
        state.content = action.payload.data;
      }
    },

    checkSigninFailure(state) {
      state.loading = false;
      state.error = true;
    },

    logout(state) {
      state.loading = true;
    },

    logoutSuccess(state) {
      state.loading = false;
      state.content = undefined;
    },

    logoutFailure(state) {
      state.loading = false;
      state.error = true;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return state;
    },
  },
});

export const {
  checkSignin,
  checkSigninSuccess,
  checkSigninFailure,
  logout,
  logoutSuccess,
  logoutFailure,
} = UserLoginSlice.actions;

export default UserLoginSlice.reducer;
