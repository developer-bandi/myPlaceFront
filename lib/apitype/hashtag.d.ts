export interface HashTagType {
  [index: string]: string | number;
  category: string;
  subject: string;
  name: string;
  id: number;
  viewCount: number;
}

export interface hashtagRankType {
  [index: string]: { subject: string; name: string; viewCount: number }[];

  cafe: { subject: string; name: string; viewCount: number }[];
  restaurant: { subject: string; name: string; viewCount: number }[];
  pub: { subject: string; name: string; viewCount: number }[];
}
