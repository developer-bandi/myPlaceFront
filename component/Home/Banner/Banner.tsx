import Image from "next/image";
import { RefObject } from "react";
import { BannerDataType } from "../../../pages";
import styles from "./Banner.module.scss";
import BannerImage from "./BannerImage/BannerImage";
interface BannerProps {
  carouselNumber: number;
  bannerData: { content?: BannerDataType[]; error: boolean };
  left: number | null;
  right: number | null;
  wrapRef: RefObject<HTMLDivElement>;
  moveLeft: () => void;
  moveRight: () => void;
}

const Banner = ({
  carouselNumber,
  bannerData,
  left,
  right,
  wrapRef,
  moveLeft,
  moveRight,
}: BannerProps) => {
  if (bannerData.error) {
    return (
      <section className={`${styles.mainBlock} ${styles.gray}`}>
        <div className={styles.subBlock}>
          <h3 className={styles.error}>에러가 발생하였습니다</h3>
        </div>
      </section>
    );
  } else if (bannerData.content !== undefined) {
    return (
      <div className={styles.mainBlock}>
        <section
          className={`${styles.subBlock} ${
            left !== null || right !== null ? styles.width : undefined
          }`}
          ref={wrapRef}
        >
          {left !== null ? (
            <BannerImage {...bannerData.content[left]} key={0} />
          ) : null}
          <BannerImage {...bannerData.content[carouselNumber]} key={1} />
          {right !== null ? (
            <BannerImage {...bannerData.content[right]} key={2} />
          ) : null}
        </section>
        <button
          className={`${styles.button} ${styles.left}`}
          onClick={moveLeft}
        >
          <Image
            src={`/leftArrow.svg`}
            alt="leftArrow"
            width={25}
            height={25}
            priority={true}
          />
        </button>
        <button
          className={`${styles.button} ${styles.right}`}
          onClick={moveRight}
        >
          <Image
            src={`/rightArrow.svg`}
            alt="rightArrow"
            width={25}
            height={25}
            priority={true}
          />
        </button>
      </div>
    );
  }
  return null;
};

export default Banner;
