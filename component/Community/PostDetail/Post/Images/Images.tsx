import styles from "./Images.module.scss";
import Image from "next/image";
import { loader } from "../../../../../lib/commonFn/loader";
interface ImagesProps {
  images: { filename: string }[];
}

const Images = ({ images }: ImagesProps) => {
  return (
    <div>
      {images.map((srcObj: { filename: string }) => {
        return (
          <div className={styles.photoBlock}>
            <Image
              loader={loader({ width: 1000, height: 1000 })}
              src={`/${srcObj.filename}`}
              alt="searchImg"
              layout="fill"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Images;
