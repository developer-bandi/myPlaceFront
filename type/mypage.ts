import { pagenationList } from "./common";

interface store {
  id: number;
  name: string;
  category: string;
  address: string;
  latitude: string;
  longitude: string;
  viewCount: number;
  photo: string;
  bookmark: number;
  review: number;
}

interface review {
  id: number;
  content: string;
  StoreName: string;
  Hashtags: [number, string][];
  photo: string[];
  createdAt: string;
}

interface reviewDetail
  extends Omit<review, "StoreName" | "Hashtags" | "createdAt"> {
  storeInfo: {
    name: string;
    category: string;
    address: string;
  };
  Hashtags: string[];
}

interface post {
  id: number;
  title: string;
  content: string;
  nickname: string;
  createdAt: string;
  viewCount: number;
  postlikecount: number;
  comment: number;
}

interface comment {
  id: number;
  content: string;
  createdAt: string;
  PostId: number;
  nickname: string;
}

interface userInfo {
  localId: string;
  nickname: string;
  provider: string;
  createdAt: string;
  email: string;
}

export type getMyBookMarkRes = pagenationList<store>;

export type getMyReviewsRes = pagenationList<review>;

export type deleteMyReviewRes = string;

export type getMyReviewRes = reviewDetail;

export type getMyPostRes = pagenationList<post>;

export type getMyCommentRes = pagenationList<comment>;

export type getMyInfoRes = userInfo;

export type updateMyNicknameRes = userInfo;
