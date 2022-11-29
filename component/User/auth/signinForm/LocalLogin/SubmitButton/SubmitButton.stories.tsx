import { ComponentStory, ComponentMeta } from "@storybook/react";
import SubmitButton from "./SubmitButton";
import { action } from "@storybook/addon-actions";

export default {
  title: "User/auth/SigninForm/LocalLogin/SubmitButton",
  component: SubmitButton,
} as ComponentMeta<typeof SubmitButton>;

const Template: ComponentStory<typeof SubmitButton> = (arg) => {
  return <SubmitButton {...arg} />;
};

export const generalType = Template.bind({});
generalType.args = {
  children: "회원가입",
  eventHandler: () =>
    new Promise((resolve) => {
      action("eventHandler")();
      resolve();
    }),
};
