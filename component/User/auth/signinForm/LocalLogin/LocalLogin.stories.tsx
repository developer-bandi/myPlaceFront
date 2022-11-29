import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LocalLogin from "./LocalLogin";

export default {
  title: "User/auth/SigninForm/LocalLogin",
  component: LocalLogin,
} as ComponentMeta<typeof LocalLogin>;

const Template: ComponentStory<typeof LocalLogin> = (arg) => {
  return (
    <div style={{ maxWidth: 400 }}>
      <LocalLogin {...arg} />
    </div>
  );
};

export const generalType = Template.bind({});
generalType.args = {
  eventHandler: () =>
    new Promise((resolve) => {
      action("sendMail")();
      resolve();
    }),
};
