import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { HYDRATE } from "next-redux-wrapper";
import { checkSigninRes } from "../../../type/auth";

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
  loading: false,
  error: false,
};

const UserLoginSlice = createSlice({
  name: "userLogin",
  initialState,

  reducers: {
    checkSignin(state) {
      state.loading = true;
    },

    checkSigninSuccess(
      state,
      action: PayloadAction<AxiosResponse<checkSigninRes>>
    ) {
      state.loading = false;
      if (
        action.payload.status === 200 &&
        typeof action.payload.data !== "string"
      ) {
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
    [HYDRATE]: (state) => {
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
