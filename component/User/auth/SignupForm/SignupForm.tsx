import {RefObject} from "react";
import styles from "./SignupForm.module.scss";
import authStyles from "../../../../lib/styles/auth.module.scss";
interface SignUpFormProps {
  signup: () => Promise<void>;
  idInputRef: RefObject<HTMLInputElement>;
  passwordInputRef: RefObject<HTMLInputElement>;
  passwordCheckInputRef: RefObject<HTMLInputElement>;
  nicknameInputRef: RefObject<HTMLInputElement>;
  emailInputRef: RefObject<HTMLInputElement>;
}

const SignupForm = ({
  signup,
  idInputRef,
  passwordInputRef,
  passwordCheckInputRef,
  nicknameInputRef,
  emailInputRef,
}: SignUpFormProps) => {
  return (
    <main className={styles.mainBlock}>
      <div className={authStyles.subBlock}>
        <h1 className={authStyles.title}>회원가입</h1>
        <div className={authStyles.contentBlock}>
          <h2 className={authStyles.subTitle}>아이디</h2>
          <input
            className={authStyles.input}
            placeholder="아이디를 10자리 미만으로 기입하세요"
            ref={idInputRef}
          />
        </div>
        <div className={authStyles.contentBlock}>
          <h2 className={authStyles.subTitle}>비밀번호</h2>
          <input
            className={authStyles.input}
            placeholder="비밀번호를 10자리 미만으로 기입하세요"
            ref={passwordInputRef}
            type="password"
          />
        </div>
        <div className={authStyles.contentBlock}>
          <h2 className={authStyles.subTitle}>비밀번호 확인</h2>
          <input
            className={authStyles.input}
            placeholder="위와 동일한 비밀번호를 입력하세요"
            ref={passwordCheckInputRef}
            type="password"
          />
        </div>
        <div className={authStyles.contentBlock}>
          <h2 className={authStyles.subTitle}>닉네임</h2>
          <input
            className={authStyles.input}
            placeholder="닉네임을 5자리 미만으로 기입하세요"
            ref={nicknameInputRef}
          />
        </div>
        <div className={authStyles.contentBlock}>
          <h2 className={authStyles.subTitle}>이메일</h2>
          <input
            className={authStyles.input}
            placeholder="유효한 이메일을 입력하세요"
            ref={emailInputRef}
          />
        </div>
        <div className={authStyles.submitButtonBlock}>
          <button
            className={authStyles.submitButton}
            onClick={() => {
              signup();
            }}
            data-testid="signup"
          >
            회원가입
          </button>
        </div>
      </div>
    </main>
  );
};

export default SignupForm;
