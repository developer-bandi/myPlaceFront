import styles from "./RecentReview.module.scss";
import { setDateLatest } from "../../../lib/date";
import Review from "./Review/Review";
import TextInfo from "./TextInfo/TextInfo";
import { Dispatch, RefObject, SetStateAction } from "react";
import { reviewRecentState } from "./RecentReviewHook";

interface RecentReviewProps {
  serverDataStatus: {
    loading: boolean;
    fetching: boolean;
    error: boolean;
  };
  serverData: reviewRecentState;
  setPage: Dispatch<SetStateAction<number>>;
  listRef: RefObject<HTMLDivElement>;
  moveTargetStore: (
    id: number,
    name: string,
    latitude: string,
    longitude: string,
    address: string
  ) => void;
  checkBoxRef: RefObject<HTMLDivElement>;
  containerRef: RefObject<HTMLDivElement>;
  visibleRef: RefObject<HTMLDivElement>;
  startNode: number;
}

const RecentReview = ({
  serverDataStatus,
  serverData,
  listRef,
  moveTargetStore,
  checkBoxRef,
  containerRef,
  visibleRef,
  startNode,
}: RecentReviewProps) => {
  if (serverDataStatus.loading) {
    return (
      <section className={styles.mainBlock}>
        <div className={styles.subBlock}>
          <TextInfo loading={true} />
          <div className={styles.reviewListContainer}>
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
              <div className={styles.lastCheckbox} ref={checkBoxRef}></div>
            </div>
          </div>
        </div>
      </section>
    );
  } else if (serverDataStatus.error) {
    return (
      <section className={styles.mainBlock}>
        <p className={styles.error}>에러가 발생하였습니다</p>
      </section>
    );
  } else {
    return (
      <section className={styles.mainBlock}>
        <div className={styles.subBlock}>
          <TextInfo loading={true} length={serverData.count} />
          <div className={styles.reviewListContainer} ref={containerRef}>
            <div className={styles.reviewList} ref={listRef}>
              <div ref={visibleRef}>
                {serverData.rows
                  .slice(startNode, startNode + 5)
                  .map((review, index) => {
                    review.createdAt = setDateLatest(review.createdAt);
                    return (
                      <Review
                        loading={false}
                        content={review}
                        moveTargetStore={moveTargetStore}
                        index={index}
                        key={review.id}
                      />
                    );
                  })}
                {serverDataStatus.fetching ? (
                  <div className={styles.reviewListLoading}>로딩중...</div>
                ) : null}
              </div>
              <div className={styles.lastCheckbox} ref={checkBoxRef}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default RecentReview;
