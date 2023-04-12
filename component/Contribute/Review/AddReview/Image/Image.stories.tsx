import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Image from "./Image";
import { action } from "@storybook/addon-actions";
import img from "../../../../../public/emptyPlace.svg";

export default {
  title: "Contribute/Reivew/AddReview/Image",
  component: Image,
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (arg) => <Image {...arg} />;

export const generalType = Template.bind({});
generalType.args = {
  uploadImg: [img],
  addImg: action("addImg"),
  deleteImg: action("addImg"),
};
