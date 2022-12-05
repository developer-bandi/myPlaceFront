export interface storeInfoType {
  bookmark?: boolean;
  storeInfo?: {
    id: number;
    name: string;
    tel: null | string;
    openingHours: null | string;
    address: string;
    category: string;
    updatedAt: Date;
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
  hashtags?: {
    [index: string]: number;
  };
  Menus?: string[];
  mainPhoto?: string;
}

export interface SearchResultType {
  id: number;
  name: string;
  category: string;
  latitude: string;
  longitude: string;
  dist: number;
  hashtag: {
    [index: string]: number;
  };
}
