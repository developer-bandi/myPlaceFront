import { RefObject } from "react";
import MyPageNavigation from "../Common/navigation/MyPageNavigation";
import styles from "./MyInfoSetting.module.scss";
import mypage from "../../../../lib/styles/mypage.module.scss";
import searchResultLoading from "../../../../public/searchResultLoading.gif";
import Image from "next/image";
import { setDateYearMonthDay } from "../../../../lib/commonFn/date";
import Link from "next/link";
import { userInfoDataState } from "./MyInfoSettingContainer";

interface PostListProps {
  serverData: userInfoDataState;
  changeNickname: () => Promise<void>;
  nicknameInputRef: RefObject<HTMLInputElement>;
  isLabtopOrTabletOrMobile: boolean;
}

const MyInfoSetting = ({
  serverData,
  changeNickname,
  nicknameInputRef,
  isLabtopOrTabletOrMobile,
}: PostListProps) => {
  if (serverData.loading) {
    return (
      <div className={mypage.mainBlock}>
        {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
        <div className={mypage.subBlock}>
          <h1 className={mypage.title}>내 정보</h1>
          <div className={mypage.loading}>
            <Image src={searchResultLoading} alt="loading"></Image>
          </div>
        </div>
      </div>
    );
  } else if (serverData.error) {
    return (
      <div className={mypage.mainBlock}>
        {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
        <div className={mypage.subBlock}>
          <h1 className={mypage.title}>내 정보</h1>
          <div className={mypage.error}>에러발생</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={mypage.mainBlock}>
        {isLabtopOrTabletOrMobile ? null : <MyPageNavigation />}
        <div className={mypage.subBlock}>
          <h1 className={mypage.title}>내 정보</h1>
          <div className={styles.infoBlock}>
            <div className={styles.subTitle}>소셜</div>
            <div className={styles.content}>
              {serverData.content !== undefined
                ? { kakao: "카카오", naver: "네이버", local: "연결안됨" }[
                    serverData.content.provider
                  ]
                : null}
            </div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.subTitle}>아이디</div>
            <div className={styles.content}>
              {serverData.content?.localId || ""}
            </div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.subTitle}>이메일</div>
            <div className={styles.content}>
              {serverData.content !== undefined && serverData.content.email}
            </div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.subTitle}>생성일자</div>
            <div className={styles.content}>
              {serverData.content !== undefined &&
                setDateYearMonthDay(serverData.content.createdAt)}
            </div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.subTitle}>닉네임</div>
            <div className={styles.content}>
              <input className={styles.nicknameInput} ref={nicknameInputRef} />
              <button
                className={styles.nicknameUpdateButton}
                onClick={() => changeNickname()}
              >
                수정
              </button>
            </div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.subTitle}>비밀번호</div>
            <div className={styles.content}>
              {serverData.content?.provider === "local" ? (
                <button className={styles.passwordChangeButton}>
                  <Link href="/user/auth/findpassword">
                    비밀번호 재설정하러 이동하기
                  </Link>
                </button>
              ) : (
                "소셜계정은 비밀번호를 재설정할수 없습니다"
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MyInfoSetting;
