import Image from "next/image";
import { BiBookmark, BiCommentDetail } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { loader } from "../../../../lib/commonFn/loader";
import styles from "./Store.module.scss";

interface StoreProps {
  index: number;
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  photo?: string;
  viewCount: number;
  bookmark: number;
  review: number;
  moveTargetStore: (
    id: number,
    name: string,
    latitude: string,
    longitude: string,
    address: string
  ) => void;
}

const Store = ({
  index,
  id,
  name,
  latitude,
  longitude,
  address,
  photo,
  viewCount,
  bookmark,
  review,
  moveTargetStore,
}: StoreProps) => {
  return (
    <div
      className={`${styles.mainBlock} ${
        index === 4 || index === 9 ? styles.end : ""
      }`}
      onClick={() => moveTargetStore(id, name, latitude, longitude, address)}
      key={id}
    >
      <div className={styles.image}>
        <Image
          loader={
            photo !== undefined
              ? loader({ width: 440, height: 300 })
              : undefined
          }
          src={photo !== undefined ? `${photo}` : `/107.svg`}
          alt="searchImg"
          layout="fill"
        />
      </div>
      <h4 className={styles.name}>{name}</h4>
      <p className={styles.address}>{address}</p>
      <ul className={styles.infoList}>
        <li className={styles.info}>
          <GrView />
          {viewCount}
        </li>
        <li className={styles.info}>
          <BiBookmark />
          {bookmark}
        </li>
        <li className={styles.info}>
          <BiCommentDetail />
          {review}
        </li>
      </ul>
    </div>
  );
};

export default Store;
