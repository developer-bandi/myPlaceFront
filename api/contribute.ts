import axiosInstance from "./core";
import makeForm from "./lib/makeForm";

axiosInstance.defaults.baseURL += "contribute/";

interface reviewInfo {
  [key: string]: unknown;
  StoreId: number;
  content: string;
  hashtags: string[];
  imgs: Blob[];
}

interface updateReviewInfo {
  [key: string]: unknown;
  deleteHashtag: string[];
  addHashtag: string[];
  deleteImg: string[];
  imgs: Blob[];
  id: string;
  content: string;
}

interface storePosition {
  [key: string]: unknown;
  address: string;
  latitude: string;
  longitude: string;
}

interface storeDetail {
  [key: string]: unknown;
  name: string;
  tel?: string;
  openingHours?: string;
  category: string;
  mainImg: Blob[];
  menuImg: Blob[];
}

type addStore = storePosition & storeDetail;

interface storePositionUpdate extends storePosition {
  id: string;
}

interface storeDetailUpdate extends storeDetail {
  id: string;
  deletedImg: string[];
}

const contributeApi = {
  addReview: (reviewInfo: reviewInfo) => {
    return axiosInstance.post("writereview", makeForm(reviewInfo), {
      headers: { "Content-Type": `multipart/form-data` },
    });
  },
  addStore: (storeInfo: addStore) => {
    return axiosInstance.post("writestore", makeForm(storeInfo), {
      headers: { "Content-Type": `multipart/form-data` },
    });
  },
  updateReview: (reviewInfo: reviewInfo) => {
    return axiosInstance.patch("review", makeForm(reviewInfo), {
      headers: { "Content-Type": `multipart/form-data` },
    });
  },
  updateStorePosition: (storePosition: storePositionUpdate) => {
    return axiosInstance.patch("storeposition", makeForm(storePosition), {
      headers: { "Content-Type": `multipart/form-data` },
    });
  },
  updateStoreDetail: (storeDetail: storeDetailUpdate) => {
    return axiosInstance.patch("storeinfo", makeForm(storeDetail), {
      headers: { "Content-Type": `multipart/form-data` },
    });
  },
  axiosPatchMyReview: (reviewInfo: updateReviewInfo) => {
    return axiosInstance.patch("review", makeForm(reviewInfo), {
      headers: { "Content-Type": `multipart/form-data` },
    });
  },
};

export default contributeApi;
