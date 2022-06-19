import { SearchResultType } from "../../../../../../lib/apitype/search";
import styles from "./StoreBox.module.scss";

interface StoreBoxProps {
  searchResult: SearchResultType[];
  showStoreInfo: (storeId: number) => void;
}

const StoreBox = ({ searchResult, showStoreInfo }: StoreBoxProps) => {
  return (
    <>
      {searchResult.map((storeInfo) => {
        return (
          <div
            key={storeInfo.name}
            className={styles.storeinfo}
            onClick={() => {
              showStoreInfo(storeInfo.id);
            }}
          >
            <div className={styles.titlebox}>
              <h3 className={styles.name}>{storeInfo.name}</h3>
              <p className={styles.category}>{storeInfo.category}</p>
            </div>
            <p className={styles.adress}>{storeInfo.dist / 1000}km</p>
            <ul className={styles.taglist}>
              {Object.keys(storeInfo.hashtag)
                .sort(function (a, b) {
                  if (storeInfo.hashtag !== undefined) {
                    return storeInfo.hashtag.a - storeInfo.hashtag.b;
                  }
                  return 0;
                })
                .slice(0, 6)
                .map((hashtagname) => {
                  if (storeInfo.hashtag !== undefined)
                    return (
                      <li key={hashtagname} className={styles.tag}>
                        #{`${hashtagname}  ${storeInfo.hashtag[hashtagname]}`}
                      </li>
                    );
                })}
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default StoreBox;
