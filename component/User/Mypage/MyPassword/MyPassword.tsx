import { RefObject } from "react";
import MyPageNavigation from "../Common/navigation/MyPageNavigation";
import styles from "./MyPassword.module.scss";
import mypage from "../../../../lib/styles/mypage.module.scss";
import { useIsLabtop } from "../../../../lib/customHook/mediaQuery";

interface MyPassword {
  nowpasswordRef: RefObject<HTMLInputElement>;
  newPasswordRef: RefObject<HTMLInputElement>;
  newPasswordCheckRef: RefObject<HTMLInputElement>;
  submitNewPassword: () => Promise<void>;
}

const MyPassword = ({
  nowpasswordRef,
  newPasswordRef,
  newPasswordCheckRef,
  submitNewPassword,
}: MyPassword) => {
  const isLabtop = useIsLabtop();
  return (
    <div className={mypage.mainBlock}>
      {isLabtop ? null : <MyPageNavigation />}
      <div className={mypage.subBlock}>
        <div className={styles.centerBlock}>
          <h1 className={mypage.title}>비밀번호 변경</h1>
          <div className={styles.inputBlock}>
            <div className={styles.subTitle}>현재 비밀번호</div>
            <input className={styles.input} ref={nowpasswordRef}></input>
          </div>
          <div className={styles.inputBlock}>
            <div className={styles.subTitle}>신규 비밀번호</div>
            <input className={styles.input} ref={newPasswordRef}></input>
          </div>
          <div className={styles.inputBlock}>
            <div className={styles.subTitle}>비밀번호 확인</div>
            <input className={styles.input} ref={newPasswordCheckRef}></input>
          </div>
          <button className={styles.changeButton} onClick={submitNewPassword}>
            변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPassword;
