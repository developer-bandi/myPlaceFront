import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { LoginCheckType } from "../../../lib/apitype/auth";

export interface signupState {
  loginStatus: boolean;
  userInfo: { id?: number; nickname?: string };
  loading: boolean;
  error: null | string;
}

const initialState: signupState = {
  loginStatus: false,
  userInfo: {},
  loading: true,
  error: null,
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
        state.loginStatus = true;
        state.userInfo.id = action.payload.data.id;
        state.userInfo.nickname = action.payload.data.nickname;
      }
    },

    checkSigninFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    logout(state) {
      state.loading = true;
    },

    logoutSuccess(state) {
      state.loading = false;
      state.loginStatus = false;
      state.userInfo = {};
    },

    logoutFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
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
