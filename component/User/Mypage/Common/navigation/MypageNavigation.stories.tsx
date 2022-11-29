import { ComponentStory, ComponentMeta } from "@storybook/react";
import MyPageNavigation from "./MyPageNavigation";

export default {
  title: "User/Mypage/Common/navigation",
  component: MyPageNavigation,
} as ComponentMeta<typeof MyPageNavigation>;

const Template: ComponentStory<typeof MyPageNavigation> = () => {
  return <MyPageNavigation />;
};

export const generalType = Template.bind({});
