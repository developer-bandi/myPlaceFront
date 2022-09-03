import styles from "./StoreRank.module.scss";
import {BiBookmark, BiCommentDetail} from "react-icons/bi";
import {GrView} from "react-icons/gr";
import Image from "next/image";
import {storeRankDataType} from "../../../pages";

interface StoreRankState {
  storeRankData: {content?: storeRankDataType[]; error: boolean};
  moveTargetStore: (
    id: number,
    name: string,
    latitude: string,
    longitude: string,
    address: string
  ) => void;
  renewTime: string;
}

const myLoader = ({src}: {src: string}) => {
  return `${process.env.NEXT_PUBLIC_IMG_URL}/${src}`;
};

const StoreRank = ({
  storeRankData,
  moveTargetStore,
  renewTime,
}: StoreRankState) => {
  if (storeRankData.error) {
    return (
      <section className={styles.mainBlock} data-testid="error">
        <h3 className={styles.title}>인기 Place</h3>
        <p className={styles.error}>에러가 발생하였습니다</p>
      </section>
    );
  } else {
    return (
      <section className={styles.mainBlock} data-testid="result">
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>인기 Place</h3>
          <p className={styles.renewTime}>{`${renewTime} 기준`}</p>
        </div>
        <div className={styles.storeList}>
          {[0, 1, 2, 3, 4].map((data, index) => {
            return (
              <div key={index}>
                {[index, index + 5].map((indexData) => {
                  if (storeRankData.content !== undefined) {
                    const storeData = storeRankData.content[indexData];
                    return (
                      <div
                        className={
                          index === 4 || index === 9
                            ? `${styles.storeBlock} ${styles.end}`
                            : styles.storeBlock
                        }
                        onClick={() =>
                          moveTargetStore(
                            storeData.id,
                            storeData.name,
                            storeData.latitude,
                            storeData.longitude,
                            storeData.address
                          )
                        }
                        data-testid={`moveTargetStore${indexData}`}
                        key={storeData.id}
                      >
                        {storeData.photo !== undefined ? (
                          <Image
                            loader={myLoader}
                            src={`/${storeData.photo}`}
                            alt="searchImg"
                            width="220px"
                            height="150px"
                            priority={true}
                          />
                        ) : (
                          <div className={styles.image}>
                            <Image
                              src={`/107.svg`}
                              alt="searchImg"
                              width="220px"
                              height="150px"
                              priority={true}
                            />
                          </div>
                        )}
                        <h4 className={styles.storeName}>{storeData.name}</h4>
                        <p className={styles.address}>{storeData.address}</p>
                        <ul className={styles.infoList}>
                          <li className={styles.info}>
                            <GrView />
                            {storeData.viewCount}
                          </li>
                          <li className={styles.info}>
                            <BiBookmark />
                            {storeData.bookmark}
                          </li>
                          <li className={styles.info}>
                            <BiCommentDetail />
                            {storeData.review}
                          </li>
                        </ul>
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </section>
    );
  }
};

export default StoreRank;
