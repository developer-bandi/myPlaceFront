import {
  addCommentRes,
  addLikecountRes,
  addPostDetailRes,
  deleteCommentRes,
  deleteLikecountRes,
  deletePostDetailRes,
  getPostDetailRes,
  getPostListRes,
  getSearchPostListRes,
} from "../type/post";
import axiosInstance from "./core";
import makeForm from "./lib/makeForm";
interface postListCondition {
  page: number;
  order: string;
}
interface searchPostListCondition extends postListCondition {
  keyword: string;
}
interface addCommentInfo {
  PostId: number;
  content: string;
}
interface deleteCommentInfo {
  CommentId: number;
  UserId: number;
}
interface deletePostInfo {
  PostId: number;
  UserId: number;
}
interface addPostInfo {
  [key: string]: unknown;
  title: string;
  content: string;
  imgs: Blob[];
}

export const getPostList = ({ page, order }: postListCondition) =>
  axiosInstance.get<getPostListRes>(`post/list?page=${page}&order=${order}`);

export const getSearchPostList = ({
  keyword,
  page,
  order,
}: searchPostListCondition) =>
  axiosInstance.get<getSearchPostListRes>(
    `post/search?keyword=${keyword}&page=${page}&order=${order}`
  );

export const getPostDetail = (id: string) =>
  axiosInstance.get<getPostDetailRes>(`post/detail?id=${id}`);

export const addPostDetail = (info: addPostInfo) =>
  axiosInstance.post<addPostDetailRes>("post/detail", makeForm(info));

export const deletePostDetail = (postInfo: deletePostInfo) =>
  axiosInstance.delete<deletePostDetailRes>("post/detail", {
    data: postInfo,
  });

export const addComment = (commentInfo: addCommentInfo) =>
  axiosInstance.post<addCommentRes>("post/comment", commentInfo);

export const deleteComment = (commentInfo: deleteCommentInfo) =>
  axiosInstance.delete<deleteCommentRes>("post/comment", {
    data: commentInfo,
  });

export const addLikecount = (PostId: string) =>
  axiosInstance.post<addLikecountRes>("post/likecount", {
    PostId,
  });

export const deleteLikecount = (PostId: string) =>
  axiosInstance.delete<deleteLikecountRes>("post/likecount", {
    data: {
      PostId,
    },
  });
