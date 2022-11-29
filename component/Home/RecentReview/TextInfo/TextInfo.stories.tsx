import { ComponentStory, ComponentMeta } from "@storybook/react";
import TextInfo from "./TextInfo";

export default {
  title: "Home/RecentReview/TextInfo",
  component: TextInfo,
} as ComponentMeta<typeof TextInfo>;

const Template: ComponentStory<typeof TextInfo> = (arg) => {
  return <TextInfo {...arg} />;
};

export const isLoading = Template.bind({});
isLoading.args = {
  loading: true,
};

export const isNormal = Template.bind({});
isNormal.args = {
  loading: false,
  length: 15,
};
