import {
  all,
  call,
  delay,
  put,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import {
  requestFailure,
  getPostSuccess,
  upLikeCount,
  downLikeCount,
  postCommentSuccess,
  deleteCommentSuccess,
  deletePostSuccess,
  upServerLikeCount,
  downServerLikeCount,
} from "./Reducer";
import { NextRouter } from "next/router";
import {
  addComment,
  deletePostDetail,
  getPostDetail,
  deleteComment,
  addLikecount,
  deleteLikecount,
} from "../../../api/post";
import { AxiosResponse } from "axios";
import { addCommentRes, getPostDetailRes } from "../../../type/post";

function* getPostSaga(action: { type: string; payload: string }) {
  try {
    const { data }: AxiosResponse<getPostDetailRes> = yield call(
      getPostDetail,
      action.payload
    );
    yield put(getPostSuccess(data));
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
    yield console.log(action.payload);
    if (action.payload.type === "down") {
      if (action.payload.serverLike.indexOf(action.payload.userId) === -1) {
        yield call(addLikecount, action.payload.postId);
        yield put(upServerLikeCount(action.payload.userId));
      }
    }
    if (action.payload.type === "up") {
      if (action.payload.serverLike.indexOf(action.payload.userId) !== -1) {
        yield call(deleteLikecount, action.payload.postId);
        yield put(downServerLikeCount(action.payload.userId));
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
    const response: { data: addCommentRes } = yield call(addComment, {
      PostId: action.payload.id,
      content: action.payload.content,
    });
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
    yield call(deleteComment, {
      CommentId: action.payload.commentId,
      UserId: action.payload.userId,
    });
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
    yield call(deletePostDetail, {
      PostId: action.payload.postId,
      UserId: action.payload.userId,
    });
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
