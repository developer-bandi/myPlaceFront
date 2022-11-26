import Image from "next/image";
import MyPageNavigation from "../Common/navigation/MyPageNavigation";
import styles from "./MyReview.module.scss";
import mypage from "../../../../lib/styles/mypage.module.scss";
import searchResultLoading from "../../../../public/searchResultLoading.gif";
import { setDateYearMonthDay } from "../../../../lib/commonFn/date";
import { ReviewListState } from "./MyReviewContainer";
import PageNationContainer from "../../../Common/PageNation/PageNationContainer";

const myLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMG_URL}/w_200,h_200${process.env.NEXT_PUBLIC_IMG_ID}/${src}`;
};

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
      <div className={mypage.mainBlock} data-testid="loading">
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
        <div className={mypage.mainBlock} data-testid="error">
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 후기</h1>
            <div className={mypage.error}>에러발생</div>
          </div>
        </div>
      );
    } else if (reviewListState.content?.count === 0) {
      return (
        <div className={mypage.mainBlock} data-testid="noResult">
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 후기</h1>
            <div className={mypage.noResult}>작성한 후기 없음</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={mypage.mainBlock} data-testid="result">
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 후기</h1>
            {reviewListState.content !== undefined &&
              reviewListState.content.rows.map((review) => {
                return (
                  <div className={styles.reviewBlock} key={review.id}>
                    <div className={styles.titleBlock}>
                      <div className={styles.titleLeftBlock}>
                        <div className={styles.title}>{review.StoreName}</div>
                        <div className={styles.date}>
                          {setDateYearMonthDay(review.createdAt)}
                        </div>
                      </div>
                      <div className={styles.titleRightBlock}>
                        <div
                          className={styles.button}
                          onClick={() => {
                            deleteReview(review.id);
                          }}
                        >
                          삭제
                        </div>
                        <div
                          className={styles.button}
                          onClick={() => {
                            moveReviewUpdatePage(review.id);
                          }}
                        >
                          수정
                        </div>
                      </div>
                    </div>
                    <div className={styles.content}>{review.content}</div>
                    <div className={styles.hashtagList}>
                      {review.Hashtags.map((hashTagArr, index) => {
                        return (
                          <div className={styles.hashtag} key={index}>
                            #{hashTagArr[1]}
                          </div>
                        );
                      })}
                    </div>
                    <div className={styles.photoList}>
                      {review.photo.map((src) => {
                        return (
                          <div className={styles.photoBlock} key={src}>
                            <Image
                              loader={myLoader}
                              src={`/${src}`}
                              width="100px"
                              height="100px"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
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
