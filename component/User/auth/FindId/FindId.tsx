import { RefObject } from "react";
import styles from "./FindId.module.scss";
import authStyles from "../../../../lib/styles/auth.module.scss";
import Body from "./Body/Body";

interface FindIdProps {
  randomNumber:
    | {
        number: string;
        id: string;
      }
    | undefined;
  emailInputRef: RefObject<HTMLInputElement>;
  randomNumberInputRef: RefObject<HTMLInputElement>;
  sendMail: (e: { key?: string; type: string }) => Promise<void>;
  getId: (e: { key?: string; type: string }) => Promise<void>;
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
          <Body
            subTitle={"이메일"}
            inputRef={emailInputRef}
            placeHolder={"이메일을 입력하세요"}
            key={"email"}
            buttonChildren={"메일전송"}
            eventHandler={sendMail}
          />
        </div>
      </main>
    );
  } else {
    return (
      <main className={styles.mainBlock}>
        <div className={authStyles.subBlock}>
          <h1 className={authStyles.title}>아이디 찾기</h1>
          <Body
            subTitle={"인증번호"}
            inputRef={randomNumberInputRef}
            placeHolder={"인증번호를 입력하세요"}
            key={"randomNumber"}
            buttonChildren={"인증번호 확인"}
            eventHandler={getId}
          />
        </div>
      </main>
    );
  }
};

export default FindId;
