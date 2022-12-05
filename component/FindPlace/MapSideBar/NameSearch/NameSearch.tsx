import styles from "./NameSearch.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { RefObject } from "react";

interface NameSearchProps {
  dispatchAddress: () => void;
  searchKeywordInputRef: RefObject<HTMLInputElement>;
  addressInputRef: RefObject<HTMLInputElement>;
  dispatchSearchStore: () => void;
}

const NameSearch = ({
  dispatchAddress,
  searchKeywordInputRef,
  addressInputRef,
  dispatchSearchStore,
}: NameSearchProps) => {
  return (
    <div className={styles.mainBlock}>
      <h1 className={styles.title}>기준 장소</h1>
      <div className={styles.inputBlock}>
        <input className={styles.adressInput} ref={addressInputRef} />
        <button
          className={styles.adressButton}
          onClick={() => {
            dispatchAddress();
          }}
        >
          설정
        </button>
      </div>
      <h1 className={styles.title}>검색 키워드</h1>
      <div className={styles.searchBlock}>
        <input className={styles.searchinput} ref={searchKeywordInputRef} />
        <button className={styles.searchbutton}>
          <AiOutlineSearch
            size={24}
            onClick={() => {
              dispatchSearchStore();
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default NameSearch;
