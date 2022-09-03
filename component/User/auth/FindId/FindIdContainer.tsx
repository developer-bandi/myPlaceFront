import FindId from "./FindId";
import useFindIdHook from "./FindIdHook";

const FindIdContainer = () => {
  const {randomNumber, emailInputRef, sendMail, randomNumberInputRef, getId} =
    useFindIdHook();

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
