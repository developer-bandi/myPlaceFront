import { all, call, put, takeLeading } from "redux-saga/effects";
import { axiosHashtagSearch, axiosNameSearch } from "../../../lib/commonFn/api";
import { SearchResultType } from "../../../lib/apitype/search";
import { searchStoreFailure, searchStoreSuccess } from "./Reducer";

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
    yield put(searchStoreFailure());
  }
}

export function* searchResultSaga() {
  yield all([takeLeading("searchResult/searchStore", axiosApi)]);
}
