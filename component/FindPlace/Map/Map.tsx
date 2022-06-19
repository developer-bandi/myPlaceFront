import styles from "./Map.module.scss";

interface MapProps {
  mapRef: React.RefObject<HTMLDivElement>;
  isMobile: boolean;
}

const Map = ({ mapRef, isMobile }: MapProps) => {
  return (
    <div className={styles.container}>
      <div
        ref={mapRef}
        style={
          isMobile
            ? { width: "100%", height: "400px" }
            : { width: "100%", height: "100%" }
        }
      ></div>
    </div>
  );
};

export default Map;
