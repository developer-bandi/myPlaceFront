import {
  addReviewRes,
  addStoreRes,
  updateReviewRes,
  updateStoreDetailRes,
  updateStorePositionRes,
} from "../type/contribute";
import axiosInstance from "./core";
import makeForm from "./lib/makeForm";

interface reviewInfo {
  [key: string]: unknown;
  StoreId: number;
  content: string;
  hashtags: number[];
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
  id: number;
  deletedImg: string[];
}

export const addReview = (reviewInfo: reviewInfo) => {
  return axiosInstance.post<addReviewRes>(
    "contribute/writereview",
    makeForm(reviewInfo),
    {
      headers: { "Content-Type": `multipart/form-data` },
    }
  );
};

export const addStore = (storeInfo: addStore) => {
  return axiosInstance.post<addStoreRes>(
    "contribute/writestore",
    makeForm(storeInfo),
    {
      headers: { "Content-Type": `multipart/form-data` },
    }
  );
};

export const updateReview = (updateReviewInfo: updateReviewInfo) => {
  return axiosInstance.patch<updateReviewRes>(
    "contribute/review",
    makeForm(updateReviewInfo),
    {
      headers: { "Content-Type": `multipart/form-data` },
    }
  );
};

export const updateStorePosition = (storePosition: storePositionUpdate) => {
  return axiosInstance.patch<updateStorePositionRes>(
    "contribute/storeposition",
    makeForm(storePosition),
    {
      headers: { "Content-Type": `multipart/form-data` },
    }
  );
};

export const updateStoreDetail = (storeDetail: storeDetailUpdate) => {
  return axiosInstance.patch<updateStoreDetailRes>(
    "contribute/storeinfo",
    makeForm(storeDetail),
    {
      headers: { "Content-Type": `multipart/form-data` },
    }
  );
};
