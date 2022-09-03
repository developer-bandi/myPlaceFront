import Image from "next/image";
import Link from "next/link";
import styles from "./ChoiceButton.module.scss";

const ChoiceButton = () => {
  return (
    <div className={styles.mainBlock}>
      <div className={`${styles.subBlock} ${styles.left}`}>
        <div className={styles.image}>
          <Image
            src={`/51.svg`}
            alt="searchImg"
            layout="fill"
            priority={true}
          />
        </div>
        <h2 className={styles.title}>장소 등록</h2>
        <p className={styles.content}>
          먼저 위치를 등록한후, 장소에 대한 정보를 추가해보세요
        </p>
        <div className={styles.buttonBlock}>
          <button className={styles.button}>
            <Link className={styles.button} href="/contribute/addstoreposition">
              장소 등록하러 이동하기
            </Link>
          </button>
        </div>
      </div>
      <div className={styles.subBlock}>
        <div className={styles.image}>
          <Image
            src={`/64.svg`}
            alt="searchImg"
            layout="fill"
            priority={true}
          />
        </div>
        <h2 className={styles.title}>후기 등록</h2>
        <p className={styles.content}>
          먼저 장소를 검색한후, 후기를 추가해 보세요
        </p>
        <div className={styles.buttonBlock}>
          <button className={styles.button}>
            <Link href="/findplace">후기 등록하러 이동하기</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoiceButton;
