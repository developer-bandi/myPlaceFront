import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {axiosGetMyPost} from "../../../../lib/commonFn/api";

export interface postListcontent {
  id: number;
  title: string;
  content: string;
  nickname: string;
  createdAt: string;
  viewCount: number;
  postlikecount: number;
  comment: number;
}

export interface postListState {
  content?: {count: number; rows: postListcontent[]};
  loading: boolean;
  error: boolean;
}

const useMyPost = () => {
  const router = useRouter();
  const movePostDetailPage = (id: number) => {
    router.push(`/community/postdetail/${id}`);
  };

  return {movePostDetailPage};
};

export default useMyPost;
