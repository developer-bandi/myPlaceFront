import Image from "next/image";
import styles from "./SigninForm.module.scss";
import kakaologo from "../../../../public/새 프로젝트.png";
import authStyles from "../../../../lib/styles/auth.module.scss";
import Link from "next/link";
import { RefObject } from "react";
import SocialLogin from "./SocialLogin/SocialLogin";
import LocalLogin from "./LocalLogin/LocalLogin";

interface SignInForm {
  checkLogin: (e: { key?: string; type: string }) => Promise<void>;
  idInputRef: RefObject<HTMLInputElement>;
  passwordInputRef: RefObject<HTMLInputElement>;
}

const SigninForm = ({
  checkLogin,
  idInputRef,
  passwordInputRef,
}: SignInForm) => {
  return (
    <main className={styles.mainBlock}>
      <div className={authStyles.subBlock}>
        <h1 className={authStyles.title}>로그인</h1>
        <SocialLogin />
        <div className={styles.divisionBlock}>
          <hr className={styles.divisionBar} />
          <p className={styles.divisionText}>또는</p>
          <hr className={styles.divisionBar} />
        </div>
        <LocalLogin
          idInputRef={idInputRef}
          passwordInputRef={passwordInputRef}
          eventHandler={checkLogin}
        />
      </div>
    </main>
  );
};

export default SigninForm;
