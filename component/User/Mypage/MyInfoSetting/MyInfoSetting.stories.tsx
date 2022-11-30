import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useEffect, useRef } from "react";
import { useIsLabtopOrTabletOrMobile } from "../../../../lib/customHook/mediaQuery";
import MyInfoSetting from "./MyInfoSetting";

export default {
  title: "User/Mypage/MyInfoSetting",
  component: MyInfoSetting,
} as ComponentMeta<typeof MyInfoSetting>;

const Template: ComponentStory<typeof MyInfoSetting> = (arg) => {
  const isLabtopOrTabletOrMobile = useIsLabtopOrTabletOrMobile();
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current !== null && arg.serverData.content?.nickname) {
      ref.current.value = arg.serverData.content.nickname;
    }
  }, []);
  return (
    <MyInfoSetting
      {...arg}
      isLabtopOrTabletOrMobile={isLabtopOrTabletOrMobile}
      nicknameInputRef={ref}
    />
  );
};

const nomarlContent = {
  localId: "placeId",
  nickname: "place",
  provider: "local",
  createdAt: "2022-11-11",
  email: "place@gmail.com",
};

export const isLoading = Template.bind({});
isLoading.args = {
  serverData: { loading: true, error: false },
};
export const isError = Template.bind({});
isError.args = {
  serverData: { loading: false, error: true },
};

export const isNomarl = Template.bind({});
isNomarl.args = {
  serverData: { content: nomarlContent, loading: false, error: false },
  changeNickname: () =>
    new Promise((resolve) => {
      action("changePage")();
      resolve();
    }),
};
