import { ComponentStory, ComponentMeta } from "@storybook/react";
import InputBlock from "./InputBlock";
import { action } from "@storybook/addon-actions";

export default {
  title: "User/auth/SigninForm/LocalLogin/InputBlock",
  component: InputBlock,
} as ComponentMeta<typeof InputBlock>;

const Template: ComponentStory<typeof InputBlock> = (arg) => {
  return <InputBlock {...arg} />;
};

export const generalType = Template.bind({});
generalType.args = {
  subTitle: "이메일",
  placeHolder: "이메일을 입력해주세요",
  eventHandler: () =>
    new Promise((resolve) => {
      action("eventHandler")();
      resolve();
    }),
};
