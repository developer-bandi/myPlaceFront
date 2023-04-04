import axiosInstance from "./core";
import makeForm from "./lib/makeForm";

axiosInstance.defaults.baseURL += "post/";

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
  CommentId: number;
  UserId: number;
}

interface addPostInfo {
  [key: string]: unknown;
  title: string;
  content: string;
  imgs: Blob[];
}

const postApi = {
  getPostList: ({ page, order }: postListCondition) =>
    axiosInstance.get(`list?page=${page}&order=${order}`),
  getSearchPostList: ({ keyword, page, order }: searchPostListCondition) =>
    axiosInstance.get(`search?keyword=${keyword}&page=${page}&order=${order}`),
  getPostDetail: (id: string) => axiosInstance.get(`detail?id=${id}`),
  addComment: (commentInfo: addCommentInfo) =>
    axiosInstance.post("comment", commentInfo),
  deleteComment: (commentInfo: deleteCommentInfo) =>
    axiosInstance.delete("comment", {
      data: commentInfo,
    }),
  addLikecount: (PostId: string) =>
    axiosInstance.post("likecount", {
      PostId,
    }),
  deleteLikecount: (PostId: string) =>
    axiosInstance.post("likecount", {
      data: {
        PostId,
      },
    }),
  addPostDetail: (info: addPostInfo) =>
    axiosInstance.post("detail", makeForm(info)),
  deletePostDetail: (postInfo: deletePostInfo) =>
    axiosInstance.delete("detail", {
      data: postInfo,
    }),
};

export default postApi;
