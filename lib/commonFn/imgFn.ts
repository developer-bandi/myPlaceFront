import React, { SetStateAction } from "react";

export const addImgWrapper = (
  maxNumber: number,
  uploadImg: string[],
  imgfile: Blob[],
  setUploadImg: React.Dispatch<SetStateAction<string[]>>,
  setImgfile: React.Dispatch<SetStateAction<Blob[]>>
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      if (e.target.files.length >= maxNumber + 1) {
        alert(
          `파일 개수가 ${maxNumber + 1}개 이상입니다 사진개수를 줄여주세요`
        );
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
                  if (imgs.length >= maxNumber + 1) {
                    imgs.splice(0, imgs.length - maxNumber);
                  }
                  setUploadImg(imgs);
                  if (sizeUpper) {
                    alert("사이즈 초과된 사진이 있습니다");
                  }
                }
            }
          };
        }
        if (imgsfile.length >= maxNumber + 1) {
          imgsfile.splice(0, imgsfile.length - maxNumber);
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
