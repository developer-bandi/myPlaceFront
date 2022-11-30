import Image from "next/image";
import { AiOutlinePicture } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { loader } from "../../../../../lib/commonFn/loader";
import storeReview from "../../../../../lib/styles/storeReview.module.scss";

interface ImageComponentProps {
  uploadImg: string[];
  existImg: string[] | undefined;
  deleteExistImg: (deleteindex: number) => void;
  deleteUploadImg: (deleteindex: number) => void;
  addImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageComponent = ({
  uploadImg,
  existImg,
  deleteExistImg,
  deleteUploadImg,
  addImg,
}: ImageComponentProps) => {
  return (
    <>
      <ul className={storeReview.imgListBlock}>
        <label htmlFor="fileimg" className={storeReview.fileButton}>
          <div className={storeReview.fileIcon}>
            <AiOutlinePicture size="40" />
          </div>
          <div className={storeReview.fileCount}>{`(${
            uploadImg.length + Number(existImg?.length)
          }/10)`}</div>
        </label>
        {existImg &&
          existImg.map((src, index) => {
            return (
              <div className={storeReview.imgBlock} key={src}>
                <Image
                  loader={loader({ width: 200, height: 200 })}
                  src={`${src}`}
                  className={storeReview.img}
                  width="100px"
                  height="100px"
                />
                <div
                  onClick={(e) => {
                    deleteExistImg(index);
                  }}
                  className={storeReview.imgDeleteButton}
                >
                  <ImCross
                    size={20}
                    style={{ color: "white", opacity: "1" }}
                  ></ImCross>
                </div>
              </div>
            );
          })}
        {uploadImg.map((img, index) => {
          return (
            <li className={storeReview.imgBlock} key={img}>
              <Image
                src={img}
                width={"100px"}
                height={"100px"}
                className={storeReview.img}
              ></Image>
              <div
                onClick={(e) => {
                  deleteUploadImg(index);
                }}
                className={storeReview.imgDeleteButton}
                data-testid={`deleteUploadImg${index}`}
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
