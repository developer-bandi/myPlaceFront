const CryptoJS = require("crypto-js");
import { useRouter } from "next/router";
import { useRef } from "react";
import { localSignin } from "../../../../api/auth";

const useSigninForm = () => {
  const idInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const checkLogin = async (e: { key?: string; type: string }) => {
    if (
      (e.type === "click" && e.key === undefined) ||
      (e.type === "keypress" && e.key === "Enter")
    ) {
      if (idInputRef.current !== null && passwordInputRef.current !== null) {
        try {
          const message = await localSignin({
            localId: idInputRef.current.value,
            password: CryptoJS.AES.encrypt(
              JSON.stringify(passwordInputRef.current.value),
              process.env.NEXT_PUBLIC_PASSWORD_SECRET
            ).toString(),
          });

          if (message.status === 202) {
            alert(message.data);
          } else {
            alert("로그인에 성공하였습니다!");
            router.push("/");
          }
        } catch (err) {
          alert("서버에 에러가 발생하였습니다");
        }
      }
    }
  };
  return {
    checkLogin,
    idInputRef,
    passwordInputRef,
  };
};

export default useSigninForm;
