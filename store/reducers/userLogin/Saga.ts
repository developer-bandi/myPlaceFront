import { all, call, put, takeLeading } from "redux-saga/effects";
import { axiosCheckSignin, axiosLogout } from "../../../lib/commonFn/api";
import { LoginCheckType } from "../../../lib/apitype/auth";
import {
  checkSigninSuccess,
  checkSigninFailure,
  logoutSuccess,
  logoutFailure,
} from "./Reducer";

function* axiosApi1() {
  try {
    const loginedUser: { data: LoginCheckType; status: number } = yield call(
      axiosCheckSignin
    );
    yield put(checkSigninSuccess(loginedUser));
  } catch (err) {
    yield put(checkSigninFailure());
  }
}

export function* userLoginSaga() {
  yield all([takeLeading("userLogin/checkSignin", axiosApi1)]);
}

function* axiosApi2() {
  try {
    yield call(axiosLogout);
    yield put(logoutSuccess());
  } catch (err) {
    yield put(logoutFailure());
  }
}

export function* userLogoutSaga() {
  yield all([takeLeading("userLogin/logout", axiosApi2)]);
}
