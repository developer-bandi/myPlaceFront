import { SetStateAction } from "react";
import styles from "./MapSideBar.module.scss";
import TagSearchContainer from "./component/TagSearch/TagSearchContainer";
import TagSearchResultContainer from "./component/TagSearchResult/TagSearchResultContainer";
import NameSearchContainer from "./component/NameSearch/NameSearchContainer";
import NameSearchResultContainer from "./component/NameSearchResult/NameSearchResultContainer";
import { SearchTypeState } from "../../../store/reducers/SetSearhType/SearchTypeReducer";

interface MapSearchSideBarProps {
  changeSidebarStatus: (status: string) => void;
  searchType: SearchTypeState;
}

const MapSideBar = ({
  changeSidebarStatus,
  searchType,
}: MapSearchSideBarProps) => {
  return (
    <aside className={styles.mainBlock}>
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
};

const searchmethodArr = ["hashtag", "name"];
const searchmethodKrArr = ["태그로 검색하기", "이름으로 검색하기"];

export default MapSideBar;
