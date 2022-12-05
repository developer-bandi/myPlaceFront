import styles from "./TagSearchResult.module.scss";
import searchResultLoading from "../../../../public/searchResultLoading.gif";
import StoreBox from "../StoreBox/StoreBox";
import { hashtagSearchConditionState } from "../../../../store/reducers/searchCondition/Reducer";
import { SearchResultState } from "../../../../store/reducers/searchResult/Reducer";
import Image from "next/image";
import TopInfo from "./topInfo/TopInfo";

interface TagSearchResultProps {
  moveSearhPage: () => void;
  searchResult: SearchResultState;
  searchCondition: hashtagSearchConditionState;
  showStoreInfo: (storeId: number) => void;
}

const TagSearchResult = ({
  moveSearhPage,
  searchResult,
  searchCondition,
  showStoreInfo,
}: TagSearchResultProps) => {
  return (
    <>
      <TopInfo
        moveSearhPage={moveSearhPage}
        searchCondition={searchCondition}
      />
      <div className={styles.storeListBlock}>
        {searchResult.loading ? (
          <div className={styles.loading} data-testid="loading">
            <Image src={searchResultLoading} alt="loading"></Image>
          </div>
        ) : searchResult.error ? (
          <p className={styles.ectStatus} data-testid="error">
            에러가 발생하였습니다
          </p>
        ) : searchResult.content?.length === 0 ? (
          <p className={styles.ectStatus} data-testid="noResult">
            검색결과가 없습니다
          </p>
        ) : (
          <StoreBox
            searchResult={searchResult.content}
            showStoreInfo={showStoreInfo}
          />
        )}
      </div>
    </>
  );
};

export default TagSearchResult;
