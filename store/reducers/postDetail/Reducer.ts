import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { NextRouter } from "next/router";
import {
  postDetailCommentType,
  postDetailType,
} from "../../../lib/apitype/post";

export interface HashtagAllState {
  content?: postDetailType;
  serverLike?: number[];
  loading: boolean;
  error: boolean;
}

const initialState: HashtagAllState = {
  loading: false,
  error: false,
};

const postDetailSlice = createSlice({
  name: "postDetail",
  initialState,
  reducers: {
    getPost(state, action: PayloadAction<string>) {
      state.loading = true;
    },

    getPostSuccess(state, action: PayloadAction<postDetailType>) {
      state.content = action.payload;
      state.serverLike = action.payload.likelist;
    },

    updateLikeCount(
      state,
      action: PayloadAction<{
        postId: string;
        userId: number;
        type: string;
        serverLike: number[];
      }>
    ) {},

    upLikeCount(state, action: PayloadAction<number>) {
      if (state.content !== undefined)
        state.content.likelist.push(action.payload);
    },

    downLikeCount(state, action: PayloadAction<number>) {
      if (state.content !== undefined) {
        state.content.likelist = state.content.likelist.filter(
          (id: number) => !(id === action.payload)
        );
      }
    },

    postComment(
      state,
      action: PayloadAction<{ id: string; content: string }>
    ) {},

    postCommentSuccess(state, action: PayloadAction<postDetailCommentType>) {
      state.content?.Comments.push(action.payload);
    },

    deleteComment(
      state,
      action: PayloadAction<{ commentId: number; userId: number }>
    ) {},

    deleteCommentSuccess(state, action: PayloadAction<number>) {
      if (state.content !== undefined) {
        state.content.Comments = state.content?.Comments.filter(
          (data) => data.id == action.payload
        );
      }
    },

    deletePost(
      state,
      action: PayloadAction<{
        postId: string;
        userId: number;
        router: NextRouter;
      }>
    ) {},

    deletePostSuccess(state) {
      state.content = undefined;
    },

    requestFailure(state) {
      state.error = true;
      state.loading = false;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      const serverData = action.payload.postDetail;
      if (serverData.error || serverData.content === undefined) {
        return state;
      } else {
        return serverData;
      }
    },
  },
});

export const {
  getPost,
  getPostSuccess,
  updateLikeCount,
  upLikeCount,
  downLikeCount,
  postComment,
  postCommentSuccess,
  deleteComment,
  deleteCommentSuccess,
  deletePost,
  deletePostSuccess,
  requestFailure,
} = postDetailSlice.actions;

export default postDetailSlice.reducer;
