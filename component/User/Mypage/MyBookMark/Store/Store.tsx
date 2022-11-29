import Image from "next/image";
import { BiBookmark, BiCommentDetail } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { loader } from "../../../../../lib/commonFn/loader";
import { bookMarkContentRow } from "../MyBookMarkContainer";
import styles from "./Store.module.scss";

interface StoreProps {
  index: number;
  content: bookMarkContentRow;
  moveTargetStore: (
    id: number,
    name: string,
    latitude: string,
    longitude: string,
    address: string
  ) => void;
}

const Store = ({ index, content, moveTargetStore }: StoreProps) => {
  return (
    <div
      className={`${styles.mainBlock} ${
        (index + 1) % 2 === 0 ? styles.two : null
      } ${(index + 1) % 3 === 0 ? styles.three : null} ${
        (index + 1) % 4 === 0 ? styles.four : null
      }`}
      onClick={() =>
        moveTargetStore(
          content.id,
          content.name,
          content.latitude,
          content.longitude,
          content.address
        )
      }
      key={content.id}
    >
      {content.photo !== undefined ? (
        <div className={styles.image}>
          <Image
            loader={loader({ width: 600, height: 400 })}
            src={`${content.photo}`}
            alt="searchImg"
            layout="fill"
          />
        </div>
      ) : (
        <div className={styles.image}>
          <Image
            src={`/107.svg`}
            alt="searchImg"
            layout="fill"
            priority={true}
          />
        </div>
      )}
      <h4 className={styles.name}>{content.name}</h4>
      <p className={styles.address}>{content.address}</p>
      <ul className={styles.infoList}>
        <li className={styles.info}>
          <GrView />
          {content.viewCount}
        </li>
        <li className={styles.info}>
          <BiBookmark />
          {content.bookmark}
        </li>
        <li className={styles.info}>
          <BiCommentDetail />
          {content.review}
        </li>
      </ul>
    </div>
  );
};

export default Store;
