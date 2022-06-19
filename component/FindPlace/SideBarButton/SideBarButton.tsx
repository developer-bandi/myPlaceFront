import { SetStateAction, useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { storeInfoState } from "../../../store/reducers/storeInfo/storeInfoReducer";
import styles from "./SideBarButton.module.scss";

interface StoreInfoProps {
  storeInfo: storeInfoState;
  setSideBarActive: React.Dispatch<SetStateAction<boolean>>;
  sideBarActive: boolean;
}

const SideBarButton = ({
  storeInfo,
  setSideBarActive,
  sideBarActive,
}: StoreInfoProps) => {
  const [status, setStatus] = useState("storeInfoUnActive");
  useEffect(() => {
    if (sideBarActive) {
      if (Object.keys(storeInfo.content).length === 0) {
        setStatus("storeInfoUnActive");
      } else {
        setStatus("storeInfoActive");
      }
    } else {
      setStatus("folded");
    }
  }, [sideBarActive, storeInfo]);

  return (
    <AiOutlineLeft
      size={25}
      className={styles[status]}
      onClick={() => {
        setSideBarActive(!sideBarActive);
      }}
    />
  );
};

export default SideBarButton;
