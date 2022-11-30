import styles from "./Sort.module.scss";

interface SortProps {
  changeSort: (sort: string) => Promise<void>;
  selectedSort: string;
}

const Sort = ({ selectedSort, changeSort }: SortProps) => {
  return (
    <ul className={styles.mainBlock}>
      {[
        { kr: "최신순", en: "createdAt" },
        { kr: "좋아요순", en: "likeCount" },
        { kr: "조회수순", en: "viewCount" },
      ].map((sortNameObj) => {
        return (
          <li
            className={
              selectedSort === sortNameObj.en
                ? styles.selectedSortName
                : styles.sortName
            }
            onClick={() => {
              changeSort(sortNameObj.en);
            }}
            key={sortNameObj.kr}
          >
            {sortNameObj.kr}
          </li>
        );
      })}
    </ul>
  );
};

export default Sort;
