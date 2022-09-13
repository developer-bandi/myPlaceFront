import Image from "next/image";
import {RefObject} from "react";
import {AiOutlinePicture} from "react-icons/ai";
import storeInfo from "../../../../lib/styles/storeInfo.module.scss";
import {ImCross} from "react-icons/im";
import {storeInfoType} from "../../../../lib/apitype/search";

interface AddStoreProps {
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

const myLoader = ({src}: {src: string}) => {
  return `${process.env.NEXT_PUBLIC_IMG_URL}/w_200,h_200${process.env.NEXT_PUBLIC_IMG_ID}/${src}`;
};

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
}: AddStoreProps) => {
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

        <div className={storeInfo.menuBlock}>
          <label htmlFor="mainimg" className={storeInfo.fileButton}>
            <div className={storeInfo.imgButtonTitle}>대표사진 추가</div>
            <div className={storeInfo.fileIcon}>
              <AiOutlinePicture size="40" />
            </div>
            <div className={storeInfo.fileCount}>{`(${
              existMainImg !== undefined ? 1 : uploadMainImg.length
            }/1)`}</div>
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
          {existMainImg !== undefined ? (
            <div className={storeInfo.imgBlock} key={existMainImg}>
              <Image
                loader={myLoader}
                src={`/${existMainImg}`}
                className={storeInfo.img}
                width="100px"
                height="100px"
              />
              <div
                onClick={(e) => {
                  deleteExistMainImg();
                }}
                className={storeInfo.imgDeleteButton}
                data-testid={"deleteExistMainImg"}
              >
                <ImCross
                  size={20}
                  style={{color: "white", opacity: "1"}}
                ></ImCross>
              </div>
            </div>
          ) : null}
          {uploadMainImg.map((img, index) => {
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
              </div>
            );
          })}
        </div>
        <div className={storeInfo.menuBlock}>
          <label htmlFor="menuimg" className={storeInfo.fileButton}>
            <div className={storeInfo.imgButtonTitle}>메뉴판 추가</div>
            <div className={storeInfo.fileIcon}>
              <AiOutlinePicture size="40" />
            </div>
            <div className={storeInfo.fileCount}>{`(${
              uploadMenuImg.length +
              Number(existMenuImg !== undefined ? existMenuImg.length : 0)
            }/10)`}</div>
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
          {existMenuImg !== undefined
            ? existMenuImg.map((src, index) => {
                return (
                  <div className={storeInfo.imgBlock} key={src}>
                    <Image
                      loader={myLoader}
                      src={`/${src}`}
                      className={storeInfo.img}
                      width="100px"
                      height="100px"
                    />
                    <div
                      onClick={(e) => {
                        deleteExistMenuImg(index);
                      }}
                      className={storeInfo.imgDeleteButton}
                      data-testid={`deleteExistMenuImg${index}`}
                    >
                      <ImCross
                        size={20}
                        style={{color: "white", opacity: "1"}}
                      ></ImCross>
                    </div>
                  </div>
                );
              })
            : null}
          {uploadMenuImg.map((img, index) => {
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
              </div>
            );
          })}
        </div>
      </div>
      <div className={storeInfo.submitButtonBlock}>
        <button
          className={storeInfo.submitButton}
          onClick={submit}
          data-testid="submit"
        >
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
