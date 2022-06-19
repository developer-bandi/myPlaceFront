import { forwardRef, RefObject, SetStateAction } from "react";
import styles from "./TagSearch.module.scss";

interface TagSearchProps {
  hashtag: {
    [index: string]: {
      [index: string]: [string, number, number][];
    };
  };
  selectedHashtag: string[];
  selectedCategory: string;
  dispatchCategory: (category: string) => void;
  dispatchHashtag: (hashtag: string) => void;
  dispatchAddress: () => void;
  inputRef: RefObject<HTMLInputElement>;
  dispatchSearchStore: () => void;
}

const TagSearch = ({
  hashtag,
  selectedHashtag,
  selectedCategory,
  dispatchCategory,
  dispatchHashtag,
  dispatchAddress,
  inputRef,
  dispatchSearchStore,
}: TagSearchProps) => {
  return (
    <main className={styles.mainBlock}>
      <div>
        <ul className={styles.categoryListBlock}>
          {categorydata.map((data: string, index: number) => {
            return (
              <li
                className={
                  selectedCategory === data
                    ? styles.selectedCategory
                    : styles.category
                }
                key={data}
                onClick={() => {
                  dispatchCategory(data);
                }}
              >
                {data}
              </li>
            );
          })}
        </ul>
      </div>
      <section className={styles.centerPostisionBlock}>
        <h1 className={styles.title}>기준 장소</h1>
        <div className={styles.inputBlock}>
          <input className={styles.adressInput} ref={inputRef} />
          <button
            className={styles.adressButton}
            onClick={() => {
              dispatchAddress();
            }}
          >
            설정
          </button>
          <div className={styles.alert}></div>
        </div>
      </section>
      <section className={styles.tagscontainer} key={"tagscontainer"}>
        {Object.keys(hashtag[selectedCategory]).map((data, index: number) => {
          return (
            <>
              <div className={styles.title}>{data}</div>
              <ul className={styles.hashtagListBlock} key={index}>
                {hashtag[selectedCategory][data].map((data) => {
                  return (
                    <li
                      className={
                        selectedHashtag.indexOf(data[0]) !== -1
                          ? styles.selectedHashtag
                          : styles.hashtag
                      }
                      key={data[0]}
                      onClick={() => {
                        dispatchHashtag(data[0]);
                      }}
                    >
                      #{data[0]}
                    </li>
                  );
                })}
              </ul>
            </>
          );
        })}
      </section>
      <button
        className={styles.searchbutton}
        onClick={() => {
          dispatchSearchStore();
        }}
      >
        검색하기
      </button>
    </main>
  );
};

const categorydata = ["카페", "식당", "주점"];

export default TagSearch;
