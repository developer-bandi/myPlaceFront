import Image from "next/image";
import Link from "next/link";
import { loader } from "../../../lib/commonFn/loader";
import { BannerDataType } from "../../../pages";
import styles from "./Banner.module.scss";

interface BannerProps {
  carouselNumber: number;
  bannerData: { content?: BannerDataType[]; error: boolean };
}

const Banner = ({ carouselNumber, bannerData }: BannerProps) => {
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
      <section>
        <Link href={bannerData.content[carouselNumber].router}>
          <div
            className={`${styles.mainBlock} ${
              styles[bannerData.content[carouselNumber].backgroundColor]
            }`}
          >
            <div className={styles.subBlock}>
              <div className={styles.infoBlock}>
                <h3 className={styles.title}>
                  {bannerData.content[carouselNumber].title}
                </h3>
                <p className={styles.summary}>
                  {bannerData.content[carouselNumber].summary}
                </p>
              </div>
              <Image
                loader={loader({ width: 800, height: 500 })}
                src={bannerData.content[carouselNumber].img}
                alt="bannerImg"
                width="400px"
                height="250px"
                priority={true}
              />
            </div>
          </div>
        </Link>
      </section>
    );
  }
  return null;
};

export default Banner;
