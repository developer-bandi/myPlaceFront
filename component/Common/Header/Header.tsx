import styles from "./Header.module.scss";
import Link from "next/link";
import {signupState} from "../../../store/reducers/userLogin/Reducer";
import {BiUserCircle} from "react-icons/bi";
import {BsBell} from "react-icons/bs";
import {VscBell, VscBellDot} from "react-icons/vsc";
import {GoPrimitiveDot} from "react-icons/go";
import NoticeContainer from "../Notion/NotionContainer";
import {mypageModalState} from "../../../store/reducers/modalStatus/Reducer";
import MyPageModalContainer from "../MyPageModal/MyPageModalContainer";

interface HeaderProps {
  loginedUser: signupState;
  changePageModal: () => void;
  changeNoticeModal: () => void;
  isNotice: boolean;
  modalStatus: mypageModalState;
  isMobile: boolean;
}

const Header = ({
  loginedUser,
  changePageModal,
  changeNoticeModal,
  isNotice,
  modalStatus,
  isMobile,
}: HeaderProps) => {
  return (
    <header className={styles.mainBlock}>
      <div className={styles.subBlock}>
        <div className={styles.title}>
          <Link href="/">MyPlace</Link>
        </div>
        <ul className={styles.navigationBlock}>
          {isMobile
            ? null
            : menuList.map((menuObj) => {
                return (
                  <li key={menuObj.name} className={styles.navigationName}>
                    <Link href={menuObj.router}>{menuObj.name}</Link>
                  </li>
                );
              })}
        </ul>
        {loginedUser.content ? (
          <div className={styles.userBlock} data-testid="login">
            <p className={styles.userInfo}>
              {loginedUser.content.nickname}님 반갑습니다
            </p>
            <button
              className={styles.notice}
              onClick={() => {
                changeNoticeModal();
              }}
              data-testid="modalActvieChange"
            >
              <VscBell size={25} />
              {isNotice ? (
                <GoPrimitiveDot size={25} className={styles.dot} />
              ) : null}
            </button>
            <button
              className={styles.mypage}
              onClick={() => {
                changePageModal();
              }}
              data-testid="modalActvieChange"
            >
              <BiUserCircle size={25} />
            </button>
          </div>
        ) : (
          <button className={styles.signin} data-testid="logout">
            <Link href={"/user/auth/signin"}>로그인/회원가입</Link>
          </button>
        )}
      </div>
      {isMobile ? (
        <div className={styles.subBlock} data-testid="mobile">
          <ul className={styles.bottomNavigationBlock}>
            {menuList.map((menuObj) => {
              return (
                <li key={menuObj.name} className={styles.navigationName}>
                  <Link href={menuObj.router}>{menuObj.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      {modalStatus.mypage ? <MyPageModalContainer /> : null}
      {modalStatus.notice ? <NoticeContainer /> : null}
    </header>
  );
};

const menuList = [
  {
    name: "장소찾기",
    router: "/findplace",
  },
  {
    name: "커뮤니티",
    router: "/community/postlist",
  },
  {
    name: "기여하기",
    router: "/contribute",
  },
];

export default Header;
