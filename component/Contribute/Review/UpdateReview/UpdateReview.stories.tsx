import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import UpdateReview from "./UpdateReview";
import img from "../../../../public/emptyPlace.svg";
import { action } from "@storybook/addon-actions";

export default {
  title: "Contribute/Reivew/UpdateReview",
  component: UpdateReview,
} as ComponentMeta<typeof UpdateReview>;

const Template: ComponentStory<typeof UpdateReview> = (arg) => {
  return <UpdateReview {...arg} />;
};

export const generalType = Template.bind({});
generalType.args = {
  uploadImg: [img],
  existImg: [img],
  taglist: {
    content: {
      testCategory: {
        분위기: [
          ["따듯함", 1, 2],
          ["깔끔함", 1, 2],
          ["조용한", 1, 2],
        ],
      },
    },
    loading: false,
    error: false,
  },
  storeInfo: {
    category: "testCategory",
    name: "테스트 스토어",
    address: "부산광역시 금정구 장전동",
  },
  deleteExistImg: action("deleteExistImg"),
  deleteUploadImg: action("deleteUploadImg"),
  addImg: action("addImg"),
  selectedHashtag: ["따듯함"],
  changeHashtag: action("changeHashtag"),
};
