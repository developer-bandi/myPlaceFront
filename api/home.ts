import {
  getBannerRes,
  getStorePopularRes,
  getReviewRecentRes,
} from "../type/home";
import axiosInstance from "./core";

export const getBanner = () => axiosInstance.get<getBannerRes>("home/banner");
export const getStorePopular = () =>
  axiosInstance.get<getStorePopularRes>("home/store");
export const getReviewRecent = (page: number) =>
  axiosInstance.get<getReviewRecentRes>(`home/review?page=${page}`);
