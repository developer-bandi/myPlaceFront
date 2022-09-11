import {axiosGetRecentReview} from "../../../lib/commonFn/api";
import useGetServerData from "../../../lib/customHook/getData";
import useMoveTargetStore from "../../../lib/customHook/moveTargetStore";
import RecentReview from "./RecentReview";

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

const RecentReviewContainer = () => {
  const {serverData} = useGetServerData(axiosGetRecentReview);
  const {moveTargetStore} = useMoveTargetStore();
  return (
    <RecentReview
      serverData={serverData as reviewRecentState}
      moveTargetStore={moveTargetStore}
    />
  );
};

export default RecentReviewContainer;
