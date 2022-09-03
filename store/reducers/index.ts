import {combineReducers} from "@reduxjs/toolkit";
import {all, fork} from "redux-saga/effects";
import hashtagAllReducer from "./hashtagAll/Reducer";
import hashtagSearchConditionReducer from "./hashtagSearchCondition/Reducer";
import userLoginReducer from "./userLogin/Reducer";
import searchResultReducer from "./searchResult/Reducer";
import {hashtagAllSaga} from "./hashtagAll/Saga";
import {userLoginSaga, userLogoutSaga} from "./userLogin/Saga";
import {searchResultSaga} from "./searchResult/Saga";
import {storeInfoSaga} from "./storeInfo/Saga";
import storeInfoReducer from "./storeInfo/Reducer";
import AddStorePositionReducer from "./AddStorePosition/Reducer";
import SearchTypeReducer from "./searhType/Reducer";
import mypageModalReducer from "./mypageModal/Reducer";
import searchModalReducer from "./searchModal/Reducer";
import mapClickReducer from "./mapClick/Reducer";

export const rootReducer = combineReducers({
  hashtagAll: hashtagAllReducer,
  hashtagSearchCondition: hashtagSearchConditionReducer,
  userLogin: userLoginReducer,
  searchResult: searchResultReducer,
  storeInfo: storeInfoReducer,
  addStorePosition: AddStorePositionReducer,
  searchType: SearchTypeReducer,
  mypageModal: mypageModalReducer,
  searchModal: searchModalReducer,
  mapClick: mapClickReducer,
});

export function* rootSaga() {
  yield all([
    fork(hashtagAllSaga),
    fork(userLoginSaga),
    fork(userLogoutSaga),
    fork(searchResultSaga),
    fork(storeInfoSaga),
  ]);
}
