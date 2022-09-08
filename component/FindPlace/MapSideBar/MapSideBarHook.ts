import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../../store";
import {
  initializeHashtag,
  initializeKeyword,
} from "../../../store/reducers/searchCondition/Reducer";
import {setClickPossible} from "../../../store/reducers/standardMarker/Reducer";
import {initializeSearchResult} from "../../../store/reducers/searchResult/Reducer";
import {setSearchType} from "../../../store/reducers/searhType/Reducer";
import {initializeStoreInfo} from "../../../store/reducers/storeInfo/Reducer";
import {setDesktopStoreInfo} from "../../../store/reducers/sideBarFold/Reducer";

const useMapSideBar = () => {
  const searchType = useSelector((state: RootReducer) => state.searchType.type);
  const modalStatus = useSelector((state: RootReducer) => state.searchModal);
  const dispatch = useDispatch();
  const changeSidebarStatus = (status: string) => {
    const confirm = window.confirm("검색결과가 초기화됩니다 이동하시겠습니까?");
    if (confirm) {
      if (status.indexOf("hashtag") !== -1) {
        dispatch(initializeHashtag());
      } else {
        dispatch(initializeKeyword());
      }
      dispatch(initializeSearchResult());
      dispatch(initializeStoreInfo());
      dispatch(setSearchType(status));
      dispatch(setClickPossible(true));
      dispatch(setDesktopStoreInfo(false));
    }
  };

  return {
    changeSidebarStatus,
    searchType,
    modalStatus,
  };
};

export default useMapSideBar;
