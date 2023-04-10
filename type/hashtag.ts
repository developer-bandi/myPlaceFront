interface HashTag {
  id: number;
  category: string;
  subject: string;
  name: string;
  viewCount: number;
}

export type getHashTagRes = HashTag[];
