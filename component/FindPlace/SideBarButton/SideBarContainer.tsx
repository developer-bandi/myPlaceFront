import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {useIsMobile} from "../../../lib/customHook/mediaQuery";
import {RootReducer} from "../../../store";
import {
  changeDesktopFold,
  changeMobileFold,
} from "../../../store/reducers/searchModal/Reducer";
import SideBarButton from "./SideBarButton";

const SideBarButtonContainer = () => {
  const modalStatus = useSelector(
    (state: RootReducer) => state.searchModal.desktop
  );
  const dispatch = useDispatch();
  const mobileFoldChange = () => {
    dispatch(changeMobileFold());
  };
  const desktopFoldChange = () => {
    dispatch(changeDesktopFold());
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
