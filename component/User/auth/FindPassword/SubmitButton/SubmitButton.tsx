import { ReactNode } from "react";
import authStyles from "../../../../../lib/styles/auth.module.scss";

interface SubmitButton {
  eventHandler: (e: { key?: string; type: string }) => Promise<void> | void;
  children: ReactNode;
}

const SubmitButton = ({ eventHandler, children }: SubmitButton) => {
  return (
    <div className={authStyles.submitButtonBlock}>
      <button className={authStyles.submitButton} onClick={eventHandler}>
        {children}
      </button>
    </div>
  );
};

export default SubmitButton;
