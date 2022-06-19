import { SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store";
import SideBarButton from "./SideBarButton";

interface SideBarButtonContainerProps {
  setSideBarActive: React.Dispatch<SetStateAction<boolean>>;
  sideBarActive: boolean;
}

const SideBarButtonContainer = ({
  setSideBarActive,
  sideBarActive,
}: SideBarButtonContainerProps) => {
  const storeInfo = useSelector((state: RootReducer) => state.storeInfo);
  return (
    <SideBarButton
      storeInfo={storeInfo}
      setSideBarActive={setSideBarActive}
      sideBarActive={sideBarActive}
    ></SideBarButton>
  );
};

export default SideBarButtonContainer;
