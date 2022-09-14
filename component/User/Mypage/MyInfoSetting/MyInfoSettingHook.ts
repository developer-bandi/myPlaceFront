import {useEffect, useRef, useState} from "react";
import {axiosPatchMyNickname} from "../../../../lib/commonFn/api";
import {useIsLabtopOrTabletOrMobile} from "../../../../lib/customHook/mediaQuery";
import {userInfoDataState} from "./MyInfoSettingContainer";

const useMyInfoSetting = (serverData: userInfoDataState) => {
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nicknameInputRef.current !== null && serverData.content) {
      nicknameInputRef.current.value = serverData.content.nickname;
    }
  }, [serverData]);

  const changeNickname = async () => {
    try {
      const confirm = window.confirm("수정하시겠습니까?");
      if (nicknameInputRef.current !== null && confirm) {
        await axiosPatchMyNickname(nicknameInputRef.current.value);
      }
      alert("수정되었습니다");
    } catch (error) {
      alert("에러가 발생하였습니다");
    }
  };

  return {changeNickname, nicknameInputRef};
};

export default useMyInfoSetting;
