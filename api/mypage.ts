import {
  deleteMyReviewRes,
  getMyBookMarkRes,
  getMyCommentRes,
  getMyInfoRes,
  getMyPostRes,
  getMyReviewRes,
  getMyReviewsRes,
  updateMyNicknameRes,
} from "../type/mypage";
import axiosInstance from "./core";

export const getMyBookMark = (page: number) =>
  axiosInstance.get<getMyBookMarkRes>(`mypage/bookmark?page=${page}`);

export const getMyReviews = (page: number) =>
  axiosInstance.get<getMyReviewsRes>(`mypage/reviews?page=${page}`);

export const deleteMyReview = (id: string) =>
  axiosInstance.delete<deleteMyReviewRes>("mypage/review", { data: { id } });

export const getMyReview = (id: string) =>
  axiosInstance.get<getMyReviewRes>(`mypage/review?id=${id}`);

export const getMyPost = (page: number) =>
  axiosInstance.get<getMyPostRes>(`mypage/post?page=${page}`);

export const getMyComment = (page: number) =>
  axiosInstance.get<getMyCommentRes>(`mypage/comment?page=${page}`);

export const getMyInfo = () => axiosInstance.get<getMyInfoRes>("mypage/info");

export const updateMyNickname = (nickname: string) =>
  axiosInstance.patch<updateMyNicknameRes>("mypage/nickname", {
    nickname,
  });
