import { AxiosResponse } from "axios";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { axiosHashtagSearch, axiosNameSearch } from "../../../lib/commonFn/api";
import { SearchResultType, storeInfoType } from "../../../lib/apitype/search";
import { searchStoreFailure, searchStoreSuccess } from "./searchResultReducer";

function* axiosApi(action: {
  type: string;
  payload: {
    latitude: string;
    longitude: string;
    selectedHashtag?: string[];
    searchKeyword?: string;
  };
}) {
  try {
    const { latitude, longitude } = action.payload;
    const searchResult: { data: SearchResultType[] } =
      action.payload.selectedHashtag !== undefined
        ? yield call(
            axiosHashtagSearch,
            latitude,
            longitude,
            action.payload.selectedHashtag
          )
        : yield call(
            axiosNameSearch,
            latitude,
            longitude,
            action.payload.searchKeyword as string
          );

    yield put(searchStoreSuccess(searchResult.data));
  } catch (err) {
    if (err instanceof Error) {
      yield put(searchStoreFailure(err.message));
    } else {
      yield put(searchStoreFailure("알수 없는 에러가 발생하였습니다"));
    }
  }
}

export function* searchResultSaga() {
  yield all([takeLeading("SearchResult/searchStore", axiosApi)]);
}
