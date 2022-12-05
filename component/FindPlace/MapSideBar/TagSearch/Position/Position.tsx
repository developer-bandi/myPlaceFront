import { RefObject } from "react";
import styles from "./Position.module.scss";

interface PositionProps {
  dispatchAddress: () => void;
  inputRef: RefObject<HTMLInputElement>;
}

const Position = ({ inputRef, dispatchAddress }: PositionProps) => {
  return (
    <section key={"position"}>
      <h1 className={styles.title}>기준 장소</h1>
      <div className={styles.inputBlock}>
        <input className={styles.adressInput} ref={inputRef} />
        <button
          className={styles.adressButton}
          onClick={() => {
            dispatchAddress();
          }}
        >
          설정
        </button>
      </div>
    </section>
  );
};

export default Position;
