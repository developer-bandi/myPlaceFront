import { combineReducers } from "@reduxjs/toolkit";
import { all, fork } from "redux-saga/effects";
import hashtagRankReducer from "./hashtagRank/hashtagRankReducer";
import hashtagAllReducer from "./hashtagAll/hashtagAllReducer";
import hashtagSearchConditionReducer from "./hashtagSearchCondition/hashtagSearchConditionReducer";
import userLoginReducer from "./userLogin/userLoginReducer";
import searchResultReducer from "./searchResult/searchResultReducer";
import { hashtagAllSaga } from "./hashtagAll/hashtagAllSaga";
import { hashtagRankSaga } from "./hashtagRank/hashtagRankSaga";
import { userLoginSaga, userLogoutSaga } from "./userLogin/userLoginSaga";
import { searchResultSaga } from "./searchResult/searchResultSaga";
import { storeInfoSaga } from "./storeInfo/storeInfoSaga";
import storeInfoReducer from "./storeInfo/storeInfoReducer";
import AddStorePositionReducer from "./AddStoreAdress/AddStorePositionReducer";
import SearchTypeReducer from "./SetSearhType/SearchTypeReducer";

export const rootReducer = combineReducers({
  hashtagRank: hashtagRankReducer,
  hashtagAll: hashtagAllReducer,
  hashtagSearchCondition: hashtagSearchConditionReducer,
  userLogin: userLoginReducer,
  SearchResult: searchResultReducer,
  storeInfo: storeInfoReducer,
  addStorePosition: AddStorePositionReducer,
  SearchType: SearchTypeReducer,
});

export function* rootSaga() {
  yield all([
    fork(hashtagAllSaga),
    fork(hashtagRankSaga),
    fork(userLoginSaga),
    fork(userLogoutSaga),
    fork(searchResultSaga),
    fork(storeInfoSaga),
  ]);
}
