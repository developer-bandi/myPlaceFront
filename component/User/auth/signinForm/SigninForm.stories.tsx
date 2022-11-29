import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SigninForm from "./SigninForm";

export default {
  title: "User/auth/signinForm",
  component: SigninForm,
} as ComponentMeta<typeof SigninForm>;

const Template: ComponentStory<typeof SigninForm> = (arg) => {
  return <SigninForm {...arg} />;
};

export const generalType = Template.bind({});
generalType.args = {
  checkLogin: () =>
    new Promise((resolve) => {
      action("checkLogin")();
      resolve();
    }),
};
