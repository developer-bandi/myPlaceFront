import Image from "next/image";
import {RefObject} from "react";
import {AiOutlinePicture} from "react-icons/ai";
import storeInfo from "../../../../lib/styles/storeInfo.module.scss";
import {ImCross} from "react-icons/im";

interface AddStoreProps {
  address: string;
  addMenuImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteMenuImg: (deleteindex: number) => void;
  uploadMenuImg: string[];
  addMainImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteMainImg: (deleteindex: number) => void;
  uploadMainImg: string[];
  storeNameInputRef: RefObject<HTMLInputElement>;
  categorySelectRef: RefObject<HTMLSelectElement>;
  telRef: RefObject<HTMLInputElement>;
  openninghourTextareaRef: RefObject<HTMLTextAreaElement>;
  submit: () => void;
  loading: boolean;
}

const AddStoreInfo = ({
  address,
  addMenuImg,
  deleteMenuImg,
  uploadMenuImg,
  addMainImg,
  deleteMainImg,
  uploadMainImg,
  storeNameInputRef,
  categorySelectRef,
  telRef,
  openninghourTextareaRef,
  submit,
  loading,
}: AddStoreProps) => {
  return (
    <main className={storeInfo.mainBlock}>
      <h3 className={storeInfo.title}>장소 등록</h3>
      <input
        className={storeInfo.input}
        placeholder="가게이름을 입력하세요"
        ref={storeNameInputRef}
      />
      <select
        className={storeInfo.input}
        ref={categorySelectRef}
        defaultValue="카테고리"
      >
        <option value={"카테고리"} disabled>
          카테고리를 선택하세요
        </option>
        <option value={"카페"}>카페</option>
        <option value={"식당"}>식당</option>
        <option value={"주점"}>주점</option>
      </select>
      <div className={storeInfo.input} placeholder="주소">
        {address}
      </div>
      <input
        className={storeInfo.input}
        placeholder="전화번호를 입력하세요"
        ref={telRef}
      />
      <textarea
        className={storeInfo.textarea}
        placeholder="요일을 아래의 예시에 맞게 입력해주세요&#13;&#10;월 : 10:00~12:00 14:00~19:00/ 브레이크타임 12:00~14:00/라스트오더 18:30&#13;&#10;화 : 10:00~12:00 14:00~19:00/ 브레이크타임 12:00~14:00/라스트오더 18:30&#13;&#10;와 같이 다른 요일간에는 줄바꿈을 사용하고, 다른 정보간에는 /를 사용해서 표기해주세요"
        ref={openninghourTextareaRef}
      />
      <ul className={storeInfo.menuBlock}>
        <label htmlFor="mainimg" className={storeInfo.fileButton}>
          <div className={storeInfo.imgButtonTitle}>대표사진 추가</div>
          <div className={storeInfo.fileIcon}>
            <AiOutlinePicture size="40" />
          </div>
          <div
            className={storeInfo.fileCount}
          >{`(${uploadMainImg.length}/1)`}</div>
        </label>
        <input
          type="file"
          accept="image/*"
          id="mainimg"
          multiple
          onChange={addMainImg}
          className={storeInfo.realFileButton}
          data-testid="addMainImg"
        />
        {uploadMainImg.map((img, index) => {
          return (
            <li className={storeInfo.imgBlock} key={index}>
              <Image
                src={img}
                width={"100px"}
                height={"100px"}
                className={storeInfo.img}
              ></Image>
              <div
                onClick={(e) => {
                  deleteMainImg(index);
                }}
                className={storeInfo.imgDeleteButton}
                data-testid={`deleteMainImg${index}`}
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
      <ul className={storeInfo.menuBlock}>
        <label htmlFor="menuimg" className={storeInfo.fileButton}>
          <div className={storeInfo.imgButtonTitle}>메뉴판 추가</div>
          <div className={storeInfo.fileIcon}>
            <AiOutlinePicture size="40" />
          </div>
          <div
            className={storeInfo.fileCount}
          >{`(${uploadMenuImg.length}/10)`}</div>
        </label>
        <input
          type="file"
          accept="image/*"
          id="menuimg"
          multiple
          onChange={addMenuImg}
          className={storeInfo.realFileButton}
          data-testid="addMenuImg"
        />
        {uploadMenuImg.map((img, index) => {
          return (
            <li className={storeInfo.imgBlock} key={index}>
              <Image
                src={img}
                width={"100px"}
                height={"100px"}
                className={storeInfo.img}
              ></Image>
              <div
                onClick={(e) => {
                  deleteMenuImg(index);
                }}
                className={storeInfo.imgDeleteButton}
                data-testid={`deleteMenuImg${index}`}
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
      <div className={storeInfo.submitButtonBlock}>
        <button
          onClick={submit}
          data-testid="submit"
          className={storeInfo.submitButton}
        >
          등록
        </button>
      </div>
      {loading ? (
        <div className={storeInfo.test}>
          <div className={storeInfo.testContent}>업로드중입니다</div>
        </div>
      ) : null}
    </main>
  );
};

export default AddStoreInfo;
