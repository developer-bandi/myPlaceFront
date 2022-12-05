import Image from "next/image";
import { setDateLatest } from "../../../../lib/commonFn/date";
import { loader } from "../../../../lib/commonFn/loader";
import styles from "./Reviews.module.scss";

interface ReviewsProps {
  reviews: {
    content: string;
    user: string;
    date: string;
    Hashtags: string[];
    photos: string[];
  }[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <div className={styles.mainBlock}>
      {reviews.length !== 0 ? (
        reviews.map((review, index) => {
          return (
            <div
              className={styles.commentBlock}
              key={`${review.content}${index}`}
            >
              <div className={styles.commentInfo}>
                <div className={styles.nickname}>{review.user}</div>
                <div className={styles.date}>{setDateLatest(review.date)}</div>
              </div>
              {review.photos.length !== 0 ? (
                <div className={styles.imgBlock}>
                  {review.photos.map((src) => {
                    return (
                      <div className={styles.imgs}>
                        <Image
                          loader={loader({ width: 200, height: 200 })}
                          src={src}
                          width="100px"
                          height="100px"
                        />
                      </div>
                    );
                  })}
                </div>
              ) : null}
              <div className={styles.commentContent}>{review.content}</div>
              <div className={styles.tagListBlock}>
                {review.Hashtags.map((hashtagName: string) => {
                  return (
                    <div className={styles.commentTag}>#{hashtagName}</div>
                  );
                })}
              </div>
            </div>
          );
        })
      ) : (
        <p className={styles.noReview}>첫 후기를 등록해 보세요!</p>
      )}
    </div>
  );
};

export default Reviews;
