import Image from "next/image";
import Link from "next/link";
import styles from "./Banner.module.scss";

const Banner = () => {
  return (
    <div className={styles.mainBlock}>
      <Image
        src="/slide1.jpg"
        alt="searchImg"
        layout="fill"
        objectFit="cover"
      ></Image>
      <div className={styles.text}>여러개의 키워드로 검색할수 있어요</div>
      <div className={styles.pagemove}>
        <Link href={"/findplace"}>키워드로 장소찾기</Link>
      </div>
    </div>
  );
};

export default Banner;
