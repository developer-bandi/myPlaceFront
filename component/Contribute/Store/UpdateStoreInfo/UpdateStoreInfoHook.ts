import {useRouter} from "next/router";
import {useCallback, useDebugValue, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {axiosUpdateStoreInfo} from "../../../../lib/commonFn/api";
import {
  addImgWrapper,
  deleteExistImgWrapper,
  deleteUploadImgWrapper,
} from "../../../../lib/commonFn/imgFn";
import {RootReducer} from "../../../../store";
import {getStoreInfo} from "../../../../store/reducers/storeInfo/Reducer";

const useUpdateStoreInfo = () => {
  const existInfo = useSelector(
    (state: RootReducer) => state.storeInfo.content
  );
  const [uploadMenuImg, setUploadMenuImg] = useState<string[]>([]);
  const [menuImgfile, setMenuImgfile] = useState<Blob[]>([]);
  const [existMenuImg, setExistMenuImg] = useState<string[] | undefined>(
    () => existInfo?.Menus
  );
  const [uploadMainImg, setUploadMainImg] = useState<string[]>([]);
  const [mainImgFile, setMainImgFile] = useState<Blob[]>([]);
  const [existMainImg, setExistMainImg] = useState<string | undefined>(
    () => existInfo?.mainPhoto
  );
  const [loading, setLoading] = useState(false);
  const storeNameInputRef = useRef<HTMLInputElement>(null);
  const categorySelectRef = useRef<HTMLSelectElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const openninghourTextareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const addMenuImg = useCallback(
    addImgWrapper(
      10 - (existMenuImg === undefined ? 0 : existMenuImg.length),
      uploadMenuImg,
      menuImgfile,
      setUploadMenuImg,
      setMenuImgfile
    ),
    [existMenuImg, uploadMenuImg, menuImgfile, setUploadMenuImg, setMenuImgfile]
  );

  const deleteMenuImg = useCallback(
    deleteUploadImgWrapper(
      uploadMenuImg,
      menuImgfile,
      setUploadMenuImg,
      setMenuImgfile
    ),
    [uploadMenuImg, menuImgfile, setUploadMenuImg, setMenuImgfile]
  );

  const deleteExistMenuImg = useCallback(
    deleteExistImgWrapper(existMenuImg, setExistMenuImg),
    [existMenuImg, setExistMenuImg]
  );

  const addMainImg = useCallback(
    addImgWrapper(
      1 - (existMainImg === undefined ? 0 : existMainImg.length),
      uploadMainImg,
      mainImgFile,
      setUploadMainImg,
      setMainImgFile
    ),
    [existMainImg, uploadMainImg, mainImgFile, setUploadMainImg, setMainImgFile]
  );
  const deleteMainImg = useCallback(
    deleteUploadImgWrapper(
      uploadMainImg,
      mainImgFile,
      setUploadMainImg,
      setMainImgFile
    ),
    [uploadMainImg, mainImgFile, setUploadMainImg, setMainImgFile]
  );

  const deleteExistMainImg = () => {
    setExistMainImg(undefined);
  };

  useEffect(() => {
    if (
      storeNameInputRef.current !== null &&
      categorySelectRef.current !== null &&
      telRef.current !== null &&
      openninghourTextareaRef.current !== null
    ) {
      if (existInfo?.storeInfo !== undefined) {
        storeNameInputRef.current.value = existInfo.storeInfo.name;
        categorySelectRef.current.value = existInfo.storeInfo.category;
        telRef.current.value = existInfo.storeInfo.tel || "";
        openninghourTextareaRef.current.value =
          existInfo.storeInfo.openingHours || "";
      } else {
        alert("수정할 가게 정보가 없습니다. 가게를 선택해주세요");
        router.push("/findplace");
      }
    }
  }, []);

  const submit = async () => {
    if (
      storeNameInputRef.current !== null &&
      categorySelectRef.current !== null &&
      telRef.current !== null &&
      openninghourTextareaRef.current !== null
    ) {
      if (storeNameInputRef.current.value === undefined) {
        alert("가게 이름을 입력해주세요");
      } else if (categorySelectRef.current.value === "category") {
        alert("카테고리를 선택해 주세요");
      } else {
        if (existInfo?.storeInfo !== undefined) {
          try {
            let deletedImg: string[] = [];
            if (existInfo.Menus !== undefined) {
              deletedImg = existInfo.Menus.filter((data) => {
                if (existMenuImg?.indexOf(data) === -1) {
                  return true;
                }
                return false;
              });
            }
            if (
              existInfo.mainPhoto !== undefined &&
              existMainImg === undefined
            ) {
              deletedImg.push(existInfo.mainPhoto);
            }
            setLoading(true);
            await axiosUpdateStoreInfo(
              existInfo.storeInfo.id,
              storeNameInputRef.current.value,
              telRef.current.value,
              openninghourTextareaRef.current.value,
              categorySelectRef.current.value,
              mainImgFile,
              menuImgfile,
              deletedImg
            );
            dispatch(getStoreInfo(existInfo.storeInfo.id));
            setLoading(false);
            alert("정상적으로 수정되었습니다");
            router.push("/findplace");
          } catch (e) {
            setLoading(false);
            alert("에러가 발생하였습니다");
          }
        }
      }
    }
  };
  return {
    existInfo,
    addMenuImg,
    deleteExistMenuImg,
    deleteMenuImg,
    uploadMenuImg,
    addMainImg,
    deleteExistMainImg,
    deleteMainImg,
    uploadMainImg,
    storeNameInputRef,
    categorySelectRef,
    telRef,
    openninghourTextareaRef,
    submit,
    existMenuImg,
    existMainImg,
    loading,
  };
};

export default useUpdateStoreInfo;
