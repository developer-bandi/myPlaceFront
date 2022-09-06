import {RefObject} from "react";
import styles from "./FindPassword.module.scss";
import authStyles from "../../../../lib/styles/auth.module.scss";

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
  checkAuthNum: () => void;
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
  if (randomNumber === undefined && authStatus === false) {
    return (
      <main className={`${styles.mainBlock} ${styles.nomal}`}>
        <div className={authStyles.subBlock}>
          <h1 className={authStyles.title}>비밀번호 찾기</h1>
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
  } else if (randomNumber !== undefined && authStatus === false) {
    return (
      <main className={`${styles.mainBlock} ${styles.nomal}`}>
        <div className={authStyles.subBlock}>
          <h1 className={authStyles.title}>비밀번호 찾기</h1>
          <div className={authStyles.contentBlock}>
            <div className={authStyles.subTitle}>인증번호</div>
            <input
              className={authStyles.input}
              ref={randomNumberInputRef}
              placeholder="인증번호를 입력하세요"
              key="randomNumber"
              onKeyPress={checkAuthNum}
              data-testid="randomNumber"
            />
          </div>
          <div className={authStyles.submitButtonBlock}>
            <button
              className={authStyles.submitButton}
              onClick={checkAuthNum}
              data-testid="checkAuthNum"
            >
              인증번호 확인
            </button>
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main className={`${styles.mainBlock} ${styles.changePassword}`}>
        <div className={authStyles.subBlock}>
          <h1 className={authStyles.title}>비밀번호 찾기</h1>
          <div className={authStyles.contentBlock}>
            <div className={authStyles.subTitle}>비밀번호</div>
            <input
              className={authStyles.input}
              ref={passwordRef}
              placeholder="새 비밀번호를 입력하세요"
              type="password"
              key="newPassword"
              onKeyPress={changePassword}
              data-testid="newPassword"
            />
          </div>
          <div className={authStyles.contentBlock}>
            <div className={authStyles.subTitle}>비밀번호 확인</div>
            <input
              className={authStyles.input}
              ref={passwordCheckRef}
              placeholder="새 비밀번호를 한번더 입력하세요"
              type="password"
              key="newPasswordCheck"
              onKeyPress={changePassword}
              data-testid="newPasswordCheck"
            />
            <div className={authStyles.submitButtonBlock}>
              <button
                className={authStyles.submitButton}
                onClick={changePassword}
                data-testid="changePassword"
              >
                비밀번호 변경
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }
};

export default FindPassword;
