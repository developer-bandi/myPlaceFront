import Image from "next/image";
import {RefObject} from "react";
import {AiOutlinePicture} from "react-icons/ai";
import {ImCross} from "react-icons/im";
import styles from "./WritePost.module.scss";

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
      <div className={styles.title}>포스트 작성하기</div>
      <input
        className={styles.titleInput}
        ref={titleRef}
        placeholder="제목을 입력하세요"
      ></input>
      <ul className={styles.photoBlock}>
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
            <li className={styles.imgBlock} key={index}>
              <Image
                src={img}
                width={"100px"}
                height={"100px"}
                className={styles.img}
              ></Image>
              <div
                className={styles.imgDeleteButton}
                onClick={() => deleteImg(index)}
                data-testid={`deleteImg${index}`}
              >
                <ImCross
                  size={20}
                  style={{color: "white", opacity: "1"}}
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
        data-testid="addImg"
      />
      <div className={styles.contentBlock}>
        <textarea
          className={styles.contentInput}
          ref={contentRef}
          placeholder="내용을 입력하세요"
        />
      </div>
      <div className={styles.ButtonBlock}>
        <button
          className={styles.submitButton}
          onClick={submit}
          data-testid="submit"
        >
          등록
        </button>
      </div>
    </main>
  );
};

export default WritePost;
