import storeReview from "../../../../styles/storeReview.module.scss";
import { HashtagAllState } from "../../../../store/reducers/hashtagAll/Reducer";
import React, { RefObject } from "react";
import Image from "next/image";
import searchResultLoading from "../../../../public/searchResultLoading.gif";
import HashTag from "./HashTag/HashTag";
import ImageComponent from "./Image/Image";

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
  uploadLoading: boolean;
}

const myLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMG_URL}/w_200,h_200${process.env.NEXT_PUBLIC_IMG_ID}/${src}`;
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
  uploadLoading,
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
        <ImageComponent
          uploadImg={uploadImg}
          existImg={existImg}
          deleteExistImg={deleteExistImg}
          deleteUploadImg={deleteUploadImg}
          addImg={addImg}
        />
        <HashTag
          taglist={taglist}
          storeInfo={storeInfo}
          selectedHashtag={selectedHashtag}
          changeHashtag={changeHashtag}
        />
        <div className={storeReview.submitButtonBlock}>
          <button onClick={submit} className={storeReview.submitButton}>
            리뷰 수정하기
          </button>
        </div>
        {uploadLoading ? (
          <div className={storeReview.test}>
            <div className={storeReview.testContent}>업로드중입니다</div>
          </div>
        ) : null}
      </main>
    );
  }
};

export default UpdateReview;
