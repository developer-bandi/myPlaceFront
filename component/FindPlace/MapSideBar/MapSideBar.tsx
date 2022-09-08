import styles from "./MapSideBar.module.scss";
import TagSearchContainer from "./component/TagSearch/TagSearchContainer";
import TagSearchResultContainer from "./component/TagSearchResult/TagSearchResultContainer";
import NameSearchContainer from "./component/NameSearch/NameSearchContainer";
import NameSearchResultContainer from "./component/NameSearchResult/NameSearchResultContainer";
import {SideBarFoldState} from "../../../store/reducers/sideBarFold/Reducer";

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
        <div className={styles.searchmethodcontainer}>
          {[
            {en: "hashtag", kr: "해시태그로 검색하기"},
            {en: "keyword", kr: "키워드로 검색하기"},
          ].map((type) => {
            return (
              <div
                className={
                  searchType.indexOf(type.en) !== -1
                    ? styles.selectedsearchmethod
                    : styles.searchmethod
                }
                onClick={() => {
                  changeSidebarStatus(`${type.en}Search`);
                }}
                key={type.kr}
                data-testid={`changeSidebarStatus${type.en}`}
              >
                {type.kr}
              </div>
            );
          })}
        </div>
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
