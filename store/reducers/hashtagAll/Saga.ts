import { all, call, put, takeLeading } from "redux-saga/effects";
import { axiosGetHashTags } from "../../../lib/commonFn/api";
import { HashTagType } from "../../../lib/apitype/hashtag";
import { getHashtagAllFailure, getHashtagAllSuccess } from "./Reducer";

function* axiosApi() {
  try {
    const hashtagDatas: { data: HashTagType[] } = yield call(axiosGetHashTags);
    yield put(getHashtagAllSuccess(hashtagDatas.data));
  } catch (error) {
    yield put(getHashtagAllFailure());
  }
}

export function* hashtagAllSaga() {
  yield all([takeLeading("hashtagAll/getHashtagAll", axiosApi)]);
}
