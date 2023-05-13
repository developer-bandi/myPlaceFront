import styles from "./SocialLogin.module.scss";

const SocialLogin = () => {
  return (
    <>
      <a
        className={styles.naverBlock}
        href={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/auth/naver`}
        target="_blank"
      >
        <div className={styles.naverContentBlock}>
          <div className={styles.naverText}>네이버 로그인</div>
        </div>
      </a>
      <a
        className={styles.kakaoBlock}
        href={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/auth/kakao`}
        target="_blank"
      >
        <div className={styles.kakaoContentBlock}>
          <div className={styles.kakaoText}>카카오 로그인</div>
        </div>
      </a>
    </>
  );
};

export default SocialLogin;
