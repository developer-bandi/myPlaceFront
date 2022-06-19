import storeReview from "../../../../lib/styles/storeReview.module.scss";
import submitButton from "../../../../lib/styles/submitButton.module.scss";
import { AiOutlinePicture } from "react-icons/ai";
import { HashtagAllState } from "../../../../store/reducers/hashtagAll/hashtagAllReducer";
import { RefObject } from "react";
import { ImCross } from "react-icons/im";
import Image from "next/image";
import { storeInfoType } from "../../../../lib/apitype/search";

interface CommentAddContainer {
  storeInfos: storeInfoType;
  taglist: HashtagAllState;
  selectedHashtag: string[];
  changeHashtag: (hashtag: string, id: number) => void;
  uploadImg: string[];
  addImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImg: (index: number) => void;
  textAreaRef: RefObject<HTMLTextAreaElement>;
  submit: () => void;
}

const AddReview = ({
  storeInfos,
  taglist,
  selectedHashtag,
  changeHashtag,
  uploadImg,
  addImg,
  deleteImg,
  textAreaRef,
  submit,
}: CommentAddContainer) => {
  if (storeInfos.storeInfo !== undefined) {
    return (
      <main className={storeReview.mainBlock}>
        <h1 className={storeReview.title}>후기 작성</h1>
        <div className={storeReview.subBlock}>
          <h2 className={storeReview.name}>{storeInfos.storeInfo.name}</h2>
          <div className={storeReview.address}>
            {storeInfos.storeInfo.address}{" "}
          </div>
          <div className={storeReview.contentBlock}>
            <h3 className={storeReview.subTitle}>후기</h3>
            <textarea
              className={storeReview.reviewInput}
              ref={textAreaRef}
            ></textarea>
          </div>
          <div className={storeReview.contentBlock}>
            <h3 className={storeReview.subTitle}>사진업로드</h3>
            <ul className={storeReview.imgListBlock}>
              <label htmlFor="fileimg" className={storeReview.fileButton}>
                <div className={storeReview.fileIcon}>
                  <AiOutlinePicture size="40" />
                </div>
                <div
                  className={storeReview.fileCount}
                >{`(${uploadImg.length}/10)`}</div>
              </label>
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
                        deleteImg(index);
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
          </div>
          <input
            type="file"
            accept="image/*"
            id="fileimg"
            onChange={addImg}
            multiple
            className={storeReview.realFileButton}
          />
          <div className={storeReview.contentBlock}>
            <h3 className={storeReview.subTitle}>태그 선택</h3>
            <div className={storeReview.tagListBlock}>
              {Object.keys(taglist.content[storeInfos.storeInfo.category]).map(
                (tagTitle) => {
                  if (storeInfos.storeInfo !== undefined)
                    return (
                      <>
                        <h4 className={storeReview.tagTitle}>{tagTitle}</h4>
                        <ul className={storeReview.taglistBlock}>
                          {taglist.content[storeInfos.storeInfo.category][
                            tagTitle
                          ].map((tag) => {
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
                          })}
                        </ul>
                      </>
                    );
                }
              )}
            </div>
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
    return <div className={storeReview.error}>잘못된 접근 입니다</div>;
  }
};

export default AddReview;
