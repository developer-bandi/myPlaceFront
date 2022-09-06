import Image from "next/image";
import styles from "./SigninForm.module.scss";
import kakaologo from "../../../../public/새 프로젝트.png";
import authStyles from "../../../../lib/styles/auth.module.scss";
import Link from "next/link";
import {RefObject} from "react";

interface SignInForm {
  checkLogin: (e: {key?: string; type: string}) => Promise<void>;
  idInputRef: RefObject<HTMLInputElement>;
  passwordInputRef: RefObject<HTMLInputElement>;
}

const SignInForm = ({checkLogin, idInputRef, passwordInputRef}: SignInForm) => {
  return (
    <main className={styles.mainBlock}>
      <div className={authStyles.subBlock}>
        <h1 className={authStyles.title}>로그인</h1>
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
        <div className={styles.divisionBlock}>
          <hr className={styles.divisionBar} />
          <p className={styles.divisionText}>또는</p>
          <hr className={styles.divisionBar} />
        </div>
        <div className={authStyles.contentBlock}>
          <div className={authStyles.subTitle}>아이디</div>
          <input
            className={authStyles.input}
            ref={idInputRef}
            onKeyPress={checkLogin}
            data-testid="id"
          />
        </div>
        <div className={authStyles.contentBlock}>
          <div className={authStyles.subTitle}>비밀번호</div>
          <input
            className={authStyles.input}
            type="password"
            ref={passwordInputRef}
            onKeyPress={checkLogin}
            data-testid="password"
          />
        </div>
        <div className={authStyles.submitButtonBlock}>
          <button
            className={authStyles.submitButton}
            onClick={checkLogin}
            data-testid="checklogin"
          >
            로그인하기
          </button>
        </div>
        <ul className={styles.bottomBlock}>
          <li className={styles.bottomLink}>
            <Link href={"/user/auth/signup"}>회원가입</Link>
          </li>
          <li className={styles.bottomLink}>
            <Link href={"/user/auth/findid"}>아이디 찾기</Link>
          </li>
          <li className={styles.bottomLink}>
            <Link href={"/user/auth/findpassword"}>비밀번호 찾기</Link>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default SignInForm;
