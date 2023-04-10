import { getMyInfo } from "../../../../api/mypage";
import useGetServerData from "../../../../hooks/getData";
import { useIsLabtopOrTabletOrMobile } from "../../../../hooks/mediaQuery";
import MyInfoSetting from "./MyInfoSetting";
import useMyInfoSetting from "./MyInfoSettingHook";

export interface userInfoContent {
  localId: string;
  nickname: string;
  provider: string;
  createdAt: string;
  email: string;
}

export interface userInfoDataState {
  content?: userInfoContent;
  loading: boolean;
  error: boolean;
}
const MyInfoSettingContainer = () => {
  const { serverData } = useGetServerData(getMyInfo);
  const { changeNickname, nicknameInputRef } = useMyInfoSetting(
    serverData as userInfoDataState
  );
  const isLabtopOrTabletOrMobile = useIsLabtopOrTabletOrMobile();
  return (
    <MyInfoSetting
      serverData={serverData as userInfoDataState}
      changeNickname={changeNickname}
      nicknameInputRef={nicknameInputRef}
      isLabtopOrTabletOrMobile={isLabtopOrTabletOrMobile}
    />
  );
};

export default MyInfoSettingContainer;
