import { ComponentStory, ComponentMeta } from "@storybook/react";
import SignupForm from "./SignupForm";

export default {
  title: "User/auth/SignupForm",
  component: SignupForm,
} as ComponentMeta<typeof SignupForm>;

const Template: ComponentStory<typeof SignupForm> = (arg) => {
  return <SignupForm {...arg} />;
};

export const generalType = Template.bind({});
