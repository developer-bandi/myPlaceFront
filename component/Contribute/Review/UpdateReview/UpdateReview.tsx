import storeReview from "../../../../lib/styles/storeReview.module.scss";
import {AiOutlinePicture} from "react-icons/ai";
import {HashtagAllState} from "../../../../store/reducers/hashtagAll/Reducer";
import React, {RefObject} from "react";
import Image from "next/image";
import {ImCross} from "react-icons/im";
import searchResultLoading from "../../../../public/searchResultLoading.gif";

interface CommentAddContainer {
  storeInfo:
    | {
        name: string;
        category: string;
        address: string;
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
  error: boolean;
  loading: boolean;
}
const myLoader = ({src}: {src: string}) => {
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
  } else if (error) {
    return <div className={storeReview.error}>에러가 발생하였습니다</div>;
  } else {
    return (
      <main className={storeReview.mainBlock}>
        <h2 className={storeReview.name}>{storeInfo?.name}</h2>
        <div className={storeReview.address}>{storeInfo?.address}</div>
        <textarea
          className={storeReview.reviewInput}
          ref={textAreaRef}
        ></textarea>
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
                    data-testid={`deleteExistImg${index}`}
                  >
                    <ImCross
                      size={20}
                      style={{color: "white", opacity: "1"}}
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
          className={storeReview.realFileButton}
          data-testid="addImg"
        />
        <div className={storeReview.taglistBoxBlock}>
          <h3 className={storeReview.taglistTitle}>태그를 선택해 보세요</h3>
          <div className={storeReview.tagListBlock}>
            {taglist.content !== undefined &&
              storeInfo !== undefined &&
              Object.keys(taglist.content[storeInfo.category]).map(
                (tagTitle) => {
                  if (storeInfo !== undefined)
                    return (
                      <React.Fragment key={tagTitle}>
                        <h3 className={storeReview.tagTitle}>{tagTitle}</h3>
                        <ul className={storeReview.taglistBlock}>
                          {taglist.content !== undefined &&
                            taglist.content[storeInfo.category][tagTitle].map(
                              (tag, index) => {
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
                                    data-testid={`changeHashtag${index}`}
                                    key={tag[0]}
                                  >
                                    #{tag[0]}
                                  </li>
                                );
                              }
                            )}
                        </ul>
                      </React.Fragment>
                    );
                }
              )}
          </div>
        </div>
        <div className={storeReview.submitButtonBlock}>
          <button
            onClick={submit}
            data-testid="submit"
            className={storeReview.submitButton}
          >
            리뷰 수정하기
          </button>
        </div>
      </main>
    );
  }
};

export default UpdateReview;
