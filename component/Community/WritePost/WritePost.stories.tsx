import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import WritePost from "./WritePost";
import { action } from "@storybook/addon-actions";

export default {
  title: "Community/WritePost",
  component: WritePost,
} as ComponentMeta<typeof WritePost>;

const Template: ComponentStory<typeof WritePost> = (arg) => (
  <WritePost {...arg} />
);

export const generalType = Template.bind({});
generalType.args = {
  uploadImg: [],
  addImg: action("addImg"),
  submit: action("submit"),
};
