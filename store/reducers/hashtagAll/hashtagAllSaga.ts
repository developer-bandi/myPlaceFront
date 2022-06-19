import { all, call, put, takeLeading } from "redux-saga/effects";
import { axiosGetHashTags } from "../../../lib/commonFn/api";
import { HashTagType } from "../../../lib/apitype/hashtag";
import {
  getHashtagAllFailure,
  getHashtagAllSuccess,
} from "./hashtagAllReducer";

function* axiosApi() {
  try {
    const hashtagDatas: { data: HashTagType[] } = yield call(axiosGetHashTags);
    yield put(getHashtagAllSuccess(hashtagDatas.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getHashtagAllFailure(error.message));
    } else {
      yield put(getHashtagAllFailure("알수 없는 에러가 발생하였습니다"));
    }
  }
}

export function* hashtagAllSaga() {
  yield all([takeLeading("hashtag/getHashtagAll", axiosApi)]);
}
