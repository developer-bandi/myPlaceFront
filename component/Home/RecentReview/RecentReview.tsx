import styles from "./RecentReview.module.scss";
import { setDateLatest } from "../../../lib/commonFn/date";
import { reviewRecentState } from "./RecentReviewContainer";

interface RecentReviewProps {
  serverData: reviewRecentState;
  moveTargetStore: (
    id: number,
    name: string,
    latitude: string,
    longitude: string,
    address: string
  ) => void;
}

const RecentReview = ({ serverData, moveTargetStore }: RecentReviewProps) => {
  if (serverData.loading) {
    return (
      <section className={styles.mainBlock} data-testid="loading">
        <div className={styles.subBlock}>
          <div className={styles.leftBlock}>
            <div className={styles.title}>
              <div className={styles.loadingTitle} />
              <div className={styles.loadingTitle} />
            </div>
            <div className={styles.summary}>
              <div className={styles.loadingSummary} />
              <div className={styles.loadingSummary} />
              <div className={styles.loadingSummary} />
              <div className={styles.loadingSummary} />
            </div>
          </div>
          <div className={styles.reviewList}>
            {new Array(3).fill(0).map((data, index) => {
              return (
                <div className={styles.reviewBlock} key={index}>
                  <div className={styles.loadingUser} />
                  <div className={styles.loadingStoreName} />
                  <div className={styles.loadingReview} />
                  <div className={styles.loadingReview} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  } else if (serverData.error) {
    return (
      <section className={styles.mainBlock} data-testid="error">
        <p className={styles.error}>에러가 발생하였습니다</p>
      </section>
    );
  } else if (serverData.content !== undefined) {
    return (
      <section className={styles.mainBlock} data-testid="result">
        <div className={styles.subBlock}>
          <div className={styles.leftBlock}>
            <h3 className={styles.title}>
              현재
              <span className={styles.color}>{serverData.content.count}</span>
              개의
              <br /> 리뷰가 등록되어 있습니다.
            </h3>
            <p className={styles.summary}>
              리뷰 참여자 분들의 도움으로
              <br /> 사이트가 발전합니다.
              <br /> 간단한 리뷰일지라도 등록해주시면
              <br /> 다양한 사용자에게 도움이 됩니다.
            </p>
          </div>
          <div className={styles.reviewList}>
            {serverData.content.rows.map((review) => {
              return (
                <div className={styles.reviewBlock} key={review.id}>
                  <div className={styles.headBlock}>
                    <p className={styles.user}>{review.nickname}</p>
                    <p className={styles.time}>
                      {setDateLatest(review.createdAt)}
                    </p>
                  </div>
                  <h4
                    className={styles.storeName}
                    onClick={() =>
                      moveTargetStore(
                        review.id,
                        review.storeName,
                        review.storeLatitude,
                        review.storeLongitude,
                        review.storeAddress
                      )
                    }
                  >
                    {review.storeName}
                  </h4>
                  <p className={styles.review}>{review.content}</p>
                  <div className={styles.hashtagList}>
                    {review.hashtag.map((hashtag) => {
                      return (
                        <div className={styles.hashtag} key={hashtag}>
                          #{hashtag}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default RecentReview;
