import React, {SetStateAction} from "react";

export const addImgWrapper = (
  maxNumber: number,
  uploadImg: string[],
  imgfile: Blob[],
  setUploadImg: React.Dispatch<SetStateAction<string[]>>,
  setImgfile: React.Dispatch<SetStateAction<Blob[]>>
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      if (e.target.files.length + uploadImg.length >= maxNumber + 1) {
        alert("파일 최대갯수를 초과하였습니다 삭제후 추가해주세요");
      } else {
        const imgs: string[] = [...uploadImg];
        const imgsfile: Blob[] = [...imgfile];
        let sizeUpper = false;
        for (let i = 0; i < e.target.files.length; i++) {
          if (e.target.files[i].size > 5242880) {
            sizeUpper = true;
            continue;
          }
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[i]);
          imgsfile.push(e.target.files[i]);
          reader.onload = function () {
            if (reader.result !== null) {
              imgs.push(reader.result as string);
              if (e.target.files !== null)
                if (i === e.target.files.length - 1) {
                  setUploadImg(imgs);
                  if (sizeUpper) {
                    alert("사이즈 초과된 사진이 있습니다");
                  }
                }
            }
          };
        }
        setImgfile(imgsfile);
      }
    }
  };
};

export const deleteUploadImgWrapper = (
  uploadImg: string[],
  imgfile: Blob[],
  setUploadImg: React.Dispatch<SetStateAction<string[]>>,
  setImgfile: React.Dispatch<SetStateAction<Blob[]>>
) => {
  return (deleteindex: number) => {
    setUploadImg(
      uploadImg.filter((data, index) => {
        if (index === deleteindex) {
          return false;
        }
        return true;
      })
    );

    setImgfile(
      imgfile.filter((data: unknown, index: number) => {
        if (index === deleteindex) {
          return false;
        }
        return true;
      })
    );
  };
};

export const deleteExistImgWrapper = (
  existImg: string[] | undefined,
  setExistImg: React.Dispatch<SetStateAction<string[] | undefined>>
) => {
  return (deleteindex: number) => {
    if (existImg !== undefined) {
      setExistImg(
        existImg.filter((data, index) => {
          if (index === deleteindex) {
            return false;
          }
          return true;
        })
      );
    }
  };
};
