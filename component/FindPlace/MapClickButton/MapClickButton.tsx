import styles from "./MapClickButton.module.scss";

interface MapClickButtonProps {
  changeClickPossible: () => void;
  clickActive: boolean;
}

const MapClickButton = ({
  changeClickPossible,
  clickActive,
}: MapClickButtonProps) => {
  if (!clickActive) {
    return (
      <button
        className={styles.button}
        onClick={() => {
          changeClickPossible();
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
