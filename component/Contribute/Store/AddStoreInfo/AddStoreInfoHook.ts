import {useRouter} from "next/router";
import {useCallback, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {axiosAddStore} from "../../../../lib/commonFn/api";
import {
  addImgWrapper,
  deleteUploadImgWrapper,
} from "../../../../lib/commonFn/imgFn";
import {RootReducer} from "../../../../store";

const useAddStoreInfo = () => {
  const position = useSelector((state: RootReducer) => state.addStorePosition);
  const storeNameInputRef = useRef<HTMLInputElement>(null);
  const categorySelectRef = useRef<HTMLSelectElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const openninghourTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [uploadMenuImg, setUploadMenuImg] = useState<string[]>([]);
  const [menuImgfile, setMenuImgfile] = useState<Blob[]>([]);
  const [uploadMainImg, setUploadMainImg] = useState<string[]>([]);
  const [mainImgfile, setMainImgfile] = useState<Blob[]>([]);
  const [loading, setLoading] = useState(false);
  const addMenuImg = useCallback(
    addImgWrapper(
      10,
      uploadMenuImg,
      menuImgfile,
      setUploadMenuImg,
      setMenuImgfile
    ),
    [uploadMenuImg, menuImgfile, setUploadMenuImg, setMenuImgfile]
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

  const addMainImg = useCallback(
    addImgWrapper(
      1,
      uploadMainImg,
      mainImgfile,
      setUploadMainImg,
      setMainImgfile
    ),
    [uploadMainImg, mainImgfile, setUploadMainImg, setMainImgfile]
  );

  const deleteMainImg = useCallback(
    deleteUploadImgWrapper(
      uploadMainImg,
      mainImgfile,
      setUploadMainImg,
      setMainImgfile
    ),
    [uploadMainImg, mainImgfile, setUploadMainImg, setMainImgfile]
  );
  const router = useRouter();

  useEffect(() => {
    if (position.address === "") {
      alert("주소를 먼저 설정해주세요");
      router.push("/contribute/addstoreposition");
    }
  }, [position]);

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
        try {
          setLoading(true);
          await axiosAddStore(
            storeNameInputRef.current.value,
            telRef.current.value,
            openninghourTextareaRef.current.value,
            position.address,
            position.latitude,
            position.longitude,
            categorySelectRef.current.value,
            mainImgfile,
            menuImgfile
          );
          setLoading(false);
          alert("성공적으로 등록되었습니다");
          router.push("/");
        } catch (e) {
          setLoading(false);
          alert("에러가 발생하였습니다");
        }
      }
    }
  };
  return {
    position,
    addMenuImg,
    deleteMenuImg,
    uploadMenuImg,
    addMainImg,
    deleteMainImg,
    uploadMainImg,
    storeNameInputRef,
    categorySelectRef,
    telRef,
    openninghourTextareaRef,
    submit,
    loading,
  };
};

export default useAddStoreInfo;
