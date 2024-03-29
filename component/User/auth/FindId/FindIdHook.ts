import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { searchId } from "../../../../api/auth";
const CryptoJS = require("crypto-js");

const useFindIdHook = () => {
  const [randomNumber, setRandomNumber] =
    useState<{
      number: string;
      id: string;
    }>();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const randomNumberInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const sendMail = async (e: { key?: string; type: string }) => {
    if (
      (e.type === "click" && e.key === undefined) ||
      (e.type === "keypress" && e.key === "Enter")
    ) {
      try {
        if (emailInputRef.current !== null) {
          const authResult = await searchId(emailInputRef.current.value);
          if (authResult.status === 203) {
            alert(authResult.data as string);
          } else {
            if (typeof authResult.data !== "string") {
              setRandomNumber({
                number: authResult.data.number,
                id: authResult.data.id,
              });
              alert("인증번호를 발송하였습니다");
            }
          }
        }
      } catch (error) {
        alert("오류가 발생하였습니다");
      }
    }
  };

  const getId = async (e: { key?: string; type: string }) => {
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
          alert(
            `아이디는${CryptoJS.AES.decrypt(
              randomNumber?.id,
              process.env.NEXT_PUBLIC_PASSWORD_SECRET
            ).toString(CryptoJS.enc.Utf8)}입니다`
          );
          router.push("/user/auth/signin");
        } else {
          alert("인증번호가 일치하지 않습니다");
        }
      }
    }
  };
  return {
    randomNumber,
    emailInputRef,
    sendMail,
    randomNumberInputRef,
    getId,
    setRandomNumber,
  };
};

export default useFindIdHook;
