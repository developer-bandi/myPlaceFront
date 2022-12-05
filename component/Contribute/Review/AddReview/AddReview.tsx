import storeReview from "../../../../lib/styles/storeReview.module.scss";
import { HashtagAllState } from "../../../../store/reducers/hashtagAll/Reducer";
import React, { RefObject } from "react";
import { storeInfoType } from "../../../../lib/apitype/search";
import ImageComponent from "./Image/Image";
import Hashtag from "./Hashtag/Hashtag";

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
        <ImageComponent
          uploadImg={uploadImg}
          deleteImg={deleteImg}
          addImg={addImg}
        />
        <Hashtag
          category={storeInfo.storeInfo.category}
          taglist={taglist}
          selectedHashtag={selectedHashtag}
          changeHashtag={changeHashtag}
        />
        <div className={storeReview.submitButtonBlock}>
          <button onClick={submit} className={storeReview.submitButton}>
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
