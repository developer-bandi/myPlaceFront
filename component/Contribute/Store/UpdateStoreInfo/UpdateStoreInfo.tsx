import Image from "next/image";
import { RefObject } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import storeInfo from "../../../../lib/styles/storeInfo.module.scss";
import submitButton from "../../../../lib/styles/submitButton.module.scss";
import { ImCross } from "react-icons/im";
import { storeInfoType } from "../../../../lib/apitype/search";

interface AddStoreProps {
  existInfo: storeInfoType;
  addImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteExistImg: (deleteindex: number) => void;
  deleteUploadImg: (deleteindex: number) => void;
  uploadImg: string[];
  storeNameInputRef: RefObject<HTMLInputElement>;
  categorySelectRef: RefObject<HTMLSelectElement>;
  telRef: RefObject<HTMLInputElement>;
  openninghourTextareaRef: RefObject<HTMLTextAreaElement>;
  submit: () => void;
  existImg: string[] | undefined;
}

const myLoader = ({ src }: { src: string }) => {
  return `http://localhost:8001/imgs/${src}`;
};

const UpdateStoreInfo = ({
  existInfo,
  addImg,
  deleteExistImg,
  deleteUploadImg,
  uploadImg,
  existImg,
  storeNameInputRef,
  categorySelectRef,
  telRef,
  openninghourTextareaRef,
  submit,
}: AddStoreProps) => {
  return (
    <main className={storeInfo.mainBlock}>
      <h1 className={storeInfo.title}>스토어 등록</h1>
      <div className={storeInfo.subBlock}>
        <div className={storeInfo.contentBlock}>
          <h2 className={storeInfo.subTitleCenter}>가게이름</h2>
          <input
            className={storeInfo.input}
            placeholder="가게이름"
            ref={storeNameInputRef}
          />
        </div>
        <div className={storeInfo.contentBlock}>
          <h2 className={storeInfo.subTitleCenter}>카테고리</h2>
          <select className={storeInfo.input} ref={categorySelectRef}>
            <option value={"카테고리"}>카테고리</option>
            <option value={"카페"}>카페</option>
            <option value={"식당"}>식당</option>
            <option value={"주점"}>주점</option>
          </select>
        </div>
        <div className={storeInfo.contentBlock}>
          <h2 className={storeInfo.subTitleCenter}>주소</h2>
          <div className={storeInfo.input} placeholder="주소">
            {existInfo.storeInfo?.address}
          </div>
        </div>
        <div className={storeInfo.contentBlock}>
          <h2 className={storeInfo.subTitleCenter}>전화번호</h2>
          <input
            className={storeInfo.input}
            placeholder="전화번호"
            ref={telRef}
          />
        </div>
        <div className={storeInfo.contentBlock}>
          <h2 className={storeInfo.subTitle}>오픈시간</h2>
          <textarea
            className={storeInfo.textarea}
            placeholder="월 : 10:00~12:00 14:00~19:00/ 브레이크타임 12:00~14:00/라스트오더 18:30&#13;&#10;화 : 10:00~12:00 14:00~19:00/ 브레이크타임 12:00~14:00/라스트오더 18:30&#13;&#10;와 같이 다른 요일간에는 줄바꿈을 사용하고, 다른 정보간에는 /를 사용해서 표기해주세요"
            ref={openninghourTextareaRef}
          />
        </div>
        <div className={storeInfo.contentBlock}>
          <h2 className={storeInfo.subTitle}>메뉴판</h2>
          <div className={storeInfo.menuBlock}>
            <label htmlFor="fileimg" className={storeInfo.fileButton}>
              <div className={storeInfo.fileIcon}>
                <AiOutlinePicture size="40" />
              </div>
              <div className={storeInfo.fileCount}>{`(${
                uploadImg.length +
                Number(existImg !== undefined ? existImg.length : 0)
              }/10)`}</div>
            </label>
            <input
              type="file"
              accept="image/*"
              id="fileimg"
              multiple
              onChange={addImg}
              className={storeInfo.realFileButton}
            />
            {existImg !== undefined
              ? existImg.map((src, index) => {
                  return (
                    <div className={storeInfo.menuImgBlock}>
                      <Image
                        loader={myLoader}
                        src={`/${src}`}
                        className={storeInfo.menuImg}
                        width="105px"
                        height="105px"
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
                <div className={storeInfo.menuImgBlock}>
                  <Image
                    src={img}
                    width={"105px"}
                    height={"105px"}
                    className={storeInfo.menuImg}
                  ></Image>
                  <div
                    onClick={(e) => {
                      deleteUploadImg(index);
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
        </div>
      </div>
      <button className={storeInfo.submitButtonBlock}>
        <button className={submitButton.submitButton} onClick={submit}>
          수정하기
        </button>
      </button>
    </main>
  );
};

export default UpdateStoreInfo;
