import styles from "./RecentReview.module.scss";
import { setDateLatest } from "../../../lib/commonFn/date";
import { reviewRecentState } from "./RecentReviewContainer";
import Review from "./Review/Review";
import TextInfo from "./TextInfo/TextInfo";

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
      <section className={styles.mainBlock}>
        <div className={styles.subBlock}>
          <TextInfo loading={true} />
          <div className={styles.reviewList}>
            {new Array(3).fill(0).map((data, index) => {
              return (
                <Review
                  loading={true}
                  moveTargetStore={moveTargetStore}
                  index={index}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </section>
    );
  } else if (serverData.error) {
    return (
      <section className={styles.mainBlock}>
        <p className={styles.error}>에러가 발생하였습니다</p>
      </section>
    );
  } else if (serverData.content !== undefined) {
    return (
      <section className={styles.mainBlock}>
        <div className={styles.subBlock}>
          <TextInfo loading={true} length={serverData.content.count} />
          <div className={styles.reviewList}>
            {serverData.content.rows.map((review, index) => {
              review.createdAt = setDateLatest(review.createdAt);
              return (
                <Review
                  loading={false}
                  content={review}
                  moveTargetStore={moveTargetStore}
                  index={index}
                  key={index}
                />
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
