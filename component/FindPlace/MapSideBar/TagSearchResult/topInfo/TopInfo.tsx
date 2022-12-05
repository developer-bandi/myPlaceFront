import { hashtagSearchConditionState } from "../../../../../store/reducers/searchCondition/Reducer";
import styles from "./TopInfo.module.scss";

interface TopInfoProps {
  moveSearhPage: () => void;
  searchCondition: hashtagSearchConditionState;
}

const TopInfo = ({ moveSearhPage, searchCondition }: TopInfoProps) => {
  return (
    <div className={styles.topBlock}>
      <div className={styles.titleBlock}>
        <h2 className={styles.title}>검색결과</h2>
        <button className={styles.movesearch} onClick={moveSearhPage}>
          태그 재선택하기
        </button>
      </div>
      <ul className={styles.selecttaglistBlock}>
        {[
          searchCondition.category,
          ...(searchCondition.hashtag as string[]),
        ].map((hashtag, index) => {
          return (
            <li className={styles.selecttag} key={index}>
              #{hashtag}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopInfo;
