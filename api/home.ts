import axiosInstance from "./core";

axiosInstance.defaults.baseURL += "home/";

const homeApi = {
  getBanner: () => axiosInstance.get("banner"),
  getStoreRank: () => axiosInstance.get("store"),
  getRecentReview: (page: number) => axiosInstance.get(`review?page=${page}`),
};

export default homeApi;
