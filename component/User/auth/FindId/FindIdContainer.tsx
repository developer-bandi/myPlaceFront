import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { axiosPostId } from "../../../../lib/commonFn/api";
import FindId from "./FindId";
const CryptoJS = require("crypto-js");

const FindIdContainer = () => {
  const [randomNumber, setRandomNumber] = useState<{
    number: string;
    id: string;
  }>();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const randomNumberInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const sendMail = async () => {
    try {
      if (emailInputRef.current !== null) {
        const authResult = await axiosPostId(emailInputRef.current.value);
        if (authResult.status === 203) {
          alert("이메일이 존재하지 않습니다.");
        } else {
          setRandomNumber({
            number: authResult.data.number,
            id: authResult.data.id,
          });
          alert("인증번호를 발송하였습니다");
        }
      }
    } catch (error) {
      alert("오류가 발생하였습니다.");
    }
  };

  const getId = async () => {
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
  };

  return (
    <FindId
      randomNumber={randomNumber}
      emailInputRef={emailInputRef}
      sendMail={sendMail}
      randomNumberInputRef={randomNumberInputRef}
      getId={getId}
    ></FindId>
  );
};

export default FindIdContainer;
