import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../../store";
import { setSearchType } from "../../../../store/reducers/searhType/Reducer";
import { getStoreInfo } from "../../../../store/reducers/storeInfo/Reducer";

const useTagSearchResult = () => {
  const searchResult = useSelector((state: RootReducer) => state.searchResult);
  const searchCondition = useSelector(
    (state: RootReducer) => state.searchCondition
  );
  const dispatch = useDispatch();
  const showStoreInfo = (storeId: number) => {
    dispatch(getStoreInfo(storeId));
  };

  const moveSearhPage = () => {
    dispatch(setSearchType("hashtagSearch"));
  };

  return {
    moveSearhPage,
    searchResult,
    searchCondition,
    showStoreInfo,
  };
};

export default useTagSearchResult;
