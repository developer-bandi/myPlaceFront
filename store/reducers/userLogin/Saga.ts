import { all, call, put, takeLeading } from "redux-saga/effects";
import {
  checkSigninSuccess,
  checkSigninFailure,
  logoutSuccess,
  logoutFailure,
  logout,
} from "./Reducer";

import {
  checkSignin as checkSigninApi,
  logout as logoutApi,
} from "../../../api/auth";
import { checkSigninRes } from "../../../type/auth";
import { AxiosResponse } from "axios";

function* loginCheckSaga() {
  try {
    const loginedUser: AxiosResponse<checkSigninRes> = yield call(
      checkSigninApi
    );
    yield put(checkSigninSuccess(loginedUser));
  } catch (err) {
    yield put(checkSigninFailure());
  }
}

export function* userLoginSaga() {
  yield all([takeLeading("userLogin/checkSignin", loginCheckSaga)]);
}

function* logoutSaga() {
  try {
    yield call(logoutApi);
    yield put(logoutSuccess());
  } catch (err) {
    yield put(logoutFailure());
  }
}

export function* userLogoutSaga() {
  yield all([takeLeading("userLogin/logout", logoutSaga)]);
}
