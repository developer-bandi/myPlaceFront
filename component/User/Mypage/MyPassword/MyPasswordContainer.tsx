import { useRef } from "react";
import { axiosPatchPassword } from "../../../../lib/commonFn/api";
import MyPassword from "./MyPassword";
const CryptoJS = require("crypto-js");

const MyPasswordContainer = () => {
  const nowpasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordCheckRef = useRef<HTMLInputElement>(null);

  const submitNewPassword = async () => {
    if (
      nowpasswordRef.current !== null &&
      newPasswordRef.current !== null &&
      newPasswordCheckRef.current !== null
    ) {
      if (newPasswordRef.current.value === newPasswordCheckRef.current.value) {
        const res = await axiosPatchPassword(
          CryptoJS.AES.encrypt(
            JSON.stringify(nowpasswordRef.current.value),
            process.env.NEXT_PUBLIC_PASSWORD_SECRET
          ).toString(),
          CryptoJS.AES.encrypt(
            JSON.stringify(newPasswordRef.current.value),
            process.env.NEXT_PUBLIC_PASSWORD_SECRET
          ).toString()
        );
        if (res.status === 203) {
          alert("현재 비밀번호가 일치하지 않습니다");
        } else {
          alert("비밀번호를 변경하였습니다");
        }
      } else {
        alert("새로운 비밀번호가 일치하지 않습니다.");
      }
    }
  };

  return (
    <MyPassword
      nowpasswordRef={nowpasswordRef}
      newPasswordRef={newPasswordRef}
      newPasswordCheckRef={newPasswordCheckRef}
      submitNewPassword={submitNewPassword}
    />
  );
};

export default MyPasswordContainer;
