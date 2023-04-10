import Image from "next/image";
import { AiOutlinePicture } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { loader } from "../../../../../lib/loader";
import storeInfo from "../../../../../styles/storeInfo.module.scss";

interface ImageBlockProps {
  title: string;
  maxLength: number;
  existImg: string[] | undefined;
  uploadImg: string[];
  addImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteExistImg: (deleteindex: number) => void;
  deleteImg: (deleteindex: number) => void;
}

const ImageBlock = ({
  title,
  maxLength,
  existImg,
  uploadImg,
  addImg,
  deleteExistImg,
  deleteImg,
}: ImageBlockProps) => {
  return (
    <div className={storeInfo.menuBlock}>
      <label htmlFor="img" className={storeInfo.fileButton}>
        <div className={storeInfo.imgButtonTitle}>{title}</div>
        <div className={storeInfo.fileIcon}>
          <AiOutlinePicture size="40" />
        </div>
        <div className={storeInfo.fileCount}>{`(${
          uploadImg.length +
          Number(existImg !== undefined ? existImg.length : 0)
        }/${maxLength})`}</div>
      </label>
      <input
        type="file"
        accept="image/*"
        id="img"
        multiple
        onChange={addImg}
        className={storeInfo.realFileButton}
      />
      {existImg !== undefined
        ? existImg.map((src, index) => {
            return (
              <div className={storeInfo.imgBlock} key={src}>
                <Image
                  loader={loader({ width: 200, height: 200 })}
                  src={`/${src}`}
                  className={storeInfo.img}
                  width="100px"
                  height="100px"
                />
                <div
                  onClick={(e) => {
                    deleteExistImg(index);
                  }}
                  className={storeInfo.imgDeleteButton}
                >
                  <ImCross
                    size={20}
                    style={{ color: "white", opacity: "1" }}
                  ></ImCross>
                </div>
              </div>
            );
          })
        : null}
      {uploadImg.map((img, index) => {
        return (
          <div className={storeInfo.imgBlock} key={img}>
            <Image
              src={img}
              width={"100px"}
              height={"100px"}
              className={storeInfo.img}
            ></Image>
            <div
              onClick={(e) => {
                deleteImg(index);
              }}
              className={storeInfo.imgDeleteButton}
            >
              <ImCross
                size={20}
                style={{ color: "white", opacity: "1" }}
              ></ImCross>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageBlock;
