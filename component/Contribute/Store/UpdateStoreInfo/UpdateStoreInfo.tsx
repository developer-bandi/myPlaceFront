import { RefObject } from "react";
import storeInfo from "../../../../lib/styles/storeInfo.module.scss";
import { storeInfoType } from "../../../../lib/apitype/search";
import ImageBlock from "./ImageBlock/ImageBlock";

interface UpdateStoreInfoProps {
  existInfo: storeInfoType | undefined;
  addMenuImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteExistMenuImg: (deleteindex: number) => void;
  deleteMenuImg: (deleteindex: number) => void;
  uploadMenuImg: string[];
  addMainImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteExistMainImg: () => void;
  deleteMainImg: (deleteindex: number) => void;
  uploadMainImg: string[];
  existMenuImg: string[] | undefined;
  existMainImg: string | undefined;
  storeNameInputRef: RefObject<HTMLInputElement>;
  categorySelectRef: RefObject<HTMLSelectElement>;
  telRef: RefObject<HTMLInputElement>;
  openninghourTextareaRef: RefObject<HTMLTextAreaElement>;
  submit: () => void;
  loading: boolean;
}

const UpdateStoreInfo = ({
  existInfo,
  addMenuImg,
  deleteExistMenuImg,
  deleteMenuImg,
  uploadMenuImg,
  addMainImg,
  deleteExistMainImg,
  deleteMainImg,
  uploadMainImg,
  existMenuImg,
  existMainImg,
  storeNameInputRef,
  categorySelectRef,
  telRef,
  openninghourTextareaRef,
  submit,
  loading,
}: UpdateStoreInfoProps) => {
  return (
    <main className={storeInfo.mainBlock}>
      <h1 className={storeInfo.title}>장소 수정</h1>
      <div className={storeInfo.subBlock}>
        <input
          className={storeInfo.input}
          placeholder="가게이름"
          ref={storeNameInputRef}
        />
        <select className={storeInfo.input} ref={categorySelectRef}>
          <option value={"카테고리"}>카테고리</option>
          <option value={"카페"}>카페</option>
          <option value={"식당"}>식당</option>
          <option value={"주점"}>주점</option>
        </select>
        <div className={storeInfo.input} placeholder="주소">
          {existInfo?.storeInfo?.address}
        </div>
        <input
          className={storeInfo.input}
          placeholder="전화번호"
          ref={telRef}
        />
        <textarea
          className={storeInfo.textarea}
          placeholder="월 : 10:00~12:00 14:00~19:00/ 브레이크타임 12:00~14:00/라스트오더 18:30&#13;&#10;화 : 10:00~12:00 14:00~19:00/ 브레이크타임 12:00~14:00/라스트오더 18:30&#13;&#10;와 같이 다른 요일간에는 줄바꿈을 사용하고, 다른 정보간에는 /를 사용해서 표기해주세요"
          ref={openninghourTextareaRef}
        />
        <ImageBlock
          title={"대표사진 추가"}
          maxLength={1}
          existImg={existMainImg !== undefined ? [existMainImg] : undefined}
          uploadImg={uploadMainImg}
          addImg={addMainImg}
          deleteExistImg={deleteExistMainImg}
          deleteImg={deleteMainImg}
        />
        <ImageBlock
          title={"메뉴판 추가"}
          maxLength={1}
          existImg={existMenuImg}
          uploadImg={uploadMenuImg}
          addImg={addMenuImg}
          deleteExistImg={deleteExistMenuImg}
          deleteImg={deleteMenuImg}
        />
      </div>
      <div className={storeInfo.submitButtonBlock}>
        <button className={storeInfo.submitButton} onClick={submit}>
          수정하기
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

export default UpdateStoreInfo;
