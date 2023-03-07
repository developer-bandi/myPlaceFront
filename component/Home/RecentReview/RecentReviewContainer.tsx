import useMoveTargetStore from "../../../lib/customHook/moveTargetStore";
import RecentReview from "./RecentReview";
import useRecentReview from "./RecentReviewHook";

const RecentReviewContainer = () => {
  const {
    serverDataStatus,
    serverData,
    setPage,
    listRef,
    checkBoxRef,
    containerRef,
    visibleRef,
    startNode,
  } = useRecentReview();
  const { moveTargetStore } = useMoveTargetStore();

  return (
    <RecentReview
      serverDataStatus={serverDataStatus}
      serverData={serverData}
      setPage={setPage}
      moveTargetStore={moveTargetStore}
      listRef={listRef}
      checkBoxRef={checkBoxRef}
      containerRef={containerRef}
      visibleRef={visibleRef}
      startNode={startNode}
    />
  );
};

export default RecentReviewContainer;
