import Image from "next/image";
import { SearchResultState } from "../../../../../store/reducers/searchResult/searchResultReducer";
import searchResultLoading from "../../../../../public/searchResultLoading.gif";
import StoreBox from "../Common/NameSearchResult/StoreBox";
import styles from "./NameSearchResult.module.scss";

interface NameSearchResult {
  searchResult: SearchResultState;
  showStoreInfo: (storeId: number) => void;
}

const NameSearchResult = ({
  searchResult,
  showStoreInfo,
}: NameSearchResult) => {
  return (
    <div className={styles.mainBlock}>
      {searchResult.loading ? (
        <div className={styles.loading}>
          <Image src={searchResultLoading} alt="loading"></Image>
        </div>
      ) : searchResult.error !== null ? (
        <p className={styles.ectStatus}>에러가 발생하였습니다</p>
      ) : searchResult.content.length === 0 ? (
        <p className={styles.ectStatus}>검색결과가 없습니다</p>
      ) : (
        <StoreBox
          searchResult={searchResult.content}
          showStoreInfo={showStoreInfo}
        />
      )}
    </div>
  );
};

export default NameSearchResult;
