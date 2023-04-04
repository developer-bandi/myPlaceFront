import axiosInstance from "./core";

axiosInstance.defaults.baseURL += "search/";

interface searchCondition {
  latitude: string;
  longitude: string;
  selectedHashtag: string[];
}

const searchApi = {
  hashtagSearch: (searchCondition: searchCondition) =>
    axiosInstance.post("hashtagsearch", searchCondition),
  nameSearch: (searchCondition: searchCondition) =>
    axiosInstance.post("namesearch", searchCondition),
  getRecentReview: (storeId: string) =>
    axiosInstance.post("storeInfo", { storeId }),
  addBookMark: (StoreId: string) => axiosInstance.post("bookmark", { StoreId }),
  deleteBookMark: (StoreId: string) =>
    axiosInstance.delete("bookmark", { data: { StoreId } }),
};

export default searchApi;
