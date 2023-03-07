import { RefObject } from "react";
import { recentReviewData } from "../RecentReviewHook";
import styles from "./Review.module.scss";

interface ReviewProps {
  loading: boolean;
  index: number;
  content?: recentReviewData;
  moveTargetStore: (
    id: number,
    name: string,
    latitude: string,
    longitude: string,
    address: string
  ) => void;
}

const Review = ({ loading, index, content, moveTargetStore }: ReviewProps) => {
  if (loading) {
    return (
      <div className={styles.mainBlock} key={index}>
        <div className={styles.loadingUser} />
        <div className={styles.loadingStoreName} />
        <div className={styles.loadingReview} />
        <div className={styles.loadingReview} />
      </div>
    );
  }
  if (content !== undefined) {
    return (
      <div className={styles.mainBlock} key={content.id}>
        <div className={styles.headBlock}>
          <p className={styles.user}>{content.nickname}</p>
          <p className={styles.time}>{content.createdAt}</p>
        </div>
        <h4
          className={styles.name}
          onClick={() =>
            moveTargetStore(
              content.id,
              content.storeName,
              content.storeLatitude,
              content.storeLongitude,
              content.storeAddress
            )
          }
        >
          {content.storeName}
        </h4>
        <p className={styles.review}>{content.content}</p>
        <div className={styles.hashtagList}>
          {content.hashtag.map((hashtag) => {
            return (
              <div className={styles.hashtag} key={hashtag}>
                #{hashtag}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default Review;
