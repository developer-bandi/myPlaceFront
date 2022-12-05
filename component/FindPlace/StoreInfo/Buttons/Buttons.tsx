import Link from "next/link";
import styles from "./Buttons.module.scss";

interface ButtonsProps {
  id: number;
}

const Buttons = ({ id }: ButtonsProps) => {
  return (
    <div className={styles.mainBlock}>
      <button className={styles.buttonBlock}>
        <Link href={`/contribute/addreview`}>후기 등록</Link>
      </button>
      <button className={styles.buttonBlock}>
        <Link href={`/contribute/updatestoreposition/${id}`}>위치 수정</Link>
      </button>
      <button className={styles.buttonBlock}>
        <Link href={`/contribute/updatestoreinfo`}>정보 수정</Link>
      </button>
    </div>
  );
};

export default Buttons;
