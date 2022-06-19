import { RefObject } from "react";
import styles from "./FindPassword.module.scss";

interface FindPasswordProps {
  randomNumber:
    | {
        number: string;
        id: string;
      }
    | undefined;
  emailInputRef: RefObject<HTMLInputElement>;
  randomNumberInputRef: RefObject<HTMLInputElement>;
  sendMail: () => Promise<void>;
  checkAuthNum: () => Promise<void>;
  authStatus: boolean;
  passwordRef: RefObject<HTMLInputElement>;
  passwordCheckRef: RefObject<HTMLInputElement>;
  changePassword: () => Promise<void>;
}

const FindPassword = ({
  randomNumber,
  emailInputRef,
  randomNumberInputRef,
  sendMail,
  checkAuthNum,
  authStatus,
  passwordRef,
  passwordCheckRef,
  changePassword,
}: FindPasswordProps) => {
  return (
    <main className={styles.mainBlock}>
      <h1 className={styles.title}>비밀번호 찾기</h1>
      <div className={styles.subBlock}>
        <div className={styles.inputBlock}>
          <input
            className={styles.input}
            ref={emailInputRef}
            placeholder="이메일을 입력하세요"
          />
          <button className={styles.button} onClick={sendMail}>
            메일 전송
          </button>
        </div>
        {randomNumber === undefined ? null : (
          <div className={styles.inputBlock}>
            <input
              className={styles.input}
              ref={randomNumberInputRef}
              placeholder="인증번호를 입력하세요"
            />
            <button className={styles.button} onClick={checkAuthNum}>
              인증 확인
            </button>
          </div>
        )}
        {authStatus ? (
          <>
            <div className={styles.inputBlock}>
              <input
                className={styles.input}
                ref={passwordRef}
                placeholder="새 비밀번호를 입력하세요"
              />
            </div>
            <div className={styles.inputBlock}>
              <input
                className={styles.input}
                ref={passwordCheckRef}
                placeholder="새 비밀번호를 한번더 입력하세요"
              />
              <button className={styles.button} onClick={changePassword}>
                비밀번호 변경
              </button>
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
};

export default FindPassword;
