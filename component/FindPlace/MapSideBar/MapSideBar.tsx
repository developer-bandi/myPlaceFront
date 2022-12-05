import styles from "./MapSideBar.module.scss";
import TagSearchContainer from "./component/TagSearch/TagSearchContainer";
import TagSearchResultContainer from "./component/TagSearchResult/TagSearchResultContainer";
import NameSearchContainer from "./NameSearch/NameSearchContainer";
import NameSearchResultContainer from "./component/NameSearchResult/NameSearchResultContainer";
import { SideBarFoldState } from "../../../store/reducers/sideBarFold/Reducer";
import Header from "./Header/Header";

interface MapSearchSideBarProps {
  changeSidebarStatus: (status: string) => void;
  searchType: string;
  modalStatus: SideBarFoldState;
}

const MapSideBar = ({
  changeSidebarStatus,
  searchType,
  modalStatus,
}: MapSearchSideBarProps) => {
  if (modalStatus.desktop.search) {
    return null;
  } else {
    return (
      <div
        className={`${styles.mainBlock} ${
          modalStatus.mobile.searchStoreInfo ? styles.fold : styles.full
        }`}
      >
        <Header
          changeSidebarStatus={changeSidebarStatus}
          searchType={searchType}
        />
        {searchType === "hashtagSearch" ? (
          <TagSearchContainer />
        ) : searchType === "hashtagResult" ? (
          <TagSearchResultContainer />
        ) : (
          <>
            <NameSearchContainer />
            <NameSearchResultContainer />
          </>
        )}
      </div>
    );
  }
};

export default MapSideBar;
