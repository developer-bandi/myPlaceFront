import Image from "next/image";
import MyPageNavigation from "../Common/navigation/MyPageNavigation";
import searchResultLoading from "../../../../public/searchResultLoading.gif";
import styles from "./MyPost.module.scss";
import mypage from "../../../../lib/styles/mypage.module.scss";
import {setDateYearMonthDay} from "../../../../lib/commonFn/date";
import {postListState} from "./MyPostHook";
import {GrView} from "react-icons/gr";
import {FaRegComment} from "react-icons/fa";
import {BiLike} from "react-icons/bi";
import PageNation from "../../../Common/PageNation/PageNation";

interface PostListProps {
  postListState: postListState;
  movePostDetailPage: (id: number) => void;
  page: number;
  changePage: (page: number) => Promise<void>;
  isLabtopOrTabletOrMobile: boolean;
}

const MyPost = ({
  postListState,
  movePostDetailPage,
  page,
  changePage,
  isLabtopOrTabletOrMobile,
}: PostListProps) => {
  if (postListState.loading) {
    return (
      <div className={mypage.mainBlock} data-testid="loading">
        {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
        <div className={mypage.subBlock}>
          <h1 className={mypage.title}>작성 포스트</h1>
          <div className={mypage.loading}>
            <Image src={searchResultLoading} alt="loading"></Image>
          </div>
        </div>
      </div>
    );
  } else {
    if (postListState.content === undefined && postListState.error !== null) {
      return (
        <div className={mypage.mainBlock} data-testid="error">
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 포스트</h1>
            <div className={mypage.error}>에러발생</div>
          </div>
        </div>
      );
    } else if (postListState.content?.count === 0) {
      return (
        <div className={mypage.mainBlock} data-testid="noResult">
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 포스트</h1>
            <div className={mypage.noResult}>포스트 없음</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={mypage.mainBlock} data-testid="result">
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 포스트</h1>
            {postListState.content?.rows.map((post, index) => {
              return (
                <div
                  className={styles.postBlock}
                  onClick={() => movePostDetailPage(post.id)}
                  key={post.id}
                >
                  <div className={styles.topBlock}>
                    <div className={styles.user}>{post.nickname}</div>
                    <div className={styles.date}>
                      {setDateYearMonthDay(post.createdAt)}
                    </div>
                  </div>
                  <div className={styles.title}>{post.title}</div>
                  <p className={styles.content}>{post.content}</p>
                  <div className={styles.bottomBlock}>
                    <FaRegComment size="20" className={styles.bottomIcon} />
                    <div className={styles.bottomInfo}>{post.comment}</div>
                    <BiLike size="20" className={styles.bottomIcon} />
                    <div className={styles.bottomInfo}>
                      {post.postlikecount}
                    </div>
                    <GrView size="20" className={styles.bottomIcon} />
                    <div className={styles.bottomInfo}>{post.viewCount}</div>
                  </div>
                </div>
              );
            })}
            <PageNation
              page={page}
              changePage={changePage}
              totalCount={postListState.content?.count as number}
              addStyle={"margin"}
              unit={20}
            />
          </div>
        </div>
      );
    }
  }
};

export default MyPost;
