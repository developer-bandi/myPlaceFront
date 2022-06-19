import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReviewType } from "../../../../lib/apitype/contribute";
import {
  axiosGetMyReview,
  axiosPatchMyReview,
} from "../../../../lib/commonFn/api";
import {
  addImgWrapper,
  deleteExistImgWrapper,
  deleteUploadImgWrapper,
} from "../../../../lib/commonFn/imgFn";
import { RootReducer } from "../../../../store";
import { getHashtagAll } from "../../../../store/reducers/hashtagAll/hashtagAllReducer";
import UpdateReview from "./UpdateReview";

const UpdateReviewContainer = () => {
  const taglist = useSelector((state: RootReducer) => state.hashtagAll);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [existInfo, setExistInfo] = useState<ReviewType>();
  const [selectedHashtag, setSelectedHashtag] = useState<string[]>([]);
  const [existImg, setExistImg] = useState<string[] | undefined>();
  const [storeInfo, setStoreInfo] = useState<{
    name: string;
    category: string;
  }>();
  const [uploadImg, setUploadImg] = useState<string[]>([]);
  const [imgfile, setImgfile] = useState<Blob[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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
    if (Object.keys(taglist.content.카페).length === 0) {
      dispatch(getHashtagAll());
    }
    axiosGetMyReview(router.query.id as string)
      .then((res) => {
        setStoreInfo(res.data.storeInfo);
        setSelectedHashtag(res.data.Hashtags);
        setExistImg(res.data.photo);
        setExistInfo(res.data);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (textAreaRef.current !== null && existInfo !== undefined) {
      textAreaRef.current.value = existInfo.content;
    }
  }, [existInfo]);

  const changeHashtag = (hashtag: string, id: number) => {
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
          await axiosPatchMyReview(
            deleteHashtag,
            addHashtag,
            deleteImg,
            imgfile,
            router.query.id as string,
            textAreaRef.current.value
          );
          router.push("/user/mypage/review");
        }
      } catch (error) {
        alert("오류가 발생하였습니다");
      }
    }
  };

  return (
    <UpdateReview
      storeInfo={storeInfo}
      taglist={taglist}
      existImg={existImg}
      selectedHashtag={selectedHashtag}
      changeHashtag={changeHashtag}
      uploadImg={uploadImg}
      addImg={addImg}
      textAreaRef={textAreaRef}
      submit={submit}
      deleteExistImg={deleteExistImg}
      deleteUploadImg={deleteUploadImg}
      error={error}
      loading={loading}
    ></UpdateReview>
  );
};

export default UpdateReviewContainer;
