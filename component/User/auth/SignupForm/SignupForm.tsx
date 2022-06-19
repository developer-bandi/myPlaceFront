import { RefObject } from "react";
import styles from "./SignupForm.module.scss";
import submitButton from "../../../../lib/styles/submitButton.module.scss";
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
      <h1 className={styles.title}>회원가입</h1>
      <div className={styles.subBlock}>
        <div className={styles.contentBlock}>
          <h2 className={styles.subTitle}>아이디</h2>
          <input
            className={styles.input}
            placeholder="아이디를 10자리 미만으로 기입하세요"
            ref={idInputRef}
          />
        </div>
        <div className={styles.contentBlock}>
          <h2 className={styles.subTitle}>비밀번호</h2>
          <input
            className={styles.input}
            placeholder="비밀번호를 10자리 미만으로 기입하세요"
            ref={passwordInputRef}
            type="password"
          />
        </div>
        <div className={styles.contentBlock}>
          <h2 className={styles.subTitle}>비밀번호 확인</h2>
          <input
            className={styles.input}
            placeholder="위와 동일한 비밀번호를 입력하세요"
            ref={passwordCheckInputRef}
            type="password"
          />
        </div>
        <div className={styles.contentBlock}>
          <h2 className={styles.subTitle}>닉네임</h2>
          <input
            className={styles.input}
            placeholder="닉네임을 5자리 미만으로 기입하세요"
            ref={nicknameInputRef}
          />
        </div>
        <div className={styles.contentBlock}>
          <h2 className={styles.subTitle}>이메일</h2>
          <input
            className={styles.input}
            placeholder="사용가능한 이메일을 입력해주세요. 아이디 비밀번호 찾기에 이용됩니다"
            ref={emailInputRef}
          />
        </div>
      </div>
      <div className={styles.signupButtonBlock}>
        <button
          className={submitButton.submitButton}
          onClick={() => {
            signup();
          }}
        >
          회원가입
        </button>
      </div>
    </main>
  );
};

export default SignupForm;
