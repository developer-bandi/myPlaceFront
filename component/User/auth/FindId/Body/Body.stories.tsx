import { ComponentStory, ComponentMeta } from "@storybook/react";
import Body from "./Body";
import { action } from "@storybook/addon-actions";

export default {
  title: "User/auth/FindId/Body",
  component: Body,
} as ComponentMeta<typeof Body>;

const Template: ComponentStory<typeof Body> = (arg) => {
  return <Body {...arg} />;
};

export const generalType = Template.bind({});
generalType.args = {
  subTitle: "이메일",
  placeHolder: "이메일을 입력해주세요",
  buttonChildren: "메일전송",
  eventHandler: () =>
    new Promise((resolve) => {
      action("eventHandler")();
      resolve();
    }),
};
