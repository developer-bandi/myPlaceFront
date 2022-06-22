import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { axiosPostDetail } from "../../../lib/commonFn/api";
import {
  addImgWrapper,
  deleteUploadImgWrapper,
} from "../../../lib/commonFn/imgFn";
import { RootReducer } from "../../../store";
import WritePost from "./WritePost";

const WritePostContainer = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const loginedUser = useSelector(
    (state: RootReducer) => state.userLogin.loginStatus
  );
  const router = useRouter();
  const [uploadImg, setUploadImg] = useState<string[]>([]);
  const [imgfile, setImgfile] = useState<Blob[]>([]);

  const addImg = useCallback(
    addImgWrapper(5, uploadImg, imgfile, setUploadImg, setImgfile),
    [uploadImg, imgfile, setUploadImg, setImgfile]
  );

  const deleteImg = useCallback(
    deleteUploadImgWrapper(uploadImg, imgfile, setUploadImg, setImgfile),
    [uploadImg, imgfile, setUploadImg, setImgfile]
  );

  const submit = async () => {
    if (!loginedUser) {
      alert("로그인을 해주세요!");
    } else {
      if (contentRef.current !== null && titleRef.current !== null) {
        try {
          await axiosPostDetail(
            titleRef.current.value,
            contentRef.current.value,
            imgfile
          );
          alert("게시글 등록이 완료되었습니다");
          router.push("/community/postlist");
        } catch (error) {
          alert("에러가 발생하였습니다");
        }
      }
    }
  };

  return (
    <WritePost
      addImg={addImg}
      deleteImg={deleteImg}
      uploadImg={uploadImg}
      titleRef={titleRef}
      contentRef={contentRef}
      submit={submit}
    />
  );
};

export default WritePostContainer;
