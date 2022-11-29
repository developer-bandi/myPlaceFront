import Image from "next/image";
import styles from "./SocialLogin.module.scss";
import kakaologo from "../../../../../public/새 프로젝트.png";

const SocialLogin = () => {
  return (
    <>
      <a
        className={styles.naverBlock}
        href={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/auth/naver`}
        target="_blank"
      >
        <div className={styles.naverContentBlock}>
          <div className={styles.naverLogo}>N</div>
          <div className={styles.naverText}>네이버 로그인</div>
        </div>
      </a>
      <a
        className={styles.kakaoBlock}
        href={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/auth/kakao`}
        target="_blank"
      >
        <div className={styles.kakaoContentBlock}>
          <Image
            src={kakaologo}
            alt="kakaologo"
            className={styles.kakaoLogo}
            width={"25px"}
            height={"25px"}
          ></Image>
          <div className={styles.kakaoText}>카카오 로그인</div>
        </div>
      </a>
    </>
  );
};

export default SocialLogin;
