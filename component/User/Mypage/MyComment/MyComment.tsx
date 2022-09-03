import MyPageNavigation from "../Common/navigation/MyPageNavigation";
import styles from "./MyComment.module.scss";
import mypage from "../../../../lib/styles/mypage.module.scss";
import searchResultLoading from "../../../../public/searchResultLoading.gif";
import Image from "next/image";
import {commentListState} from "./MyCommentContainer";
import PageNation from "../../../Common/PageNation/PageNation";
import {setDateLatest} from "../../../../lib/commonFn/date";

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
      <div className={mypage.mainBlock} data-testid="loading">
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
        <div className={mypage.mainBlock} data-testid="error">
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 댓글</h1>
            <div className={mypage.error}>에러발생</div>
          </div>
        </div>
      );
    } else if (commentListState.content?.count === 0) {
      return (
        <div className={mypage.mainBlock} data-testid="noResult">
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 댓글</h1>
            <div className={mypage.noResult}>내 댓글 없음</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={mypage.mainBlock} data-testid="result">
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 포스트</h1>
            {commentListState.content?.rows.map((post, index) => {
              return (
                <div
                  className={styles.postBlock}
                  onClick={() => movePostDetailPage(post.id)}
                  key={post.id}
                >
                  <div className={styles.topBlock}>
                    <div className={styles.user}>{post.nickname}</div>
                    <div className={styles.date}>
                      {setDateLatest(post.createdAt)}
                    </div>
                  </div>
                  <p className={styles.content}>{post.content}</p>
                </div>
              );
            })}
            <PageNation
              page={page}
              changePage={changePage}
              totalCount={commentListState.content?.count as number}
              addStyle={"margin"}
            />
          </div>
        </div>
      );
    }
  }
};

export default MyComment;
