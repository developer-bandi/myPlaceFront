import { useState } from "react";
import { hashtagRankState } from "../../../store/reducers/hashtagRank/hashtagRankReducer";
import styles from "./HashtagRank.module.scss";

interface HashtagRankProps {
  hashtagRankData: hashtagRankState;
}

const HashtagRank = ({ hashtagRankData }: HashtagRankProps) => {
  const [selectedCategory, setSelectedCategory] = useState("카페");
  if (hashtagRankData.error !== null) {
    return (
      <main className={styles.errorBlock}>
        <section className={styles.titleBlock}>
          <h1 className={styles.title}>해시태그 TOP</h1>
        </section>
        <div className={styles.errorMessage}>
          에러가 발생하였습니다. 새로고침을 시도해보세요
        </div>
      </main>
    );
  }
  //에러 발생시 처리

  return (
    <main className={styles.mainBlock}>
      <section className={styles.titleBlock}>
        <h1 className={styles.title}>해시태그 TOP</h1>
      </section>
      <section>
        <ul className={styles.categorylistBlock}>
          {hashtagRankData.content.카페.length === 20
            ? ["카페", "식당", "주점"].map((data: string, index: number) => {
                return (
                  <li
                    className={
                      data === selectedCategory
                        ? styles.selectedCategory
                        : styles.category
                    }
                    key={data}
                    onClick={() => {
                      setSelectedCategory(data);
                    }}
                  >
                    {data}
                  </li>
                );
              })
            : new Array(3).fill(0).map((data: string, index: number) => {
                return (
                  <li className={styles.loadingCategoryBlock} key={index}>
                    <div className={styles.loadingCategory}></div>
                  </li>
                );
              })}
        </ul>
      </section>
      <section className={styles.tableBlock}>
        {hashtagRankData.content.카페.length === 20
          ? hashtagRankData.content[selectedCategory].map(
              (data, index: number) => {
                return (
                  <div className={styles.hashtagBlock} key={data.name}>
                    <div className={styles.rank}>{index + 1}</div>
                    <div className={styles.name}>{data.name}</div>
                    <div className={styles.count}>조회수 {data.viewCount}</div>
                  </div>
                );
              }
            )
          : new Array(20).fill(0).map((data: number, index: number) => {
              return (
                <div className={styles.hashtagBlock} key={index}>
                  <div className={styles.loadingRank}></div>
                  <div className={styles.loadingName}></div>
                  <div className={styles.loadingCount}></div>
                </div>
              );
            })}
      </section>
    </main>
  );
};

export default HashtagRank;
