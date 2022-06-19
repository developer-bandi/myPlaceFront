import { all, call, put, takeLeading } from "redux-saga/effects";
import { axiosGetHashTagRank } from "../../../lib/commonFn/api";
import { hashtagRankType } from "../../../lib/apitype/hashtag";
import {
  getHashtagRankFailure,
  getHashtagRankSuccess,
} from "./hashtagRankReducer";

function* axiosApi() {
  try {
    const hashtagRankData: { data: hashtagRankType } = yield call(
      axiosGetHashTagRank
    );
    yield put(getHashtagRankSuccess(hashtagRankData.data));
  } catch (err) {
    if (err instanceof Error) {
      yield put(getHashtagRankFailure(err.message));
    } else {
      yield put(getHashtagRankFailure("알수없는 에러가 발생했습니다"));
    }
  }
}

export function* hashtagRankSaga() {
  yield all([takeLeading("hashtagRank/getHashtagRank", axiosApi)]);
}
