import styles from "./MapSideBar.module.scss";
import TagSearchContainer from "./component/TagSearch/TagSearchContainer";
import TagSearchResultContainer from "./component/TagSearchResult/TagSearchResultContainer";
import NameSearchContainer from "./component/NameSearch/NameSearchContainer";
import NameSearchResultContainer from "./component/NameSearchResult/NameSearchResultContainer";
import {SearchTypeState} from "../../../store/reducers/searhType/Reducer";
import {SearchModalState} from "../../../store/reducers/searchModal/Reducer";

interface MapSearchSideBarProps {
  changeSidebarStatus: (status: string) => void;
  searchType: SearchTypeState;
  modalStatus: SearchModalState;
}

const MapSideBar = ({
  changeSidebarStatus,
  searchType,
  modalStatus,
}: MapSearchSideBarProps) => {
  if (modalStatus.desktop.fold) {
    return null;
  } else {
    return (
      <aside
        className={`${styles.mainBlock} ${
          modalStatus.mobile.fold ? styles.fold : styles.full
        }`}
      >
        <div className={styles.searchmethodcontainer}>
          {searchmethodArr.map((data: string, index: number) => {
            return (
              <div
                className={
                  searchType.type === data
                    ? styles.selectedsearchmethod
                    : styles.searchmethod
                }
                onClick={() => {
                  changeSidebarStatus(data);
                }}
                key={data}
                data-testid={`changeSidebarStatus${index}`}
              >
                {searchmethodKrArr[index]}
              </div>
            );
          })}
        </div>
        {searchType.type === "hashtag" ? (
          searchType.hashtag === "search" ? (
            <TagSearchContainer />
          ) : (
            <TagSearchResultContainer />
          )
        ) : (
          <>
            <NameSearchContainer />
            <NameSearchResultContainer />
          </>
        )}
      </aside>
    );
  }
};

const searchmethodArr = ["hashtag", "name"];
const searchmethodKrArr = ["태그로 검색하기", "이름으로 검색하기"];

export default MapSideBar;
