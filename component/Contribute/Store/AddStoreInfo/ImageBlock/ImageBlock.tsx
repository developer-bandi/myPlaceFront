import Image from "next/image";
import { AiOutlinePicture } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import storeInfo from "../../../../../styles/storeInfo.module.scss";

interface ImageBlockProps {
  title: string;
  maxLength: number;
  images: string[];
  addImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImg: (deleteindex: number) => void;
}

const ImageBlock = ({
  title,
  maxLength,
  images,
  addImg,
  deleteImg,
}: ImageBlockProps) => {
  return (
    <ul className={storeInfo.menuBlock}>
      <label htmlFor={title} className={storeInfo.fileButton}>
        <div className={storeInfo.imgButtonTitle}>{title}</div>
        <div className={storeInfo.fileIcon}>
          <AiOutlinePicture size="40" />
        </div>
        <div
          className={storeInfo.fileCount}
        >{`(${images.length}/${maxLength})`}</div>
      </label>
      <input
        type="file"
        accept="image/*"
        id={title}
        multiple
        onChange={addImg}
        className={storeInfo.realFileButton}
      />
      {images.map((img, index) => {
        return (
          <li className={storeInfo.imgBlock} key={index}>
            <Image
              src={img}
              width={"100px"}
              height={"100px"}
              className={storeInfo.img}
            ></Image>
            <div
              onClick={() => {
                deleteImg(index);
              }}
              className={storeInfo.imgDeleteButton}
            >
              <ImCross
                size={20}
                style={{ color: "white", opacity: "1" }}
              ></ImCross>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ImageBlock;
