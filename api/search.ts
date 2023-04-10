import {
  addBookMarkRes,
  deleteBookMarkRes,
  getStoreDetailInfoRes,
  hashtagSearchRes,
  nameSearchRes,
} from "../type/search";
import axiosInstance from "./core";

interface commonCondition {
  latitude: string;
  longitude: string;
}
interface hashtagSearchCondition extends commonCondition {
  selectedHashtag: string[];
}
interface nameSearchCondition extends commonCondition {
  searchKeyword: string;
}

export const hashtagSearch = (searchCondition: hashtagSearchCondition) =>
  axiosInstance.post<hashtagSearchRes>("search/hashtagsearch", searchCondition);

export const nameSearch = (searchCondition: nameSearchCondition) =>
  axiosInstance.post<nameSearchRes>("search/namesearch", searchCondition);

export const getStoreDetailInfo = (storeId: number) =>
  axiosInstance.post<getStoreDetailInfoRes>("search/storeInfo", { storeId });

export const addBookMark = (storeId: number) =>
  axiosInstance.post<addBookMarkRes>("search/bookmark", { storeId });

export const deleteBookMark = (storeId: number) =>
  axiosInstance.delete<deleteBookMarkRes>("search/bookmark", {
    data: { storeId },
  });
