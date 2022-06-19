import { AxiosResponse } from "axios";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { axiosStoreInfo } from "../../../lib/commonFn/api";
import { storeInfoType } from "../../../lib/apitype/search";
import { getStoreInfoSuccess, getStoreInfoFailure } from "./storeInfoReducer";

function* axiosApi(action: { type: string; payload: string }) {
  try {
    const searchResult: { data: storeInfoType } = yield call(
      axiosStoreInfo,
      action.payload
    );
    yield put(getStoreInfoSuccess(searchResult.data));
  } catch (err) {
    if (err instanceof Error) {
      yield put(getStoreInfoFailure(err.message));
    } else {
      yield put(getStoreInfoFailure("알수없는 에러가 발생하였습니다"));
    }
  }
}

export function* storeInfoSaga() {
  yield all([takeLeading("storeInfo/getStoreInfo", axiosApi)]);
}
