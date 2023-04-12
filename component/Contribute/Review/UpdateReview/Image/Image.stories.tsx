import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ImageComponent from "./Image";
import img from "../../../../../public/emptyPlace.svg";
import { action } from "@storybook/addon-actions";

export default {
  title: "Contribute/Reivew/UpdateReview/Image",
  component: ImageComponent,
} as ComponentMeta<typeof ImageComponent>;

const Template: ComponentStory<typeof ImageComponent> = (arg) => {
  return <ImageComponent {...arg} />;
};

export const generalType = Template.bind({});
generalType.args = {
  uploadImg: [img],
  existImg: [img],
  deleteExistImg: action("deleteExistImg"),
  deleteUploadImg: action("deleteUploadImg"),
  addImg: action("addImg"),
};
