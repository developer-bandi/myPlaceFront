import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../../store";
import { axiosAddComment } from "../../../../lib/commonFn/api";
import AddReview from "./AddReview";
import {
  addImgWrapper,
  deleteUploadImgWrapper,
} from "../../../../lib/commonFn/imgFn";
import { useRouter } from "next/router";

const AddReviewContainer = () => {
  const storeInfo = useSelector(
    (state: RootReducer) => state.storeInfo.content
  );
  const taglist = useSelector((state: RootReducer) => state.hashtagAll);
  const user = useSelector((state: RootReducer) => state.userLogin);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedHashtag, setSelectedHashtag] = useState<string[]>([]);
  const [selectedHashtagNumber, setSelectedHashtagNumber] = useState<number[]>(
    []
  );
  const [uploadImg, setUploadImg] = useState<string[]>([]);
  const [imgfile, setImgfile] = useState<Blob[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (storeInfo.storeInfo === undefined) {
      alert("장소가 없습니다. 장소를 다시 선택해 접근해주세요");
      router.push("/findplace");
    }
  }, [storeInfo]);

  const addImg = useCallback(
    addImgWrapper(10, uploadImg, imgfile, setUploadImg, setImgfile),
    [uploadImg, imgfile, setUploadImg, setImgfile]
  );

  const deleteImg = useCallback(
    deleteUploadImgWrapper(uploadImg, imgfile, setUploadImg, setImgfile),
    [uploadImg, imgfile, setUploadImg, setImgfile]
  );

  const changeHashtag = (hashtag: string, id: number) => {
    if (selectedHashtag.indexOf(hashtag) === -1) {
      setSelectedHashtag([...selectedHashtag, hashtag]);
      setSelectedHashtagNumber([...selectedHashtagNumber, id]);
    } else {
      const temp = [...selectedHashtag];
      const temp2 = [...selectedHashtagNumber];
      const index = temp.indexOf(hashtag);
      temp.splice(index, 1);
      temp2.splice(index, 1);
      setSelectedHashtag(temp);
      setSelectedHashtagNumber(temp2);
    }
  };

  const submit = () => {
    if (!user.loginStatus) {
      alert("로그인을 해주세요!");
    } else {
      if (storeInfo.storeInfo !== undefined && textAreaRef.current !== null) {
        axiosAddComment(
          storeInfo.storeInfo.id,
          textAreaRef.current?.value,
          selectedHashtagNumber,
          imgfile
        );
      }
    }
  };

  return (
    <AddReview
      storeInfos={storeInfo}
      taglist={taglist}
      selectedHashtag={selectedHashtag}
      changeHashtag={changeHashtag}
      uploadImg={uploadImg}
      addImg={addImg}
      deleteImg={deleteImg}
      textAreaRef={textAreaRef}
      submit={submit}
    ></AddReview>
  );
};

export default AddReviewContainer;
