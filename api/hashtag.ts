import axiosInstance from "./core";

axiosInstance.defaults.baseURL += "hashtag/";

const hashtagApi = {
  getHashTag: () => axiosInstance.get(""),
  getHashTagRank: () => axiosInstance.get("rank"),
};

export default hashtagApi;
