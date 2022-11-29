import Link from "next/link";
import styles from "./LocalLogin.module.scss";
import InputBlock from "./InputBlock/InputBlock";
import SubmitButton from "./SubmitButton/SubmitButton";
import { RefObject } from "react";

interface LocalLoginProps {
  idInputRef: RefObject<HTMLInputElement>;
  passwordInputRef: RefObject<HTMLInputElement>;
  eventHandler: (e: { key?: string; type: string }) => Promise<void>;
}

const LocalLogin = ({
  idInputRef,
  passwordInputRef,
  eventHandler,
}: LocalLoginProps) => {
  return (
    <>
      <InputBlock
        subTitle={"아이디"}
        placeHolder={"아이디를 입력하세요"}
        inputRef={idInputRef}
        eventHandler={eventHandler}
      />
      <InputBlock
        subTitle={"비밀번호"}
        placeHolder={"비밀번호를 입력하세요"}
        inputRef={passwordInputRef}
        eventHandler={eventHandler}
        type={"password"}
      />
      <SubmitButton eventHandler={eventHandler}>로그인하기</SubmitButton>
      <ul className={styles.bottomBlock}>
        {[
          { router: "/user/auth/signup", view: "회원가입" },
          { router: "/user/auth/findid", view: "아이디 찾기" },
          { router: "/user/auth/findpassword", view: "비밀번호 찾기" },
        ].map(({ router, view }) => {
          return (
            <li className={styles.bottomLink} key={router}>
              <Link href={router}>{view}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default LocalLogin;
