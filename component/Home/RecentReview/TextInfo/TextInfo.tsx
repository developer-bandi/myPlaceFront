import styles from "./TextInfo.module.scss";

interface TextInfoProps {
  loading: boolean;
  length?: number;
}

const TextInfo = ({ loading, length }: TextInfoProps) => {
  if (loading && length === undefined) {
    return (
      <div className={styles.mainBlock}>
        <div className={styles.titleBlock}>
          <div className={styles.loadingTitle} />
          <div className={styles.loadingTitle} />
        </div>
        <div className={styles.summaryBlock}>
          <div className={styles.loadingSummary} />
          <div className={styles.loadingSummary} />
          <div className={styles.loadingSummary} />
          <div className={styles.loadingSummary} />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.mainBlock}>
      <h3 className={styles.titleBlock}>
        현재
        <span className={styles.color}>{length}</span>
        개의
        <br /> 리뷰가 등록되어 있습니다.
      </h3>
      <p className={styles.summaryBlock}>
        리뷰 참여자 분들의 도움으로
        <br /> 사이트가 발전합니다.
        <br /> 간단한 리뷰일지라도 등록해주시면
        <br /> 다양한 사용자에게 도움이 됩니다.
      </p>
    </div>
  );
};

export default TextInfo;
