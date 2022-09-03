import React, {forwardRef, RefObject, SetStateAction} from "react";
import styles from "./TagSearch.module.scss";

interface TagSearchProps {
  hashtag:
    | {
        [index: string]: {
          [index: string]: [string, number, number][];
        };
      }
    | undefined;
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
                data-testid={`dispatchCategory${index}`}
              >
                {data}
              </li>
            );
          })}
        </ul>
      </div>
      <section
        className={styles.centerPostisionBlock}
        key={"centerPostisionBlock"}
      >
        <h1 className={styles.title}>기준 장소</h1>
        <div className={styles.inputBlock}>
          <input className={styles.adressInput} ref={inputRef} />
          <button
            className={styles.adressButton}
            onClick={() => {
              dispatchAddress();
            }}
            data-testid="dispatchAddress"
          >
            설정
          </button>
          <div className={styles.alert}></div>
        </div>
      </section>
      <section className={styles.tagscontainer} key={"tagscontainer"}>
        {Object.keys(
          hashtag !== undefined ? hashtag[selectedCategory] : {}
        ).map((subject, index: number) => {
          return (
            <React.Fragment key={subject}>
              <div className={styles.title}>{subject}</div>
              <ul className={styles.hashtagListBlock} key={index}>
                {(hashtag !== undefined ? hashtag[selectedCategory] : {})[
                  subject
                ].map((data, index) => {
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
                      data-testid={`dispatchHashtag${index}`}
                    >
                      #{data[0]}
                    </li>
                  );
                })}
              </ul>
            </React.Fragment>
          );
        })}
      </section>
      <button
        className={styles.searchbutton}
        onClick={() => {
          dispatchSearchStore();
        }}
        data-testid="dispatchSearchStore"
      >
        검색하기
      </button>
    </main>
  );
};

const categorydata = ["카페", "식당", "주점"];

export default TagSearch;
