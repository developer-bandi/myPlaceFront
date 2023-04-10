import { useRouter } from "next/router";
import { useRef } from "react";
import { localSignup } from "../../../../api/auth";
const CryptoJS = require("crypto-js");

const useSignupForm = () => {
  const idInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordCheckInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const signup = async (e: { key?: string; type: string }) => {
    if (
      (e.type === "click" && e.key === undefined) ||
      (e.type === "keypress" && e.key === "Enter")
    ) {
      try {
        const agreeSubmit = window.confirm("가입하시겠습니까?");

        if (agreeSubmit) {
          if (
            idInputRef.current !== null &&
            passwordInputRef.current !== null &&
            passwordCheckInputRef.current !== null &&
            nicknameInputRef.current !== null &&
            emailInputRef.current !== null
          ) {
            if (
              idInputRef.current.value === "" ||
              idInputRef.current.value.length > 10
            ) {
              alert("아이디를 정확히 입력하세요");
            } else if (
              passwordInputRef.current.value === "" ||
              passwordInputRef.current.value.length > 10
            ) {
              alert("비밀번호를 정확히 입력하세요");
            } else if (
              passwordInputRef.current.value !==
              passwordCheckInputRef.current.value
            ) {
              alert("확인 비밀번호가 일치하지 않습니다 다시 입력해주세요");
            } else if (
              nicknameInputRef.current.value === "" ||
              nicknameInputRef.current.value.length > 5
            ) {
              alert("닉네임을 정확하게 입력하세요");
            } else if (
              !/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
                emailInputRef.current.value
              )
            ) {
              alert("이메일의 형태가 정확하지 않습니다");
            } else {
              const signupUser = {
                localId: idInputRef.current.value,
                password: CryptoJS.AES.encrypt(
                  JSON.stringify(passwordInputRef.current.value),
                  process.env.NEXT_PUBLIC_PASSWORD_SECRET
                ).toString(),
                nickname: nicknameInputRef.current.value,
                email: emailInputRef.current.value,
              };
              const message = await localSignup(signupUser);
              if (message.status === 203) {
                alert(message.data);
              } else {
                alert("회원가입에 성공하였습니다.");
                router.push("/user/auth/signin");
              }
            }
          }
        }
      } catch (err) {
        alert("서버에 에러가 발생하였습니다");
      }
    }
  };

  return {
    signup,
    idInputRef,
    passwordInputRef,
    passwordCheckInputRef,
    nicknameInputRef,
    emailInputRef,
  };
};

export default useSignupForm;
