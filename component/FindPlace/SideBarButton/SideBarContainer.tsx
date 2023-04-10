import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useIsMobile } from "../../../hooks/mediaQuery";
import { RootReducer } from "../../../store";
import {
  setDesktopSearch,
  setMobileSearchStoreInfo,
} from "../../../store/reducers/sideBarFold/Reducer";
import SideBarButton from "./SideBarButton";

const SideBarButtonContainer = () => {
  const modalStatus = useSelector(
    (state: RootReducer) => state.searchModal.desktop
  );
  const dispatch = useDispatch();
  const mobileFoldChange = () => {
    dispatch(setMobileSearchStoreInfo());
  };
  const desktopFoldChange = () => {
    dispatch(setDesktopSearch());
  };
  const isMobile = useIsMobile();

  return (
    <SideBarButton
      modalStatus={modalStatus}
      isMobile={isMobile}
      mobileFoldChange={mobileFoldChange}
      desktopFoldChange={desktopFoldChange}
    ></SideBarButton>
  );
};

export default SideBarButtonContainer;
