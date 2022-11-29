import styles from "./StoreRank.module.scss";
import { storeRankDataType } from "../../../pages";
import Store from "./Store/Store";

interface StoreRankState {
  storeRankData: { content?: storeRankDataType[]; error: boolean };
  moveTargetStore: (
    id: number,
    name: string,
    latitude: string,
    longitude: string,
    address: string
  ) => void;
  renewTime: string;
}

const StoreRank = ({
  storeRankData,
  moveTargetStore,
  renewTime,
}: StoreRankState) => {
  if (storeRankData.error) {
    return (
      <section className={styles.mainBlock}>
        <h3 className={styles.title}>인기 Place</h3>
        <p className={styles.error}>에러가 발생하였습니다</p>
      </section>
    );
  } else {
    return (
      <section className={styles.mainBlock}>
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>인기 Place</h3>
          <p className={styles.renewTime}>{`${renewTime} 기준`}</p>
        </div>
        <div className={styles.storeList}>
          {[0, 1, 2, 3, 4].map((_, firstIndex) => {
            return (
              <div key={firstIndex}>
                {[firstIndex, firstIndex + 5].map((secondIndex) => {
                  if (storeRankData.content !== undefined) {
                    const { ...storeData } = storeRankData.content[secondIndex];
                    return (
                      <Store
                        {...storeData}
                        moveTargetStore={moveTargetStore}
                        index={secondIndex}
                      />
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
