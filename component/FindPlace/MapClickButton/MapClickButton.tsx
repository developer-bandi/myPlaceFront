import styles from "./MapClickButton.module.scss";

interface MapClickButtonProps {
  changeActive: () => void;
  clickActive: boolean;
}

const MapClickButton = ({changeActive, clickActive}: MapClickButtonProps) => {
  if (!clickActive) {
    return (
      <button
        className={styles.button}
        onClick={() => {
          changeActive();
        }}
      >
        지도 클릭 활성화
      </button>
    );
  } else {
    return null;
  }
};

export default MapClickButton;
