import { all, call, put, takeLeading } from "redux-saga/effects";
import { SearchResultType } from "../../../lib/apitype/search";
import { searchStoreFailure, searchStoreSuccess } from "./Reducer";
import { hashtagSearch, nameSearch } from "../../../api/search";

function* getSearchResult(action: {
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
        ? yield call(hashtagSearch, {
            latitude,
            longitude,
            selectedHashtag: action.payload.selectedHashtag,
          })
        : yield call(nameSearch, {
            latitude,
            longitude,
            searchKeyword: action.payload.searchKeyword as string,
          });

    yield put(searchStoreSuccess(searchResult.data));
  } catch (err) {
    yield put(searchStoreFailure());
  }
}

export function* searchResultSaga() {
  yield all([takeLeading("searchResult/searchStore", getSearchResult)]);
}
