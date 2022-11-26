import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import styles from "./PageNation.module.scss";
import { PageNationContainerProps } from "./PageNationContainer";

interface PageNationProps extends PageNationContainerProps {
  allowPrevPageSet: ({
    page,
    pageUnit,
  }: {
    page: number;
    pageUnit: number;
  }) => boolean;
  makePrevSetPage: ({
    page,
    pageUnit,
  }: {
    page: number;
    pageUnit: number;
  }) => number;
  makePages: ({
    page,
    totalAmount,
    contentUnit,
    pageUnit,
  }: {
    page: number;
    totalAmount: number;
    contentUnit: number;
    pageUnit: number;
  }) => number[];
  allowNextPageSet: ({
    page,
    totalAmount,
    contentUnit,
    pageUnit,
  }: {
    page: number;
    totalAmount: number;
    contentUnit: number;
    pageUnit: number;
  }) => boolean;
  makeNextSetPage: ({
    page,
    pageUnit,
  }: {
    page: number;
    pageUnit: number;
  }) => number;
}

const PageNation = ({
  page,
  changePage,
  totalAmount,
  addStyle,
  pageUnit,
  contentUnit,
  allowPrevPageSet,
  makePrevSetPage,
  makePages,
  allowNextPageSet,
  makeNextSetPage,
}: PageNationProps) => {
  return (
    <ul
      className={`${styles.pageButtonList} ${
        addStyle !== undefined ? styles[addStyle] : null
      }`}
    >
      <li key={"prev"}>
        <GrFormPrevious
          className={`${styles.pageIcon} ${page > 5 ? "" : styles.ban}`}
          onClick={() => {
            if (allowPrevPageSet({ page, pageUnit }))
              changePage(makePrevSetPage({ page, pageUnit }));
          }}
        />
      </li>
      {makePages({ page, totalAmount, contentUnit, pageUnit }).map((cur) => {
        return (
          <li
            className={`${styles.pageButton} ${
              cur === page ? styles.selected : ""
            }`}
            onClick={() => {
              changePage(cur);
            }}
            key={cur}
          >
            {cur}
          </li>
        );
      })}
      <li key={"next"}>
        <GrFormNext
          className={`${styles.pageIcon} ${
            allowNextPageSet({ page, totalAmount, contentUnit, pageUnit })
              ? ""
              : styles.ban
          }`}
          onClick={() => {
            if (allowNextPageSet({ page, totalAmount, contentUnit, pageUnit }))
              changePage(makeNextSetPage({ page, pageUnit }));
          }}
        />
      </li>
    </ul>
  );
};

export default PageNation;
