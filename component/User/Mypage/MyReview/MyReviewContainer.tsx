import { useIsLabtopOrTabletOrMobile } from "../../../../lib/customHook/mediaQuery";
import useMypage from "../../../../lib/customHook/mypage";
import MyReview from "./MyReview";
import useMyReview from "./MyReviewHook";

export interface ReviewListContent {
  id: string;
  content: string;
  StoreName: string;
  Hashtags: [number, string][];
  photo: [string];
  createdAt: string;
}

export interface ReviewListState {
  content?: { count: number; rows: ReviewListContent[] };
  error: boolean;
  loading: boolean;
}

const MyReviewContainer = () => {
  const isLabtopOrTabletOrMobile = useIsLabtopOrTabletOrMobile();
  const { serverData, changePage, page, setServerData } = useMypage("review");
  const { deleteReview, moveReviewUpdatePage } = useMyReview({
    serverData: serverData as ReviewListState,
    setServerData,
  });

  return (
    <MyReview
      reviewListState={serverData as ReviewListState}
      deleteReview={deleteReview}
      moveReviewUpdatePage={moveReviewUpdatePage}
      page={page}
      changePage={changePage}
      isLabtopOrTabletOrMobile={isLabtopOrTabletOrMobile}
    />
  );
};

export default MyReviewContainer;
