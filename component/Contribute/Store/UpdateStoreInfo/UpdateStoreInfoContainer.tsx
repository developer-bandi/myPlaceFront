import { useRouter } from "next/router";
import { useCallback, useDebugValue, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { axiosUpdateStoreInfo } from "../../../../lib/commonFn/api";
import {
  addImgWrapper,
  deleteExistImgWrapper,
  deleteUploadImgWrapper,
} from "../../../../lib/commonFn/imgFn";
import { RootReducer } from "../../../../store";
import AddStore from "./UpdateStoreInfo";

const UpdateStoreInfoContainer = () => {
  const existInfo = useSelector(
    (state: RootReducer) => state.storeInfo.content
  );
  const [uploadImg, setUploadImg] = useState<string[]>([]);
  const [imgfile, setImgfile] = useState<Blob[]>([]);
  const [existImg, setExistImg] = useState<string[] | undefined>(
    () => existInfo.Menus
  );
  const storeNameInputRef = useRef<HTMLInputElement>(null);
  const categorySelectRef = useRef<HTMLSelectElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const openninghourTextareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const addImg = useCallback(
    addImgWrapper(10, uploadImg, imgfile, setUploadImg, setImgfile),
    [existImg, imgfile, setUploadImg, setImgfile]
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
    if (
      storeNameInputRef.current !== null &&
      categorySelectRef.current !== null &&
      telRef.current !== null &&
      openninghourTextareaRef.current !== null
    ) {
      if (existInfo.storeInfo !== undefined) {
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
        try {
          if (existInfo.storeInfo !== undefined) {
            let deletedImg: string[] = [];
            if (existInfo.Menus !== undefined) {
              deletedImg = existInfo.Menus.filter((data) => {
                if (existImg?.indexOf(data) === -1) {
                  return true;
                }
                return false;
              });
            }
            await axiosUpdateStoreInfo(
              existInfo.storeInfo.id,
              storeNameInputRef.current.value,
              telRef.current.value,
              openninghourTextareaRef.current.value,
              categorySelectRef.current.value,
              imgfile,
              deletedImg
            );
          }
          router.push("/findplace");
        } catch (e) {
          alert("에러가 발생하였습니다");
        }
      }
    }
  };
  return (
    <AddStore
      existInfo={existInfo}
      addImg={addImg}
      deleteExistImg={deleteExistImg}
      deleteUploadImg={deleteUploadImg}
      uploadImg={uploadImg}
      storeNameInputRef={storeNameInputRef}
      categorySelectRef={categorySelectRef}
      telRef={telRef}
      openninghourTextareaRef={openninghourTextareaRef}
      submit={submit}
      existImg={existImg}
    />
  );
};

export default UpdateStoreInfoContainer;
