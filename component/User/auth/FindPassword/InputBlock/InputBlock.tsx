import { RefObject } from "react";
import authStyles from "../../../../../styles/auth.module.scss";

interface InputBlockProps {
  subTitle: string;
  placeHolder: string;
  type?: string;
  inputRef: RefObject<HTMLInputElement>;
  eventHandler: (e: { key?: string; type: string }) => Promise<void> | void;
}

const InputBlock = ({
  subTitle,
  placeHolder,
  type,
  inputRef,
  eventHandler,
}: InputBlockProps) => {
  return (
    <div className={authStyles.contentBlock}>
      <h2 className={authStyles.subTitle}>{subTitle}</h2>
      <input
        className={authStyles.input}
        placeholder={placeHolder}
        ref={inputRef}
        type={type}
        onKeyPress={eventHandler}
      />
    </div>
  );
};

export default InputBlock;
