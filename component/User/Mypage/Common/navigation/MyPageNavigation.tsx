import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./MyPageNavigation.module.scss";

const MyPageNavigation = () => {
  const router = useRouter();
  return (
    <div className={styles.mainBlock}>
      <div className={styles.subTitle}>장소찾기</div>
      <ul className={styles.navListBlock}>
        <li
          className={
            router.pathname === "/user/mypage/bookmark"
              ? styles.selectedNav
              : styles.nav
          }
        >
          <Link href={"/user/mypage/bookmark"}>북마크</Link>
        </li>
        <li
          className={
            router.pathname === "/user/mypage/review"
              ? styles.selectedNav
              : styles.nav
          }
        >
          <Link href={"/user/mypage/review"}>작성 후기</Link>
        </li>
      </ul>
      <div className={styles.subTitle}>커뮤니티</div>
      <ul className={styles.navListBlock}>
        <li
          className={
            router.pathname === "/user/mypage/post"
              ? styles.selectedNav
              : styles.nav
          }
        >
          <Link href={"/user/mypage/post"}>작성 글</Link>
        </li>
        <li
          className={
            router.pathname === "/user/mypage/comment"
              ? styles.selectedNav
              : styles.nav
          }
        >
          <Link href={"/user/mypage/comment"}>작성 댓글</Link>
        </li>
      </ul>
      <div className={styles.subTitle}>회원관리</div>
      <ul className={styles.navListBlock}>
        <li
          className={
            router.pathname === "/user/mypage/infosetting"
              ? styles.selectedNav
              : styles.nav
          }
        >
          <Link href={"/user/mypage/infosetting"}>개인정보관리</Link>
        </li>
        <li
          className={
            router.pathname === "/user/mypage/password"
              ? styles.selectedNav
              : styles.nav
          }
        >
          <Link href={"/user/mypage/password"}>비밀번호 변경</Link>
        </li>
        <li
          className={
            router.pathname === "/user/mypage/withdrawal"
              ? styles.selectedNav
              : styles.nav
          }
        >
          <Link href={"/user/mypage/withdrawal"}>회원탈퇴</Link>
        </li>
      </ul>
    </div>
  );
};

export default MyPageNavigation;
