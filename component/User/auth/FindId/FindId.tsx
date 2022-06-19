import { RefObject } from "react";
import styles from "./FindId.module.scss";

interface FindIdProps {
  randomNumber:
    | {
        number: string;
        id: string;
      }
    | undefined;
  emailInputRef: RefObject<HTMLInputElement>;
  randomNumberInputRef: RefObject<HTMLInputElement>;
  sendMail: () => Promise<void>;
  getId: () => Promise<void>;
}

const FindId = ({
  randomNumber,
  emailInputRef,
  randomNumberInputRef,
  sendMail,
  getId,
}: FindIdProps) => {
  return (
    <main className={styles.mainBlock}>
      <h1 className={styles.title}>아이디 찾기</h1>
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
          <>
            <input
              className={styles.input}
              ref={randomNumberInputRef}
              placeholder="인증번호를 입력하세요"
            />
            <button className={styles.button} onClick={getId}>
              인증 확인
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default FindId;
