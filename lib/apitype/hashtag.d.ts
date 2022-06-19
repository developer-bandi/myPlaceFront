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

  카페: { subject: string; name: string; viewCount: number }[];
  식당: { subject: string; name: string; viewCount: number }[];
  주점: { subject: string; name: string; viewCount: number }[];
}
