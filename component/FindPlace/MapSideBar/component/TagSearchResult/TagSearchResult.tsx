import styles from "./TagSearchResult.module.scss";
import searchResultLoading from "../../../../../public/searchResultLoading.gif";
import StoreBox from "../Common/NameSearchResult/StoreBox";
import {hashtagSearchConditionState} from "../../../../../store/reducers/hashtagSearchCondition/Reducer";
import {SearchResultState} from "../../../../../store/reducers/searchResult/Reducer";
import Image from "next/image";

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
      <div className={styles.topBlock}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>검색결과</h2>
          <button
            className={styles.movesearch}
            onClick={moveSearhPage}
            data-testid="moveSearhPage"
          >
            태그 재선택하기
          </button>
        </div>
        <ul className={styles.selecttaglistBlock}>
          {[searchCondition.category, ...searchCondition.hashtag].map(
            (data: string, index) => {
              return (
                <li className={styles.selecttag} key={index}>
                  #{data}
                </li>
              );
            }
          )}
        </ul>
      </div>
      <div className={styles.storeListBlock}>
        {searchResult.loading ? (
          <div className={styles.loading} data-testid="loading">
            <Image src={searchResultLoading} alt="loading"></Image>
          </div>
        ) : searchResult.error ? (
          <p className={styles.ectStatus} data-testid="error">
            에러가 발생하였습니다
          </p>
        ) : searchResult.content === undefined ? (
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
