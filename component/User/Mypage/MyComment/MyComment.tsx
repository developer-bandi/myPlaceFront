import MyPageNavigation from "../Common/navigation/MyPageNavigation";
import mypage from "../../../../styles/mypage.module.scss";
import searchResultLoading from "../../../../public/searchResultLoading.gif";
import Image from "next/image";
import { commentListState } from "./MyCommentContainer";
import { setDateLatest } from "../../../../lib/date";
import PageNationContainer from "../../../Common/PageNation/PageNationContainer";
import Comment from "./Comment/Comment";

interface PostListProps {
  commentListState: commentListState;
  movePostDetailPage: (id: number) => void;
  page: number;
  changePage: (page: number) => Promise<void>;
  isLabtopOrTabletOrMobile: boolean;
}

const MyComment = ({
  commentListState,
  movePostDetailPage,
  page,
  changePage,
  isLabtopOrTabletOrMobile,
}: PostListProps) => {
  if (commentListState.loading) {
    return (
      <div className={mypage.mainBlock}>
        {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
        <div className={mypage.subBlock}>
          <h1 className={mypage.title}>작성 댓글</h1>
          <div className={mypage.loading}>
            <Image src={searchResultLoading} alt="loading"></Image>
          </div>
        </div>
      </div>
    );
  } else {
    if (
      commentListState.content === undefined &&
      commentListState.error !== null
    ) {
      return (
        <div className={mypage.mainBlock}>
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 댓글</h1>
            <div className={mypage.error}>에러발생</div>
          </div>
        </div>
      );
    } else if (commentListState.content?.count === 0) {
      return (
        <div className={mypage.mainBlock}>
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 댓글</h1>
            <div className={mypage.noResult}>내 댓글 없음</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={mypage.mainBlock}>
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 포스트</h1>
            {commentListState.content?.rows.map((post) => {
              post.createdAt = setDateLatest(post.createdAt);
              return (
                <Comment
                  content={post}
                  movePostDetailPage={movePostDetailPage}
                />
              );
            })}
            <PageNationContainer
              page={page}
              changePage={changePage}
              totalAmount={commentListState.content?.count as number}
              addStyle={"margin"}
              contentUnit={20}
              pageUnit={5}
            />
          </div>
        </div>
      );
    }
  }
};

export default MyComment;
