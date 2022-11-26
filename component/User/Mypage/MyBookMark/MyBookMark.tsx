import styles from "./MyBookMark.module.scss";
import mypage from "../../../../lib/styles/mypage.module.scss";
import MyPageNavigation from "../Common/navigation/MyPageNavigation";
import searchResultLoading from "../../../../public/searchResultLoading.gif";
import Image from "next/image";
import { GrView } from "react-icons/gr";
import { BiBookmark, BiCommentDetail } from "react-icons/bi";
import { bookMarkState } from "./MyBookMarkContainer";
import PageNationContainer from "../../../Common/PageNation/PageNationContainer";

interface MyBookMarkProps {
  bookMarkState: bookMarkState;
  moveTargetStore: (
    id: number,
    name: string,
    latitude: string,
    longitude: string,
    address: string
  ) => void;
  page: number;
  changePage: (page: number) => Promise<void>;
  isLabtopOrTabletOrMobile: boolean;
}

const myLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMG_URL}/w_600,h_400${process.env.NEXT_PUBLIC_IMG_ID}/${src}`;
};
const MyBookMark = ({
  bookMarkState,
  moveTargetStore,
  page,
  changePage,
  isLabtopOrTabletOrMobile,
}: MyBookMarkProps) => {
  if (bookMarkState.loading) {
    return (
      <div className={mypage.mainBlock}>
        {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
        <div className={mypage.subBlock}>
          <h1 className={mypage.title}>북마크</h1>
          <div className={mypage.loading} data-testid="loading">
            <Image src={searchResultLoading} alt="loading"></Image>
          </div>
        </div>
      </div>
    );
  } else {
    if (bookMarkState.content === undefined && bookMarkState.error) {
      return (
        <div className={mypage.mainBlock} data-testid="error">
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>북마크</h1>
            <div className={mypage.error}>에러발생</div>
          </div>
        </div>
      );
    } else if (
      bookMarkState.content !== undefined &&
      bookMarkState.content.count === 0
    ) {
      return (
        <div className={mypage.mainBlock} data-testid="noResult">
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>북마크</h1>
            <div className={mypage.noResult}>북마크 없음</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={mypage.mainBlock} data-testid="result">
          {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>북마크</h1>
            {bookMarkState.content !== undefined &&
              bookMarkState.content.rows.map((storeData, index) => {
                return (
                  <div
                    className={`${styles.bookMarkBlock} ${
                      (index + 1) % 2 === 0 ? styles.two : null
                    } ${(index + 1) % 3 === 0 ? styles.three : null} ${
                      (index + 1) % 4 === 0 ? styles.four : null
                    }`}
                    onClick={() =>
                      moveTargetStore(
                        storeData.id,
                        storeData.name,
                        storeData.latitude,
                        storeData.longitude,
                        storeData.address
                      )
                    }
                    data-testid={`moveTargetStore${index}`}
                    key={storeData.id}
                  >
                    {storeData.photo !== undefined ? (
                      <div className={styles.image}>
                        <Image
                          loader={myLoader}
                          src={`/${storeData.photo}`}
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
              })}
            <PageNationContainer
              page={page}
              changePage={changePage}
              totalAmount={bookMarkState.content?.count as number}
              contentUnit={24}
              pageUnit={5}
            />
          </div>
        </div>
      );
    }
  }
};

export default MyBookMark;
