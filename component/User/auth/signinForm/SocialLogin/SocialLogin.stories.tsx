import { ComponentStory, ComponentMeta } from "@storybook/react";
import SocialLogin from "./SocialLogin";

export default {
  title: "User/auth/signinForm/SocialLogin",
  component: SocialLogin,
} as ComponentMeta<typeof SocialLogin>;

const Template: ComponentStory<typeof SocialLogin> = () => {
  return <SocialLogin />;
};

export const generalType = Template.bind({});
