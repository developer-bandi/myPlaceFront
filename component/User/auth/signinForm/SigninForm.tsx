import Image from "next/image";
import styles from "./SigninForm.module.scss";
import kakaologo from "../../../../public/새 프로젝트.png";
import Link from "next/link";
import { RefObject } from "react";

interface SignInForm {
  checkLogin: () => Promise<void>;
  idInputRef: RefObject<HTMLInputElement>;
  passwordInputRef: RefObject<HTMLInputElement>;
}

const SignInForm = ({
  checkLogin,
  idInputRef,
  passwordInputRef,
}: SignInForm) => {
  return (
    <main className={styles.mainBlock}>
      <h1 className={styles.title}>로그인</h1>
      <section>
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
            ></Image>
            <div className={styles.kakaoText}>카카오로그인</div>
          </div>
        </a>
        <p className={styles.notice}>
          네이버 로그인은 관리자만 이용할수 있습니다
        </p>
      </section>
      <section>
        <div className={styles.divisionBlock}>
          <hr className={styles.divisionBar} />
          <p className={styles.divisionText}>또는</p>
          <hr className={styles.divisionBar} />
        </div>
      </section>
      <section>
        <input
          className={styles.infoInput}
          placeholder="아이디"
          ref={idInputRef}
        />
        <input
          className={styles.infoInput}
          type="password"
          placeholder="비밀번호"
          ref={passwordInputRef}
        />
        <button
          className={styles.loginButton}
          onClick={() => {
            checkLogin();
          }}
        >
          로그인하기
        </button>
        <ul className={styles.bottomBlock}>
          <li className={styles.bottomLink}>
            <Link href={"/user/auth/signup"}>회원가입</Link>
          </li>
          <li className={styles.bottomLink}>
            <Link href={"/user/auth/findid"}>아이디 찾기</Link>
          </li>
          <li className={styles.bottomLink}>
            {" "}
            <Link href={"/user/auth/findpassword"}>비밀번호 찾기</Link>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default SignInForm;
