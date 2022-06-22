import styles from "./MyBookMark.module.scss";
import mypage from "../../../../lib/styles/mypage.module.scss";
import MyPageNavigation from "../Common/navigation/MyPageNavigation";
import searchResultLoading from "../../../../public/searchResultLoading.gif";
import Image from "next/image";
import {
  useIsLabtop,
  useIsTablet,
} from "../../../../lib/customHook/mediaQuery";

interface MyPageBookMarkProps {
  userBookMark: {
    content?: {
      id: number;
      name: string;
      latitude: string;
      longitude: string;
      address: string;
      category: string;
    }[];
    loading: boolean;
    error: string | null;
  };
  searchStoreInfo: (
    id: number,
    name: string,
    latitude: string,
    longitude: string,
    address: string
  ) => void;
}

const MyPageBookMark = ({
  userBookMark,
  searchStoreInfo,
}: MyPageBookMarkProps) => {
  const isLabtop = useIsLabtop();
  if (userBookMark.loading) {
    return (
      <div className={mypage.mainBlock}>
        {isLabtop ? null : <MyPageNavigation />}
        <div className={mypage.subBlock}>
          <h1 className={styles.title}>북마크</h1>
          <div className={mypage.loading}>
            <Image src={searchResultLoading} alt="loading"></Image>
          </div>
        </div>
      </div>
    );
  } else {
    if (userBookMark.content === undefined && userBookMark.error !== null) {
      return (
        <div className={mypage.mainBlock}>
          {isLabtop ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={styles.title}>북마크</h1>
            <div className={mypage.error}>에러발생</div>
          </div>
        </div>
      );
    } else if (userBookMark.content?.length === 0) {
      return (
        <div className={mypage.mainBlock}>
          {isLabtop ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={styles.title}>북마크</h1>
            <div className={mypage.noResult}>북마크 없음</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={mypage.mainBlock}>
          {isLabtop ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={styles.title}>북마크</h1>
            {userBookMark.content !== undefined &&
              userBookMark.content.map((store) => {
                return (
                  <div
                    className={styles.bookMarkBlock}
                    onClick={() => {
                      searchStoreInfo(
                        store.id,
                        store.name,
                        store.latitude,
                        store.longitude,
                        store.address
                      );
                    }}
                  >
                    <div className={styles.name}>{store.name}</div>
                    <div className={styles.category}>{store.category}</div>
                    <div className={styles.adress}>{store.address}</div>
                  </div>
                );
              })}
          </div>
        </div>
      );
    }
  }
};

export default MyPageBookMark;
