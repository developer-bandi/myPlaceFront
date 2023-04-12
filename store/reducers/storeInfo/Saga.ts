import { all, call, put, takeLeading } from "redux-saga/effects";
import { getStoreInfoSuccess, getStoreInfoFailure } from "./Reducer";
import { setDesktopStoreInfo } from "../sideBarFold/Reducer";
import { getStoreDetailInfo } from "../../../api/search";
import { getStoreDetailInfoRes } from "../../../type/search";

function* axiosApi(action: { type: string; payload: number }) {
  try {
    yield put(setDesktopStoreInfo(true));
    const searchResult: { data: getStoreDetailInfoRes } = yield call(
      getStoreDetailInfo,
      action.payload
    );
    yield put(getStoreInfoSuccess(searchResult.data));
  } catch (err) {
    yield put(getStoreInfoFailure());
  }
}

export function* storeInfoSaga() {
  yield all([takeLeading("storeInfo/getStoreInfo", axiosApi)]);
}
