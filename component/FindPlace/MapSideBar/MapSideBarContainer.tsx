import MapSideBar from "./MapSideBar";
import useMapSideBar from "./MapSideBarHook";

const MapSideBarContainer = () => {
  const {changeSidebarStatus, searchType, modalStatus} = useMapSideBar();

  return (
    <MapSideBar
      changeSidebarStatus={changeSidebarStatus}
      searchType={searchType}
      modalStatus={modalStatus}
    />
  );
};

export default MapSideBarContainer;
