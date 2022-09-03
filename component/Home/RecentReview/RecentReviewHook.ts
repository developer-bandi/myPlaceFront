import {useEffect, useState} from "react";
import {axiosGetRecentReview} from "../../../lib/commonFn/api";

export interface recentReviewData {
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

export interface reviewRecentState {
  content?: {count: number; rows: recentReviewData[]};
  loading: boolean;
  error: boolean;
}

const useRecentReview = () => {
  const [recentReviewData, setRecentReviewData] = useState<reviewRecentState>({
    loading: true,
    error: false,
  });
  useEffect(() => {
    const asyncTempFunc = async () => {
      try {
        const content = await axiosGetRecentReview();
        setRecentReviewData({
          content: content.data,
          loading: false,
          error: false,
        });
      } catch (err) {
        setRecentReviewData({loading: false, error: true});
      }
    };
    asyncTempFunc();
  }, []);

  return {recentReviewData};
};

export default useRecentReview;
