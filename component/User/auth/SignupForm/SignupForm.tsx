import { RefObject } from "react";
import styles from "./SignupForm.module.scss";
import authStyles from "../../../../lib/styles/auth.module.scss";
import InputBlock from "./InputBlock/InputBlock";
import SubmitButton from "./SubmitButton/SubmitButton";
interface SignUpFormProps {
  signup: (e: { key?: string; type: string }) => Promise<void>;
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
        <InputBlock
          subTitle={"아이디"}
          placeHolder={"아이디를 10자리 미만으로 기입하세요"}
          inputRef={idInputRef}
          eventHandler={signup}
        />
        <InputBlock
          subTitle={"비밀번호"}
          placeHolder={"비밀번호를 10자리 미만으로 기입하세요"}
          inputRef={passwordInputRef}
          eventHandler={signup}
          type={"password"}
        />
        <InputBlock
          subTitle={"비밀번호 확인"}
          placeHolder={"위와 동일한 비밀번호를 입력하세요"}
          inputRef={passwordCheckInputRef}
          eventHandler={signup}
          type={"password"}
        />
        <InputBlock
          subTitle={"닉네임"}
          placeHolder={"닉네임을 5자리 미만으로 기입하세요"}
          inputRef={nicknameInputRef}
          eventHandler={signup}
          type={"password"}
        />
        <InputBlock
          subTitle={"이메일"}
          placeHolder={"유효한 이메일을 입력하세요"}
          inputRef={emailInputRef}
          eventHandler={signup}
          type={"password"}
        />
        <SubmitButton eventHandler={signup}>회원가입</SubmitButton>
      </div>
    </main>
  );
};

export default SignupForm;
