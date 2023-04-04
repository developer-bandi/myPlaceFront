import axiosInstance from "./core";

axiosInstance.defaults.baseURL += "mypage/";

const mypageApi = {
  getMyBookMark: (page: number) => axiosInstance.get(`bookmark?page=${page}`),
  getMyReviews: (page: number) => axiosInstance.get(`reviews?page=${page}`),
  deleteMyReview: (id: string) =>
    axiosInstance.delete("review", { data: { id } }),
  getMyReview: (id: string) => axiosInstance.get(`review?id=${id}`),
  getMyPost: (page: number) => axiosInstance.get(`post?page=${page}`),
  getMyComment: (page: number) => axiosInstance.get(`comment?page=${page}`),
  getMyInfo: () => axiosInstance.get("info"),
  patchMyNickname: (nickname: string) =>
    axiosInstance.patch("nickname", {
      nickname,
    }),
};

export default mypageApi;
