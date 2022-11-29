import { useIsLabtopOrTabletOrMobile } from "../../../../lib/customHook/mediaQuery";
import useMypage from "../../../../lib/customHook/mypage";
import MyComment from "./MyComment";
import useMyComment from "./MyCommentHook";

export interface commentListContentRow {
  id: number;
  content: string;
  createdAt: string;
  PostId: number;
  nickname: string;
}

export interface commentListState {
  content?: {
    count: number;
    rows: commentListContentRow[];
  };
  loading: boolean;
  error: boolean;
}

const MyCommentContainer = () => {
  const { movePostDetailPage } = useMyComment();
  const isLabtopOrTabletOrMobile = useIsLabtopOrTabletOrMobile();
  const { serverData, changePage, page } = useMypage("comment");
  return (
    <MyComment
      commentListState={serverData as commentListState}
      movePostDetailPage={movePostDetailPage}
      page={page}
      changePage={changePage}
      isLabtopOrTabletOrMobile={isLabtopOrTabletOrMobile}
    />
  );
};

export default MyCommentContainer;
