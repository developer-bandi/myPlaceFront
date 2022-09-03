import styles from "./Map.module.scss";

interface MapProps {
  mapRef: React.RefObject<HTMLDivElement>;
}

const Map = ({mapRef}: MapProps) => {
  return (
    <div className={styles.container}>
      <div ref={mapRef} style={{width: "100%", height: "100%"}}></div>
    </div>
  );
};

export default Map;
