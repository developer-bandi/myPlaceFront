import FindPassword from "./FindPassword";
import useFindPassword from "./FindPasswordHook";

const FindPasswordContainer = () => {
  const {
    randomNumber,
    emailInputRef,
    sendMail,
    randomNumberInputRef,
    checkAuthNum,
    authStatus,
    passwordRef,
    passwordCheckRef,
    changePassword,
  } = useFindPassword();
  return (
    <FindPassword
      randomNumber={randomNumber}
      emailInputRef={emailInputRef}
      sendMail={sendMail}
      randomNumberInputRef={randomNumberInputRef}
      checkAuthNum={checkAuthNum}
      authStatus={authStatus}
      passwordRef={passwordRef}
      passwordCheckRef={passwordCheckRef}
      changePassword={changePassword}
    ></FindPassword>
  );
};

export default FindPasswordContainer;
