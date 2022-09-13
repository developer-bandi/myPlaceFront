import storeReview from "../../../../lib/styles/storeReview.module.scss";
import {AiOutlinePicture} from "react-icons/ai";
import {HashtagAllState} from "../../../../store/reducers/hashtagAll/Reducer";
import React, {RefObject} from "react";
import {ImCross} from "react-icons/im";
import Image from "next/image";
import {storeInfoType} from "../../../../lib/apitype/search";

interface CommentAddContainer {
  storeInfo: undefined | storeInfoType;
  taglist: HashtagAllState;
  selectedHashtag: string[];
  changeHashtag: (hashtag: string, id: number) => void;
  uploadImg: string[];
  addImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImg: (index: number) => void;
  textAreaRef: RefObject<HTMLTextAreaElement>;
  submit: () => void;
  loading: boolean;
}

const AddReview = ({
  storeInfo,
  taglist,
  selectedHashtag,
  changeHashtag,
  uploadImg,
  addImg,
  deleteImg,
  textAreaRef,
  submit,
  loading,
}: CommentAddContainer) => {
  if (storeInfo?.storeInfo !== undefined) {
    return (
      <main className={storeReview.mainBlock}>
        <h2 className={storeReview.name}>{storeInfo.storeInfo.name}</h2>
        <div className={storeReview.address}>{storeInfo.storeInfo.address}</div>
        <textarea
          className={storeReview.reviewInput}
          ref={textAreaRef}
          placeholder="후기를 입력하세요"
        ></textarea>
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
              <li className={storeReview.imgBlock} key={img}>
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
          data-testid="addImg"
          multiple
          className={storeReview.realFileButton}
        />
        <div className={storeReview.taglistBoxBlock}>
          <h3 className={storeReview.taglistTitle}>태그를 선택해 보세요</h3>
          <div className={storeReview.tagListBlock}>
            {taglist.content !== undefined
              ? Object.keys(taglist.content[storeInfo.storeInfo.category]).map(
                  (tagTitle) => {
                    if (storeInfo.storeInfo !== undefined)
                      return (
                        <React.Fragment key={tagTitle}>
                          <h4 className={storeReview.tagTitle}>{tagTitle}</h4>
                          <ul className={storeReview.taglistBlock}>
                            {taglist.content !== undefined
                              ? taglist.content[storeInfo.storeInfo.category][
                                  tagTitle
                                ].map((tag, index) => {
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
                                })
                              : null}
                          </ul>
                        </React.Fragment>
                      );
                  }
                )
              : null}
          </div>
        </div>
        <div className={storeReview.submitButtonBlock}>
          <button
            onClick={submit}
            data-testid="submit"
            className={storeReview.submitButton}
          >
            리뷰 등록하기
          </button>
        </div>
        {loading ? (
          <div className={storeReview.test}>
            <div className={storeReview.testContent}>업로드중입니다</div>
          </div>
        ) : null}
      </main>
    );
  } else {
    return <div className={storeReview.error}>잘못된 접근 입니다</div>;
  }
};

export default AddReview;
