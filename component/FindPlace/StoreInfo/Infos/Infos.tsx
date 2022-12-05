import { BiTimeFive } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GiPositionMarker } from "react-icons/gi";
import styles from "./Infos.module.scss";

interface InfosProps {
  tel: null | string;
  address: undefined | string;
  openingHours: null | string;
}

const Infos = ({ tel, address, openingHours }: InfosProps) => {
  return (
    <div className={styles.mainBlock}>
      <h4 className={styles.title}>정보</h4>
      <p className={styles.contentBlock}>
        <BsFillTelephoneFill size={18} className={styles.icon} />
        {tel === null || tel === "" ? "정보없음" : tel}
      </p>
      <p className={styles.contentBlock}>
        <GiPositionMarker size={20} className={styles.icon} />
        {address === undefined ? "정보없음" : address}
      </p>
      <div className={styles.contentBlock}>
        <div>
          <BiTimeFive size={20} className={styles.icon} />
        </div>
        {openingHours === "" || openingHours === null ? (
          <p>정보없음</p>
        ) : (
          <p className={styles.openingHours}>{openingHours}</p>
        )}
      </div>
    </div>
  );
};

export default Infos;
