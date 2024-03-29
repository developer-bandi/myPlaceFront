import { combineReducers } from "@reduxjs/toolkit";
import { all, fork } from "redux-saga/effects";
import hashtagAllReducer from "./hashtagAll/Reducer";
import searchConditionReducer from "./searchCondition/Reducer";
import userLoginReducer from "./userLogin/Reducer";
import searchResultReducer from "./searchResult/Reducer";
import { hashtagAllSaga } from "./hashtagAll/Saga";
import { userLoginSaga, userLogoutSaga } from "./userLogin/Saga";
import { searchResultSaga } from "./searchResult/Saga";
import { storeInfoSaga } from "./storeInfo/Saga";
import storeInfoReducer from "./storeInfo/Reducer";
import AddStorePositionReducer from "./AddStorePosition/Reducer";
import SearchTypeReducer from "./searhType/Reducer";
import modalStatusReducer from "./modalStatus/Reducer";
import searchModalReducer from "./sideBarFold/Reducer";
import standardMarkerReducer from "./standardMarker/Reducer";
import postDetailReducer from "./postDetail/Reducer";
import {
  watchDeleteCommentSaga,
  watchDeletePostSaga,
  watchGetPostDetail,
  watchPostCommentSaga,
  watchUpdateLikeCountSaga,
} from "./postDetail/Saga";

export const rootReducer = combineReducers({
  hashtagAll: hashtagAllReducer,
  searchCondition: searchConditionReducer,
  userLogin: userLoginReducer,
  searchResult: searchResultReducer,
  storeInfo: storeInfoReducer,
  addStorePosition: AddStorePositionReducer,
  searchType: SearchTypeReducer,
  modalStatus: modalStatusReducer,
  searchModal: searchModalReducer,
  standardMarker: standardMarkerReducer,
  postDetail: postDetailReducer,
});

export function* rootSaga() {
  yield all([
    fork(hashtagAllSaga),
    fork(userLoginSaga),
    fork(userLogoutSaga),
    fork(searchResultSaga),
    fork(storeInfoSaga),
    fork(watchGetPostDetail),
    fork(watchUpdateLikeCountSaga),
    fork(watchPostCommentSaga),
    fork(watchDeleteCommentSaga),
    fork(watchDeletePostSaga),
  ]);
}
