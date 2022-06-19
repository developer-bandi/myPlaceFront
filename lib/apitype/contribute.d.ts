export interface ReviewType {
  id: number;
  content: string;
  storeInfo: {
    name: string;
    category: string;
  };
  Hashtags: string[];
  photo: string[];
}
