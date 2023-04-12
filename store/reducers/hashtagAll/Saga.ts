import { all, call, put, takeLeading } from "redux-saga/effects";
import { getHashtagAllFailure, getHashtagAllSuccess } from "./Reducer";
import { getHashTag } from "../../../api/hashtag";
import { AxiosResponse } from "axios";
import { getHashTagRes } from "../../../type/hashtag";

function* hashtagAllSagaCallback() {
  try {
    const { data }: AxiosResponse<getHashTagRes> = yield call(getHashTag);
    yield put(getHashtagAllSuccess(data));
  } catch (error) {
    yield put(getHashtagAllFailure());
  }
}

export function* hashtagAllSaga() {
  yield all([takeLeading("hashtagAll/getHashtagAll", hashtagAllSagaCallback)]);
}
