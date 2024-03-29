import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReview } from "../../../../api/contribute";
import { getMyReview } from "../../../../api/mypage";
import {
  addImgWrapper,
  deleteExistImgWrapper,
  deleteUploadImgWrapper,
} from "../../../../lib/imgFn";
import { RootReducer } from "../../../../store";
import { getHashtagAll } from "../../../../store/reducers/hashtagAll/Reducer";
import { getMyReviewRes } from "../../../../type/mypage";

const useUpdateReview = () => {
  const taglist = useSelector((state: RootReducer) => state.hashtagAll);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [existInfo, setExistInfo] = useState<getMyReviewRes>();
  const [selectedHashtag, setSelectedHashtag] = useState<string[]>([]);
  const [existImg, setExistImg] = useState<string[] | undefined>();
  const [storeInfo, setStoreInfo] =
    useState<{
      name: string;
      category: string;
      address: string;
    }>();
  const [uploadImg, setUploadImg] = useState<string[]>([]);
  const [imgfile, setImgfile] = useState<Blob[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const addImg = useCallback(
    addImgWrapper(10, uploadImg, imgfile, setUploadImg, setImgfile),
    [uploadImg, imgfile, setUploadImg, setImgfile]
  );

  const deleteUploadImg = useCallback(
    deleteUploadImgWrapper(uploadImg, imgfile, setUploadImg, setImgfile),
    [uploadImg, imgfile, setUploadImg, setImgfile]
  );

  const deleteExistImg = useCallback(
    deleteExistImgWrapper(existImg, setExistImg),
    [existImg, setExistImg]
  );

  useEffect(() => {
    if (taglist.content === undefined) {
      dispatch(getHashtagAll());
    }
    const asyncTempFunc = async () => {
      try {
        const res = await getMyReview(router.query.id as string);
        setStoreInfo(res.data.storeInfo);
        setSelectedHashtag(res.data.Hashtags);
        setExistImg(res.data.photo);
        setExistInfo(res.data);
        setError(false);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    asyncTempFunc();
  }, []);

  useEffect(() => {
    if (textAreaRef.current !== null && existInfo !== undefined) {
      textAreaRef.current.value = existInfo.content;
    }
  }, [existInfo]);

  const changeHashtag = (hashtag: string) => {
    if (selectedHashtag.indexOf(hashtag) === -1) {
      setSelectedHashtag([...selectedHashtag, hashtag]);
    } else {
      const temp = [...selectedHashtag];
      const index = temp.indexOf(hashtag);
      temp.splice(index, 1);
      setSelectedHashtag(temp);
    }
  };

  const submit = async () => {
    if (existInfo !== undefined) {
      const deleteHashtag = existInfo.Hashtags.filter((data: string) => {
        if (selectedHashtag.indexOf(data) === -1) {
          return true;
        }
        return false;
      });
      const addHashtag = selectedHashtag.filter((data) => {
        if (existInfo.Hashtags.indexOf(data) === -1) {
          return true;
        }
        return false;
      });
      const deleteImg = existInfo.photo.filter((data: string) => {
        if (existImg?.indexOf(data) === -1) {
          return true;
        }
        return false;
      });

      try {
        if (textAreaRef.current !== null) {
          setUploadLoading(true);
          await updateReview({
            deleteHashtag,
            addHashtag,
            deleteImg,
            imgs: imgfile,
            id: router.query.id as string,
            content: textAreaRef.current.value,
          });
          setUploadLoading(false);
          alert("정상적으로 수정되었습니다");
          router.push("/user/mypage/review");
        }
      } catch (error) {
        setUploadLoading(false);
        alert("에러가 발생하였습니다");
      }
    }
  };

  return {
    storeInfo,
    taglist,
    existImg,
    selectedHashtag,
    changeHashtag,
    uploadImg,
    addImg,
    textAreaRef,
    submit,
    deleteExistImg,
    deleteUploadImg,
    error,
    loading,
    existInfo,
    setSelectedHashtag,
    setExistInfo,
    uploadLoading,
  };
};

export default useUpdateReview;
