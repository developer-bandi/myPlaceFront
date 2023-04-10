import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { addPostDetail, getPostDetail } from "../../../api/post";
import { addImgWrapper, deleteUploadImgWrapper } from "../../../lib/imgFn";
import { RootReducer } from "../../../store";

const useWritePost = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const loginedUser = useSelector(
    (state: RootReducer) => state.userLogin.content
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
          await addPostDetail({
            title: titleRef.current.value,
            content: contentRef.current.value,
            imgs: imgfile,
          });
          alert("게시글 등록이 완료되었습니다");
          router.push("/community/postlist");
        } catch (error) {
          alert("에러가 발생하였습니다");
        }
      }
    }
  };

  return {
    addImg,
    deleteImg,
    uploadImg,
    titleRef,
    contentRef,
    submit,
  };
};

export default useWritePost;
