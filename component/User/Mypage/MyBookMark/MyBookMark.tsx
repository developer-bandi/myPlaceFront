import mypage from "../../../../lib/styles/mypage.module.scss";
import MyPageNavigation from "../Common/navigation/MyPageNavigation";
import searchResultLoading from "../../../../public/searchResultLoading.gif";
import Image from "next/image";
import { bookMarkState } from "./MyBookMarkContainer";
import PageNationContainer from "../../../Common/PageNation/PageNationContainer";
import Store from "./Store/Store";

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
                  <Store
                    content={storeData}
                    index={index}
                    moveTargetStore={moveTargetStore}
                  />
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
