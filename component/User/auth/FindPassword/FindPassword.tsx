import { RefObject } from "react";
import styles from "./FindPassword.module.scss";
import authStyles from "../../../../styles/auth.module.scss";
import InputBlock from "./InputBlock/InputBlock";
import SubmitButton from "./SubmitButton/SubmitButton";

interface FindPasswordProps {
  randomNumber:
    | {
        number: string;
        id: string;
      }
    | undefined;
  emailInputRef: RefObject<HTMLInputElement>;
  randomNumberInputRef: RefObject<HTMLInputElement>;
  sendMail: (e: { key?: string; type: string }) => Promise<void>;
  checkAuthNum: (e: { key?: string; type: string }) => void;
  authStatus: boolean;
  passwordRef: RefObject<HTMLInputElement>;
  passwordCheckRef: RefObject<HTMLInputElement>;
  changePassword: (e: { key?: string; type: string }) => Promise<void>;
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
            <InputBlock
              subTitle={"이메일"}
              placeHolder={"이메일을 입력하세요"}
              key="email"
              inputRef={emailInputRef}
              eventHandler={sendMail}
            />
            <SubmitButton eventHandler={sendMail}>메일 전송</SubmitButton>
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
            <InputBlock
              subTitle={"인증번호"}
              placeHolder={"인증번호를 입력하세요"}
              key="randomNumber"
              inputRef={randomNumberInputRef}
              eventHandler={checkAuthNum}
            />
            <SubmitButton eventHandler={checkAuthNum}>
              인증번호 확인
            </SubmitButton>
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
            <InputBlock
              subTitle={"비밀번호"}
              placeHolder={"새 비밀번호를 입력하세요"}
              key="randomNumber"
              type="password"
              inputRef={passwordRef}
              eventHandler={changePassword}
            />
            <InputBlock
              subTitle={"비밀번호 확인"}
              placeHolder={"새 비밀번호를 한번더 입력하세요"}
              type="password"
              key="newPasswordCheck"
              inputRef={passwordCheckRef}
              eventHandler={changePassword}
            />
            <SubmitButton eventHandler={changePassword}>
              비밀번호 변경
            </SubmitButton>
          </div>
        </div>
      </main>
    );
  }
};

export default FindPassword;
