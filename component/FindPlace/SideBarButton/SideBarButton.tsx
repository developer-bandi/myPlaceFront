import {AiOutlineLeft} from "react-icons/ai";
import styles from "./SideBarButton.module.scss";

interface StoreInfoProps {
  modalStatus: {
    search: boolean;
    storeInfo: boolean;
  };
  isMobile: boolean;
  mobileFoldChange: () => void;
  desktopFoldChange: () => void;
}

const SideBarButton = ({
  modalStatus,
  isMobile,
  mobileFoldChange,
  desktopFoldChange,
}: StoreInfoProps) => {
  if (isMobile) {
    return (
      <button className={styles.mobile} onClick={() => mobileFoldChange()}>
        정보창 조절
      </button>
    );
  } else {
    return (
      <AiOutlineLeft
        size={25}
        className={`${styles.button} ${
          modalStatus.search
            ? styles.fold
            : modalStatus.storeInfo
            ? styles.storeInfoActive
            : styles.storeInfoUnActive
        }`}
        onClick={() => {
          desktopFoldChange();
        }}
      />
    );
  }
};

export default SideBarButton;
