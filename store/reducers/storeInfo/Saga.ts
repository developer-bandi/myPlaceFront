import { all, call, put, takeLeading } from "redux-saga/effects";
import { storeInfoType } from "../../../lib/apitype/search";
import { getStoreInfoSuccess, getStoreInfoFailure } from "./Reducer";
import { setDesktopStoreInfo } from "../sideBarFold/Reducer";
import { getStoreDetailInfo } from "../../../api/search";

function* axiosApi(action: { type: string; payload: number }) {
  try {
    yield put(setDesktopStoreInfo(true));
    const searchResult: { data: storeInfoType } = yield call(
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
