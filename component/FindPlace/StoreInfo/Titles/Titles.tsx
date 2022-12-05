import { AiOutlineLeft } from "react-icons/ai";
import { BsBookmarkFill } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import styles from "./Titles.module.scss";

interface TitlesProps {
  storeInfo: { id: number; name: string; category: string };
  postBookMark: (StoreId: number) => Promise<void>;
  deleteBookMark: (StoreId: number) => Promise<void>;
  deleteStoreTab: () => void;
  isMobile: boolean;
  bookmark?: boolean;
}

const Titles = ({
  isMobile,
  deleteStoreTab,
  storeInfo,
  deleteBookMark,
  postBookMark,
  bookmark,
}: TitlesProps) => {
  return (
    <div className={styles.titleBlock}>
      {isMobile ? (
        <button onClick={deleteStoreTab} className={styles.moveList}>
          <AiOutlineLeft size={"25"} />
        </button>
      ) : null}
      <h3 className={styles.storeName}>{storeInfo.name}</h3>
      <p className={styles.category}>{storeInfo.category}</p>
      {bookmark ? (
        <BsBookmarkFill
          className={styles.bookmarkIcon}
          onClick={() => {
            if (storeInfo !== undefined) {
              deleteBookMark(storeInfo.id);
            }
          }}
        />
      ) : (
        <FaRegBookmark
          className={styles.bookmarkIcon}
          onClick={() => {
            if (storeInfo !== undefined) {
              postBookMark(storeInfo.id);
            }
          }}
        />
      )}
    </div>
  );
};

export default Titles;
