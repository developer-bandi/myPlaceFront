import React, { forwardRef, RefObject, SetStateAction } from "react";
import Category from "./Category/Category";
import Hashtag from "./Hashtag/Hashtag";
import Position from "./Position/Position";
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
      <Category
        selectedCategory={selectedCategory}
        dispatchCategory={dispatchCategory}
      />
      <Position dispatchAddress={dispatchAddress} inputRef={inputRef} />
      <Hashtag
        hashtag={hashtag}
        selectedCategory={selectedCategory}
        selectedHashtag={selectedHashtag}
        dispatchHashtag={dispatchHashtag}
      />
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
