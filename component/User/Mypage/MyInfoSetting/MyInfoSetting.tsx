import { RefObject } from "react";
import MyPageNavigation from "../Common/navigation/MyPageNavigation";
import styles from "./MyInfoSetting.module.scss";
import { userInfoContent } from "./MyInfoSettingContainer";
import mypage from "../../../../lib/styles/mypage.module.scss";
import searchResultLoading from "../../../../public/searchResultLoading.gif";
import Image from "next/image";
import { setDateYearMonthDay } from "../../../../lib/commonFn/date";
import { useIsLabtop } from "../../../../lib/customHook/mediaQuery";

interface PostListProps {
  userInfo: {
    content?: userInfoContent | undefined;
    loading: boolean;
    error: boolean;
  };
  changeNickname: () => Promise<void>;
  nicknameInputRef: RefObject<HTMLInputElement>;
}

const MyInfoSetting = ({
  userInfo,
  changeNickname,
  nicknameInputRef,
}: PostListProps) => {
  const isLabtop = useIsLabtop();
  if (userInfo.loading) {
    return (
      <div className={mypage.mainBlock}>
        {isLabtop ? null : <MyPageNavigation />}
        <div className={mypage.subBlock}>
          <h1 className={mypage.title}>내 정보</h1>
          <div className={mypage.loading}>
            <Image src={searchResultLoading} alt="loading"></Image>
          </div>
        </div>
      </div>
    );
  } else {
    if (userInfo.content === undefined && userInfo.error !== null) {
      return (
        <div className={mypage.mainBlock}>
          {isLabtop ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>내 정보</h1>
            <div className={mypage.error}>에러발생</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={mypage.mainBlock}>
          {isLabtop ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>내 정보</h1>
            <div className={styles.infoBlock}>
              <div className={styles.subTitle}>소셜</div>
              <div className={styles.content}>
                {userInfo.content !== undefined
                  ? { kakao: "카카오", naver: "네이버", local: "연결안됨" }[
                      userInfo.content.provider
                    ]
                  : null}
              </div>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.subTitle}>아이디</div>
              <div className={styles.content}>
                {userInfo.content?.localId || ""}
              </div>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.subTitle}>이메일</div>
              <div className={styles.content}>
                {userInfo.content !== undefined && userInfo.content.email}
              </div>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.subTitle}>생성일자</div>
              <div className={styles.content}>
                {userInfo.content !== undefined &&
                  setDateYearMonthDay(userInfo.content.createdAt)}
              </div>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.subTitle}>닉네임</div>
              <div className={styles.content}>
                <input
                  className={styles.nicknameInput}
                  ref={nicknameInputRef}
                />
                <button
                  className={styles.nicknameUpdateButton}
                  onClick={() => changeNickname()}
                >
                  수정
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default MyInfoSetting;
