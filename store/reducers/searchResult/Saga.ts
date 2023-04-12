import { all, call, put, takeLeading } from "redux-saga/effects";
import { searchStoreFailure, searchStoreSuccess } from "./Reducer";
import { hashtagSearch, nameSearch } from "../../../api/search";
import { store } from "../../../type/search";

function* searchResultSagaCallback(action: {
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
    const searchResult: { data: store[] } =
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
    console.log(searchResult);
    yield put(searchStoreSuccess(searchResult.data));
  } catch (err) {
    console.log(err);
    yield put(searchStoreFailure());
  }
}

export function* searchResultSaga() {
  yield all([
    takeLeading("searchResult/searchStore", searchResultSagaCallback),
  ]);
}
