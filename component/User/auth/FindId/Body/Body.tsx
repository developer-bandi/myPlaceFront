import { RefObject } from "react";
import authStyles from "../../../../../lib/styles/auth.module.scss";

interface BodyProps {
  subTitle: string;
  inputRef: RefObject<HTMLInputElement>;
  placeHolder: string;
  key: string;
  buttonChildren: string;
  eventHandler: (e: { key?: string; type: string }) => Promise<void>;
}

const Body = ({
  subTitle,
  inputRef,
  placeHolder,
  key,
  buttonChildren,
  eventHandler,
}: BodyProps) => {
  return (
    <div className={authStyles.contentBlock}>
      <div className={authStyles.subTitle}>{subTitle}</div>
      <input
        className={authStyles.input}
        ref={inputRef}
        placeholder={placeHolder}
        key={key}
        onKeyPress={eventHandler}
      />
      <div className={authStyles.submitButtonBlock}>
        <button className={authStyles.submitButton} onClick={eventHandler}>
          {buttonChildren}
        </button>
      </div>
    </div>
  );
};

export default Body;
