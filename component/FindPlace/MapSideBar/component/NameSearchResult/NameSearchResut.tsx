import Image from "next/image";
import {SearchResultState} from "../../../../../store/reducers/searchResult/Reducer";
import searchResultLoading from "../../../../../public/searchResultLoading.gif";
import StoreBox from "../Common/NameSearchResult/StoreBox";
import styles from "./NameSearchResult.module.scss";

interface NameSearchResult {
  searchResult: SearchResultState;
  showStoreInfo: (storeId: number) => void;
}

const NameSearchResult = ({searchResult, showStoreInfo}: NameSearchResult) => {
  if (searchResult.loading) {
    return (
      <div className={styles.mainBlock} data-testid="loading">
        <div className={styles.loading}>
          <Image src={searchResultLoading} alt="loading"></Image>
        </div>
      </div>
    );
  } else if (searchResult.error) {
    return (
      <div className={styles.mainBlock} data-testid="error">
        <p className={styles.ectStatus}>에러가 발생하였습니다</p>
      </div>
    );
  } else if (searchResult.content === undefined) {
    return (
      <div className={styles.mainBlock} data-testid="noResult">
        <p className={styles.ectStatus}>검색결과가 없습니다</p>
      </div>
    );
  } else {
    return (
      <div className={styles.mainBlock} data-testid="result">
        <StoreBox
          searchResult={searchResult.content}
          showStoreInfo={showStoreInfo}
        />
      </div>
    );
  }
};

export default NameSearchResult;
