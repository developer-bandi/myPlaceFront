import { all, call, put, takeLeading } from "redux-saga/effects";
import { axiosCheckSignin, axiosLogout } from "../../../lib/commonFn/api";
import { LoginCheckType } from "../../../lib/apitype/auth";

import {
  checkSigninSuccess,
  checkSigninFailure,
  logoutSuccess,
  logoutFailure,
} from "./userLoginReducer";

function* axiosApi1(action: {
  type: string;
  payload: { localId: string; password: string };
}) {
  try {
    const loginedUser: { data: LoginCheckType; status: number } = yield call(
      axiosCheckSignin
    );
    yield put(checkSigninSuccess(loginedUser));
  } catch (err) {
    if (err instanceof Error) {
      yield put(checkSigninFailure(err.message));
    } else {
      yield put(checkSigninFailure("Something went wrong!"));
    }
  }
}

export function* userLoginSaga() {
  yield all([takeLeading("userLogin/checkSignin", axiosApi1)]);
}

function* axiosApi2(action: {
  type: string;
  payload: { localId: string; password: string };
}) {
  try {
    yield call(axiosLogout);
    yield put(logoutSuccess());
  } catch (err) {
    if (err instanceof Error) {
      yield put(logoutFailure(err.message));
    } else {
      yield put(logoutFailure("Something went wrong!"));
    }
  }
}

export function* userLogoutSaga() {
  yield all([takeLeading("userLogin/logout", axiosApi2)]);
}
