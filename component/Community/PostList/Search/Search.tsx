import { RefObject } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import styles from "./Search.module.scss";

interface SearchProps {
  searchRef: RefObject<HTMLInputElement>;
  searchPost: (e: { key?: string; type: string }) => Promise<void>;
  initializeSearch: () => void;
  moveWritePage: () => void;
}

const Search = ({
  searchPost,
  searchRef,
  initializeSearch,
  moveWritePage,
}: SearchProps) => {
  return (
    <div className={styles.mainBlock}>
      <div className={styles.searchBlock}>
        <button
          className={styles.searchButton}
          onClick={searchPost}
          aria-label="searchButton"
        >
          <BiSearchAlt2 size={"20"} />
        </button>
        <input
          className={styles.searchInput}
          ref={searchRef}
          onKeyPress={searchPost}
          aria-label="searchInput"
        />
      </div>
      <button className={styles.initializeSearch} onClick={initializeSearch}>
        초기화
      </button>
      <button className={styles.writeButton} onClick={moveWritePage}>
        글쓰기
      </button>
    </div>
  );
};

export default Search;
