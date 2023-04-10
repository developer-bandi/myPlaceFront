import Image from "next/image";
import Link from "next/link";
import { loader } from "../../../../lib/loader";
import styles from "./BannerImage.module.scss";

interface BannerImageProps {
  router: string;
  backgroundColor: string;
  title: string;
  summary: string;
  img: string;
}

const BannerImage = ({
  router,
  backgroundColor,
  title,
  summary,
  img,
}: BannerImageProps) => {
  return (
    <Link href={router}>
      <div className={`${styles.mainBlock} ${styles[backgroundColor]}`}>
        <div className={styles.subBlock}>
          <div className={styles.infoBlock}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.summary}>{summary}</p>
          </div>
          <Image
            loader={loader({ width: 800, height: 500 })}
            src={img}
            alt="bannerImg"
            width="400px"
            height="250px"
            priority={true}
          />
        </div>
      </div>
    </Link>
  );
};

export default BannerImage;
