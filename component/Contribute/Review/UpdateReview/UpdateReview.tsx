import storeReview from "../../../../lib/styles/storeReview.module.scss";
import submitButton from "../../../../lib/styles/submitButton.module.scss";
import { AiOutlinePicture } from "react-icons/ai";
import { HashtagAllState } from "../../../../store/reducers/hashtagAll/hashtagAllReducer";
import { RefObject } from "react";
import Image from "next/image";
import { ImCross } from "react-icons/im";
import searchResultLoading from "../../../../public/searchResultLoading.gif";

interface CommentAddContainer {
  storeInfo:
    | {
        name: string;
        category: string;
      }
    | undefined;
  existImg: string[] | undefined;
  taglist: HashtagAllState;
  selectedHashtag: string[];
  changeHashtag: (hashtag: string, id: number) => void;
  uploadImg: string[];
  addImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  textAreaRef: RefObject<HTMLTextAreaElement>;
  submit: () => void;
  deleteExistImg: (deleteindex: number) => void;
  deleteUploadImg: (deleteindex: number) => void;
  error: null | object;
  loading: boolean;
}
const myLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMG_URL}/${src}`;
};
const UpdateReview = ({
  storeInfo,
  existImg,
  taglist,
  selectedHashtag,
  changeHashtag,
  uploadImg,
  addImg,
  textAreaRef,
  submit,
  deleteExistImg,
  deleteUploadImg,
  loading,
  error,
}: CommentAddContainer) => {
  if (loading) {
    return (
      <div className={storeReview.loading}>
        <Image src={searchResultLoading} alt="loading"></Image>
      </div>
    );
  } else if (storeInfo !== undefined && error === null) {
    return (
      <main className={storeReview.mainBlock}>
        <h1 className={storeReview.title}>후기 수정</h1>
        <div className={storeReview.subBlock}>
          <div className={storeReview.name}>{storeInfo.name}</div>
          <h2 className={storeReview.subTitle}>후기</h2>
          <textarea
            className={storeReview.reviewInput}
            ref={textAreaRef}
          ></textarea>
          <h2 className={storeReview.subTitle}>사진업로드</h2>
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
                  <div className={storeReview.imgBlock}>
                    <Image
                      loader={myLoader}
                      src={`/${src}`}
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
                <li className={storeReview.imgBlock}>
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
          <h2 className={storeReview.subTitle}>태그 선택</h2>
          <div className={storeReview.tagListBlock}>
            {Object.keys(taglist.content[storeInfo.category]).map(
              (tagTitle) => {
                if (storeInfo !== undefined)
                  return (
                    <>
                      <h3 className={storeReview.tagTitle}>{tagTitle}</h3>
                      <ul className={storeReview.taglistBlock}>
                        {taglist.content[storeInfo.category][tagTitle].map(
                          (tag) => {
                            return (
                              <li
                                className={
                                  selectedHashtag.indexOf(tag[0]) !== -1
                                    ? storeReview.selectedHashtag
                                    : storeReview.hashtag
                                }
                                onClick={() => {
                                  changeHashtag(tag[0], tag[2]);
                                }}
                              >
                                #{tag[0]}
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </>
                  );
              }
            )}
          </div>
        </div>
        <div className={storeReview.buttonBlock}>
          <button className={submitButton.submitButton} onClick={submit}>
            제출
          </button>
        </div>
      </main>
    );
  } else {
    return <div className={storeReview.error}>에러가 발생하였습니다</div>;
  }
};

export default UpdateReview;
