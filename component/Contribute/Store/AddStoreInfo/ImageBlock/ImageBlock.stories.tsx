import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ImageBlock from "./ImageBlock";
import { action } from "@storybook/addon-actions";

export default {
  title: "Contribute/Store/AddStoreInfo/ImageBlock",
  component: ImageBlock,
} as ComponentMeta<typeof ImageBlock>;

const Template: ComponentStory<typeof ImageBlock> = (arg) => (
  <ImageBlock {...arg} />
);

export const generalType = Template.bind({});
generalType.args = {
  title: "대표사진 추가",
  maxLength: 1,
  images: [],
  addImg: action("addImg"),
  deleteImg: action("deleteImg"),
};
