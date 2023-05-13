import { pagenationList } from "./common";

interface banner {
  backgroundColor: string;
  title: string;
  summary: string;
  router: string;
  img: string;
}

interface storePopular {
  id: number;
  name: string;
  address: string;
  viewCount: number;
  photo: string;
  bookmark: number;
  review: number;
  latitude: string;
  longitude: string;
}

export interface reviewRecent {
  id: number;
  content: string;
  createdAt: string;
  storeName: string;
  storeAddress: string;
  storeLatitude: string;
  storeLongitude: string;
  nickname: string;
  hashtag: string[];
}

export type getBannerRes = banner[];

export type getStorePopularRes = storePopular[];

export type getReviewRecentRes = pagenationList<reviewRecent>;
