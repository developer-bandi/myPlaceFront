import React from "react";
import styles from "./MyPageModal.module.scss";
import Link from "next/link";
import {GrClose} from "react-icons/gr";

interface MyPageModalProps {
  userLogout: () => void;
  modalActvieChange: () => void;
  isMobile: boolean;
}

const MyPageModal = ({
  userLogout,
  modalActvieChange,
  isMobile,
}: MyPageModalProps) => {
  return (
    <div className={styles.mainBlock}>
      <nav className={styles.subBlock}>
        <ul className={styles.navListBlock}>
          {isMobile ? (
            <li className={styles.titleBlock} data-testid="mobile">
              <div className={styles.title}>마이페이지</div>
              <GrClose
                className={styles.closeIcon}
                onClick={() => {
                  modalActvieChange();
                }}
                data-testid="modalActvieChange"
              />
            </li>
          ) : null}
          {menuList.map((menuObj, index) => {
            return (
              <li
                className={styles.nav}
                key={menuObj.name}
                onClick={modalActvieChange}
                data-testid={`modalActvieChange${index}`}
              >
                <Link href={`/user/mypage/${menuObj.router}`}>
                  {menuObj.name}
                </Link>
              </li>
            );
          })}
          <li
            className={styles.logout}
            onClick={userLogout}
            key={"로그아웃"}
            data-testid="userLogout"
          >
            로그아웃
          </li>
        </ul>
      </nav>
    </div>
  );
};

const menuList = [
  {
    name: "북마크",
    router: "bookmark",
  },
  {
    name: "작성 후기",
    router: "review",
  },
  {
    name: "작성 글",
    router: "post",
  },
  {
    name: "작성 댓글",
    router: "comment",
  },
  {
    name: "개인정보관리",
    router: "infosetting",
  },
  {
    name: "비밀번호 변경",
    router: "password",
  },
  {
    name: "회원탈퇴",
    router: "withdrawal",
  },
];

export default MyPageModal;
