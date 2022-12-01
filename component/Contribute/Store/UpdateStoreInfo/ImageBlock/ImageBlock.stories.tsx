import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ImageBlock from "./ImageBlock";

export default {
  title: "Contribute/Store/UpdateStoreInfo/ImageBlock",
  component: ImageBlock,
} as ComponentMeta<typeof ImageBlock>;

const Template: ComponentStory<typeof ImageBlock> = (arg) => (
  <ImageBlock {...arg} />
);

export const generalType = Template.bind({});
generalType.args = {
  title: "메뉴사진 추가",
  maxLength: 10,
  existImg: [],
  uploadImg: [],
};
