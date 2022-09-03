import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import styles from "./PageNation.module.scss";

interface PageNationProps {
  page: number;
  changePage: (page: number) => Promise<void>;
  totalCount: number;
  addStyle?: string;
}

const PageNation = ({
  page,
  changePage,
  totalCount,
  addStyle,
}: PageNationProps) => {
  return (
    <ul
      className={`${styles.pageButtonList} ${
        addStyle !== undefined ? styles[addStyle] : null
      }`}
    >
      {page > 5 ? (
        <li key={"prev"}>
          <GrFormPrevious
            className={styles.pageIcon}
            onClick={() => {
              changePage((Math.floor(page / 5) - 1) * 5 + 1);
            }}
          >
            이전
          </GrFormPrevious>
        </li>
      ) : (
        <li key={"prev"}>
          <GrFormPrevious className={`${styles.pageIcon} ${styles.ban}`}>
            이전
          </GrFormPrevious>
        </li>
      )}
      {Math.ceil(page / 5) * 2 * 5 <= totalCount
        ? [1, 2, 3, 4, 5].map((pageNumber) => {
            return (
              <li
                className={`${styles.pageButton} ${
                  Math.floor(page / 5) * 5 + pageNumber === page
                    ? styles.selected
                    : null
                }`}
                onClick={() => {
                  changePage(Math.floor(page / 5) * 5 + pageNumber);
                }}
                key={pageNumber}
              >
                {Math.floor(page / 5) * 5 + pageNumber}
              </li>
            );
          })
        : new Array(Math.ceil((totalCount - Math.floor(page / 5) * 2 * 5) / 2))
            .fill(0)
            .map((data, index) => {
              return (
                <li
                  className={`${styles.pageButton} ${
                    Math.floor(page / 5) * 5 + index + 1 === page
                      ? styles.selected
                      : null
                  }`}
                  onClick={() => {
                    changePage(Math.floor(page / 5) * 5 + index + 1);
                  }}
                  key={index}
                >
                  {Math.floor(page / 5) * 5 + index + 1}
                </li>
              );
            })}
      {Math.ceil(page / 5) * 2 * 5 < totalCount ? (
        <li key={"next"}>
          <GrFormNext
            className={styles.pageIcon}
            onClick={() => {
              changePage(Math.ceil(page / 5) * 5 + 1);
            }}
          >
            이후
          </GrFormNext>
        </li>
      ) : (
        <li key={"next"}>
          <GrFormNext className={`${styles.pageIcon} ${styles.ban}`}>
            이후
          </GrFormNext>
        </li>
      )}
    </ul>
  );
};

export default PageNation;
