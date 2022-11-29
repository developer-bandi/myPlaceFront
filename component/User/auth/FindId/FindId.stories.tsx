import { ComponentStory, ComponentMeta } from "@storybook/react";
import FindId from "./FindId";
import { action } from "@storybook/addon-actions";

export default {
  title: "User/auth/FindId",
  component: FindId,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof FindId>;

const Template: ComponentStory<typeof FindId> = (arg) => {
  return <FindId {...arg} />;
};

export const inputEmail = Template.bind({});
inputEmail.args = {
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
  getId: () =>
    new Promise((resolve) => {
      action("getId")();
      resolve();
    }),
};
