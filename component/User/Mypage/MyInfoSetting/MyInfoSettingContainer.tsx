import MyInfoSetting from "./MyInfoSetting";
import useMyInfoSetting from "./MyInfoSettingHook";

const MyInfoSettingContainer = () => {
  const {userInfo, changeNickname, nicknameInputRef, isLabtopOrTabletOrMobile} =
    useMyInfoSetting();
  return (
    <MyInfoSetting
      userInfo={userInfo}
      changeNickname={changeNickname}
      nicknameInputRef={nicknameInputRef}
      isLabtopOrTabletOrMobile={isLabtopOrTabletOrMobile}
    />
  );
};

export default MyInfoSettingContainer;
