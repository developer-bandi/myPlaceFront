import { useIsLabtopOrTabletOrMobile } from "../../../../hooks/mediaQuery";
import useMypage from "../../../../hooks/mypage";
import PostList from "./MyPost";
import useMyPost from "./MyPostHook";

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
  content?: { count: number; rows: postListcontent[] };
  loading: boolean;
  error: boolean;
}

const MyPostContainer = () => {
  const isLabtopOrTabletOrMobile = useIsLabtopOrTabletOrMobile();
  const { movePostDetailPage } = useMyPost();
  const { serverData, changePage, page } = useMypage("post");
  return (
    <PostList
      postListState={serverData as postListState}
      movePostDetailPage={movePostDetailPage}
      page={page}
      changePage={changePage}
      isLabtopOrTabletOrMobile={isLabtopOrTabletOrMobile}
    />
  );
};

export default MyPostContainer;
