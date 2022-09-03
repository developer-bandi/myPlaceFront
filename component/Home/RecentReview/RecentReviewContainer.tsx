import useMoveTargetStore from "../../../lib/customHook/moveTargetStore";
import RecentReview from "./RecentReview";
import useRecentReview from "./RecentReviewHook";

const RecentReviewContainer = () => {
  const {recentReviewData} = useRecentReview();
  const {moveTargetStore} = useMoveTargetStore();
  return (
    <RecentReview
      recentReviewData={recentReviewData}
      moveTargetStore={moveTargetStore}
    />
  );
};

export default RecentReviewContainer;
