import { pagenationList } from "./common";

interface user {
  id: number;
  nickname: string;
}

export interface post {
  id: number;
  title: string;
  content: string;
  viewCount: number;
  createdAt: string;
  nickname: string;
  comment: number;
  postlikecount: number;
}

interface comment {
  id: number;
  content: string;
  createdAt: string;
  User: user;
}

interface postDetail
  extends Omit<post, "comment" | "postlikecount" | "nickname"> {
  Comments: comment[];
  Photos: string[];
  likelist: number[];
  User: user;
}

export type getPostListRes = pagenationList<post>;

export type getSearchPostListRes = pagenationList<post>;

export type getPostDetailRes = postDetail;

export type addPostDetailRes = string;

export type deletePostDetailRes = string;

export type addCommentRes = comment;

export type deleteCommentRes = string;

export type addLikecountRes = string;

export type deleteLikecountRes = string;
