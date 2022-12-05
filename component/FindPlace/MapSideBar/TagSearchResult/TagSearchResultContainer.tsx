import TagSearchResult from "./TagSearchResult";
import useTagSearchResult from "./TagSearchResultHook";

const TagSearchResultContainer = () => {
  const {moveSearhPage, searchResult, searchCondition, showStoreInfo} =
    useTagSearchResult();

  return (
    <TagSearchResult
      moveSearhPage={moveSearhPage}
      searchResult={searchResult}
      searchCondition={searchCondition}
      showStoreInfo={showStoreInfo}
    ></TagSearchResult>
  );
};

export default TagSearchResultContainer;
