import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { axiosAddStore } from "../../../../lib/commonFn/api";
import {
  addImgWrapper,
  deleteUploadImgWrapper,
} from "../../../../lib/commonFn/imgFn";
import { RootReducer } from "../../../../store";
import AddStoreInfo from "./AddStoreInfo";

const AddStoreInfoContainer = () => {
  const position = useSelector((state: RootReducer) => state.addStorePosition);
  const storeNameInputRef = useRef<HTMLInputElement>(null);
  const categorySelectRef = useRef<HTMLSelectElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const openninghourTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [uploadImg, setUploadImg] = useState<string[]>([]);
  const [imgfile, setImgfile] = useState<Blob[]>([]);
  const addImg = useCallback(
    addImgWrapper(10, uploadImg, imgfile, setUploadImg, setImgfile),
    [uploadImg, imgfile, setUploadImg, setImgfile]
  );

  const deleteImg = useCallback(
    deleteUploadImgWrapper(uploadImg, imgfile, setUploadImg, setImgfile),
    [uploadImg, imgfile, setUploadImg, setImgfile]
  );
  const router = useRouter();

  useEffect(() => {
    if (position.address === "") {
      alert("주소를 먼저 설정해주세요!");
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
          await axiosAddStore(
            storeNameInputRef.current.value,
            telRef.current.value,
            openninghourTextareaRef.current.value,
            position.address,
            position.latitude,
            position.longitude,
            categorySelectRef.current.value,
            imgfile
          );
          alert("성공적으로 등록되었습니다");
          router.push("/");
        } catch (e) {
          alert("에러가 발생하였습니다");
        }
      }
    }
  };

  return (
    <AddStoreInfo
      address={position.address}
      addImg={addImg}
      deleteImg={deleteImg}
      uploadImg={uploadImg}
      storeNameInputRef={storeNameInputRef}
      categorySelectRef={categorySelectRef}
      telRef={telRef}
      openninghourTextareaRef={openninghourTextareaRef}
      submit={submit}
    />
  );
};

export default AddStoreInfoContainer;
