import { useEffect, useRef, useState } from "react";
import {
  axiosGetMyInfo,
  axiosPatchMyNickname,
} from "../../../../lib/commonFn/api";
import MyInfoSetting from "./MyInfoSetting";

export interface userInfoContent {
  localId: string;
  nickname: string;
  provider: string;
  createdAt: string;
  email: string;
}

const MyInfoSettingContainer = () => {
  const [userInfo, setUserInfo] = useState<{
    content?: userInfoContent;
    loading: boolean;
    error: boolean;
  }>({ loading: true, error: false });
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const asyncWrapFn = async () => {
      try {
        const axiosUserInfo = await axiosGetMyInfo();
        setUserInfo({
          content: axiosUserInfo.data,
          loading: false,
          error: false,
        });
      } catch (error) {
        setUserInfo({ loading: false, error: true });
      }
    };
    asyncWrapFn();
  }, []);

  useEffect(() => {
    if (nicknameInputRef.current !== null && userInfo.content) {
      if (userInfo) nicknameInputRef.current.value = userInfo.content.nickname;
    }
  }, [userInfo]);

  const changeNickname = async () => {
    try {
      const confirm = window.confirm("수정하시겠습니까?");
      if (nicknameInputRef.current !== null && confirm) {
        await axiosPatchMyNickname(nicknameInputRef.current.value);
      }
      alert("수정되었습니다.");
    } catch (error) {
      alert("에러가 발생하였습니다");
    }
  };

  return (
    <MyInfoSetting
      userInfo={userInfo}
      changeNickname={changeNickname}
      nicknameInputRef={nicknameInputRef}
    />
  );
};

export default MyInfoSettingContainer;
