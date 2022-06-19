import { SetStateAction } from "react";
import styles from "./MapClickButton.module.scss";

interface MapClickButtonProps {
  setMapClick: React.Dispatch<SetStateAction<boolean>>;
}

const MapClickButton = ({ setMapClick }: MapClickButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={() => {
        setMapClick(true);
      }}
    >
      지도 클릭 활성화
    </button>
  );
};

export default MapClickButton;
