import {axiosGetMyInfo} from "../../../../lib/commonFn/api";
import useGetServerData from "../../../../lib/customHook/getData";
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
  const {serverData} = useGetServerData(axiosGetMyInfo);
  const {changeNickname, nicknameInputRef, isLabtopOrTabletOrMobile} =
    useMyInfoSetting(serverData as userInfoDataState);

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
