import Image from "next/image";
import MyPageNavigation from "../Common/navigation/MyPageNavigation";
import searchResultLoading from "../../../../public/searchResultLoading.gif";
import mypage from "../../../../styles/mypage.module.scss";
import { setDateYearMonthDay } from "../../../../lib/date";
import PageNationContainer from "../../../Common/PageNation/PageNationContainer";
import { postListState } from "./MyPostContainer";
import Post from "./Post/Post";

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
      <div className={mypage.mainBlock}>
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
        <div className={mypage.mainBlock}>
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 포스트</h1>
            <div className={mypage.error}>에러발생</div>
          </div>
        </div>
      );
    } else if (postListState.content?.count === 0) {
      return (
        <div className={mypage.mainBlock}>
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 포스트</h1>
            <div className={mypage.noResult}>포스트 없음</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={mypage.mainBlock}>
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 포스트</h1>
            {postListState.content?.rows.map((post) => {
              post.createdAt = setDateYearMonthDay(post.createdAt);
              return (
                <Post content={post} movePostDetailPage={movePostDetailPage} />
              );
            })}
            <PageNationContainer
              page={page}
              changePage={changePage}
              totalAmount={postListState.content?.count as number}
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

export default MyPost;
