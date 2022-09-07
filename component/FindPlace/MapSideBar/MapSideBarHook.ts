import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../../store";
import {initializeCondition} from "../../../store/reducers/hashtagSearchCondition/Reducer";
import {setTrue} from "../../../store/reducers/mapClick/Reducer";
import {changeDesktopStoreInfoActive} from "../../../store/reducers/searchModal/Reducer";
import {initializeSearchResult} from "../../../store/reducers/searchResult/Reducer";
import {setSearchType} from "../../../store/reducers/searhType/Reducer";
import {initializeStoreInfo} from "../../../store/reducers/storeInfo/Reducer";

const useMapSideBar = () => {
  const searchType = useSelector((state: RootReducer) => state.searchType);
  const modalStatus = useSelector((state: RootReducer) => state.searchModal);
  const dispatch = useDispatch();
  const changeSidebarStatus = (status: string) => {
    const confirm = window.confirm("검색결과가 초기화됩니다 이동하시겠습니까?");
    if (confirm) {
      dispatch(initializeCondition());
      dispatch(initializeSearchResult());
      dispatch(initializeStoreInfo());
      dispatch(setSearchType({type: status, hashtag: "search"}));
      dispatch(setTrue());
      dispatch(changeDesktopStoreInfoActive(false));
    }
  };

  return {
    changeSidebarStatus,
    searchType,
    modalStatus,
  };
};

export default useMapSideBar;
