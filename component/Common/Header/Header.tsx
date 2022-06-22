import styles from "./Header.module.scss";
import Link from "next/link";
import { signupState } from "../../../store/reducers/userLogin/userLoginReducer";
import { useIsLabtop, useIsTablet } from "../../../lib/customHook/mediaQuery";
import { useState } from "react";
import MyPageNavigation from "../../User/Mypage/Common/navigation/MyPageNavigation";

interface HeaderProps {
  loginedUser: signupState;
  userLogout: () => void;
}

const Header = ({ loginedUser, userLogout }: HeaderProps) => {
  const isTabletOrMobile = useIsTablet();
  const [subNavigation, setSubnavigation] = useState(false);
  const isLabtop = useIsLabtop();
  return (
    <header className={styles.mainBlock}>
      <div className={styles.subBlock}>
        <div className={styles.title}>
          <Link href="/">MyPlace</Link>
        </div>
        <ul className={styles.navigationBlock}>
          {isTabletOrMobile
            ? null
            : menulist.map((data: string, index: number) => {
                return (
                  <li key={data} className={styles.navigationName}>
                    <Link href={menuadress[index]}>{data}</Link>
                  </li>
                );
              })}
        </ul>
        {loginedUser.loginStatus ? (
          <div className={styles.userBlock}>
            <p className={styles.userInfo}>{loginedUser.userInfo.nickname}</p>
            <button
              onClick={() => {
                userLogout();
              }}
              className={styles.logout}
            >
              로그아웃
            </button>

            {isLabtop ? (
              <button
                className={styles.mypage}
                onClick={() => {
                  setSubnavigation(!subNavigation);
                }}
              >
                마이페이지
              </button>
            ) : (
              <button className={styles.mypage}>
                <Link href={"/user/mypage/bookmark"}>마이페이지</Link>
              </button>
            )}
          </div>
        ) : (
          <button className={styles.signin}>
            <Link href={"/user/auth/signin"}>로그인/회원가입</Link>
          </button>
        )}
      </div>
      {isTabletOrMobile ? (
        <div className={styles.subBlock}>
          <ul className={styles.bottomNavigationBlock}>
            {menulist.map((data: string, index: number) => {
              return (
                <li key={data} className={styles.navigationName}>
                  <Link href={menuadress[index]}>{data}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      {subNavigation ? (
        <div className={styles.myPageNavigationBlock}>
          <MyPageNavigation />
        </div>
      ) : null}
    </header>
  );
};

const menulist = ["장소찾기", "커뮤니티", "기여하기"];
const menuadress = [
  "/findplace",
  "/community/postlist",
  "/contribute/addstoreposition",
];

export default Header;
