import Image from "next/image";
import MyPageNavigation from "../Common/navigation/MyPageNavigation";
import searchResultLoading from "../../../../public/searchResultLoading.gif";
import styles from "./MyPost.module.scss";
import mypage from "../../../../lib/styles/mypage.module.scss";
import { postListcontent } from "./MyPostContainer";
import { setDateYearMonthDay } from "../../../../lib/commonFn/date";
import { useIsLabtop } from "../../../../lib/customHook/mediaQuery";

interface PostListProps {
  postList: {
    content?: postListcontent[] | undefined;
    loading: boolean;
    error: boolean;
  };
  movePostDetailPage: (id: number) => void;
}

const MyPost = ({ postList, movePostDetailPage }: PostListProps) => {
  const isLabtop = useIsLabtop();
  if (postList.loading) {
    return (
      <div className={mypage.mainBlock}>
        {isLabtop ? null : <MyPageNavigation />}
        <div className={mypage.subBlock}>
          <h1 className={mypage.title}>작성 포스트</h1>
          <div className={mypage.loading}>
            <Image src={searchResultLoading} alt="loading"></Image>
          </div>
        </div>
      </div>
    );
  } else {
    if (postList.content === undefined && postList.error !== null) {
      return (
        <div className={mypage.mainBlock}>
          {isLabtop ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 포스트</h1>
            <div className={mypage.error}>에러발생</div>
          </div>
        </div>
      );
    } else if (postList.content?.length === 0) {
      return (
        <div className={mypage.mainBlock}>
          {isLabtop ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 포스트</h1>
            <div className={mypage.noResult}>포스트 없음</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={mypage.mainBlock}>
          {isLabtop ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 포스트</h1>
            <div className={styles.infoBlock}>
              <div className={styles.index}>순번</div>
              <div className={styles.title}>제목</div>
              <div className={styles.comment}>댓글</div>
              <div className={styles.like}>좋아요</div>
              <div className={styles.view}>조회수</div>
              <div className={styles.date}>날짜</div>
            </div>
            {postList.content?.map((data, index) => {
              return (
                <div
                  className={styles.postBlock}
                  onClick={() => movePostDetailPage(data.id)}
                >
                  <div className={styles.index}>{index}</div>
                  <div className={styles.title}>{data.title}</div>
                  <div className={styles.comment}>{data.Comments.length}</div>
                  <div className={styles.like}>{data.postlikecount.length}</div>
                  <div className={styles.view}>{data.viewCount}</div>
                  <div className={styles.date}>
                    {isLabtop
                      ? setDateYearMonthDay(data.createdAt).substring(5, 10)
                      : setDateYearMonthDay(data.createdAt)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
};

export default MyPost;
