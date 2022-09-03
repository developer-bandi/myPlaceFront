import Link from "next/link";
import {useRouter} from "next/router";
import React from "react";
import styles from "./MyPageNavigation.module.scss";

const MyPageNavigation = () => {
  const router = useRouter();
  return (
    <div className={styles.mainBlock}>
      {menuCategoryArr.map((categoryObj) => {
        return (
          <React.Fragment key={categoryObj.title}>
            <div className={styles.subTitle}>{categoryObj.title}</div>
            <ul className={styles.navList}>
              {menuNameArr
                .slice(categoryObj.start, categoryObj.end)
                .map((name, index) => {
                  return (
                    <li
                      className={
                        router.pathname ===
                        `/user/mypage/${
                          menuRouterArr[index + categoryObj.start]
                        }`
                          ? styles.selectedNav
                          : styles.nav
                      }
                      key={name}
                    >
                      <Link
                        href={`/user/mypage/${
                          menuRouterArr[index + categoryObj.start]
                        }`}
                      >
                        {name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </React.Fragment>
        );
      })}
    </div>
  );
};

const menuCategoryArr = [
  {title: "장소찾기", start: 0, end: 2},
  {title: "커뮤니티", start: 2, end: 4},
  {title: "계정", start: 4, end: 7},
];

const menuNameArr = [
  "북마크",
  "작성 후기",
  "작성 글",
  "작성 댓글",
  "내 정보",
  "회원 탈퇴",
];
const menuRouterArr = [
  "bookmark",
  "review",
  "post",
  "comment",
  "infosetting",
  "withdrawal",
];

export default MyPageNavigation;
