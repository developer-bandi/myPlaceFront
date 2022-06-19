import Image from "next/image";
import { RefObject } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import storeInfo from "../../../../lib/styles/storeInfo.module.scss";
import submitButton from "../../../../lib/styles/submitButton.module.scss";
import { ImCross } from "react-icons/im";

interface AddStoreProps {
  address: string;
  addImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImg: (deleteindex: number) => void;
  uploadImg: string[];
  storeNameInputRef: RefObject<HTMLInputElement>;
  categorySelectRef: RefObject<HTMLSelectElement>;
  telRef: RefObject<HTMLInputElement>;
  openninghourTextareaRef: RefObject<HTMLTextAreaElement>;
  submit: () => void;
}

const AddStoreInfo = ({
  address,
  addImg,
  deleteImg,
  uploadImg,
  storeNameInputRef,
  categorySelectRef,
  telRef,
  openninghourTextareaRef,
  submit,
}: AddStoreProps) => {
  return (
    <main className={storeInfo.mainBlock}>
      <h3 className={storeInfo.title}>스토어 등록</h3>
      <div className={storeInfo.subBlock}>
        <div className={storeInfo.contentBlock}>
          <div className={storeInfo.subTitleCenter}>가게이름</div>
          <input
            className={storeInfo.input}
            placeholder="가게이름"
            ref={storeNameInputRef}
          />
        </div>
        <div className={storeInfo.contentBlock}>
          <div className={storeInfo.subTitleCenter}>카테고리</div>
          <select className={storeInfo.selectInput} ref={categorySelectRef}>
            <option value={"카테고리"} selected disabled>
              카테고리
            </option>
            <option value={"카페"}>카페</option>
            <option value={"식당"}>식당</option>
            <option value={"주점"}>주점</option>
          </select>
        </div>
        <div className={storeInfo.contentBlock}>
          <div className={storeInfo.subTitleCenter}>주소</div>
          <div className={storeInfo.input} placeholder="주소">
            {address}
          </div>
        </div>
        <div className={storeInfo.contentBlock}>
          <div className={storeInfo.subTitleCenter}>전화번호</div>
          <input
            className={storeInfo.input}
            placeholder="전화번호"
            ref={telRef}
          />
        </div>
        <div className={storeInfo.contentBlock}>
          <div className={storeInfo.subTitle}>오픈시간</div>
          <textarea
            className={storeInfo.textarea}
            placeholder="월 : 10:00~12:00 14:00~19:00/ 브레이크타임 12:00~14:00/라스트오더 18:30&#13;&#10;화 : 10:00~12:00 14:00~19:00/ 브레이크타임 12:00~14:00/라스트오더 18:30&#13;&#10;와 같이 다른 요일간에는 줄바꿈을 사용하고, 다른 정보간에는 /를 사용해서 표기해주세요"
            ref={openninghourTextareaRef}
          />
        </div>
        <div className={storeInfo.contentBlock}>
          <div className={storeInfo.subTitle}>{"메뉴판"}</div>
          <ul className={storeInfo.menuBlock}>
            <label htmlFor="fileimg" className={storeInfo.fileButton}>
              <div className={storeInfo.fileIcon}>
                <AiOutlinePicture size="40" />
              </div>
              <div
                className={storeInfo.fileCount}
              >{`(${uploadImg.length}/10)`}</div>
            </label>
            <input
              type="file"
              accept="image/*"
              id="fileimg"
              multiple
              onChange={addImg}
              className={storeInfo.realFileButton}
            />
            {uploadImg.map((img, index) => {
              return (
                <li className={storeInfo.imgBlock}>
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
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={storeInfo.submitButtonBlock}>
        <button className={submitButton.submitButton} onClick={submit}>
          등록하기
        </button>
      </div>
    </main>
  );
};

export default AddStoreInfo;
