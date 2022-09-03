import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../../../../store";
import {setSearchType} from "../../../../../store/reducers/searhType/Reducer";
import {getStoreInfo} from "../../../../../store/reducers/storeInfo/Reducer";
import TagSearchResult from "./TagSearchResult";

const TagSearchResultContainer = () => {
  const searchResult = useSelector((state: RootReducer) => state.searchResult);
  const searchCondition = useSelector(
    (state: RootReducer) => state.hashtagSearchCondition
  );
  const dispatch = useDispatch();
  const showStoreInfo = (storeId: number) => {
    dispatch(getStoreInfo(storeId));
  };

  const moveSearhPage = () => {
    dispatch(setSearchType({type: "hashtag", hashtag: "search"}));
  };

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
