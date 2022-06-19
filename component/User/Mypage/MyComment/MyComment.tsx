import MyPageNavigation from "../Common/navigation/MyPageNavigation";
import styles from "./MyComment.module.scss";
import mypage from "../../../../lib/styles/mypage.module.scss";
import { commentContent } from "./MyCommentContainer";
import searchResultLoading from "../../../../public/searchResultLoading.gif";
import Image from "next/image";
import { useIsLabtop } from "../../../../lib/customHook/mediaQuery";

interface PostListProps {
  commentList: {
    content?: commentContent[] | undefined;
    loading: boolean;
    error: boolean;
  };
  movePostDetailPage: (id: number) => void;
}

const MyComment = ({ commentList, movePostDetailPage }: PostListProps) => {
  const isLabtop = useIsLabtop();
  if (commentList.loading) {
    return (
      <div className={mypage.mainBlock}>
        {isLabtop ? null : <MyPageNavigation />}
        <div className={mypage.subBlock}>
          <h1 className={mypage.title}>작성 댓글</h1>
          <div className={mypage.loading}>
            <Image src={searchResultLoading} alt="loading"></Image>
          </div>
        </div>
      </div>
    );
  } else {
    if (commentList.content === undefined && commentList.error !== null) {
      return (
        <div className={mypage.mainBlock}>
          {isLabtop ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 댓글</h1>
            <div className={mypage.error}>에러발생</div>
          </div>
        </div>
      );
    } else if (commentList.content?.length === 0) {
      return (
        <div className={mypage.mainBlock}>
          {isLabtop ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 댓글</h1>
            <div className={mypage.noResult}>내 댓글 없음</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={mypage.mainBlock}>
          {isLabtop ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 댓글</h1>
            <div className={styles.infoBlock}>
              <div className={styles.index}>순번</div>
              <div className={styles.content}>내용</div>
              <div className={styles.date}>날짜</div>
            </div>
            {commentList.content?.map((data, index) => {
              return (
                <div
                  className={styles.postBlock}
                  onClick={() => movePostDetailPage(data.Post.id)}
                >
                  <div className={styles.index}>{index}</div>
                  <div className={styles.content}>{data.content}</div>
                  <div className={styles.date}>
                    {data.createdAt.split("T")[0]}
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

export default MyComment;
