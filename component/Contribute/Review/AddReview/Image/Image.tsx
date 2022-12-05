import { AiOutlinePicture } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import storeReview from "../../../../../lib/styles/storeReview.module.scss";
import Image from "next/image";

interface ImageProps {
  uploadImg: string[];
  addImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImg: (index: number) => void;
}

const ImageComponent = ({ uploadImg, deleteImg, addImg }: ImageProps) => {
  return (
    <>
      <ul className={storeReview.imgListBlock}>
        <label htmlFor="fileimg" className={storeReview.fileButton}>
          <div className={storeReview.fileIcon}>
            <AiOutlinePicture size="40" />
          </div>
          <div
            className={storeReview.fileCount}
          >{`(${uploadImg.length}/10)`}</div>
        </label>
        {uploadImg.map((img, index) => {
          return (
            <li className={storeReview.imgBlock} key={img}>
              <Image
                src={img}
                width={"100px"}
                height={"100px"}
                className={storeReview.img}
              />
              <div
                onClick={(e) => {
                  deleteImg(index);
                }}
                className={storeReview.imgDeleteButton}
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
      <input
        type="file"
        accept="image/*"
        id="fileimg"
        onChange={addImg}
        multiple
        className={storeReview.realFileButton}
      />
    </>
  );
};

export default ImageComponent;
