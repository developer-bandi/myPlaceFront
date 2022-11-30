import Image from "next/image";
import { loader } from "../../../../../lib/commonFn/loader";
import { ReviewListContent } from "../MyReviewContainer";
import styles from "./Review.module.scss";

interface ReviewProps {
  content: ReviewListContent;
  deleteReview: (id: string) => Promise<void>;
  moveReviewUpdatePage: (id: string) => void;
}

const Review = ({
  content,
  deleteReview,
  moveReviewUpdatePage,
}: ReviewProps) => {
  return (
    <div className={styles.reviewBlock} key={content.id}>
      <div className={styles.titleBlock}>
        <div className={styles.titleLeftBlock}>
          <div className={styles.title}>{content.StoreName}</div>
          <div className={styles.date}>{content.createdAt}</div>
        </div>
        <div className={styles.titleRightBlock}>
          <div
            className={styles.button}
            onClick={() => {
              deleteReview(content.id);
            }}
          >
            삭제
          </div>
          <div
            className={styles.button}
            onClick={() => {
              moveReviewUpdatePage(content.id);
            }}
          >
            수정
          </div>
        </div>
      </div>
      <div className={styles.content}>{content.content}</div>
      <div className={styles.hashtagList}>
        {content.Hashtags.map((hashTagArr, index) => {
          return (
            <div className={styles.hashtag} key={index}>
              #{hashTagArr[1]}
            </div>
          );
        })}
      </div>
      <div className={styles.photoList}>
        {content.photo.map((src) => {
          return (
            <div className={styles.photoBlock} key={src}>
              <Image
                loader={loader({ width: 200, height: 200 })}
                src={`${src}`}
                width="100px"
                height="100px"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Review;
