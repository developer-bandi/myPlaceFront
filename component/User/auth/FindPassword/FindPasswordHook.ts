import {useRouter} from "next/router";
import {useRef, useState} from "react";
import {axiosPostId, axiosPostPassword} from "../../../../lib/commonFn/api";
const CryptoJS = require("crypto-js");

const useFindPassword = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const randomNumberInputRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [randomNumber, setRandomNumber] = useState<{
    number: string;
    id: string;
  }>();
  const [authStatus, setAuthStatus] = useState(false);

  const sendMail = async (e: {key?: string; type: string}) => {
    if (
      (e.type === "click" && e.key === undefined) ||
      (e.type === "keypress" && e.key === "Enter")
    ) {
      try {
        if (emailInputRef.current !== null) {
          const authResult = await axiosPostId(emailInputRef.current.value);
          if (authResult.status === 203) {
            alert("이메일이 존재하지 않습니다");
          } else {
            setEmail(emailInputRef.current.value);
            setRandomNumber({
              number: authResult.data.number,
              id: authResult.data.id,
            });
            setAuthStatus(false);
            alert("인증번호를 발송하였습니다");
          }
        }
      } catch (error) {
        alert("오류가 발생하였습니다");
      }
    }
  };

  const checkAuthNum = (e: {key?: string; type: string}) => {
    if (
      (e.type === "click" && e.key === undefined) ||
      (e.type === "keypress" && e.key === "Enter")
    ) {
      if (randomNumberInputRef.current !== null) {
        if (
          randomNumberInputRef.current.value ==
          CryptoJS.AES.decrypt(
            randomNumber?.number,
            process.env.NEXT_PUBLIC_PASSWORD_SECRET
          ).toString(CryptoJS.enc.Utf8)
        ) {
          alert("인증되었습니다");
          setAuthStatus(true);
        } else {
          alert("인증번호가 일치하지 않습니다");
        }
      }
    }
  };

  const changePassword = async (e: {key?: string; type: string}) => {
    if (
      (e.type === "click" && e.key === undefined) ||
      (e.type === "keypress" && e.key === "Enter")
    ) {
      if (
        passwordRef.current !== null &&
        passwordCheckRef.current !== null &&
        authStatus
      ) {
        if (passwordRef.current.value.length > 10) {
          alert("비밀번호 길이를 10자리 이하로 줄여주세요");
        } else if (
          passwordRef.current.value !== passwordCheckRef.current.value
        ) {
          alert("두 비밀번호가 일치하지 않습니다");
        } else {
          try {
            await axiosPostPassword(
              email,
              CryptoJS.AES.encrypt(
                JSON.stringify(passwordRef.current.value),
                process.env.NEXT_PUBLIC_PASSWORD_SECRET
              ).toString()
            );
            alert("변경되었습니다");
            router.push("/user/auth/signin");
          } catch (error) {
            alert("에러가 발생하였습니다");
          }
        }
      }
    }
  };

  return {
    randomNumber,
    emailInputRef,
    sendMail,
    randomNumberInputRef,
    checkAuthNum,
    authStatus,
    passwordRef,
    passwordCheckRef,
    changePassword,
    setRandomNumber,
    setAuthStatus,
  };
};

export default useFindPassword;
