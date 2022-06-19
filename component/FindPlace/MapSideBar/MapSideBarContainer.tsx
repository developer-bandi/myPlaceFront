import { SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../store";
import { initializeCondition } from "../../../store/reducers/hashtagSearchCondition/hashtagSearchConditionReducer";
import { initializeSearchResult } from "../../../store/reducers/searchResult/searchResultReducer";
import { setSearchType } from "../../../store/reducers/SetSearhType/SearchTypeReducer";
import { initializeStoreInfo } from "../../../store/reducers/storeInfo/storeInfoReducer";
import MapSideBar from "./MapSideBar";

interface MapSearchSideBarContainerProps {
  setMapClick: React.Dispatch<SetStateAction<boolean>>;
}

const MapSideBarContainer = ({
  setMapClick,
}: MapSearchSideBarContainerProps) => {
  const searchType = useSelector((state: RootReducer) => state.SearchType);
  const dispatch = useDispatch();
  const changeSidebarStatus = (status: string) => {
    const confirm = window.confirm("검색결과가 초기화됩니다 이동하시겠습니까?");
    if (confirm) {
      dispatch(initializeCondition());
      dispatch(initializeSearchResult());
      dispatch(initializeStoreInfo());
      dispatch(setSearchType({ type: status, hashtag: "search" }));
      setMapClick(true);
    }
  };
  return (
    <MapSideBar
      changeSidebarStatus={changeSidebarStatus}
      searchType={searchType}
    />
  );
};

export default MapSideBarContainer;
