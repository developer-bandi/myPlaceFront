import {
  all,
  call,
  delay,
  put,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import {
  axiosDeleteComment,
  axiosDeletelikecount,
  axiosDeletePostDetail,
  axiosGetPostDetail,
  axiosPostComment,
  axiosPostlikecount,
} from "../../../lib/commonFn/api";
import {
  requestFailure,
  getPostSuccess,
  upLikeCount,
  downLikeCount,
  postCommentSuccess,
  deleteCommentSuccess,
  deletePostSuccess,
} from "./Reducer";
import {
  postDetailCommentType,
  postDetailType,
} from "../../../lib/apitype/post";
import { NextRouter } from "next/router";

function* getPostSaga(action: { type: string; payload: string }) {
  try {
    const response: { data: postDetailType } = yield call(
      axiosGetPostDetail,
      action.payload
    );
    yield put(getPostSuccess(response.data));
  } catch (error) {
    yield put(requestFailure());
  }
}

function* updateLikeCountSaga(action: {
  type: string;
  payload: {
    postId: string;
    userId: number;
    type: string;
    serverLike: number[];
  };
}) {
  if (action.payload.type === "down") {
    yield put(upLikeCount(action.payload.userId));
  } else {
    yield put(downLikeCount(action.payload.userId));
  }
  yield delay(500);
  try {
    if (action.payload.type === "down") {
      if (action.payload.serverLike.indexOf(action.payload.userId) !== -1) {
        yield call(axiosPostlikecount, action.payload.postId);
      }
    }
    if (action.payload.type === "up") {
      if (action.payload.serverLike.indexOf(action.payload.userId) === -1) {
        yield call(axiosDeletelikecount, action.payload.postId);
      }
    }
  } catch (error) {
    if (action.payload.type === "up") {
      yield put(upLikeCount(action.payload.userId));
    }
    if (action.payload.type === "down") {
      yield put(downLikeCount(action.payload.userId));
    }
    yield put(requestFailure());
  }
}

function* postCommentSaga(action: {
  type: string;
  payload: { content: string; id: number };
}) {
  try {
    action.type;
    const response: { data: postDetailCommentType } = yield call(
      axiosPostComment,
      action.payload.id,
      action.payload.content
    );
    yield put(postCommentSuccess(response.data));
  } catch (error) {
    yield put(requestFailure());
  }
}

function* deleteCommentSaga(action: {
  type: string;
  payload: { commentId: number; userId: number };
}) {
  try {
    yield call(
      axiosDeleteComment,
      action.payload.commentId,
      action.payload.userId
    );
    yield put(deleteCommentSuccess(action.payload.commentId));
  } catch (error) {
    yield put(requestFailure());
  }
}

function* deletePostSaga(action: {
  type: string;
  payload: { postId: number; userId: number; router: NextRouter };
}) {
  try {
    yield call(
      axiosDeletePostDetail,
      action.payload.postId,
      action.payload.userId
    );
    yield action.payload.router.push("/community/postlist");
    yield put(deletePostSuccess());
  } catch (error) {
    yield put(requestFailure());
  }
}

export function* watchGetPostDetail() {
  yield all([takeLeading("postDetail/getPost", getPostSaga)]);
}

export function* watchUpdateLikeCountSaga() {
  yield all([takeLatest("postDetail/updateLikeCount", updateLikeCountSaga)]);
}

export function* watchPostCommentSaga() {
  yield all([takeLeading("postDetail/postComment", postCommentSaga)]);
}

export function* watchDeleteCommentSaga() {
  yield all([takeLeading("postDetail/deleteComment", deleteCommentSaga)]);
}

export function* watchDeletePostSaga() {
  yield all([takeLeading("postDetail/deleteComment", deletePostSaga)]);
}
