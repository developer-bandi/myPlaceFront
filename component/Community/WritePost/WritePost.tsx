import Image from "next/image";
import { RefObject } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import styles from "./WritePost.module.scss";
import submitButton from "../../../lib/styles/submitButton.module.scss";

interface WritePostProps {
  addImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImg: (deleteindex: number) => void;
  uploadImg: string[];
  titleRef: RefObject<HTMLInputElement>;
  contentRef: RefObject<HTMLTextAreaElement>;
  submit: () => void;
}

const WritePost = ({
  addImg,
  deleteImg,
  uploadImg,
  titleRef,
  contentRef,
  submit,
}: WritePostProps) => {
  return (
    <main className={styles.mainBlock}>
      <div className={styles.title}>글쓰기</div>
      <div className={styles.subBlock}>
        <div className={styles.titleBlock}>
          <div className={styles.subTitle}>제목</div>
          <input className={styles.titleInput} ref={titleRef}></input>
        </div>
        <div className={styles.photoBlock}>
          <div className={styles.subTitle}>사진</div>
          <ul className={styles.imgListBlock}>
            <li>
              <label htmlFor="fileimg" className={styles.fileButton}>
                <div className={styles.fileIcon}>
                  <AiOutlinePicture size="40" />
                </div>
                <div className={styles.fileCount}>{`(${
                  uploadImg === undefined ? 0 : uploadImg.length
                }/5)`}</div>
              </label>
            </li>
            {(uploadImg || []).map((img, index) => {
              return (
                <li className={styles.imgBlock}>
                  <Image
                    src={img}
                    width={"100px"}
                    height={"100px"}
                    className={styles.img}
                  ></Image>
                  <div
                    className={styles.imgDeleteButton}
                    onClick={() => deleteImg(index)}
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
            className={styles.realFileButton}
          />
        </div>
        <div className={styles.contentBlock}>
          <div className={styles.subTitle}>내용</div>
          <textarea className={styles.contentInput} ref={contentRef} />
        </div>
      </div>
      <div className={styles.ButtonBlock}>
        <button className={submitButton.submitButton} onClick={submit}>
          등록
        </button>
      </div>
    </main>
  );
};

export default WritePost;
