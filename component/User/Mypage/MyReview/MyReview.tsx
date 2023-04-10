import Image from "next/image";
import MyPageNavigation from "../Common/navigation/MyPageNavigation";
import mypage from "../../../../styles/mypage.module.scss";
import searchResultLoading from "../../../../public/searchResultLoading.gif";
import { setDateYearMonthDay } from "../../../../lib/date";
import { ReviewListState } from "./MyReviewContainer";
import PageNationContainer from "../../../Common/PageNation/PageNationContainer";
import Review from "./Review/Review";

interface MyReviewProps {
  reviewListState: ReviewListState;
  deleteReview: (id: string) => Promise<void>;
  moveReviewUpdatePage: (id: string) => void;
  page: number;
  changePage: (page: number) => Promise<void>;
  isLabtopOrTabletOrMobile: boolean;
}

const MyReview = ({
  reviewListState,
  deleteReview,
  moveReviewUpdatePage,
  page,
  changePage,
  isLabtopOrTabletOrMobile,
}: MyReviewProps) => {
  if (reviewListState.loading) {
    return (
      <div className={mypage.mainBlock}>
        {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
        <div className={mypage.subBlock}>
          <h1 className={mypage.title}>작성 후기</h1>
          <div className={mypage.loading}>
            <Image src={searchResultLoading} alt="loading"></Image>
          </div>
        </div>
      </div>
    );
  } else {
    if (reviewListState.error) {
      return (
        <div className={mypage.mainBlock}>
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 후기</h1>
            <div className={mypage.error}>에러발생</div>
          </div>
        </div>
      );
    } else if (reviewListState.content?.count === 0) {
      return (
        <div className={mypage.mainBlock}>
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 후기</h1>
            <div className={mypage.noResult}>작성한 후기 없음</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={mypage.mainBlock}>
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 후기</h1>
            {reviewListState.content !== undefined &&
              reviewListState.content.rows.map((review) => {
                review.createdAt = setDateYearMonthDay(review.createdAt);
                return (
                  <Review
                    content={review}
                    deleteReview={deleteReview}
                    moveReviewUpdatePage={moveReviewUpdatePage}
                  />
                );
              })}
            <PageNationContainer
              page={page}
              changePage={changePage}
              totalAmount={reviewListState.content?.count as number}
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

export default MyReview;
