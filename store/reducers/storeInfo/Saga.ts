import {all, call, put, takeLeading} from "redux-saga/effects";
import {axiosStoreInfo} from "../../../lib/commonFn/api";
import {storeInfoType} from "../../../lib/apitype/search";
import {getStoreInfoSuccess, getStoreInfoFailure} from "./Reducer";
import {changeDesktopStoreInfoActive} from "../searchModal/Reducer";

function* axiosApi(action: {type: string; payload: string}) {
  try {
    yield put(changeDesktopStoreInfoActive(true));
    const searchResult: {data: storeInfoType} = yield call(
      axiosStoreInfo,
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
