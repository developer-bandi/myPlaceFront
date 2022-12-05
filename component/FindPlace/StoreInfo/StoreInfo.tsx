import styles from "./StoreInfo.module.scss";
import Image from "next/image";
import { storeInfoState } from "../../../store/reducers/storeInfo/Reducer";
import { SideBarFoldState } from "../../../store/reducers/sideBarFold/Reducer";
import searchResultLoading from "../../../public/searchResultLoading.gif";
import { loader } from "../../../lib/commonFn/loader";
import Titles from "./Titles/Titles";
import Buttons from "./Buttons/Buttons";
import Infos from "./Infos/Infos";
import Menus from "./Menus/Menus";
import Hashtags from "./Hashtags/Hashtags";
import Reviews from "./Reviews/Reviews";

interface StoreInfoProps {
  store: storeInfoState;
  postBookMark: (StoreId: number) => Promise<void>;
  deleteBookMark: (StoreId: number) => Promise<void>;
  deleteStoreTab: () => void;
  modalStatus: SideBarFoldState;
  isMobile: boolean;
}

const StoreInfo = ({
  store,
  postBookMark,
  deleteBookMark,
  deleteStoreTab,
  modalStatus,
  isMobile,
}: StoreInfoProps) => {
  if (store.error) {
    return (
      <section
        className={`${styles.mainBlock} ${
          modalStatus.mobile.searchStoreInfo ? styles.fold : styles.full
        }`}
      >
        <div className={styles.message}>에러가 발생하였습니다</div>
      </section>
    );
  } else if (store.loading) {
    return (
      <section
        className={`${styles.mainBlock} ${
          modalStatus ? styles.fold : styles.full
        }`}
      >
        <div className={styles.loadingBlock}>
          <Image
            src={searchResultLoading}
            alt="searchImg"
            layout="fill"
            objectFit="contain"
            priority={true}
          ></Image>
        </div>
      </section>
    );
  } else if (store.content === undefined || modalStatus.desktop.search) {
    return null;
  } else if (store.content?.storeInfo !== undefined) {
    return (
      <section
        className={`${styles.mainBlock} ${
          modalStatus ? styles.fold : styles.full
        }`}
      >
        {store.content.mainPhoto !== undefined ? (
          <div className={styles.mainImgBlock}>
            <Image
              loader={loader({ width: 740, height: 300 })}
              src={store.content.mainPhoto}
              layout="fill"
              object-fit="cover"
            />
          </div>
        ) : null}
        <Titles
          storeInfo={{
            id: store.content.storeInfo.id,
            name: store.content.storeInfo.name,
            category: store.content.storeInfo.category,
          }}
          postBookMark={postBookMark}
          deleteBookMark={deleteBookMark}
          deleteStoreTab={deleteStoreTab}
          isMobile={isMobile}
          bookmark={store.content.bookmark}
        />
        <Buttons id={store.content.storeInfo.id} />
        <Infos
          tel={store.content.storeInfo.tel}
          address={store.content.storeInfo.address}
          openingHours={store.content.storeInfo.openingHours}
        />
        <Menus menus={store.content.Menus} />
        <div className={styles.reviewBlock}>
          <h4 className={styles.subTitle}>후기</h4>
          <Hashtags hashtags={store.content.hashtags} />
          <Reviews reviews={store.content.Reviews} />
        </div>
      </section>
    );
  } else {
    return null;
  }
};

export default StoreInfo;
