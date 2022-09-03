import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../../../../store";
import {getStoreInfo} from "../../../../../store/reducers/storeInfo/Reducer";
import NameSearchResult from "./NameSearchResut";

const NameSearchResultContainer = () => {
  const searchResult = useSelector((state: RootReducer) => state.searchResult);
  const dispatch = useDispatch();
  const showStoreInfo = (storeId: number) => {
    dispatch(getStoreInfo(storeId));
  };

  return (
    <NameSearchResult
      searchResult={searchResult}
      showStoreInfo={showStoreInfo}
    />
  );
};

export default NameSearchResultContainer;
