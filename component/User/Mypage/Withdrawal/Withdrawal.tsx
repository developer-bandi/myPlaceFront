import MyPageNavigation from "../Common/navigation/MyPageNavigation";
import styles from "./Withdrawal.module.scss";
import mypage from "../../../../lib/styles/mypage.module.scss";
import { useIsLabtop } from "../../../../lib/customHook/mediaQuery";
interface WithdrawalProps {
  withdrawalButton: () => void;
  disagreeButton: () => void;
}

const Withdrawal = ({ withdrawalButton, disagreeButton }: WithdrawalProps) => {
  const isLabtop = useIsLabtop();
  return (
    <div className={mypage.mainBlock}>
      {isLabtop ? null : <MyPageNavigation />}
      <div className={mypage.subBlock}>
        <div className={styles.centerBlock}>
          <h1 className={mypage.title}>회원탈퇴</h1>
          <div className={styles.contentBlock}>
            <div className={styles.subTitle}>개인정보 삭제</div>
            <div className={styles.content}>
              사용자의 아이디 닉네임과 작성한 후기 포스트 댓글이 모두
              삭제됩니다.
            </div>
          </div>
          <div className={styles.contentBlock}>
            <div className={styles.subTitle}>소셜 계정 연결 정보 삭제</div>
            <div className={styles.content}>
              소셜 계정을 연결한 경우 탈퇴 시 연결 정보도 함께 삭제됩니다.
            </div>
          </div>
          <div className={styles.buttonBlock}>
            <button className={styles.agreeButton} onClick={withdrawalButton}>
              동의
            </button>
            <button className={styles.disagreeButton} onClick={disagreeButton}>
              비동의
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
