import { ComponentStory, ComponentMeta } from "@storybook/react";
import FindPassword from "./FindPassword";
import { action } from "@storybook/addon-actions";

export default {
  title: "User/auth/FindPassword",
  component: FindPassword,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof FindPassword>;

const Template: ComponentStory<typeof FindPassword> = (arg) => {
  return <FindPassword {...arg} />;
};

export const inputEmail = Template.bind({});
inputEmail.args = {
  authStatus: false,
  sendMail: () =>
    new Promise((resolve) => {
      action("sendMail")();
      resolve();
    }),
};

export const inputRandomNumber = Template.bind({});
inputRandomNumber.args = {
  randomNumber: {
    number: "123456",
    id: "test",
  },
  authStatus: false,
  checkAuthNum: () =>
    new Promise((resolve) => {
      action("checkAuthNum")();
      resolve(1);
    }),
};

export const inputNewPassword = Template.bind({});
inputNewPassword.args = {
  randomNumber: {
    number: "123456",
    id: "test",
  },
  authStatus: true,
  changePassword: () =>
    new Promise((resolve) => {
      action("sendMail")();
      resolve();
    }),
};
