import {RefObject} from "react";
import styles from "./FindId.module.scss";
import authStyles from "../../../../lib/styles/auth.module.scss";

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
  if (randomNumber === undefined) {
    return (
      <main className={styles.mainBlock}>
        <div className={authStyles.subBlock}>
          <h1 className={authStyles.title}>아이디 찾기</h1>
          <div className={authStyles.contentBlock}>
            <div className={authStyles.subTitle}>이메일</div>
            <input
              className={authStyles.input}
              ref={emailInputRef}
              placeholder="이메일을 입력하세요"
              key="email"
              onKeyPress={sendMail}
              data-testid="email"
            />
            <div className={authStyles.submitButtonBlock}>
              <button
                className={authStyles.submitButton}
                onClick={sendMail}
                data-testid="sendMail"
              >
                메일 전송
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main className={styles.mainBlock}>
        <div className={authStyles.subBlock}>
          <h1 className={authStyles.title}>아이디 찾기</h1>
          <div className={authStyles.contentBlock}>
            <div className={authStyles.subTitle}>인증번호</div>
            <input
              className={authStyles.input}
              ref={randomNumberInputRef}
              placeholder="인증번호를 입력하세요"
              key="randomNumber"
              onKeyPress={getId}
              data-testid="randomNumber"
            />
          </div>
          <div className={authStyles.submitButtonBlock}>
            <button
              className={authStyles.submitButton}
              onClick={getId}
              data-testid="getId"
            >
              인증번호 확인
            </button>
          </div>
        </div>
      </main>
    );
  }
};

export default FindId;
