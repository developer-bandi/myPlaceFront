export type store = {
  id: number;
  name: string;
  category: string;
  latitude: string;
  longitude: string;
  dist: number | null;
  hashtag: { [index: string]: number };
};

export type storeDetail = {
  bookmark: boolean;
  storeInfo: {
    id: number;
    name: string;
    tel: string;
    openingHours: string;
    address: string;
    category: string;
    updatedAt: string;
    latitude: string;
    longitude: string;
  };
  Reviews: {
    content: string;
    user: string;
    date: string;
    Hashtags: string[];
    photos: string[];
  }[];
  hashtags: { [index: string]: number };
  mainPhoto: string;
  Menus: string[];
};

export type hashtagSearchRes = store[];

export type nameSearchRes = store[];

export type getStoreDetailInfoRes = storeDetail;

export type addBookMarkRes = string;

export type deleteBookMarkRes = string;
