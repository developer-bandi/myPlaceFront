import {useCallback, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootReducer} from "../../../../store";
import {axiosAddComment} from "../../../../lib/commonFn/api";
import {
  addImgWrapper,
  deleteUploadImgWrapper,
} from "../../../../lib/commonFn/imgFn";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {getStoreInfo} from "../../../../store/reducers/storeInfo/Reducer";

const useAddReview = () => {
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
  const dispatch = useDispatch();
  useEffect(() => {
    if (storeInfo === undefined) {
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
      setSelectedHashtag(
        selectedHashtag.filter((hashtagName) => {
          return hashtagName === hashtag ? false : true;
        })
      );
      setSelectedHashtagNumber(
        selectedHashtagNumber.filter((hashtagNumber) => {
          return hashtagNumber === id ? false : true;
        })
      );
    }
  };

  const submit = async () => {
    if (user.content === undefined) {
      alert("로그인이 필요합니다");
    } else {
      try {
        if (
          storeInfo !== undefined &&
          storeInfo.storeInfo !== undefined &&
          textAreaRef.current !== null
        ) {
          await axiosAddComment(
            storeInfo.storeInfo.id,
            textAreaRef.current.value,
            selectedHashtagNumber,
            imgfile
          );
          dispatch(getStoreInfo(storeInfo.storeInfo.id));
          alert("성공적으로 등록되었습니다");
          router.push("/findplace");
        }
      } catch (error) {
        alert("에러가 발생하였습니다");
      }
    }
  };

  return {
    storeInfo,
    taglist,
    selectedHashtag,
    changeHashtag,
    uploadImg,
    addImg,
    deleteImg,
    textAreaRef,
    submit,
    selectedHashtagNumber,
    setSelectedHashtag,
    setSelectedHashtagNumber,
  };
};

export default useAddReview;
