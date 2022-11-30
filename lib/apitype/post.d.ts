export interface postListType {
  count: number;
  postList: {
    id: number;
    title: string;
    content: string;
    viewCount: number;
    likelist: number[];
    createdAt: string;
    updatedAt: string;
    UserId: number;
    User: {
      nickname: string;
      id: number;
    };
    Comments: number;
  }[];
}

export interface postDetailCommentType {
  PostId: number;
  User: {
    id: number;
    nickname: string;
  };
  UserId: number;
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}

export interface postDetailType {
  Comments: postDetailCommentType[];
  Photos: {
    filename: string;
  }[];
  User: { id: number; nickname: string };
  UserId: number;
  content: string;
  createdAt: string;
  id: string;
  likelist: number[];
  title: string;
  updatedAt: string;
  viewCount: number;
}

export interface postListDataFormType {
  content?: postListType;
  loading: boolean;
  error: boolean;
}
